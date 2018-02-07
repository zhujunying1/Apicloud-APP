//页面跳转
var clickCount = 1;
var timePicker;
var y, h;
$("#header.header").css({"height":"2.34rem","border-bottom":"1px solid #bbb","background":"#f5f5f5"});
function rember(obj) {
    $(obj).children('div').toggleClass('bgcl');
    if ($(obj).children('div').hasClass('bgcl')) {
        $api.setStorage('is_rember', 1);
    } else {
        $api.setStorage('is_rember', 0);
    }
}
//新建笔记选择课程
function newMyNote() {
    api.openFrame({
        name: 'my-question-mine',
        url: 'my-question-mine.html',
        rect: {
            x: leftLw,
            y: 0,
            w: api.winWidth - leftLw,
            h: headLh
        },
        pageParam: {type: 'notes'},
        bounces: false
    });
}
function bind_push() {
    var push = api.require('push');
    var username = get_loc_val('mine', 'nickName');
    var memberId = getstor('memberId');

    push.bind({
        userName: username,
        userId: memberId
    }, function (ret, err) {
    });
}

//去绑定
function to_bind() {
    api.setStatusBarStyle({
        style: 'light'
    });
    api.openWin({
        name: 'bind',
        url: 'bind.html',
        delay: 200,
        slidBackEnabled: false
    });
}

//忘记密码
function forget() {
    api.openWin({
        name: 'forgot_pass',
        url: 'forgot_pass.html',
        delay: 200,
        slidBackEnabled: false
    });
}

//手机号注册
function phone_reg() {
    api.openWin({
        name: 'sign-up',
        url: 'sign-up.html',
        delay: 200,
        slidBackEnabled: false
    });
}

//普通登录
function login() {
    var name = $.trim($('input[name=username]').val());
    var password = $.trim($('input[name=password]').val());
    if (name == '') {
        api.toast({
            msg: '手机号／邮箱不能为空',
            location: 'middle'
        });
        return false;
    }
    if (password == '') {
        api.toast({
            msg: '密码不能为空',
            location: 'middle'
        });
        return false;
    }
    api.showProgress({
        title: '登录中',
        model: true
    });
    set_token(function (res, error) {
        if (error) {
            api.toast({
                msg: error.msg,
                location: 'middle'
            });
            return false;
        }
        if (res.state == 'success') {
            var param = {};
            param.account = name;
            param.password = password;
            param.token = res.data.token;
            ajaxRequest('api/zbids/member/login/v1.0', 'post', param, function (ret, err) {
                api.hideProgress();

                if (err) {
                    api.toast({
                        msg: err.msg,
                        location: 'middle'
                    });
                    return false;
                }
                if (ret.state == 'success') {
                    $api.setStorage('account', name);

                    $api.setStorage('password', password);

                    $api.setStorage('token', ret.data.token);
                    $api.setStorage('mine', ret.data);
                    if (ret.data.isAvatar == false) {
                        api.openWin({
                            name: 'sign-edit',
                            url: 'sign-edit.html',
                            slidBackEnabled: false,
                            bgColor: '#fff',
                            delay: 200
                        });
                    } else {
                        to_ucenter();
                    }
                } else if (ret.state == 'error') {
                    api.toast({
                        msg: ret.msg,
                        location: 'middle'
                    });  
                    // var msg = '';
                    // if (err_conf_007[ret.msg]) {
                    //     msg = err_conf_007[ret.msg];
                    //     api.toast({
                    //         msg: msg,
                    //         location: 'middle'
                    //     });
                    // }
                }
            });
        } else {
   
            var err = '';
            if (!isEmpty(err_conf_007[res.msg])) {
                err = err_conf_007[res.msg];
                api.toast({
                    msg: err,
                    location: 'middle'
                });
            }
        }
    });
}

//qq登录
function login_qq() {
    api.showProgress({
        title: '授权中',
        model: true
    });
    //setTimeout(function() {
    //	api.hideProgress();
    //}, 1500);
    var obj = api.require('qq');
    obj.login(function (ret, err) {
        if (ret.openId) {
            set_token(function (res, error) {
                if (error) {
                    api.toast({
                        msg: error.msg,
                        location: 'middle'
                    });
                    return false;
                }
                if (res.state == 'success') {
                    var param = {};
                    param.token = res.data.token;
                    param.societyType = 'society_qq';
                    param.societyId = ret.openId;
                    $api.setStorage('token', res.data.token);
                    ajaxRequest('api/v2.1/oauthLogin', 'post', param, function (ret, err) {
                        if (err) {
                            api.toast({
                                msg: err.msg,
                                location: 'middle'
                            });
                            return false;
                        }
                        if (ret && ret.state == 'success') {
                            $api.setStorage('outh', {
                                'societyType': param.societyType,
                                'societyId': param.societyId
                            });
                            $api.setStorage('token', ret.data.token);
                            $api.setStorage('mine', ret.data);
                            if (ret.data.isAvatar == false) {
                                api.openWin({
                                    name: 'sign-edit',
                                    url: 'sign-edit.html',
                                    slidBackEnabled: false,
                                    bgColor: '#fff',
                                    delay: 200,
                                    pageParam : {
                                        nickName : ret.data.nickName
                                    }
                                });
                            } else {
                                to_ucenter();
                            }
                        } else if (ret.state == 'error') {
                            if (ret.msg == '1001') {
                                $api.setStorage('outh', {
                                    'societyType': param.societyType,
                                    'societyId': param.societyId
                                });
                                to_bind();
                                return false;
                            }
                            var msg = '';
                            if (err_conf_007[ret.msg]) {
                                msg = err_conf_007[ret.msg];
                                api.toast({
                                    msg: msg,
                                    location: 'middle'
                                });
                            }
                        }
                    });
                } else {
                    var err = '';
                    if (!isEmpty(err_conf_007[res.msg])) {
                        err = err_conf_007[res.msg];
                        api.toast({
                            msg: err,
                            location: 'middle'
                        });
                    }

                }
            });
        } else {
            api.hideProgress();
        }
    });
}

//微信登录
function login_weixin() {
    api.showProgress({
        title: '授权中',
        modal: true
    });
    //setTimeout(function() {
    //	api.hideProgress();
    //}, 1500);
    var myobj = api.require('weiXin');
    myobj.registerApp(function (ret, err) {
        if (ret.status) {
            myobj.auth(function (data, err) {
                if (data.status) {
                    var token = data.token;
                    myobj.getUserInfo(function (msg, err) {
                        if (msg.status) {
                            set_token(function (res, error) {
                                if (error) {
                                    api.toast({
                                        msg: error.msg,
                                        location: 'middle'
                                    });
                                    return false;
                                }
                                if (res.state == 'success') {
                                    var param = {};
                                    param.token = res.data.token;
                                    param.societyType = 'society_weixin';
                                    param.societyId = msg.openid;
                                    $api.setStorage('token', res.data.token);
                                    ajaxRequest('api/v2.1/oauthLogin', 'post', param, function (ret, err) {
                                        if (err) {
                                            api.toast({
                                                msg: err.msg,
                                                location: 'middle'
                                            });
                                            return false;
                                        }
                                        if (ret && ret.state == 'success') {
                                            $api.setStorage('outh', {
                                                'societyType': param.societyType,
                                                'societyId': param.societyId
                                            });
                                            $api.setStorage('token', ret.data.token);
                                            $api.setStorage('mine', ret.data);
                                            if (ret.data.isAvatar == false) {
                                                api.openWin({
                                                    name: 'sign-edit',
                                                    url: 'sign-edit.html',
                                                    slidBackEnabled: false,
                                                    delay: 200,
                                                    bgColor: '#fff',
                                                    pageParam : {
                                                        nickName : ret.data.nickName
                                                    }
                                                });
                                            } else {
                                                to_ucenter();
                                            }
                                        } else if (ret.state == 'error') {
                                            if (ret.msg == '1001') {
                                                $api.setStorage('outh', {
                                                    'societyType': param.societyType,
                                                    'societyId': param.societyId
                                                });
                                                to_bind();
                                                return false;
                                            }
                                            var msg = '';
                                            if (err_conf_007[ret.msg]) {
                                                msg = err_conf_007[ret.msg];
                                                api.toast({
                                                    msg: msg,
                                                    location: 'middle'
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    var err = '';
                                    if (!isEmpty(err_conf_007[res.msg])) {
                                        err = err_conf_007[res.msg];
                                        api.toast({
                                            msg: err,
                                            location: 'middle'
                                        });
                                    }

                                }
                            });
                        } else {
                            api.hideProgress();
                        }
                    });
                } else {
                    api.hideProgress();
                }
            });
        } else {
            api.hideProgress();
        }
    });
}

//新浪登录
function login_weibo() {
    api.showProgress({
        title: '授权中',
        modal: true
    });
    //setTimeout(function() {
    //	api.hideProgress();
    //}, 1500);
    var myobj = api.require('sinaWeiBo');
    myobj.auth(function (ret, err) {
        if (ret.status) {
            set_token(function (res, error) {
                if (error) {
                    api.toast({
                        msg: error.msg,
                        location: 'middle'
                    });
                    return false;
                }
                if (res.state == 'success') {
                    var param = {};
                    param.token = res.data.token;
                    param.societyType = 'society_weibo';
                    param.societyId = ret.userID;
                    $api.setStorage('token', res.data.token);
                    ajaxRequest('api/v2.1/oauthLogin', 'post', param, function (ret, err) {
                        if (err) {
                            api.toast({
                                msg: err.msg,
                                location: 'middle'
                            });
                            return false;
                        }
                        if (ret && ret.state == 'success') {
                            $api.setStorage('outh', {
                                'societyType': param.societyType,
                                'societyId': param.societyId
                            });
                            $api.setStorage('token', ret.data.token);
                            $api.setStorage('mine', ret.data);
                            if (ret.data.isAvatar == false) {
                                api.openWin({
                                    name: 'sign-edit',
                                    url: 'sign-edit.html',
                                    slidBackEnabled: false,
                                    bgColor: '#fff',
                                    delay: 200,
                                    pageParam : {
                                        nickName : ret.data.nickName
                                    }
                                });
                            } else {
                                to_ucenter();
                            }
                        } else if (ret.state == 'error') {
                            if (ret.msg == '1001') {
                                $api.setStorage('outh', {
                                    'societyType': param.societyType,
                                    'societyId': param.societyId
                                });
                                to_bind();
                                return false;
                            }
                            var msg = '';
                            if (err_conf_007[ret.msg]) {
                                msg = err_conf_007[ret.msg];
                                api.toast({
                                    msg: msg,
                                    location: 'middle'
                                });
                            }

                        }
                    });
                } else {
                    var err = '';
                    if (!isEmpty(err_conf_007[res.msg])) {
                        err = err_conf_007[res.msg];
                        api.toast({
                            msg: err,
                            location: 'middle'
                        });
                    }

                }
            });
        } else {
            api.hideProgress();
        }
    });
}

function init(callback) {
    if ((api.connectionType == 'none' || api.connectionType == 'unknown') && !isEmpty(getstor('memberId')) && !isEmpty($api.getStorage('token'))) {
        api.removeLaunchView({
            animation: {
                type: 'fade',
                duration: 500
            }
        });
        to_ucenter();
        return false;
    }
    var token = isEmpty($api.getStorage('token')) ? '' : $api.getStorage('token');
    if (token != '') {
        ajaxRequest('api/zbids/member/getmemberinfo', 'get', {
            token: token
        }, function (ret, err) {
            if (err) {
                callback(false);
            }
            if (ret && ret.state == 'success') {
                ret.data.memberId = ret.data.id;
                $api.setStorage('memberMessage',ret);
                callback(ret.data);
            } else {
                callback(false);
            }
        });
    } else {
        callback(false);
    }
}
var cache_init = false;
//去个人中心
function to_ucenter() {

    set_index(0);
    var jsfun = "relogin('" + true + "');";
    api.execScript({
        name: 'root',
        script: jsfun
    });

    $('.onlogin').show();
    $('.nologin').hide();
    $('input').blur();
    var headimg = get_loc_val('mine', 'avatar');
    if (headimg) {
        headimg = static_url + headimg + '?s=' + Math.random();
        $('.avatar').attr('src', headimg);
    }
    var header = $api.byId('header');
    $api.fixIos7Bar(header);
    window.localStorage.caicui_headLh = headLh = $api.offset(header).h;
    window.localStorage.caicui_headSh = headSh = parseInt($('#sHead').height() - 0 + headLh);
    window.localStorage.caicui_footSh = footSh = $('#sFoot').height();
    window.localStorage.caicui_leftLw = leftLw = $('#slider').width();
    window.localStorage.caicui_leftSw = leftSw = $('#sLeft').width();
    window.localStorage.caicui_svgDown = svgDown = $('#svgDown').width();
    window.localStorage.caicui_svgAudio = svgAudio = $('#svgAudio').width();
    //alert(headLh +" - "+ parseInt($('#sHead').height() - 9)); //我也不知道为什么一个相同的元素在不同页面时尺寸不一样（只能暂时先减去差值）
   
    $('#leftMenu').css('min-height', $('#leftMenu').height());
    api.openFrameGroup({
        name: 'homeFrameGroup',
        bounces: false,
        scrollEnabled: false,
        rect: {
            x: leftLw,
            y: headLh,
            w: api.winWidth - leftLw,
            h: api.winHeight - headLh
        },
        index: 0,
        preload: 0,
        frames: [{
            name: 'learning-center', //学习中心
            url: 'learning-center.html'
        }, {
            name: 'course-topnav', //在学课程
            url: 'course-topnav.html'
        }, {
            name: 'my-note', //我的笔记
            url: 'my-note.html'

        }, {
            name: 'my-answer', //我的问答
            url: 'my-answer.html'
        }, {
            name: 'my-talk', //我的讨论
            url: 'my-talk.html'
        }, {
            name: 'video-cache-f', //缓存课程
            url: 'video-cache-f.html'
        }]
    }, function (ret, err) {
        api.removeLaunchView({
            animation: {
                type: 'fade',
                duration: 500
            }
        });
        
        //是否继续下载
        var memberId = getstor('memberId');
        var downed = isEmpty($api.getStorage(memberId + 'downed')) ? '' : $api.getStorage(memberId + 'downed');
        if (downed) {
            $api.rmStorage(memberId + 'downed');
        }
        bind_push();
        //学习提醒初始化
        var notice = isEmpty($api.getStorage('is_notice')) ? 0 : $api.getStorage('is_notice');
        clearInterval(push_timer);
        if (notice == 1) {
            init_push();
        }
    });
    getCCconfig(function () {
    }, true);
    center_num();
    //上次登录时间
    get_ranking();
    api.addEventListener({
          name: 'examDateCurr'
      }, function () {
          var examDateCurr = $api.getStorage('examDateCurr', examDateCurr);
          if(examDateCurr.examinationDate == ""){
            $(".examDateCurr").html("最近考试：<span>暂无考试</span>")
          }else{
            $(".examDateCurr").html("最近考试：<span>"+examDateCurr.categorySign+"&nbsp;&nbsp;&nbsp;"+formatDate(examDateCurr.examinationDate/1000,'Y')+'/'+formatDate(examDateCurr.examinationDate/1000,'M')+'/'+formatDate(examDateCurr.examinationDate/1000,'D')+"</span>")
          }
          
      });
    //用户昵称和头像
    var nickName = get_loc_val('mine', 'nickName');
    var avatar = static_url + get_loc_val('mine', 'avatar');
    $('.nickName').html(nickName);
    //联系方式
      ajaxRequest('api/zbids/member/getmemberinfo',"get", {"token":$api.getStorage('token')}, function (ret, error) {
        if(error){
            api.toast({
                msg:error.msg,
                location:'middle'
            });
            return false;
        }
        if(ret){
          if(ret.data.mobile){
              $(".nickMessage").text(ret.data.mobile)
          }else{
              $(".nickMessage").text(ret.data.email)
          } 
        }
                       
      })
    
     saveTasksProgress.init();
}
function get_ranking() {
    var memberId = getstor('memberId');
    if(memberId == false){
        $(".ranking").html("上次登录时间：<span>1分钟前</span>");
        return false;
    }
    //上次登录时间
    // $(".ranking").html("登陆成功");
    ajaxRequest('api/zbids/member/getLoginLog',"get", {"memberid":memberId,"pageSize":1,"pageNo":1}, function (ret, error) {
        
        if(ret && ret.state == "success"){
            var loginTime = ret.data[0].loginTime/1000;
            $(".ranking").html("上次登录时间：<span>"+stringData(loginTime)+"</span>");
        }

    })
}
function stringData($_data){
    $_data = parseInt($_data);
    var $_return_string = '1分钟前';
    var $_timestamp=parseInt(new Date().getTime()/1000);
    var $_reste = $_timestamp - $_data;
    if($_reste<=0){
        $_reste = 1;
    }
    // if($_reste<60){
    //     $_return_string = $_reste+'秒前';
    // }else 
    // if($_reste>=60 && $_reste <3600){
    if($_reste <3600){
        $_return_string = Math.ceil($_reste/60)+'分钟前';
    }else if($_reste>=3600 && $_reste <(3600*24)){
        $_return_string = Math.ceil($_reste/3600)+'小时前';
    }else if($_reste>=(3600*24) && $_reste <(3600*24*30)){
        $_return_string = Math.ceil($_reste/(3600*24))+'天前';
    }else if($_reste>=(3600*24*30) && $_reste <(3600*24*30*12)){
        $_return_string = Math.ceil($_reste/(3600*24*30))+'月前';
    }else{
        $_return_string = Math.ceil($_reste/3600)+'年前';
    }
    return $_return_string;
}
function to_login() {//去登陆
    $('input').blur();
    api.closeFrameGroup({
        name: 'courseFrameGroup'
    });
    api.closeFrameGroup({
        name: 'homeFrameGroup'
    });
    api.closeFrameGroup({
        name: 'noteFrameGroup'
    });
    api.closeFrame({
        name: 'course-note'
    });
    api.closeFrame({
        name: 'course-note'
    });
    api.closeFrameGroup({
        name: 'noteFrameGroup'
    });
    api.closeFrameGroup({
        name: 'chapterFrameGroup'
    });
    api.closeFrameGroup({
        name: 'pop_message_group'
    });
    api.closeFrameGroup({
        name: 'answerVideoFrameGroup'
    });
    api.closeFrame({
        name: 'footer-editor'
    });
    api.closeFrame({
        name: 'footer-answer'
    });
    api.closeFrame({
        name: 'video-answer-detail'
    });
    api.closeFrame({
        name: 'video-answer-detail-f'
    });
    api.closeFrame({
        name: 'video-answer-edit'
    });
    // var jsfun = "if(typeof(eval('closeVideo')=='function')){closeVideo();}";
    // api.execScript({
    //     name: 'video',
    //     script: jsfun
    // });

    api.sendEvent({
        name: 'closeVideo'
    });
    //get_token();
    var password = isEmpty($api.getStorage('password')) ? '' : $.trim($api.getStorage('password'));
    var account = isEmpty($api.getStorage('account')) ? '' : $.trim($api.getStorage('account'));
    $('input[name=username]').val(account);
    $('input[name=password]').val(password);


    $('.nologin').show();
    $('.onlogin').hide();

    api.removeLaunchView({
        animation: {
            type: 'fade',
            duration: 500
        }
    });

    api.closeToWin({
        name: 'root'
    });

}


var reloginTimer = null;

function cancel_login() {
    clearInterval(reloginTimer);
}


function DoLogin(account, password) {
    set_token(function (res, errors) {
        if (res && res.state == 'success') {
            //继续登录
            var param = {};
            param.account = account;
            param.password = password;
            param.token = res.data.token;
            myajaxRequest('api/zbids/member/login/v1.0', 'post', param, function (ret1, err1) {//007.005 会员登录
                if (ret1 && ret1.state == 'success') {
                    $api.setStorage('account', account);

                    $api.setStorage('password', password);

                    $api.setStorage('token', ret1.data.token);

                    $api.setStorage('mine', ret1.data);

                    if (ret1.data.isAvatar == false) {
                        api.openWin({
                            name: 'sign-edit',
                            url: './html/sign-edit.html',
                            slidBackEnabled: false,
                            bgColor: '#fff',
                            delay: 200,
                            pageParam: {
                                nickName: ret1.data.nickName
                            }
                        });
                    }
                }
            });
        }
    });
}

function relogin(ckeck) {

    var password = isEmpty($api.getStorage('password')) ? '' : $.trim($api.getStorage('password'));
    var account = isEmpty($api.getStorage('account')) ? '' : $.trim($api.getStorage('account'));

    if (password && account) {
        if (!ckeck) {
            DoLogin(account, password);
        }
        clearInterval(reloginTimer);
        reloginTimer = setInterval(function () {
            DoLogin(account, password);
        }, 20 * 60 * 1000);
    }

}
var is_resume;

apiready = function () {

    if (api.systemType == 'ios') {
        $("#scanner").hide();
    }

    //初始话视频
    if (api.systemType == 'android') {
        if (cache_model == null) {
            cache_model = api.require('lbbVideo');
            cache_model.initDownload({"userId":getstor('memberId')});
            cache_model.init();
        }
    }
    if (api.systemType == 'ios') {
        if (cache_model == null) {
            cache_model = api.require('lbbVideo');
            cache_model.downloadCourseTabel();
            cache_model.initDownload({"userId":getstor('memberId')});
        }
    }
    
    memberId = getstor('memberId');
    var data = $api.getStorage(memberId + 'video-buffer');

    //解决老数据迁移
    if (typeof(data) != "undefined" || !isEmpty(data)) { //有下载列表
        mydata = [];
        set_data(0);
        var len = Object.keys(data).length; //  2
        function set_data(num) {
            //全部缓存列表
            read_file(memberId + data[num] + '.db', function(ret, err) {                
                if (ret) {
                    var ret_data = JSON.parse(ret.data);
                    var res = {
                        data: ret_data
                    };
                    mydata.push(res);
                    // alert(JSON.stringify(mydata))
                    if (num < len - 1) {
                        num++;
                        set_data(num);
                    } else {
                        init_data();
                    }
                }
            });
        }
        $api.rmStorage(memberId + 'video-buffer');
    }



function init_data(){
    cache_model = api.require('lbbVideo');

    $.each(mydata,function(key,value){
        var tasks_info = gets_tasks(value.data[0]);
 
        // 保存课程信息库
        if(api.systemType == "ios"){
            cache_model.inserCourseDetailJson({
                "userId" : memberId,
                "courseId" : value.data[0].courseId,
                "courseJson" : JSON.stringify(value.data)
            },function(ret,err){
             
            })
        }else{
            cache_model.inserCourseDetailJson({
                "userId" : memberId,
                "courseId" : value.data[0].courseId,
                "courseJson" :value.data
            },function(ret,err){
                
            })
        }
        
        for(var i in tasks_info){
            if(tasks_info[i].progress != 0 && tasks_info[i].taskInfo.taskType == "video"){
                if(tasks_info[i].state != 4){

                    var ccids = [];
                    ccids.push(tasks_info[i].taskInfo.videoCcid);
                    var jsfun = "rmVideo('" + JSON.stringify(ccids) + "');";
                     api.execScript({
                        name: 'root',
                        script: jsfun
                     });

                }else{
                    var downObj = {
                        userId : memberId,
                        courseId : tasks_info[i].courseId,
                        apiKey : tasks_info[i].taskInfo.apiKey,
                        videoId : tasks_info[i].taskInfo.videoCcid,
                        path : tasks_info[i].path,
                        UserId : tasks_info[i].taskInfo.videoSiteId,
                        state : tasks_info[i].state,
                        progress : tasks_info[i].progress
                    }
                  
                    cache_model.insertLastDownloadCourseState(downObj,function(ret){
                        
                    })
                }
                
                
            }
        }

    })
}

/*获取课程里所有的任务*/
function gets_tasks(courseDetail) {
        var arr = {};
        var data_arr;
        if(courseDetail.chapters){
            data_arr = courseDetail.chapters;
        }        
        var courseName = courseDetail.courseName;
        var courseId = courseDetail.courseId;
        for (var i in data_arr) {
                if (data_arr[i].isLeaf == 'false') {
                        var child = data_arr[i].children;
                        for (var j in child) {
                                if (child[j].isLeaf == 'false') {
                                        var child2 = child[j].children;
                                        for (var k in child2) {
                                                var cId = child2[k].chapterId;
                                                var cName = child2[k].chapterTitle;
                                                for (var x in child2[k].tasks) {
                                                        if (child2[k].isLeaf != 'false') {
                                                                var taskid = child2[k].tasks[x].taskId;
                                                                var progress = get_dowm(data_arr[i].chapterId, child[j].chapterId, cId);
                                                                var state = 3;
                                                                if(progress==0 ){
                                                                    state=3;
                                                                }else if(progress>=100){
                                                                    state=4;
                                                                }else if(progress>0 &&  progress<100){
                                                                    state=2;
                                                                }
                                                                var obj_data = {
                                                                        courseId: courseId,
                                                                        courseName: courseName,
                                                                        chapterId: cId,
                                                                        chapterName: cName,
                                                                        progress : progress,
                                                                        state : state,
                                                                        taskInfo: child2[k].tasks[x],
                                                                        path : courseId+"//"+data_arr[i].chapterId+"//"+child[j].chapterId+"//"+cId+"//"+child2[k].tasks[x].videoCcid
                                                                };

                                                                arr[taskid] = obj_data;
                                                        }
                                                }
                                        }
                                } else {
                                        var cId = child[j].chapterId;
                                        var cName = child[j].chapterTitle;
                                        for (var k in child[j].tasks) {
                                                var taskid = child[j].tasks[k].taskId;
                                                var progress = get_dowm(data_arr[i].chapterId, cId, "");
                                                var state = 3;
                                                if(progress==0 ){
                                                    state=3;
                                                }else if(progress>=100){
                                                    state=4;
                                                }else if(progress>0 &&  progress<100){
                                                    state=2;
                                                }
                                                var obj_data = {
                                                        courseId: courseId,
                                                        courseName: courseName,
                                                        chapterId: cId,
                                                        chapterName: cName,
                                                        progress : progress,
                                                        state : state,
                                                        taskInfo: child[j].tasks[k],
                                                        path : courseId+"//"+data_arr[i].chapterId+"//"+cId+"//"+child[j].tasks[k].videoCcid
                                                };
                                                arr[taskid] = obj_data;
                                        }
                                }
                        }
                } else {
                        var cId = data_arr[i].chapterId;
                        var cName = data_arr[i].chapterTitle;
                        for (var k in data_arr[i].tasks) {
                                var taskid = data_arr[i].tasks[k].taskId;
                                var progress = get_dowm(cId, "", "");
                                var state = 3;
                                if(progress==0 ){
                                    state=3;
                                }else if(progress>=100){
                                    state=4;
                                }else if(progress>0 &&  progress<100){
                                    state=2;
                                }
                                var obj_data = {
                                        courseId: courseId,
                                        courseName: courseName,
                                        chapterId: cId,
                                        chapterName: cName,
                                        progress : progress,
                                        state : state,
                                        taskInfo: data_arr[i].tasks[k],
                                        path : courseId+"//"+cId+"//"+data_arr[i].tasks[k].videoCcid
                                };
                                arr[taskid] = obj_data;
                        }
                }
        }
        return arr;
}



    saveTasksProgress.init();
    api.setScreenOrientation({
        orientation: 'auto_landscape'
    });

    is_resume = false;
    
    api.addEventListener({
        name: 'pause'
    }, function (ret, err) {
        saveTasksProgress.init();
        is_resume = true;
        var memberId = getstor('memberId');
        if (memberId && api.systemType == 'ios') {
            // cache_model.downloadStop({
            //     "userId":getstor('memberId')
            // })
            // var downed = isEmpty($api.getStorage(memberId + 'downed')) ? '' : $api.getStorage(memberId + 'downed');
            // if (downed) {
            //     $api.setStorage(memberId + 'backendDowned', downed);
            //     $api.rmStorage(memberId + 'downed');
            //     var chapterIdA = downed['chapterIdA'];
            //     var chapterIdB = downed['chapterIdB'];
            //     var chapterIdC = downed['chapterIdC'];
            //     if (cache_model == null) {
            //         cache_model = api.require('lbbVideo');
            //     }
            //     cache_model.downloadStop({"userId":getstor('memberId')},function (ret, err) {

            //         set_down({type: 1, chapterida: chapterIdA, chapteridb: chapterIdB, chapteridc: chapterIdC});
            //         api.sendEvent({
            //             name: 'flush_cache'
            //         });
            //     });
            // }
        }
    });

    api.setKeepScreenOn({
        keepOn: true
    });
    
    api.addEventListener({
        name: 'resume'
    }, function (ret, err) {
        saveTasksProgress.init();
        if (is_resume) {
            var jsfun = "relogin();";
            api.execScript({
                name: 'root',
                script: jsfun
            });
        }
        if (api.systemType == 'ios') {
            // cachemodel = api.require('lbbVideo');
            // cachemodel.init();
        }
        if (api.systemType == 'ios') {
            // cachemodel = api.require('lbbVideo');
            // cachemodel.init();
            // var memberId = getstor('memberId');
            // if (memberId && api.systemType == 'ios') {
            //     var downed = isEmpty($api.getStorage(memberId + 'backendDowned')) ? '' : $api.getStorage(memberId + 'backendDowned');
            //     if (downed) {
            //         $api.rmStorage(memberId + 'backendDowned');
            //         downed['type'] = 2;
            //         mydown(downed);
            //     }
            // }
        }
    });
    var memberId = getstor('memberId');
    if (memberId) {
        var downed = isEmpty($api.getStorage(memberId + 'downed')) ? '' : $api.getStorage(memberId + 'downed');
        if (downed) {
            $api.rmStorage(memberId + 'downed');
            var chapterIdA = downed['chapterIdA'];
            var chapterIdB = downed['chapterIdB'];
            var chapterIdC = downed['chapterIdC'];
            if (cache_model == null) {
                cache_model = api.require('lbbVideo');
            }
            cache_model.downloadStop({"userId":getstor('memberId')},function (ret, err) {

                set_down({type: '1', chapterida: chapterIdA, chapteridb: chapterIdB, chapteridc: chapterIdC});
                api.sendEvent({
                    name: 'flush_cache'
                });
            });
        }
    }
    //获取设备型号-兼容UI使用
    window.localStorage.systemType = api.systemType + parseInt(api.systemVersion);
    api.setStatusBarStyle({
        style: 'dark'
    });
    //网络断开监听  网络已断开
    api.addEventListener({
        name: 'offline'
    }, function (ret, err) {
        window.shut_network = true;
        window.allow_down = false;

        var memberId = getstor('memberId');
        var downed = $api.getStorage(memberId + 'downed');
        if (downed) {
            $api.rmStorage(memberId + 'downed');
            var chapterIdA = downed['chapterIdA'];
            var chapterIdB = downed['chapterIdB'];
            var chapterIdC = downed['chapterIdC'];
            if (cache_model == null) {
                cache_model = api.require('lbbVideo');
            }
            if (api.connectionType == 'unknown' || api.connectionType == 'none') {
                cache_model.downloadStop({"userId":getstor('memberId')},function (ret, err) {

                    set_down({
                        type: 'shut_network',
                        chapterida: chapterIdA,
                        chapteridb: chapterIdB,
                        chapteridc: chapterIdC
                    });
                    api.sendEvent({
                        name: 'flush_cache'
                    });
                });
            } else if (api.connectionType == '2g' || api.connectionType == '3g' || api.connectionType == '4g' || api.connectionType == '2G' || api.connectionType == '3G' || api.connectionType == '4G') {
                window.shut_network = false;
                cache_model.downloadStop({"userId":getstor('memberId')},function (ret, err) {

                    set_down({
                        type: 'not_wifi',
                        chapterida: chapterIdA,
                        chapteridb: chapterIdB,
                        chapteridc: chapterIdC
                    });
                    api.sendEvent({
                        name: 'flush_cache'
                    });
                });
            }
        }
    });
    //网络类型判断
    api.addEventListener({
        name: 'online'
    }, function (ret, err) {
            saveTasksProgress.init();
        
        window.shut_network = false;
        var connectionType = ret.connectionType;
        if (connectionType == 'wifi') {
            window.allow_down = true;
        } else {
            window.allow_down = false;
            var memberId = getstor('memberId');
            var downed = $api.getStorage(memberId + 'downed');
            if (downed) {
                var chapterIdA = downed['chapterIdA'];
                var chapterIdB = downed['chapterIdB'];
                var chapterIdC = downed['chapterIdC'];
                $api.rmStorage(memberId + 'downed');
                if (cache_model == null) {
                    cache_model = api.require('lbbVideo');
                }
                cache_model.downloadStop({"userId":getstor('memberId')},function (ret, err) {

                    set_down({
                        type: 'not_wifi',
                        chapterida: chapterIdA,
                        chapteridb: chapterIdB,
                        chapteridc: chapterIdC
                    });
                    api.sendEvent({
                        name: 'flush_cache'
                    });
                });
            }
        }
    });
    //取消删除样式
    api.addEventListener({
        name: 'cancle_del'
    }, function () {
        $('.cache').children('li').addClass('none');
        $('.cache').children().eq(2).removeClass('none');
        checkremove(2);
    });
    
    //修改资料
    api.addEventListener({
        name: 'modify'
    }, function (ret) {
        var headimg = get_loc_val('mine', 'avatar');
        if (headimg) {
            headimg = static_url + headimg + '?s=' + Math.random();
            $('.avatar').attr('src', headimg);
        }
    });
    if (!isEmpty(api.pageParam.to_ucenter)) {
        to_ucenter();
    }
    init(function (ret) {
        
        if (ret) {//已经有登录状态
            $api.setStorage('mine', ret);
            if (isEmpty(ret.isAvatar)) {
                api.removeLaunchView({
                    animation: {
                        type: 'fade',
                        duration: 500
                    }
                });
                api.openWin({
                    name: 'sign-edit',
                    url: 'sign-edit.html',
                    slidBackEnabled: false,
                    bgColor: '#fff',
                    delay: 200
                });
            } else {
                to_ucenter();
            }
        } else {
            var outh = isEmpty($api.getStorage('outh')) ? '' : $api.getStorage('outh');
            if (outh) {
                $api.rmStorage('password');
                set_token(function (res, errors) {
                    if (res && res.state == 'success') {
                        //继续登录
                        outh['token'] = res.data.token;
                        $api.setStorage('token', res.data.token);
                        ajaxRequest('api/v2.1/oauthLogin', 'post', outh, function (ret, err) {//007.003 auth登录
                            api.removeLaunchView({
                                animation: {
                                    type: 'fade',
                                    duration: 500
                                }
                            });

                            if (ret && ret.state == 'success') {
                                $api.setStorage('token', ret.data.token);
                                $api.setStorage('mine', ret.data);
                                $api.setStorage('outh', {
                                    'societyType': outh.societyType,
                                    'societyId': outh.societyId
                                });
                                if (ret.data.isAvatar == false) {
                                    api.openWin({
                                        name: 'sign-edit',
                                        url: 'sign-edit.html',
                                        slidBackEnabled: false,
                                        bgColor: '#fff',
                                        delay: 200,
                                        pageParam: {
                                            nickName: ret.data.nickName
                                        }
                                    });
                                    return false;
                                } else {
                                    to_ucenter();
                                    return false;
                                }
                            } else if (ret.state == 'error') {
                                if (ret.msg == '1001') {
                                    $api.setStorage('outh', {
                                        'societyType': outh.societyType,
                                        'societyId': outh.societyId
                                    });
                                    to_bind();
                                    return false;
                                }
                            }
                        });
                    }
                });
            }
            var password = isEmpty($api.getStorage('password')) ? '' : $.trim($api.getStorage('password'));
            var account = isEmpty($api.getStorage('account')) ? '' : $.trim($api.getStorage('account'));
            if (password && account) {//如果记住了帐号和密码
                set_token(function (res, errors) {
                    if (res && res.state == 'success') {
                        //继续登录
                        var param = {};
                        param.account = account;
                        param.password = password;
                        param.token = res.data.token;
                        ajaxRequest('api/zbids/member/login/v1.0', 'post', param, function (ret, err) {//007.005 会员登录
                            if (ret.state == 'success') {
                                $api.setStorage('account', account);

                                $api.setStorage('password', password);

                                $api.setStorage('token', ret.data.token);
                                $api.setStorage('mine', ret.data);
                                if (ret.data.isAvatar == false) {
                                    api.removeLaunchView({
                                        animation: {
                                            type: 'fade',
                                            duration: 500
                                        }
                                    });
                                    api.openWin({
                                        name: 'sign-edit',
                                        url: 'sign-edit.html',
                                        slidBackEnabled: false,
                                        bgColor: '#fff',
                                        delay: 200,
                                        pageParam: {
                                            nickName: ret.data.nickName
                                        }
                                    });
                                    return false;
                                } else {
                                    to_ucenter();
                                    return false;
                                }
                            }
                        });
                    }
                });
            }
            $('input[name=username]').val(account);
            $('input[name=password]').val(password);
            var appBundle;
            if (api.systemType == 'ios') {
                var obj = api.require('qq');
                obj.installed(function (ret, err) {
                    if (!ret.status) {
                        $('.login_qq').remove();
                    }
                });
                appBundle = 'wechat://';
                app_installed(appBundle, function (ret) {
                    if (!ret) {
                        $('.login_wx').remove();
                    }
                });
                appBundle = "sinaweibo://";
                app_installed(appBundle, function (ret) {
                    if (!ret) {
                        $('.login_wb').remove();
                    }
                });
            }
            to_login();
        }
    });
    api.addEventListener({
        name: 'close_sort'
    }, function (ret) {
        if (ret && ret.value) {
            var typ = ret.value.typ;
            if (typ == 1) {
                return false;
            }
            var sort_name = ret.value.sort_name;
            $('.left').find('span').html(sort_name);
        }
    });
    api.addEventListener({
        name: 'to_login'
    }, function (ret, err) {
        to_login();
    });
    api.addEventListener({
        name: 'to_ucenter'
    }, function (ret, err) {
        to_ucenter();
    });
    api.addEventListener({
        name: 'keyback'
    }, function (ret, err) {
        clearTimeout(timePicker);
        //coding... auth:yx
        if (clickCount != 2) {
            api.toast({
                msg: '再按一次返回系统桌面'
            }, 'middle');
            clickCount++;
            timePicker = setTimeout(function () {
                clickCount = 1;
            }, 1000);
        } else {
            clickCount = 1;
            api.toLauncher();
        }
    });
    api.addEventListener({
        name: 'center_num'
    }, function (ret) {
        var num = $api.getStorage('center_num');
        if (num < 1) {
            $('.center_num1').addClass('none');
            $('.center_num2').addClass('none');
        } else if (num > 99) {
            $('.center_num1').html('99+');
            $('.center_num2').html('99+');
        } else {
            $('.center_num1').html(num);
            $('.center_num2').html(num);
        }
    });
    api.addEventListener({
        name: 'load_more_mn'
    }, function (ret) {
        var keywords = $('input[name=input-lx]').val();
        api.sendEvent({
            name: 'key_word_mn',
            extra: {
                key: keywords,
                searchType: searchType,
                typ: ret.value.key
            }
        });
    });
    api.addEventListener({
        name: 'load_more_ma'
    }, function (ret) {
        var keywords = $('input[name=input-lx]').val();
        api.sendEvent({
            name: 'key_word_ma',
            extra: {
                key: keywords,
                searchType: searchType,
                typ: ret.value.key
            }
        });
    });
    api.addEventListener({
        name: 'set_learning'
    }, function (ret) {
        api.closeFrameGroup({
            name: 'courseFrameGroup'
        });
        set_index(1);
    });
    api.addEventListener({
        name : 'flush_index'
    }, function(ret) {
        get_ranking();
    });
};
function talk_sort() {
    api.openFrame({
        name: 'talk-sort',
        url: 'talk-sort.html',
        bgColor: 'rgba(0,0,0,0)',
        rect: {
            x: leftLw,
            y: headLh,
            w: api.winWidth - leftLw,
            h: api.winHeight - headLh
        },
        pageParam: {
            typ: 2
        },
        bounces: false,
        delay: 200,
        reload: false
    });
}
//编辑头像
function modify() {
    api.openWin({
        name: 'modify',
        url: 'modify.html',
        delay: 200
    });
}

function set_index(a) {
    if(a != 0){
        if(a == 1){
            $("#header.header").css({"height":"0.5rem","border-bottom":"none","background":"#f5f5f5"});
        }else{
            $("#header.header").css({"height":"1.25rem","border-bottom":"1px solid #bbb"});
        }
    }else{
        $("#header.header").css({"height":"2.34rem","border-bottom":"1px solid #bbb","background":"#f5f5f5"});
    }
    if (a == 5) {
        api.sendEvent({
            name: 'flush_cache'
        });
        api.sendEvent({
            name: 'init_cache'
        });
        $api.setStorage("video-cacheTime",true);
    }else{
        $api.setStorage("video-cacheTime",false);
    }
    hideSearchBar();
    $('#header').attr('head', a);
    $('#slider li').removeClass().eq(a).addClass('active');

    api.closeFrame({name: 'set-info'});
    api.closeFrame({name: 'my-note-detail'});
    api.closeFrame({name: 'my-note-detail-f'});
    api.closeFrame({name: 'my-answer-detail'});
    api.closeFrame({name: 'my-answer-detail-f'});
    api.closeFrame({name: 'my-talk-detail'});
    api.closeFrame({name: 'my-talk-detail-f'});
    api.closeFrame({name: 'tasks-cache'});
    api.closeFrame({name: 'tasks-cache-f'});
    var header = $api.byId('header');
    $api.fixIos7Bar(header);
    window.localStorage.caicui_headLh = headLh = $api.offset(header).h;
    window.localStorage.caicui_headSh = headSh = parseInt($('#sHead').height() - 0 + headLh);
    window.localStorage.caicui_leftLw = leftLw = $('#slider').width();
    api.setFrameGroupAttr({
        name: 'homeFrameGroup',
        hidden: false,
        rect: {
                x: leftLw,
                y: headLh,
                w: api.winWidth - leftLw,
                h: "auto"
            }
    });

    api.setFrameGroupIndex({
        name: 'homeFrameGroup',
        index: a
    });

    api.sendEvent({
        name: 'closeFrameAll'
    });

    api.sendEvent({
        name: 'hashomepage',
        extra: {
            sethomepage: a
        }
    });
    if (a == 1) {
 
        api.openFrameGroup({
            name: 'courseFrameGroup',
            rect: {
                x: leftLw,
                y: headSh,
                w: api.winWidth - leftLw,
                h: api.winHeight - headSh
            },
            index: 0,
            preload: 3,
            frames: [{//在学
                name: 'course-learning',
                url: 'course-learning.html'
            }, {//未激活
                name: 'course-noactive',
                url: 'course-noactive.html'
            }, {//已过期
                name: 'course-overdue',
                url: 'course-overdue.html'
            }]
        }, function (ret) {
            api.sendEvent({
                name: 'hascoursenav',
                extra: {
                    setnav: ret.index
                }
            });
        });
    } else {
        api.setFrameGroupAttr({
            name: 'courseFrameGroup',
            hidden: true
        });
    }
}

/*
 //主页新建笔记
 function newMyNote(){
 var par = api.pageParam;
 par.test = 'notes';
 api.openFrame({
 name: 'note-chapter-list',
 url: 'note-chapter-list.html',
 bgColor: '#ffffff',
 rect: {
 x: leftLw,
 y: 0,
 w: api.winWidth - leftLw,
 h: headLh
 },
 pageParam: par,
 bounces: false
 });
 api.setFrameGroupAttr({
 name : 'homeFrameGroup',
 hidden : true
 });
 }
 */
function checkDownlond(e) {
      api.sendEvent({
          name: 'openachapt',
          extra: {sethomepage: e}
      });
  }
  function showSet() {
      checkDownlond(1);
      $('.right li').removeClass('none');
      $(this).addClass('none');
  }
  //取消
  function setAll1() {
      checkDownlond(2);
      $('.right li').addClass('none');
      $('.right li').eq(0).removeClass('none');
  }
  //全选
  function setAll2() {
      checkDownlond(3);
  }

//中心消息数量
function center_num() {
    
        var param = {};
        // param.typeId = '';
        param.pageNo = 1;
        param.type = 1;
        param.isRead = 0;
        param.pageSize = 1;
        param.token = $api.getStorage('token');
        ajaxRequest('api/study/message/list/v1.0', 'get', param, function (ret, err) {
            if (err) {
                api.toast({
                    msg: err.msg,
                    location: 'middle'
                });
                return false;
            }
            if (ret && ret.state == 'success') {
                var num = isEmpty(ret.totalCount) ? '0' : ret.totalCount;
                if (num < 1) {
                    $('.center_num1').addClass('none');
                    $('.center_num2').addClass('none');
                } else if (num > 99) {
                    $('.center_num1').html('99+');
                    $('.center_num2').html('99+');
                } else {
                    $('.center_num1').html(num);
                    $('.center_num2').html(num);
                }
                $api.setStorage('center_num', num);
            } else {
                $('.center_num1').addClass('none');
                $('.center_num2').addClass('none');
                //api.toast({
                //	msg : ret.msg,
                //	location : 'middle'
                //});
            }
        });
    
}



var courseId,course_detail,tasks;
    var code;
    function openScanner(){
        api.removeEventListener({
            name: 'pause'
        });
        
        api.removeEventListener({
            name: 'resume'
        });
        var FNScanner = api.require('FNScanner');
        FNScanner.openScanner({
            autorotation: true
        }, function(ret, err) {
            if(ret && ret.eventType == 'success'){
                //扫码成功
                
                if(ret.content.indexOf("?code=")==-1){
                    openApp(ret.content);
                    return false;
                }

                code = ret.content.split("=")[1];
                if(isEmpty(code)){
                    api.toast({
                        msg: "二维码定位信息有误，请核对后再试！！",
                        location: 'middle'
                    });
                    return false;
                }
                
                //获取二维码详细信息
                getScannerInfo()

            }else if(ret.eventType == 'fail'){
                //扫码失败
                api.toast({
                    msg: '扫码失败，请重新尝试！',
                    location: 'middle'
                });

            }
            
        });
    }
    function getScannerInfo(){
        //调接口
       
                
        ajaxRequest('api/teachsource/course/handoutqrcodeinfo', 'get', {
            qrCodeNo:code
        }, function (ret, err) {
            
            if (err) {
                  api.hideProgress();
                  api.toast({
                      msg: err.msg,
                      location: 'middle'
                  });
                  return false;
              }
              if(ret && ret.state == 'success'){
                if(ret.data.length<1){
                    api.toast({
                        msg: "二维码定位信息有误，请核对后再试！",
                        location: 'middle'
                    });
                    return false;
                }
                var data = ret.data[0];
                courseId = data.courseId;
                if (!CourseIsexpire(courseId)) {
                    api.toast({
                        msg: '二维码无法使用，请检查您的在学课程',
                        location: 'middle'
                    });
                    return false;
                }
                if(isEmpty(data.qrCodeTaskList[0])){
                      api.toast({
                          msg: "二维码定位信息有误，请核对后再试！",
                          location: 'middle'
                      });
                      return false;
                }
                api.showProgress({
                  title:'加载中',
                  modal:false
                });
                ajaxRequest('api/teachsource/course/courseDetail', 'get', {
                      courseId: courseId
                  }, function (ret, err) {//004.006获取课程的详细信息

                      // console.log(JSON.stringify(ret))
                      
                      if (err) {
                          api.hideProgress();
                          api.toast({
                              msg: err.msg,
                              location: 'middle'
                          });
                          return false;
                      }
                      if (ret && ret.state == 'success') {
                          if (!ret.data) {
                            api.hideProgress();
                              api.toast({
                                  msg: '暂无任务',
                                  location: 'middle'
                              });
                              return false;
                          }

                          course_detail = ret.data[0];
                          tasks = gets_tasks(course_detail,data.qrCodeTaskList[0].taskId);

                          if (isEmpty(tasks)) {
                              api.hideProgress();
                              api.toast({
                                  msg: '暂无任务',
                                  location: 'middle'
                              });
                              return false;
                          }
                          
                          var theTime = translateSec(data.qrCodeTaskList[0].position);
                          if(tasks.taskType == 'knowledgePointExercise'){
                              judge_task(tasks, theTime,tasks.knowledgePointId);
                          }else{
                              judge_task(tasks, theTime);

                          }
                          
                      }else{
                          api.hideProgress();
                          api.toast({
                              msg: '加载失败，请重新尝试！',
                              location: 'middle'
                          });
                          return false;
                      }
                  });
              }else{
                  getScannerInfo();
              }
            
        })
    }
    function translateSec(value){
        var timeArr = $.trim(value).split(":");
        var theTime = 0;
        if(timeArr.length == 3){
            theTime += parseInt(timeArr[2]);
            theTime += parseInt(timeArr[1])*60;
            theTime += parseInt(timeArr[0])*60*60;
        }else if(timeArr.length == 2){
            theTime += parseInt(timeArr[1]);
            theTime += parseInt(timeArr[0])*60;
        }else{
            theTime += parseInt(timeArr[0]);
        }
        return theTime;
    }

    function judge_task(task_info, lastProgress,knowledgePointId) {
        
          if (isEmpty(course_detail) || isEmpty(course_detail.chapters) || isEmpty(task_info)) {
              api.toast({
                  msg: '获取课程信息失败',
                  location: 'middle'
              });
              return false;
          }
          if (isEmpty(task_info)) {
              api.toast({
                  msg: '暂无任务',
                  location: 'middle'
              });
              return false;
          }
          //判断当前任务类型
          if (task_info.taskType == 'video' || task_info.taskType == 'openCourse') {
              //视频类型
              var new_win_name = 'video';
              var new_win_url = 'video.html';
          } else if (task_info.taskType == 'entry' || task_info.taskType == 'pdfread' || task_info.taskType == 'exam' || task_info.taskType == 'knowledgePointExercise') {
              //entry（外链类型）、pdfread（pdf类型）、exam（测试题类型）
              var new_win_name = 'course-test';
              var new_win_url = 'course-test.html';

          } else {
              api.toast({
                  msg: '暂无任务，请稍后再试或联系客服',
                  location: 'middle'
              });
              return false;
          }
          
          //需要传递的参数
          var pageParams = {
              from: 'course-studying',
              courseId: course_detail.courseId,//课程id
              //study_progress: res_process,//学习进度
              last_progress: lastProgress,//学习进度
              course_detail: course_detail,//课程详情
              task_info: task_info,//当前要学习的任务信息
              type: 'task'
          };
      
          

          if(task_info.taskType == 'knowledgePointExercise'){
              if (api.connectionType == 'unknown' || api.connectionType == 'none') {

                  api.alert({
                      msg: '网络已断开，请检查网络状态'
                  });
                  return false;
              }
              api.setScreenOrientation({
                  orientation: 'landscape_right'
              });
              
              ajaxRequest('api/extendapi/examen/get_exercise_point_count_cache', 'post',{knowledge_points:knowledgePointId,type:4}, function (ret, err) {//008.005
                  if (err) {
                      api.toast({
                          msg: err.msg,
                          location: 'middle'
                      });
                  }
                  if (ret && ret.state == 'success') {
                      pageParams.knowledgePointExercise = ret.data[0];
                      //跳转到知识点练习页面
                      api.openWin({
                          name: new_win_name,
                          url: new_win_url,
                          delay: 200,
                          slidBackEnabled: false,//iOS7.0及以上系统中，禁止通过左右滑动返回上一个页面
                          pageParam: pageParams
                      });
                      
                  } else {
                      /*api.toast({
                          msg: ret.msg,
                          location: 'middle'
                      });*/
                  }
              });
              return false;
          }

          api.hideProgress();

          api.setScreenOrientation({
              orientation: 'landscape_right'
          });

          //跳转到播放页面
          api.openWin({
              name: new_win_name,
              url: new_win_url,
              delay: 200,
              slidBackEnabled: false,//iOS7.0及以上系统中，禁止通过左右滑动返回上一个页面
              pageParam: pageParams
          });
      }
      /*获取课程里所有的任务*/
function gets_tasks(courseDetail,taskId) {
        var arr = {};
        var data_arr;
        if(courseDetail.chapters){
            data_arr = courseDetail.chapters;
        }        
        var courseName = courseDetail.courseName;
        var courseId = courseDetail.courseId;
        for (var i in data_arr) {
                if (data_arr[i].isLeaf == 'false') {
                        var child = data_arr[i].children;
                        for (var j in child) {
                                if (child[j].isLeaf == 'false') {
                                        var child2 = child[j].children;
                                        for (var k in child2) {
                                                var cId = child2[k].chapterId;
                                                var cName = child2[k].chapterTitle;
                                                for (var x in child2[k].tasks) {
                                                        if (child2[k].isLeaf != 'false') {
                                                                var taskid = child2[k].tasks[x].taskId;
                                                                if(taskId == taskid){
                                                                    if(child2[k].tasks[x].taskType == 'knowledgePointExercise'){
                                                                      child2[k].tasks[x].knowledgePointId = child2[k].knowledgePointId
                                                                    }
                                                                    return child2[k].tasks[x];
                                                                }
                                                        }
                                                }
                                        }
                                } else {
                                        var cId = child[j].chapterId;
                                        var cName = child[j].chapterTitle;
                                        for (var k in child[j].tasks) {
                                                var taskid = child[j].tasks[k].taskId;
                                                if(taskId == taskid){
                                                    if(child[j].tasks[k].taskType == 'knowledgePointExercise'){
                                                      child[j].tasks[k].knowledgePointId = child[j].knowledgePointId
                                                    }
                                                    return child[j].tasks[k];
                                                }
                                        }
                                }
                        }
                } else {
                        var cId = data_arr[i].chapterId;
                        var cName = data_arr[i].chapterTitle;
                        for (var k in data_arr[i].tasks) {
                                var taskid = data_arr[i].tasks[k].taskId;
                                if(taskId == taskid){
                                    if(data_arr[i].tasks[k].taskType == 'knowledgePointExercise'){
                                      data_arr[i].tasks[k].knowledgePointId = data_arr[i].knowledgePointId
                                    }
                                    return data_arr[i].tasks[k];
                                }
                        }
                }
        }
}


function openApp(url) {
    if(isEmpty(url)){
      return false;
    }
    if (api.systemType == 'android') {
            api.openApp({
              androidPkg : 'android.intent.action.VIEW',
              mimeType : 'text/html',
              uri : url
          }, function(ret, err) {
              
          });
        } else if(api.systemType == 'ios') {
            api.openApp({
              iosUrl :url 
          }, function(ret, err) {
              
          });
        }       
}

