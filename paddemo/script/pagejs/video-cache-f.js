var getStatusTime = null;
var videoDownInfo =new Object(); //缓存每个节点的下载状态，一个节点一个id
var videochangelist = $api.getStorage("videochangelist") ? $api.getStorage("videochangelist") : "";; //记录每次定时器和数据库同步数据后发生改变的dom节点id
var couselist = ""; //记录缓存包括的课程id
var lastgettime = 1388509261;//记录每次获取数据库的时间点，下次获取就只获取该时间点之后变化的记录(第一次获取可以获取2014年1月1日1时1分1秒//)


function init_check(){
    $('.cache-list .icon-check').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active').parents('.cache-course').find('.courseid').removeClass('active');
            $(this).parents('.mycaptA').find('.chaptera').removeClass('active');
            $(this).parents('.mycaptB').find('.chapterb').removeClass('active');
            if($(this).hasClass('courseid')){//如果是顶级
                $(this).parents('.cache-course').find('.icon-check').removeClass('active');
            }else if($(this).hasClass('chaptera')){//如果是二级
                $(this).parents('.mycaptA').find('.icon-check').removeClass('active');
            }else if($(this).hasClass('chapterb')){//如果是三级
                $(this).parents('.mycaptB').find('.icon-check').removeClass('active');
            }
        }else{
            $(this).addClass('active');
            if($(this).hasClass('courseid')) {//如果是顶级
                $(this).parents('.cache-course').find('.icon-check').addClass('active');
            }else if($(this).hasClass('chaptera')){//如果是二级
                $(this).parents('.mycaptA').find('.icon-check').addClass('active');
                var _s = $(this).parents('.cache-course').find('.mycaptA').not('.none');
                var _a = _s.length;
                var _b = _s.children('dl').find('.active').length;
                //console.log(_a + ' ====== ' + _b);
                if(_a == _b){
                    $(this).parents('.cache-course').find('.courseid').addClass('active');
                }
            }else if($(this).hasClass('chapterb')){//如果是三级
                $(this).parents('.mycaptB').find('.icon-check').addClass('active');
                var _s = $(this).parents('.mycaptA').find('.mycaptB').not('.none');
                var _a = _s.length;
                var _b = _s.children('dl').find('.active').length;
                //console.log(_a + ' ====== ' + _b);
                if(_a == _b){
                    $(this).parents('.mycaptA').find('.chaptera').addClass('active');
                }
                var _x = $(this).parents('.cache-course').find('.mycaptA').not('.none');
                var _y = _x.length;
                var _z = _x.children('dl').find('.active').length;
                //console.log(_y + ' ++++++ ' + _z);
                if(_y == _z){
                    $(this).parents('.cache-course').find('.courseid').addClass('active');
                }
            }else if($(this).hasClass('chapterc')){//如果是四级
                var _s = $(this).parents('.mycaptB').find('.mycaptC').not('.none');
                var _a = _s.length;
                var _b = _s.children('dl').find('.active').length;
                //console.log(_a + ' ====== ' + _b);
                if(_a == _b){
                    $(this).parents('.mycaptB').find('.icon-check').addClass('active');
                }
                var _l = $(this).parents('.mycaptA').find('.mycaptB').not('.none');
                var _m = _l.length;
                var _n = _l.children('dl').find('.active').length;
                //console.log(_m + ' ------ ' + _n);
                if(_m == _n){
                    $(this).parents('.mycaptA').find('.chaptera').addClass('active');
                }
                var _x = $(this).parents('.cache-course').find('.mycaptA').not('.none');
                var _y = _x.length;
                var _z = _x.children('dl').find('.active').length;
                //console.log(_y + ' ++++++ ' + _z);
                if(_y == _z){
                    $(this).parents('.cache-course').find('.courseid').addClass('active');
                }
            }
        }
    });
    $(".tasksCache").on("click",function(e){
        if(e.target && e.target.nodeName == "I"){
            return false;
        }
        clearInterval(getStatusTime);
        var to_cacheHeight = 0;
        var to_cacheState =false;
        var chapterId = $(this).attr("data-chapId");
        var courseId = $(this).find(".down-progress").attr("courseid");
        if(api.pageParam.courseId){
            to_cacheHeight =84;
            to_cacheState = true;
        }
        if(api.systemType != "ios" && api.pageParam.courseId){
            to_cacheHeight = 55;
        }
        api.openFrame({
              delay:200,
              name : "tasks-cache",
              url : 'tasks-cache.html',
              reload: true,
              opaque: true,
              vScrollBarEnabled: false,
              bgColor: '#fff',
              rect: {
                  x: leftLw,
                  y: to_cacheHeight,
                  w: api.winWidth - leftLw,
                  h: api.winWidth
                },
              pageParam:{chapterId:chapterId,courseId:courseId,to_cacheState:to_cacheState},
              bounces: false
          });
        
        
    })
}
//统计每个章节的各种任务个数，参数num1表示一级章节，参数num2表示二级章节
function countTaskType(course_detail, num1, num2) {
    var tmp_chapters = course_detail.chapters[num1].children[num2].tasks;
    //得到子章节的任务信息
    var tmp_num = {
        'video' : 0,
        'exam' : 0,
        'doc' : 0,
        'Aa' : 0
    };
    for (var i in tmp_chapters) {
        var tmp_tasks = tmp_chapters[i];
        if (tmp_tasks.taskType == 'video') {
            tmp_num.video++;
        } else if (tmp_tasks.taskType == 'exam') {
            tmp_num.exam++;
        } else if (tmp_tasks.taskType == 'pdfread') {
            tmp_num.doc++;
        } else if (tmp_tasks.taskType == 'entry') {
            tmp_num.Aa++;
        }
    }
    var tmp_html = '';
    if (tmp_num.video > 0) {
        tmp_html += '<li><i class="icon-play"></i><span class="multiples">' + tmp_num.video + '</span></li>';
    }
    if (tmp_num.exam > 0) {
        tmp_html += '<li><i class="icon-edit2"></i><span class="multiples">' + tmp_num.exam + '</span></li>';
    }
    if (tmp_num.doc > 0) {
        tmp_html += '<li><i class="icon-word-card"></i><span class="multiples">' + tmp_num.doc + '</span></li>';
    }
    return tmp_html;
}

function get_percent() {
    //总进度计算
    $.each($('.cache-course'), function(k, v) {
        var total = $(v).find('.val').not('.none');
        var len = total.size();
        var num = 0;
        $.each(total, function(key, val) {
            var n = Number($.trim($(val).html()));
            if (!isEmpty(n)) {
                num = accAdd(num, n);
            }
        });
        var percent = num/len;
        percent = parseInt(percent.toFixed(2)) == 'NaN' || parseInt(percent.toFixed(2)) == NaN ? 0 : parseInt(percent.toFixed(2));
        if(percent > 0){
            if(percent>=100){
                percent=100;
            }
            $(v).find('.progress-val').text(percent + '%');
            $(v).find('.progress-bar').width(percent + '%');
            $('.progress-box2').show();
        }
    });
}
function init_data() {
    var tpl = $('#tpl').html();
    var content = doT.template(tpl)(mydata);
    $('body').removeClass('null');
    $('#content').html('');
    $('#content').html(content); 
    get_percent();
    circleProgress();
    init_check();
    api.parseTapmode();
    if(api.pageParam.courseId){
        $(".cache-list dl,.cache-list dl.haschild").css({"padding-left":"0.3rem"});
    }
    //圆形进度条绘制
    $.each($('.down-progress'), function(k, v) {
        var num = parseInt($(v).find('.val').html());
        if (!isEmpty(num)) {
            var percent = num / 100, perimeter = Math.PI * 0.9 * $('#svgDown').width();
            $(v).find('circle').eq(1).css('stroke-dasharray', parseInt(perimeter * percent) + " " + parseInt(perimeter * (1 - percent)));
        }
    });
    //初始化下载状态
    var downed = $api.getStorage(memberId+'downed');
    if (downed) {
        var chapterIdA = get_loc_val(memberId + 'downed', 'chapterIdA'),chapterIdB = get_loc_val(memberId + 'downed', 'chapterIdB'),chapterIdC = get_loc_val(memberId + 'downed', 'chapterIdC'), progress = get_loc_val(memberId + 'downed', 'progress');
        var id='';
        //一级章节下载记录
        if(!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)){
            id=chapterIdA;
        }
        //二级章节下载记录
        if(!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)){
            id=chapterIdB;
        }
        //三级章节下载记录
        if(!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)){
            id=chapterIdC;
        }
        if (progress == 100) {
            $("#" + id).attr({
                'type' : 4
            });
        } else {
            $("#" + id).attr({
                'type' : 1
            });
        }
    }else{
        $('.down-progress[type="1"]').attr({
            type : 2
        });
    }
    api.hideProgress();
}
function get_data() {
    $('body').removeClass('checking');
    /*后台代码*/
     memberId = getstor('memberId');
    mydata = [];
    set_data(0);
}
function set_data(num) {    

    //1:获取所有下载记录并解析
    getdownrecord();
    //2:根据couselist获取所有缓存课程的章节详情，如果在线，从服务器获取，否则本地数据库获取
    initDom();
    clearInterval(getStatusTime);
    
    getStatusTime = setInterval(function(){
        if($api.getStorage("video-cacheTime") == "false" || $('.down-progress[type="1"]').length<1){
            clearInterval(getStatusTime);
        }
        getdownrecord();
    },3000)

}
//测试
// mydata = [];
// var aa={"courseJson":"[{\"availability\":\"<p>\\r\\n\\tCMA P1 中文 前导讲义有更新，更新章节：\\r\\n</p>\\r\\n<p>\\r\\n\\t第1章-第1节-知识点1\\r\\n</p>\\r\\n<p>\\r\\n\\t<span style=\\\"line-height:1.5;\\\">第1章-第2节-知识点2</span> \\r\\n</p>\\r\\n第3章-第1节-知识点1<br />\",\"courseBackgroundImage\":\"/upload/201604/92da0abdac4a45f5b46f9546ade771ac.jpg\",\"categoryName\":\"CMA中文\",\"courseIndex\":130,\"knowledgePointId\":\"\",\"teacherName\":\"QiQi Wu\",\"chapters\":[{\"chapterId\":\"8a22ecb553eab1280153f3774d3a0080\",\"isFree\":\"true\",\"knowledgePointId\":null,\"chapterTitle\":\"第一章 管理会计基础\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb553eab1280153f38a4e240087\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"前导\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540452360300b6\",\"videoCcid\":\"1636D8924AA82ED29C33DC5901307461\",\"videoTime\":256,\"taskType\":\"video\",\"title\":\"前导课\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044018bd009a\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f384b5c30084\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第一节 管理会计的产生与发展\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b428d7faa063d\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 管理会计的产生\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540468f39800ba\",\"videoCcid\":\"72D12CCB7EBFE95C9C33DC5901307461\",\"videoTime\":1263,\"taskType\":\"video\",\"title\":\"知识点1 管理会计的形成\",\"taskLevel\":null,\"id\":\"8a22ecb553eab128015404410a66009c\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201703/ca2b169f8e9b4baf8106ce21e62e0b74.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b428db65c063e\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点2 管理会计的发展\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab128015404696af800bb\",\"videoCcid\":\"15F603BEEC1D737C9C33DC5901307461\",\"videoTime\":1157,\"taskType\":\"video\",\"title\":\"知识点2 管理会计的发展\",\"taskLevel\":null,\"id\":\"8a22ecb553eab12801540441487a009d\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/78b9c138f43246ecafe3c0cf1303a6c4.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f3857f2f0085\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第二节 管理会计和财务会计的关系\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b428dfb64063f\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 管理会计和财务会计的区别\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154046a01eb00bc\",\"videoCcid\":\"224E39210AD2ED299C33DC5901307461\",\"videoTime\":1295,\"taskType\":\"video\",\"title\":\"知识点1 管理会计和财务会计的区别\",\"taskLevel\":null,\"id\":\"8a22ecb553eab12801540445c98000a0\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/6a7cd4b8b89343479c927b179d5b1b4b.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b428e3c470640\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点2 管理会计和财务会计的联系\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154046a5cca00bd\",\"videoCcid\":\"619E2E8F9E67C7069C33DC5901307461\",\"videoTime\":773,\"taskType\":\"video\",\"title\":\"知识点2 管理会计和财务会计的联系\",\"taskLevel\":null,\"id\":\"8a22ecb553eab128015404461e5b00a1\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201703/a8f4ea0173c64b23b54a85b0cdb1283b.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f386da630086\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第三节 管理会计的职能与目标\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b428e96a00641\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 管理会计的目标\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab128015404717e5d00be\",\"videoCcid\":\"64D4A4A6C6DFEFDB9C33DC5901307461\",\"videoTime\":657,\"taskType\":\"video\",\"title\":\"知识点1 管理会计的目标\",\"taskLevel\":null,\"id\":\"8a22ecb553eab12801540441c9c9009e\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/3f96ba19658747d3b96bb0db2c265a35.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b428ee9ae0642\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点2 管理会计的职能\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540472130c00bf\",\"videoCcid\":\"CF1338E6CCBD08BE9C33DC5901307461\",\"videoTime\":1534,\"taskType\":\"video\",\"title\":\"知识点2 管理会计的职能\",\"taskLevel\":null,\"id\":\"8a22ecb553eab128015404424d88009f\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/caca3dcb54ed444cb0c8659907c4a51d.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f3ada7730088\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第四节 管理会计的基本原则\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b428f72b40643\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 管理会计的基本原则\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154047a85fd00c0\",\"videoCcid\":\"597686C27C1E399E9C33DC5901307461\",\"videoTime\":974,\"taskType\":\"video\",\"title\":\"知识点1 管理会计的基本假设和原则\",\"taskLevel\":null,\"id\":\"8a22ecb553eab128015404472fdc00a4\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/b9ce17fb3dca44a39cb4a2d7ac07d1bc.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f37e94c40082\",\"isFree\":\"true\",\"knowledgePointId\":null,\"chapterTitle\":\"第二章 成本会计基础\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb553eab1280153f3aeb5a00089\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"前导\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154047b2ac200c1\",\"videoCcid\":\"12D3532E116F451E9C33DC5901307461\",\"videoTime\":236,\"taskType\":\"video\",\"title\":\"前导课\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044ce58d00af\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f3af23ec008a\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第一节 成本的概述\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b428fc3050644\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 成本的概述\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154047c42aa00c2\",\"videoCcid\":\"046063D29FF4BB029C33DC5901307461\",\"videoTime\":1228,\"taskType\":\"video\",\"title\":\"知识点1 成本的概述\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044dc65c00b0\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/1190b1db4b4b4c94bd2cb72f57c43b25.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f3afdeb0008b\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第二节 成本分类\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b42900abd0645\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 财务会计中的成本分类\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154047dc29300c3\",\"videoCcid\":\"CFD7A741EC682FA29C33DC5901307461\",\"videoTime\":1234,\"taskType\":\"video\",\"title\":\"知识点1 财务会计中成本的分类\",\"taskLevel\":null,\"id\":\"8a22ecb55aeff242015b14aa07ca0338\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b429045f60646\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点2 成本性态分析\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540481f60200c4\",\"videoCcid\":\"E541DE80C943D0819C33DC5901307461\",\"videoTime\":1310,\"taskType\":\"video\",\"title\":\"知识点2 成本性态分析\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044e95e100b2\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201704/1692af46a74946afa94c1e82b277254d.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b42909bf60647\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点3 短期决策下的成本概念\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540482853a00c5\",\"videoCcid\":\"4D61D12747687DF99C33DC5901307461\",\"videoTime\":1315,\"taskType\":\"video\",\"title\":\"知识点3 短期决策下的成本概念-1\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044eff7200b4\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/223feb776d5a4ff3b36a16a36977d194.pdf\",\"express\":null},{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540482b1a900c6\",\"videoCcid\":\"B9AD8B8C5F613F059C33DC5901307461\",\"videoTime\":803,\"taskType\":\"video\",\"title\":\"知识点3 短期决策下的成本概念-2\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044f381100b5\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f37f16340083\",\"isFree\":\"true\",\"knowledgePointId\":null,\"chapterTitle\":\"第三章 财务会计基础\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb553eab1280153f3b0337b008c\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"前导\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab128015404832d2300c7\",\"videoCcid\":\"C9875EB0FC628EC09C33DC5901307461\",\"videoTime\":303,\"taskType\":\"video\",\"title\":\"前导课\",\"taskLevel\":null,\"id\":\"8a22ecb553eab12801540447e63100a5\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f3b28f04008d\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第一节 财务会计概述\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b4290e0d00648\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 财务会计的基本要素\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540483c08200c8\",\"videoCcid\":\"9FEC4E4EFA2461F19C33DC5901307461\",\"videoTime\":869,\"taskType\":\"video\",\"title\":\"知识点1 财务会计的基本要素\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044a5a8400a7\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201703/a1af2e68aa4648cba8be16406e71d8c6.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f3b3983e008e\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第二节 会计要素的分类\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b429110200649\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 资产要素\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154048549a100c9\",\"videoCcid\":\"E6F24766709759E59C33DC5901307461\",\"videoTime\":957,\"taskType\":\"video\",\"title\":\"知识点1 资产要素\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044af56d00a8\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201705/fcfa40b606db404895be16f1b2053f79.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b42914044064a\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点2 负债要素\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540485b5ff00ca\",\"videoCcid\":\"429903A1FCE4237E9C33DC5901307461\",\"videoTime\":677,\"taskType\":\"video\",\"title\":\"知识点2 负债要素\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044b8c0200aa\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/3bfd1a77c7184f0ea7be9af76c834578.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b42917097064b\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点3 所有者权益\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540486417500cb\",\"videoCcid\":\"35D1EBCCC9D174539C33DC5901307461\",\"videoTime\":716,\"taskType\":\"video\",\"title\":\"知识点3 所有者权益要素\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044bc61700ab\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/a57911a75fef471694d44e9dd75cfded.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b4291a30f064c\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点4 收入要素\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab128015404868b2800cc\",\"videoCcid\":\"9FC98FC38164DD1B9C33DC5901307461\",\"videoTime\":594,\"taskType\":\"video\",\"title\":\"知识点4 收入要素\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044c22a700ad\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/592693fe6b234ed49f4a90c48cc4b132.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b4291d20a064d\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点5 费用和利润类要素\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540486cce400cd\",\"videoCcid\":\"84DFF8BDDE292B079C33DC5901307461\",\"videoTime\":1153,\"taskType\":\"video\",\"title\":\"知识点5 费用和利润类要素\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044c7d9e00ae\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/c18f86bb73c44a7ca2469e88136423d6.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null}],\"chapterExtends\":null}],\"bigCoverPath\":\"/upload/201507/32b2575cc3094dde8461f32731ea3058.png\",\"subjectName\":\"CMA 中文 Part-1\",\"outline\":\"\",\"aim\":\"P1前导课主要学习管理会计、财务会计、成本会计的基础知识，前导课偏重基础知识的理解，要求重点掌握管理会计与财务会计的联系与区别，分别从管理会计和财务会计的角度理解并记忆成本的分类，以及财务报表的六大要素\",\"versionId\":\"ff808081491181a3014917d1bec90762\",\"effectiveDay\":280,\"coverPath\":\"/upload/201604/92da0abdac4a45f5b46f9546ade771ac.jpg\",\"teacherImage\":\"/upload/201606/09c9342818e24393a970aa93d25b9a4d.png\",\"courseModuleType\":\"KNOWLEDGE_MODULE\",\"subjectId\":\"ff808081486933e601489c799f0f0868\",\"courseId\":\"8a22ecb553eab1280153f36f380a007f\",\"courseName\":\"CMA Part I 中文 前导\",\"lastModifyTime\":1460078,\"taskNum\":\"21\",\"taskTotal\":\"21\",\"createTime\":1460078065,\"chapterNum\":\"48\",\"teacherHonor\":\"吴奇奇\",\"subjectIndex\":50,\"categoryId\":\"ff808081486933e601489c4662f60851\",\"categoryIndex\":10}]"}

// var ret_data = JSON.parse(aa.courseJson);
// var res = {
//     data: ret_data[0]
// };
// mydata.push(res); 
// var tpl = $('#tpl').html();
//     var content = doT.template(tpl)(mydata);
//     $('body').removeClass('null');
//     $('#content').html('');
//     $('#content').html(content);
function initDom() {
    cache_model = api.require('lbbVideo');
        var param = {"userId":memberId};
        if(api.pageParam.courseId){
            param.courseId = api.pageParam.courseId;
            $("#header").show();
            $('#content').css({"padding-top":"1.25rem"});
        }

       cache_model.getCourseJsonWithCourseId(param,function(ret,err){  
           if(JSON.parse(ret.data).length<1){
                $('#content').html('');
                $('body').addClass('null');
                api.hideProgress();
                return false;
           }
            $.each(JSON.parse(ret.data),function(k,v){
                var ret_data = JSON.parse(v.courseJson);
                var res = {
                    data: ret_data[0]
                };
                mydata.push(res); 
                
            })
            
            
            init_data();
            initDomDownStatus();
            //处理圈圈
            circleProgress();
            showCacheList();
            
       })
    }

function initDomDownStatus(){
        if(isEmpty($api.getStorage("videochangelist"))){
            return false;
        }
        var strs = $api.getStorage("videochangelist").split(","); //字符分割
        var pathlen = strs.length;
    
        //从1开始，因为拼接videochangelist的时候用,开始的
    //     alert(strs+"====="+JSON.stringify(videoDownInfo))
        for (j=1; j<pathlen;j++ ){
            var domInfo = videoDownInfo[strs[j]];
            var domid = strs[j];
            // alert(JSON.stringify(domInfo))
            if(!isEmpty(domInfo)){
                var domprogress = videoDownInfo[strs[j]].progress;
                var domstatus = videoDownInfo[strs[j]].status;
                var domtasknum = videoDownInfo[strs[j]].tasknum;
//               alert(domid+"==="+domprogress+"==="+domstatus)
                // ------------------设置界面对应id节点dom下载状态，并设置为可见--------------------------
                
                $("#course"+domid).find(".progress-bar2").css("width",domprogress.toFixed(2)+"%");
                $("#course"+domid).find(".progress-val2").text(domprogress.toFixed(2)+"%");
                
                $(".task"+domid).attr("type",domstatus);
                $(".task"+domid).find(".val").html(domprogress);
                // alert($(".task"+domid).html())
            }    
        }
        setCapterState();
        
        init_process();
        //    ------------------设置结束--------------------------
    
        
    }
    function setCapterState(){
        $.each($(".tasksBoxs"),function(k,v){
             var waitNum = 0,
                 ingNum = 0,
                 okNum = 0,
                 stopNum = 0;
            var taskList = $(v).prev(".list").find(".down-progress");
            var len =0;
            $.each($(v).find(".down-progress"),function(key,val){
                if($(val).attr("type") == 1){
                     ingNum++;
                 }else if($(val).attr("type") == 2){
                     stopNum++;
                 }else if($(val).attr("type") == 5){
                     waitNum++;
                 }else if($(val).attr("type") == 4){
                     okNum++;
                 }
            });
            if(ingNum>0){
                 taskList.attr("type",1);                
             }else if(waitNum>0 || stopNum>0){
                 taskList.attr("type",2);
             }else if(ingNum<1 && (waitNum<1 || stopNum<1) && okNum>0){
                 taskList.attr("type",4);
             }
             // taskList.html(domprogress);
        })
        
     
    }
function showCacheList(){
    $.each($(".cache-course"),function(kk,vv){
        if( $(vv).find(".mycaptC").length>0 && $(vv).find(".mycaptB").length>0 && $(vv).find(".mycaptA").length>0 ){
           showCaptCFn($(vv));
           showCaptBFn($(vv));
           showCaptAFn($(vv));
           showCourseFn($(vv)); 
        }else if( $(vv).find(".mycaptC").length<1 && $(vv).find(".mycaptB").length>0 && $(vv).find(".mycaptA").length>0){
            showCaptCFn2($(vv));
            showCaptBFn2($(vv));
            showCourseFn2($(vv));   
        }else if( $(vv).find(".mycaptC").length<1 && $(vv).find(".mycaptB").length<1 && $(vv).find(".mycaptA").length>0 ){
            showCaptCFn3($(vv));
            showCourseFn3($(vv));
        }
        
    })
}

function showCaptCFn(obj){
    
    $.each(obj.find(".mycaptC"),function(k,v){
//      if($(v).css("display") != "none"){
            var taskList = $(v).next(".tasksBoxs").find(".taskList");
            var len =0;
            $.each(taskList,function(key,val){
//              alert($(val).find(".down-progress").attr("type"))
                if($(val).find(".down-progress").attr("type") == 1){
                    len++;
                }else if($(val).find(".down-progress").attr("type") == 2){
                    len++;
                }else if($(val).find(".down-progress").attr("type") == 5){
                    len++;
                }else if($(val).find(".down-progress").attr("type") == 4){
                    len++;
                }
            });
            //alert(len)
            if(len>0){
                $(v).show();
            }else{
                $(v).hide();
            }
//      }
    })
    
}
function showCaptBFn(obj){
    $.each(obj.find(".mycaptB"),function(k,v){
//      if($(v).css("display") != "none"){
            var mycaptCList = $(v).find(".mycaptC");
            var len =0;
            $.each(mycaptCList,function(key,val){
                if($(this).css("display") != "none"){
                    len++;
                }
            });
            if(len>0){
                $(v).show();
            }else{
                $(v).hide();
            }
//      }
    })
}
function showCaptAFn(obj){
    $.each(obj.find(".mycaptA"),function(k,v){
        
        var mycaptBList = $(v).find(".mycaptB");
        if(mycaptBList.length>0){
            var len =0;
            $.each(mycaptBList,function(key,val){
                if($(this).css("display") != "none"){
                    len++;
                }
            });
            
            if(len>0){
                $(v).show();
            }else{
                $(v).hide();
            }
        }else{
            var taskList = $(v).next(".tasksBoxs").eq(0).find(".taskList");
            var len =0;
            $.each(taskList,function(key,val){
//              alert($(val).find(".down-progress").attr("type"))
                if($(val).find(".down-progress").attr("type") == 1){
                    len++;
                }else if($(val).find(".down-progress").attr("type") == 2){
                    len++;
                }else if($(val).find(".down-progress").attr("type") == 5){
                    len++;
                }else if($(val).find(".down-progress").attr("type") == 4){
                    len++;
                }
            });
            //alert(len)
            if(len>0){
                $(v).show();
            }else{
                $(v).hide();
            }
        }
        
    })
}
function showCourseFn(obj){
    
    $.each(obj,function(k,v){
        var mycaptAList = $(v).find(".mycaptA");
        var len =0;
        $.each(mycaptAList,function(key,val){
            if($(this).css("display") != "none"){
                len++;
            }
        });       
        if(len>0){
            $(v).show();
        }else{
            $(v).hide();
        }
    })
    noCache();
}

function noCache(){
    var courseNum = 0;
    $.each($(".cache-course"),function(kk,vv){
        if($(this).css("display") != "none"){
            courseNum++;
        }else{
            cache_model = api.require('lbbVideo');

            cache_model.deleteCourseJson({
                "userId" : getstor('memberId'),
                "courseId" : $(this).find(".courseid").attr("dataid")
            },function(){

            }) 
        }
    });
    
    if(courseNum<1){
        $('#content').html('');
        $('body').addClass('null');
        
        return false;
    }
}

function showCaptCFn2(obj){
    $.each(obj.find(".mycaptB"),function(k,v){
//      if($(v).css("display") != "none"){
            var taskList = $(v).find(".tasksBoxs").eq(0).find(".taskList");
            var len =0;
            $.each(taskList,function(key,val){
//              alert($(val).find(".down-progress").attr("type"))
                if($(val).find(".down-progress").attr("type") == 1){
                    len++;
                }else if($(val).find(".down-progress").attr("type") == 2){
                    len++;
                }else if($(val).find(".down-progress").attr("type") == 5){
                    len++;
                }else if($(val).find(".down-progress").attr("type") == 4){
                    len++;
                }
            });
            if(len>0){
                $(this).show();   
            }else{
                $(this).hide();
            }
//      }
    })  
}
function showCaptBFn2(obj){
    $.each(obj.find(".mycaptA"),function(k,v){
//      if($(v).css("display") != "none"){
            var mycaptCList = $(v).find(".mycaptB");
            var len =0;
            $.each(mycaptCList,function(key,val){
                if($(this).css("display") != "none"){
                    len++;
                }
            });
            if(len>0){
                $(v).show();
            }else{
                $(v).hide();
            }
//      }
    })
}
function showCourseFn2(obj){
    
    $.each(obj,function(k,v){
        var mycaptAList = $(v).find(".mycaptA");
        var len =0;
        $.each(mycaptAList,function(key,val){
            if($(this).css("display") != "none"){
                len++;
            }
        });       
        if(len>0){
            $(v).show();
        }else{
            $(v).hide();
        }
    })
    noCache();
}

//种类三
function showCaptCFn3(obj){
    $.each(obj.find(".mycaptA"),function(k,v){
//      if($(v).css("display") != "none"){
            var taskList = $(v).next(".tasksBoxs").find(".taskList");
            var len =0;
            $.each(taskList,function(key,val){
//              alert($(val).find(".down-progress").attr("type"))
                if($(val).find(".down-progress").attr("type") == 1){
                    len++;
                }else if($(val).find(".down-progress").attr("type") == 2){
                    len++;
                }else if($(val).find(".down-progress").attr("type") == 5){
                    len++;
                }else if($(val).find(".down-progress").attr("type") == 4){
                    len++;
                }
            });
            if(len>0){
                $(this).show();   
            }else{
                $(this).hide();
            }
//      }
    })  
}

function showCourseFn3(obj){
    
    $.each(obj,function(k,v){
        var mycaptAList = $(v).find(".mycaptA");
        var len =0;
        $.each(mycaptAList,function(key,val){
            if($(this).css("display") != "none"){
                len++;
            }
        });       
        if(len>0){
            $(v).show();
        }else{
            $(v).hide();
        }
    })
    noCache();
}
function get_input(name) {
    var data = [];
    $.each($(".active." + name), function(k, v) {
        //alert(4);
        switch(name){
            case 'courseid':
                data.push($.trim($(v).attr('dataid')));
                break;
            case 'chaptera':
                if($(v).parents('.mycaptA').not('.none')){
                    data.push($.trim($(v).attr('dataid')));
                }
                break;
            case 'chapterb':
                if($(v).parents('.mycaptB').not('.none')){
                    data.push($.trim($(v).attr('dataid')));
                }
                break;
            case 'chapterc':
                if($(v).parents('.mycaptC').not('.none')){
                    data.push($.trim($(v).attr('dataid')));
                }
                break;
        }
    });
    return data;
}
function set_down_status(data){
    //var data=JSON.parse(str);
    var type = data.type, chapterIdA = isEmpty(data.chapterIdA) ? '' : data.chapterIdA ,chapterIdB = isEmpty(data.chapterIdB) ? '' : data.chapterIdB,chapterIdC = isEmpty(data.chapterIdC) ? '' : data.chapterIdC;
    var id='';
    //一级章节下载记录
    if(!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)) id=chapterIdA;
    //二级章节下载记录
    if(!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)) id=chapterIdB;
    //三级章节下载记录
    if(!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)) id=chapterIdC;
    var obj = $('#' + id);
    switch (type) {
        case 'error':
            $('.down-progress[type="1"]').attr({
                type : 2
            }).siblings('.down_speed').html('').addClass('none');
            api.toast({
                msg : '下载失败！',
                location : 'middle'
            });
            break;
        case 'redown':
            $('.down-progress[type="1"]').attr({
                type :  3
            }).siblings('.down_speed').html('').addClass('none');
            api.toast({
                msg : '下载失败！',
                location : 'middle'
            });
            break;
        case 'filedel':
            $(obj).attr({
                type : 2
            });
            var num = $api.getStorage(memberId + id + 'progress');
            $(obj).find('.val').text(num);
            var percent = num / 100, perimeter = Math.PI * 0.9 * $('#svgDown').width();
            $(obj).find('circle').eq(1).css('stroke-dasharray', parseInt(perimeter * percent) + " " + parseInt(perimeter * (1 - percent)));
            get_percent();
            api.alert({
                msg : '缓存文件被清理,请重新下载',
                location : 'middle'
            });
            break;
        case 'no_video':
            api.toast({
                msg : '无视频任务',
                location : 'middle'
            });
            break;
        case 'less_space':
            clearInterval(down_timer);
            clearTimeout(count_timer);
            is_count = false;
            $('.down-progress[type="1"]').attr({
                type : 2
            }).siblings('.down_speed').html('').addClass('none');
            api.toast({
                msg : '可用空间不足,下载已暂停',
                location : 'middle'
            });
            break;
        case 'not_wifi':
            clearInterval(down_timer);
            clearTimeout(count_timer);
            is_count = false;
            $('.down-progress[type="1"]').attr({
                type : 2
            }).siblings('.down_speed').html('').addClass('none');
            api.toast({
                msg : '脱离WiFi环境自动暂停下载',
                location : 'middle'
            });
            break;
        case 'deny_down':
            clearInterval(down_timer);
            clearTimeout(count_timer);
            is_count = false;
            $('.down-progress[type="1"]').attr({
                type : 2
            }).siblings('.down_speed').html('').addClass('none');
            api.toast({
                msg : '当前正在移动网络，请在WIFI环境中下载',
                location : 'middle'
            });
            break;
        case 'shut_network':
            clearInterval(down_timer);
            clearTimeout(count_timer);
            is_count = false;
            $('.down-progress[type="1"]').attr({
                type : 2
            }).siblings('.down_speed').html('').addClass('none');
            api.toast({
                msg : '网络已断开，请检查网络状态',
                location : 'middle'
            });
            break;
        case 'wait':
            clearInterval(down_timer);
            clearTimeout(count_timer);
            is_count = false;
            $(obj).attr({
                'type' : 2
            }).siblings('.down_speed').html('').addClass('none');
            break;
        case '1':
        case 1:
            clearInterval(down_timer);
            clearTimeout(count_timer);
            is_count = false;
            //下载中->暂停
            $('.down-progress[type="1"]').attr({
                type : 2
            }).siblings('.down_speed').html('').addClass('none');
            $(obj).attr({
                'type' : 2
            });
            break;
        case '2':
        case 2:
            //暂停->下载中
            $('.down-progress[type="1"]').attr({
                type : 2
            });
            $('.down_speed').html('').addClass('none');
            $(obj).attr({
                type : 1
            });
            break;
        case '3':
        case 3:
            $('.down-progress[type="1"]').attr({
                type : 2
            });
            break;
        case 'ing':
            $('.down-progress[type="1"]').attr({
                type : 2
            });
            $(obj).attr({
                type : 1
            });
            break;
        case 'progress':
            $.each($('.down_speed'),function(k,v){
                if($(v).siblings('.down-progress').attr('id')!=id){
                    $(v).html('').addClass('none');
                }
            });
            $(obj).attr({
                type : 1
            });
            get_percent();
            var percent = data.progress / 100, perimeter = Math.PI * 0.9 * $('#svgDown').width();
            $(obj).find('circle').eq(1).css('stroke-dasharray', parseInt(perimeter * percent) + " " + parseInt(perimeter * (1 - percent)));
            if (data.progress >= 100) {
                $(obj).attr({
                    type : 4
                }).siblings('.down_speed').html('').addClass('none');
            }
            $(obj).find('.val').text( data.progress);
            break;
        case 'end':
            clearInterval(down_timer);
            clearTimeout(count_timer);
            is_count = false;
            get_percent();
            $(obj).attr({
                type : 4
            }).siblings('.down_speed').html('').addClass('none');
            break;
    }
}

var mydata = [];
var memberId;
var is_del_downed=false;
apiready = function() {
    api.showProgress({
        title: '加载中',
        modal: false
    });
    memberId=getstor('memberId');
    mydata = [];
    get_data();
     
    api.addEventListener({
        name: 'flush_cache'
    }, function(ret, err) {
        $('body').removeClass('checking');
        $('.icon-check').removeClass('active');
        clearInterval(getStatusTime);
        getStatusTime = setInterval(function(){
            if($('.down-progress[type="1"]').length<1){
                clearInterval(getStatusTime);
            }
            getdownrecord();
        },3000)

    });
    api.addEventListener({
        name : 'down_speed'
    }, function(ret) {
        if(ret){
            var speed=ret.value.speed;
            //初始化下载状态
            var downed = $api.getStorage(memberId+'downed');
            var chapterIdA = get_loc_val(memberId + 'downed', 'chapterIdA'),chapterIdB = get_loc_val(memberId + 'downed', 'chapterIdB'),chapterIdC = get_loc_val(memberId + 'downed', 'chapterIdC'), progress = get_loc_val(memberId + 'downed', 'progress');
            var id='';
            //一级章节下载记录
            if(!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)){
                id=chapterIdA;
            }
            //二级章节下载记录
            if(!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)){
                id=chapterIdB;
            }
            //三级章节下载记录
            if(!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)){
                id=chapterIdC;
            }
            //$('.down-progress').siblings('.down_speed').html('').addClass('none');
            $('#'+id).siblings('.down_speed').html(speed).removeClass('none');
        }
    });
    api.addEventListener({
        name : 'init_cache'
    }, function(ret) {
        mydata = [];
        get_data();
    });
    api.setRefreshHeaderInfo({
        visible : true,
        loadingImg : 'widget://image/arrow-down-o.png',
        bgColor : '#f3f3f3',
        textColor : '#787b7c',
        textDown : '下拉更多',
        textUp : '松开刷新',
        showTime : false
    }, function(ret, err) {
       api.hideProgress();
        api.refreshHeaderLoadDone();
        location.reload();
        if($(".cache-course").length<1){
            $('#content').html('');
            $('body').addClass('null');
            return false;
        }
    });
    api.addEventListener({
          name: 'cancle_check'
      }, function () {
          $("#content").find('.icon-check').removeClass('active'); 
      });
    //1 删除  2 取消  3 批量移除
    api.addEventListener({
        name : 'openachapt'
    }, function(ret) {
        if (ret.value.sethomepage == 3) {//删除
            $('body').addClass('checking');
              var ccids = [];

              $.each($(".tasksBoxs"),function(k,v){
                
                var checkFath = $(v).prev("li").find(".icon-check");
                if(checkFath.hasClass("active")){
                    
                    var videoArr = $(v).find(".taskList");
                    $.each(videoArr,function(key,val){
                        var taskID = JSON.parse($(val).find(".down_data").html()).videoCcid;
                        ccids.push(taskID);        
                     })
                }
                
             })

            if(ccids.length<1){ return false; };
//          var jsfun = 'down_stop(function(){});';
//          api.execScript({
//              name: 'root',
//              script: jsfun
//          });
             api.showProgress({
                 title: '删除中',
                 modal: true
             });
             
             var jsfun = "rmVideo('" + JSON.stringify(ccids) + "');";
             api.execScript({
                name: 'root',
                script: jsfun
             });
             //获取新内容
             setTimeout(function() {
                $.each($(".down-progress"),function(k,v){
                    if($(v).prev(".icon-check").hasClass("active")){
                        $(v).closest("li").hide();
                    }
                 })
                api.hideProgress();
                 // api.sendEvent({
                 //    name: "cancle_del"
                 // });

                  $('body').removeClass('checking');
                  $('.icon-check').removeClass('active');           
                
             },1000)
        } else if (ret.value.sethomepage == 2) {//取消
            $('body').removeClass('checking');
            $('.icon-check').removeClass('active').attr('sel', 0);
        } else if (ret.value.sethomepage == 1) {//
            $('body').addClass('checking');
        }
    });
};
function next(leave, num1, num2, num3,courseId) {
        //如果没有缓存信息，就从接口获取
        var tmp_course_detail = $api.getStorage(courseId);
        if (isEmpty(tmp_course_detail)) {
            //获取课程的详细信息
            //api/v2.1/course/courseDetail，接口编号：004-006
            // ajaxRequest('api/v2.1/course/courseDetail', 'get', {
            ajaxRequest('api/teachsource/course/courseDetail', 'get', {
                courseId: courseId
            }, function (ret, err) {//004.006获取课程的详细信息
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
                        api.toast({
                            msg: '获取任务信息失败',
                            location: 'middle'
                        });
                        return false;
                    }
                   var  course_detail = ret.data[0];
                    //课程详情数据
                    $api.setStorage(courseId, course_detail);
                    var res_process = {
                        'oneChapterIndex': num1,//一级章节索引
                        'twoChapterIndex': (num2 == -1) ? 0 : num2,//二级章节索引
                        'threeChapterIndex': (num3 == -1) ? 0 : num3,//三级章节索引
                        'taskIndex': 0,//任务索引
                        'chapterDeep': leave,//章节层级
                        'progress': 0//任务学习进度
                    };
                    judge_task(res_process,course_detail);
                }
            });
        } else {
            var  course_detail = tmp_course_detail;
            //存储课程详细信息
            var res_process = {
                'oneChapterIndex': num1,//一级章节索引
                'twoChapterIndex': (num2 == -1) ? 0 : num2,//二级章节索引
                'threeChapterIndex': (num3 == -1) ? 0 : num3,//三级章节索引
                'taskIndex': 0,//任务索引
                'chapterDeep': leave ,//章节层级
                'progress': 0//任务学习进度
            };
            judge_task(res_process,course_detail);
            //用户上次学习进度数据
        }
}


//判断任务类型，跳转相应的页面
function judge_task(res_process,course_detail) {
    if (isEmpty(course_detail) || isEmpty(course_detail.chapters) || isEmpty(res_process)) {
        api.toast({
            msg: '获取课程信息失败',
            location: 'middle'
        });
        return false;
    }
    //获取章节信息
    if (res_process.chapterDeep >= 0) {
        var chapters_info = course_detail.chapters[res_process.oneChapterIndex];//一级章节信息
    }
    if (res_process.chapterDeep >= 1) {
        var chapters_info = chapters_info.children[res_process.twoChapterIndex];//二级章节信息
    }
    if (res_process.chapterDeep >= 2) {
        var chapters_info = chapters_info.children[res_process.threeChapterIndex];//三级章节信息
    }

    if (isEmpty(chapters_info) || isEmpty(chapters_info.tasks)) {
        api.toast({
            msg: '暂无任务',
            location: 'middle'
        });
        return false;
    }
    var task_info = chapters_info.tasks[res_process.taskIndex];//当前任务信息
    if (isEmpty(task_info)) {
        api.toast({
            msg: '暂无任务',
            location: 'middle'
        });
        return false;
    }
    //判断当前任务类型
    if (task_info.taskType == 'video') {
        //视频类型
        var new_win_name = 'video';
        var new_win_url = 'video.html';
    } else if (task_info.taskType == 'entry' || task_info.taskType == 'pdfread' || task_info.taskType == 'exam') {
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
        study_progress: res_process,//学习进度
        course_detail: course_detail,//课程详情
        task_info: task_info,//当前要学习的任务信息,
        type:'task'
    };
    api.hideProgress();

    //跳转到播放页面
    api.openWin({
        name: new_win_name,
        url: new_win_url,
        delay: 200,
        slidBackEnabled: false,//iOS7.0及以上系统中，禁止通过左右滑动返回上一个页面
        pageParam: pageParams
    });
}