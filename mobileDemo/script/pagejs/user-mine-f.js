//时间值不够10的在数字前面补0函数
function addZero(value) {
	return parseInt(value) < 10 ? "0" + value : parseInt(value);
}

function setTime() {
	if (is_show_time == false) {
		return false;
	}
	var date = new Date(Date.now());
	var h = extra(date.getHours());
	var m = extra(date.getMinutes());
	var setTime = document.getElementById("setTime");
	api.openPicker({
		type : 'time',
		date : h + ':' + m,
		title : '选择时间'
	}, function(ret, err) {
		var hour = ret.hour;
		var minute = ret.minute;
		var newTimer = addZero(hour) + ":" + addZero(minute);
		setTime.innerHTML = newTimer;
		var val = isEmpty(newTimer) ? '19:30' : newTimer;
		$api.setStorage('notice_time', val);
		var notice = isEmpty($api.getStorage('open_notice')) ? 0 : $api.getStorage('open_notice');
		clearInterval(push_timer);
		if (notice == 1) {
			init_push();
		}
	});
}

function go_next(name) {
	var reload = true;
	if (name == 'video-buffer') {
		reload = true;
	}
	api.openWin({
		name : name,
		url : name + '.html',
		delay : 100,
		reload : reload
	});
}

function get_ranking() {
	var memberId = getstor('memberId');
	// if(memberId == false){
 //        $(".ranking").text("上次登录：1分钟前");
 //        return false;
 //    }
	//上次登录时间
	ajaxRequest('api/zbids/member/getLoginLog',"get", {"memberid":memberId,"pageSize":1,"pageNo":1}, function (ret, error) {
		
		if(ret && ret.state == "success"){
			var loginTime = ret.data[0].loginTime/1000;
			$(".ranking").text("上次登录："+stringData(loginTime));
		}

	})
	  
//	var able = $api.getStorage('capabilityAssessment');
//	able = '';
//	if (!isEmpty(able)) {
//		var ranking = able.ranking;
//		$('.ranking').html(ranking).parents('p').removeClass('none');
//		return false;
//	}
//	ajaxRequest('api/v2/capabilityAssessment', 'get', {//008.017  能力评估
//		token : $api.getStorage('token'),
//		id : get_loc_val('mine', 'memberId')
//	}, function(ret, err) {
//		if (err) {
//			api.toast({
//				msg : err.msg,
//				location : 'middle'
//			});
//			return false;
//		}
//		if (ret.state == 'success') {
//			$api.setStorage('capabilityAssessment', ret.data[0]);
//			if (!isEmpty(ret.data[0]) && !isEmpty(ret.data[0].ranking)) {
//				var ranking = ret.data[0].ranking;
//				$('.ranking').html(ranking).parents('p').removeClass('none');
//			}
//
//		} else {
//			//api.toast({
//			//	msg : ret.msg,
//			//	location : 'middle'
//			//});
//			//return false;
//		}
//	});
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
function get_count() {
	ajaxRequest('api/studytools/mycount/v2.1', 'get', {//003.304   学员信息统计
		token : $api.getStorage('token'),
		id : get_loc_val('mine', 'memberId')
	}, function(ret, err) {
		if (err) {
			api.toast({
				msg : err.msg,
				location : 'middle'
			});
			return false;
		}
		if (ret.state == 'success') {
			var nodeNum = ret.data.nodeNum;
			var questionNum = ret.data.questionNum;
			var discuss = ret.data.discuss;
			$('.nodeNum').html(nodeNum);
			$('.questionNum').html(discuss);
			$('.discuss').html(questionNum);
		} else {
			//			api.toast({
			//				msg : ret.msg,
			//				location : 'middle'
			//			});
			//			return false;
		}
	});
}

var is_show_time = true;
apiready = function() {
	 api.hideProgress();
	api.addEventListener({
		name : 'modify'
	}, function(ret, err) {
		var nickName = get_loc_val('mine', 'nickName');
		var avatar = static_url + get_loc_val('mine', 'avatar') + '?s=' + Math.random();
		$('.nickName').html(nickName);
		$('.headimg').attr('src', avatar);
	});
	var notice_time = isEmpty($api.getStorage('notice_time')) ? "19:30" : $api.getStorage('notice_time');
	//学习提醒推送
	var notice = isEmpty($api.getStorage('open_notice')) ? 0 : $api.getStorage('open_notice');
	if (notice == 0) {
		$('.set-time').addClass('none');
		$('#setTime').text('');
		is_show_time = false;
		$('input[name=notice_time]').prop('checked', false);
	} else {
		$('.set-time').removeClass('none');
		$('#setTime').text(notice_time);
		is_show_time = true;
		$('input[name=notice_time]').prop('checked', true);
	}
	$('input[name=notice_time]').change(function() {
         notice_time = isEmpty($api.getStorage('notice_time')) ? "19:30" : $api.getStorage('notice_time');
		var open_notice;
		if ($(this).attr('checked') == true) {
			$('#setTime').text(notice_time);
			is_show_time = true;
			$('.set-time').removeClass('none');
			open_notice = 1;
			init_push();
		} else {
			$('#setTime').text('');
			clearInterval(push_timer);
			$('.set-time').addClass('none');
			is_show_time = false;
			open_notice = 0;
		}
		$api.setStorage('open_notice', open_notice);
	});
	if (!isEmpty($api.getStorage('center_num'))) {
		var num = $api.getStorage('center_num');
		if (num == 0) {
			$('.message-bells .msg-mark').addClass('none');
		} else {
			if(num > 99){
        		$('.message-bells .msg-mark').html("99+");
        	}else{
        		$('.message-bells .msg-mark').html(num);
        	}
		}

	} else {
		var param = {};
		param.pageNo = 0;
		param.pageSize = 1;
		// param.typeId = '';
		param.isRead = 0;
		// param.type = 1;
		param.token = $api.getStorage('token');
		ajaxRequest('api/study/message/list/v1.0', 'get', param, function(ret, err) {
			
			if (err) {
				api.toast({
					msg : err.msg,
					location : 'middle'
				});
				return false;
			}
			if (ret && ret.state == 'success') {
				if (ret.totalCount == 0) {
					$('.message-bells .msg-mark').addClass('none');
				} else {
					if(ret.totalCount > 99){
		        		$('.message-bells .msg-mark').html("99+");
		        	}else{
		        		$('.message-bells .msg-mark').html(ret.totalCount);
		        	}
				}
				$api.setStorage('center_num', ret.totalCount);
			} else {
				//api.toast({
				//	msg : ret.msg,
				//	location : 'middle'
				//});
			}
		});
	}
	//用户昵称和头像
	var nickName = get_loc_val('mine', 'nickName');
	var avatar = static_url + get_loc_val('mine', 'avatar');
	$('.nickName').html(nickName);
	$('.headimg').attr('src', avatar + '?s=' + Math.random());
	$('.user-info').removeClass('none');
	//财迷排名
	get_ranking();
	//学员信息统计
	get_count();
	//已读消息更新接听
	api.addEventListener({
		name : 'center_num'
	}, function(ret) {
		if ($api.getStorage('center_num') && $api.getStorage('center_num') != 0) {
			var num = $api.getStorage('center_num');
			if(num > 99){
        		$('.message-bells .msg-mark').html("99+");
        	}else{
        		$('.message-bells .msg-mark').html(num);
        	}
		} else {
			$('.message-bells .msg-mark').addClass('none');
		}

	});
	api.addEventListener({
		name : 'get_count'
	}, function(ret) {
		get_count();
	});
	
	
	
};

