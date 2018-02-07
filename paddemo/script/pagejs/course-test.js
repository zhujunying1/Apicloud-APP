//document.documentElement.style.fontSize = (document.documentElement.clientWidth / 1280) * 100 + 'px';
var courseId;//课程id
var course_detail;//章节课程信息
//var study_progress;//当前的进度
var chapter_info;//当前章节详情信息
var task_info = '';//当前任务信息
var courseName;//播放器标题(只显示课程的标题，不显示章节和任务标题)
var chapterName;//播放器标题(只显示课程的标题，不显示章节和任务标题)
var task_arr;//所有的任务信息
var task_info_detail;
var last_progress = 0;
var task_type;//任务类别
var link_title;//外链标题
var link_url;//外链地址
var knowledgePointExercise;//知识点练习信息

var exe_task = true;
//用于执行章节任务还是外链
var hasFrame = true;
//用于是否关闭frame还是win

apiready = function() {
    if(api.systemType == 'android'){
        api.setFullScreen({
            fullScreen:true
        });
    }
	//设置ios状态栏背景色
	api.setStatusBarStyle({
		style : 'light'
	});
	//监听返回键
	api.addEventListener({
		name : 'keyback'
	}, function(ret, err) {
        my_close();
        if(api.systemType == 'android'){
            api.setFullScreen({
                fullScreen:false
            });
        }
		//api.sendEvent({
		//	name : 'changeScreen'
		//});
        //api.setStatusBarStyle({
         //   style : 'dark'
        //});
		//api.closeWin();
	});
	//获取参数
    courseId = api.pageParam.courseId;//课程id
    course_detail = api.pageParam.course_detail;//课程详情
    courseName = course_detail.courseName;//课程名字
    //study_progress = api.pageParam.study_progress;//当前的进度

    knowledgePointExercise = api.pageParam.knowledgePointExercise;

	task_info = api.pageParam.task_info;//任务信息
    if(!isEmpty(api.pageParam.last_progress)){
        last_progress = api.pageParam.last_progress;
    }
    task_arr = save_tasks(course_detail);

    task_info_detail = task_arr[task_info.taskId];
	task_type = task_info.taskType;
	//getChapterInfo();

	if (api.pageParam.type == 'task') {
		exe_task = true;
		hasFrame = true;
	} else {
		exe_task = false;
		hasFrame = api.pageParam.hasFrame;
		link_title = api.pageParam.link_title;
		link_url = api.pageParam.link_url;
	}

	//$('.left-next').text(course_detail.courseName);
    $('.left-txt').text(task_info_detail.chapterName);
	//顶部显示课程标题

	//监听切换事件
	api.addEventListener({
		name : 'change_course_test'
	}, function(ret) {
		if (ret && ret.value) {
			if (ret.value.type == 'task') {
				//执行新任务
                var task_id = ret.value.taskId;
                task_info = task_arr[task_id].taskInfo;
                task_info_detail = task_arr[task_id];
                exe_task = true;
			} else {
				//非新任务，打开外链
				link_title = ret.value.title;
				link_url = ret.value.url;
				exe_task = false;
			}
			frameContent();
		}
	});
	frameContent();
};
    function change_course_test(str){
        var ret=JSON.parse(str);
        if (ret.type == 'task') {
            //执行新任务
            var task_id = ret.taskId;
            task_info = task_arr[task_id].taskInfo;
            task_info_detail = task_arr[task_id];
            exe_task = true;
        } else {
            //非新任务，打开外链
            link_title = ret.title;
            link_url = ret.url;
            exe_task = false;
        }
        frameContent();
    }
//根据不同的任务类型，打开相应的frame，//类别（视频、测试题、文档、词汇）
function frameContent() {
	var header = $api.byId('header');
	//var footer = $api.byId('footerTest');
	$api.fixIos7Bar(header);
	var headerPos = $api.offset(header);
	//var footerPos = $api.offset(footer);
	var width = api.winWidth;
	var height = api.winHeight - headerPos.h;
	if (exe_task == true) {
		if (task_info.taskType == 'exam') {
			//如果为测试题，打开测试题页面
			var frame_name = 'course-test-f';
			var frame_url = 'course-test-f.html';
		} else if (task_info.taskType == 'entry') {
			//词汇(vocabulary)类型,据说entry是指词汇类型，词汇是外链
			if (!isEmpty(task_info.entryUrl)) {
				var frame_name = 'course-entry';
				var frame_url = 'http://' + task_info.entryUrl;
				//打开外链任务，就保存进度，表示已完成
				saveTaskProgress(1, 1, 'complate');
			} else {
				return false;
			}
		}else if (task_info.taskType == 'knowledgePointExercise') {
			//知识点联系类型
			
			 frame_name = 'course-knowledgePointExercise';
			 frame_url = 'course-knowledgePointExercise.html';

		}  else if (task_info.taskType == 'pdfread') {
			//文档类型,使用图片查看pdf
			var frame_name = 'course-test-pdf';
			var frame_url = 'course-test-pdf.html';
		} else {
			api.toast({
				msg : '课程任务类型完善中...',
				location : 'middle'
			});
			return false;
		}
		var params = {
			courseId : courseId,
			course_detail : course_detail,
			//study_progress : study_progress,
			task_info : task_info,
            last_progress : last_progress,
            task_info_detail : task_info_detail
		};
	} else {
		var frame_name = link_title;
		var frame_url = link_url;
		var params = {};
	}

	if(task_info.taskType == 'knowledgePointExercise'){
		params.knowledgePointExercise = knowledgePointExercise;
	}
	
	api.openFrame({
        delay:200,
		name : frame_name,
		url : frame_url,
		bounces : false,
		opaque : true,
		reload : true,
		vScrollBarEnabled : false,
		rect : {
			x : 0,
			y : headerPos.h,
			w : width,
			h : height
		},
		pageParam : params
	});
}

//关闭当前页面
function my_close() {
	if (exe_task == true) {
        api.setStatusBarStyle({
            style : 'dark'
        });
        api.closeWin({name:'video'});
		api.closeWin();
	} else {
		if (hasFrame == true) {
			api.closeFrame({
				name : link_title
			});
			//如果打开的不是任务类型
			exe_task = true;
		} else {
            api.setStatusBarStyle({
                style : 'dark'
            });
           api.closeWin({name:'video'});
            api.closeWin();
		}
	}
}

//打开横屏的章节页面
function openCharpterMenu() {
	$api.setStorage("currentPlayVideoId",task_info.taskId);
	api.openFrame({
		name : 'video-menu',
		url : 'video-menu.html',
		delay : 200,
		pageParam : {
			courseId : courseId,//课程id
			course_detail : course_detail,//课程详情
			//times : 0,//视频的播放进度参数,在这里没有用
			//study_progress : study_progress,//任务学习的进度
			task_info : task_info,//章节信息
			from_page : 'course-test'
		}
	});
}

//保存任务进度
// function saveTaskProgress(now_progress, total, state) {
// 	var user_nickname = get_loc_val('mine', 'nickName');
// 	var user_token = $api.getStorage('token');
// 	var user_memberId = get_loc_val('mine', 'memberId');
// 	var post_param = {
// 		memberId : user_memberId, //必须，用户id	ff8080815065f95a01506627ad4c0007
// 		progress : now_progress, //必须，当前进度值，视频为秒，试卷为题数量，文档为页码	5
// 		taskId : task_info.taskId, //必须，任务id	1
// 		chapterId : task_info_detail.chapterId, //必须，章节id	chapterId
// 		courseId : courseId, //必须，课程id	ff808081486933e6014889882d9c0590
// 		taskName : task_info.title, //必须，任务名称	taskName
// 		chapterName : task_info_detail.chapterName, //必须，章节名称	chapterName
// 		courseName : course_detail.courseName, //必须，课程名称	courseName
// 		total : total, //必须，任务总长度	48
// 		subjectId : course_detail.subjectId, //必须，科目id	ff808081473905e7014762542d940078
// 		categoryId : course_detail.categoryId, //必须，证书id	ff808081473905e701475cd3c2080001
// 		token : user_token, //必须，用户token	144594636417159iPhoneCourse
// 		memberName : user_nickname, //必须，用户昵称	zhangxiaoyu01
// 		state : state//必须，进度状态默认init，完成：complate	complate
// 	};
// 	ajaxRequest('api/v2.1/chapter/taskProgress', 'post', post_param, function(ret, err) {//008.024保存任务进度日志（new）tested
// 		if (ret && ret.state == 'success') {
// 			/*
// 			 //更新最新进度
// 			 var newest_progress = {
// 			 "courseName":course_detail.courseName,//课程名称,
// 			 "categoryId":course_detail.categoryId,//必须，证书id
// 			 "subjectId":course_detail.subjectId,//必须，科目id
// 			 "chapterName":chapters_child_info.chapterTitle,//必须，章节名称
// 			 "progress":now_progress,
// 			 "memberId":user_memberId,//用户id
// 			 "memberName":user_nickname,//用户昵称
// 			 "courseId":courseId,//课程id
// 			 "taskId":task_info.taskId,//任务id
// 			 "chapterId":chapters_child_info.chapterId,//章节id
// 			 "taskName":task_info.title,//任务名称
// 			 "state":state,
// 			 "total":total
// 			 };
// 			 $api.setStorage(user_nickname+courseId, newest_progress);
// 			 */
// 			//$api.setStorage(user_nickname + courseId, '');
// 			//清除上次的学习进度
// 		}
// 	});
// }