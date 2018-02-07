var is_debug = false;
function CourseDetail(co, ch, su, ca, cn,chapterName,subjectName,categoryName,obj,versionId,lock,expirationTime) {
	if(lock != 0){
        api.toast({msg:'当前的课程已锁定,续费后即可解锁！',location:'middle'})
        return false;
    }
	var course_detail = {};
	course_detail.chapterId = ch;
	course_detail.courseId = co;
	course_detail.subjectId = su;
	course_detail.categoryId = ca;
	course_detail.courseName = cn;
    course_detail.chapterName = chapterName;
    course_detail.subjectName = subjectName;
    course_detail.categoryName = categoryName;
    $api.setStorage('Course_info', course_detail);
    course_detail.examTime = $(obj).find(".exam_time").text();
    course_detail.courseDue = $(obj).find(".course_due").text();

    course_detail.versionId = versionId;//用于切换课程版本

    course_detail.expirationTime = expirationTime;

	//var detail = {};
	//detail.course_id = co;
	////课程id
	//detail.charpterid = ch;
	////章节id
	//detail.courseName = cn;
	////课程名称
	api.openWin({
		name : 'course',
		url : 'course.html',
		slidBackEnabled : false,
        pageParam:course_detail,
		reload : true
	});
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

function get_study() {//顶部学习
	if (is_debug) {
		var data = {
			"total" : 7,
			"courselist" : [{
				"isU" : true,
				"categoryId" : "ff8080814e44227f014e4797ca600073",
				"categoryName" : "CIMA 阶段U+",
				"subjectID" : "61160404-1edf-42c9-8b9d-63ee08b40d37",
				"subjectName" : "F1 business...",
				"courseId" : "ff8080814e44227f014e479bb5a50074",
				"courseName" : "CIMA Enterprise Operations（E1）",
				"taskTotal" : 20,
				"courseBkImage" : "/upload/201507/924f877d5ca942428216a8ddee8b04b9.jpg",
				"teacherName" : "Maggie",
				"teacherImage" : "/upload/201507/26ec729997fc4aee8438a196577748d9.jpg",
				"teacherHonor" : "",
				"lastmodifyTime" : 34234,
				"expirationTime" : '',
				"chapterId" : "ff8080814e48c660014e4c5c22500041",
				"chapterName" : "Human resource practices",
				"taskprogress" : 19
			},
			{
				"isU" : true,
				"categoryId" : "ff8080814e44227f014e4797ca600073",
				"categoryName" : "CIMA 阶段U+",
				"subjectID" : "61160404-1edf-42c9-8b9d-63ee08b40d37",
				"subjectName" : "F1 business...",
				"courseId" : "ff8080814e44227f014e479bb5a50074",
				"courseName" : "CIMA Enterprise Operations（E1）",
				"taskTotal" : 20,
				"courseBkImage" : "/upload/201507/924f877d5ca942428216a8ddee8b04b9.jpg",
				"teacherName" : "Maggie",
				"teacherImage" : "/upload/201507/26ec729997fc4aee8438a196577748d9.jpg",
				"teacherHonor" : "",
				"lastmodifyTime" : 34234,
				"expirationTime" : '',
				"chapterId" : "ff8080814e48c660014e4c5c22500041",
				"chapterName" : "Human resource practices",
				"taskprogress" : 19
			},{
				"isU" : true,
				"categoryId" : "ff8080814e44227f014e4797ca600073",
				"categoryName" : "CIMA 阶段U+",
				"subjectID" : "61160404-1edf-42c9-8b9d-63ee08b40d37",
				"subjectName" : "F1 business...",
				"courseId" : "ff8080814e44227f014e479bb5a50074",
				"courseName" : "CIMA Enterprise Operations（E1）",
				"taskTotal" : 20,
				"courseBkImage" : "/upload/201507/924f877d5ca942428216a8ddee8b04b9.jpg",
				"teacherName" : "Maggie",
				"teacherImage" : "/upload/201507/26ec729997fc4aee8438a196577748d9.jpg",
				"teacherHonor" : "",
				"lastmodifyTime" : 34234,
				"expirationTime" : '',
				"chapterId" : "ff8080814e48c660014e4c5c22500041",
				"chapterName" : "Human resource practices",
				"taskprogress" : 19
			},{
				"isU" : true,
				"categoryId" : "ff8080814e44227f014e4797ca600073",
				"categoryName" : "CIMA 阶段U+",
				"subjectID" : "61160404-1edf-42c9-8b9d-63ee08b40d37",
				"subjectName" : "F1 business...",
				"courseId" : "ff8080814e44227f014e479bb5a50074",
				"courseName" : "CIMA Enterprise Operations（E1）",
				"taskTotal" : 20,
				"courseBkImage" : "/upload/201507/924f877d5ca942428216a8ddee8b04b9.jpg",
				"teacherName" : "Maggie",
				"teacherImage" : "/upload/201507/26ec729997fc4aee8438a196577748d9.jpg",
				"teacherHonor" : "",
				"lastmodifyTime" : 34234,
				"expirationTime" : '',
				"chapterId" : "ff8080814e48c660014e4c5c22500041",
				"chapterName" : "Human resource practices",
				"taskprogress" : 19
			}]
		};
		var tpl = $('#tpl_course').html();
		var content = doT.template(tpl);
		$('#course_content').html(content(data));
		progressBar();
		return false;
	}
	// ajaxRequest('api/v2.1/learning/learningcourse', 'get', {// 003.2 在学的课程列表（new）
	ajaxRequest('api/business/learning/learningcourse/v1.0', 'get', {// 003.2 在学的课程列表（new）
		token : $api.getStorage('token'),
		pageSize : 1000,
		pageNo : 0
	}, function(ret, err) {
		if (err) {
			api.toast({
				msg : err.msg,
				location : 'middle'
			});
			return false;
		}
		if (ret.state == 'success') {
			var learningcourseData = ret;
        	var learningcourse = ret.data.courselist;
        	var courseArr = [];
					for(var i=0;i<learningcourse.length;i++){
						courseArr.push(learningcourse[i].courseId);
					}
        	ajaxRequest({ 'origin': 'http://action.caicui.com/', 'pathname': 'api/userAction/course/getCourseProgress/v1.0/' }, 'get', {'token':getstor('token'),'memberId':getstor('memberId'),'courseId':courseArr.toString()}, function(result, err) {
        			if (err) {
        					api.toast({
        							msg: err.msg,
        							location: 'middle'
        					});
        					return false;
        			}
        			ajaxRequest('api/business/coursestudy/getExamDate', 'get', {// 003.2 在学的课程列表（new）
						memberId : getstor('memberId')
					}, function(res, error) {
					
						if (error) {
	        					api.toast({
	        							msg: err.msg,
	        							location: 'middle'
	        					});
	        					return false;
	        			}
	        			var examDateCurr={};
	        			if(res.data.length<1){
	        				examDateCurr.examinationDate = "";
	        				examDateCurr.categorySign = "";
	        			}else{
	        				examDateCurr.examinationDate = res.data[0].examinationDate;
	        				examDateCurr.categorySign = res.data[0].categorySign;
	        			}
	        			
	        			$api.setStorage('examDateCurr', examDateCurr);
	        			api.sendEvent({
		                    name: "examDateCurr"
		                 });
	        			var newLastProgress = {
		                  RecentCourse : []
		                };
	        			for(var i=0;i<learningcourse.length;i++){
	        				for(var j=0;j<result.data.length;j++){
	        					if(learningcourse[i].courseId == result.data[j].courseId){
	        						learningcourse[i].showProgress = result.data[j].courseProgress;
				                    learningcourse[i].createDate = result.data[j].createDate;

				                    learningcourse[i].chapterId = result.data[j].chapterId;
				                    learningcourse[i].chapterName = result.data[j].chapterName;
				                    learningcourse[i].progress = result.data[j].progress;
				                    learningcourse[i].taskId = result.data[j].taskId;
				                    learningcourse[i].taskName = result.data[j].taskName;
				                    for(var k=0;k<res.data.length;k++){
				                    	if(learningcourse[i].subjectID == res.data[k].categoryId){
					        				learningcourse[i].examinationDate = res.data[k].examinationDate
					        			}
				                    }
				                    
				                    newLastProgress.RecentCourse.push(learningcourse[i])
	        					}

	        				}
	        			}
	              
	              // var filterLastProgress = learningcourse;
		              var filterLastProgress = newLastProgress.RecentCourse;
		              var i = 0,
		                  len = filterLastProgress.length,
		                  j, d;
		              for (; i < len; i++) {
		                  for (j = 0; j < len; j++) {
		                  
		                      if (parseInt(filterLastProgress[i].createDate) > parseInt(filterLastProgress[j].createDate)) {
		                          d = filterLastProgress[j];
		                          filterLastProgress[j] = filterLastProgress[i];
		                          filterLastProgress[i] = d;
		                      }
		                  }
		              }

		              	saveExpire(filterLastProgress);
	        			var ret={
			                data : {
			                  total : learningcourseData.data.total,
			                  courselist : filterLastProgress.slice(0,4)
			                }
			              }

						var tpl = $('#tpl_course').html();
						var content = doT.template(tpl);
						//ret.data['courselist']=bufferCourese(ret.data.courselist);
						
						$('#course_content').html(content(ret.data));
						
						api.parseTapmode();
						circleProgress();
					})
        			
              
              
			});
		} else {
			/*api.toast({
				msg : '在学的课程列表接口异常',
				location : 'middle'
			});
			return false;*/
		}
	});
}
//财萃活动
function get_activity(){
    if(is_debug){
	    var data = {"data":[{"content":"<div style=\"background-position:center top;background-image:url(/upload/201703/a5894537d133450abec29197165634ca.jpg);background-repeat:no-repeat;background-color:#b4cc8e;\">\r\n\t<div class=\"exam-box\">\r\n\t\t<a href=\"http://www.caicui.com/static/Special/cfa-frm2017/\" target=\"_blank\"><img src=\"/upload/201703/6562eb20213e43e88c203a35d176ad07.jpg\" draggable=\"false\" /> </a> <br />\r\n\t</div>\r\n</div>","id":"095a0a6702f911e7afc400163e022e38","valid":true,"title":"cfafrm双语卓越班2017","other":"","imagePath":"/upload/201703/6562eb20213e43e88c203a35d176ad07.jpg","whereTag":0,"url":"http://www.caicui.com/static/Special/cfa-frm2017/"},{"content":"<div style=\"background-position:center top;background-image:url(/upload/201703/52b2e81be52948a5918f365a389925a9.jpg);background-repeat:no-repeat;background-color:#b4cc8e;\">\r\n\t<div class=\"exam-box\">\r\n\t\t<a href=\"http://www.caicui.com/static/Special/2017kaixue/\" target=\"_blank\"><img src=\"/upload/201703/fae04a90a7f941e681b68946913ab9a8.jpg\" draggable=\"false\" /> </a> <br />\r\n\t</div>\r\n</div>","id":"fd855d34057a11e7afc400163e022e38","valid":true,"title":"2017年CFA&FRM开学季","other":"","imagePath":"/upload/201703/52b2e81be52948a5918f365a389925a9.jpg","whereTag":0,"url":"http://www.caicui.com/static/Special/2017kaixue/"},{"content":"<div style=\"background-position:center top;background-image:url(/upload/201702/0acd5771a31c416c9d15155586d09fc2.png);background-repeat:no-repeat;background-color:#b4cc8e;\">\r\n\t<div class=\"exam-box\">\r\n\t\t<a href=\"http://www.caicui.com/static/Special/cma201703/\" target=\"_blank\"><img src=\"/upload/201702/b0c8ef2517f9462daf98cfa62004f913.png\" draggable=\"false\" /> </a> <br />\r\n\t</div>\r\n</div>","id":"86bf67cffcbe11e6afc400163e022e38","valid":true,"title":"CMA新课-一步通关课程专题","other":"","imagePath":"/upload/201702/b0c8ef2517f9462daf98cfa62004f913.png","whereTag":0,"url":""},{"content":"<div style=\"background-position:center top;background-image:url(/upload/201606/602c9b38117a4f89bb9a7a41d22491e6.jpg);background-repeat:no-repeat;\">\r\n\t<div class=\"exam-box\">\r\n\t\t<a href=\"http://www.caicui.com/course/list/CMA.html\" target=\"_blank\"><img src=\"/upload/201606/b9f1b1e6c1e44feb97454651a867e613.jpg\" draggable=\"false\" /> </a> \r\n\t</div>\r\n</div>","id":"6c3c7f563d1e11e6b04700163e022e38","valid":true,"title":"CMA新网课","other":"","imagePath":"/upload/201606/602c9b38117a4f89bb9a7a41d22491e6.jpg","whereTag":0,"url":"http://www.caicui.com/course/list/CMA.html"}],"state":"success","msg":""}
	    var tpl = $('#tpl_activity').html();
	    data.data = data.data.slice(0,3)
	    var content = doT.template(tpl);
	    $('#activity').html(content(data));
    }
    var tpl = $('#tpl_activity').html();
    var content = doT.template(tpl);
    // $('#activity').html(content(data));

    ajaxRequest('api/v2.1/slide/list', 'get', { 
        token: $api.getStorage('token'),
        tag : 0,
        valid : true,
        count : 4
    }, function(ret, err) {
        if (err) {
            api.toast({
                msg: err.msg,
                location: 'middle'
            });
            return false;
        }
        if (ret.state == 'success') {
           var data = ret;
           data.data = data.data.slice(0,3)
           $('#activity').html(content(data));
        }
        
    });
}
function create_lines(x, y1, y2) {
	//曲线图
	var ctx = document.getElementById("canvasLine").getContext("2d");
	var lineChartData = {
		labels : x,
		datasets : [{
			fillColor : "rgba(255,255,255,0)",
			strokeColor : "#00a085",
			pointColor : "#fff",
			pointStrokeColor : "#00a085",
			data : y1
		}, {
			fillColor : "rgba(255,255,255,0)",
			strokeColor : "#4374e0",
			pointColor : "#fff",
			pointStrokeColor : "#4374e0",
			data : y2
		}]
	};
	var myLineChart = new Chart(ctx).Line(lineChartData, {
		scaleOverride : true,
		scaleOverlay : true, // 网格线是否在数据线的上面
		scaleSteps : 6,
		scaleStepWidth : 2,
		scaleStartValue : 0,
		scaleShowLabels : true,
		scaleGridLineWidth : 1,
		scaleLineColor : '#4c4c4c',
		responsive : true,
		pointDot : true
	});
}

function create_chat(obj, n) {//饼图
	loaded = true;
	//饼图
	Morris.Donut({
		element : 'graph',
		data : obj,
		backgroundColor : '#fff',
		labelColor : '#717171',
		colors : ['#07a084', '#fac030', '#cb5851', '#55c4d8', '#82be10'],
		formatter : function(x) {
			var str = (x / n).toFixed(2);
			return str * 100 + "%";
		}
	});
}

function get_used_avg() {//个人学习与所有人平均用时对比
	//接口数据（暂时不用）
	if (is_debug) {
		var res = [{
			"self" : [//个人最近15天每天的学习用时
			1, 3, 7, 3, 5, 7, 5, 8, 1, 5, 7, 4, 2, 3, 4],
			"average" : [//所有人最近15天每天的学习用时
			10, 4, 5, 6, 7, 3, 4, 12, 5, 4, 2, 6, 8, 5, 6],
			"date" : ["2015-09-01", "2015-09-02", "2015-09-03", "2015-09-04", "2015-09-05", "2015-09-06", "2015-09-07", "2015-09-08", "2015-09-09", "2015-09-10", "2015-09-11", "2015-09-12", "2015-09-13", "2015-09-13", "2015-09-13"]
		}];
		var date = res[0]['date'];
		var self = [];
		var average = [];
		var mydate = [];
		for (var p in date) {
			if (p < 7) {
				mydate.push(date[p].split('-')[1] + '.' + date[p].split('-')[2]);
				self.push(res[0]['self'][p]);
				average.push(res[0]['average'][p]);
			}
		}
		create_lines(mydate, self, average);
		return false;
	}
	//return;
	ajaxRequest('api/v2/learning/lines', 'get', {//008.019  个人与所有人用时对比（old）
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
			var res = ret.data;
			var date = res[0]['date'];
			var self = [];
			var average = [];
			var mydate = [];
			for (var p in date) {
				if (p < 7) {
					mydate.push(date[p].split('-')[1] + '.' + date[p].split('-')[2]);
					self.push(res[0]['self'][p]);
					average.push(res[0]['average'][p]);
				}
			}
			create_lines(mydate, self, average);
		} else {
			//api.toast({
			//	msg : ret.msg,
			//	location : 'middle'
			//});
			//return false;
		}
	});
	//定义死的数据（学习概况折线图）
	// var res = [{
	// 		"self" : [//个人最近15天每天的学习用时
	// 		1, 3, 7, 3, 5, 7, 5, 8, 1, 5, 7, 4, 2, 3, 4],
	// 		"average" : [//所有人最近15天每天的学习用时
	// 		10, 4, 5, 6, 7, 3, 4, 12, 5, 4, 2, 6, 8, 5, 6],
	// 		"date" : ["2015-09-01", "2015-09-02", "2015-09-03", "2015-09-04", "2015-09-05", "2015-09-06", "2015-09-07", "2015-09-08", "2015-09-09", "2015-09-10", "2015-09-11", "2015-09-12", "2015-09-13", "2015-09-13", "2015-09-13"]
	// 	}];
	// 	var date = res[0]['date'];
	// 	var self = [];
	// 	var average = [];
	// 	var mydate = [];
	// 	for (var p in date) {
	// 		if (p < 7) {
	// 			mydate.push(date[p].split('-')[1] + '.' + date[p].split('-')[2]);
	// 			self.push(res[0]['self'][p]);
	// 			average.push(res[0]['average'][p]);
	// 		}
	// 	}
	// 	create_lines(mydate, self, average);
	// 	return false;
}

function get_used() {
	//接口数据（暂时不用）
	/*if (is_debug) {
		var ret = [{
			"type" : "看课",
			"value" : 20
		}, {
			"type" : "笔记",
			"value" : 10
		}, {
			"type" : "问答",
			"value" : 10
		}, {
			"type" : "做题",
			"value" : 30
		}, {
			"type" : "讨论",
			"value" : 30
		}];
		var obj = [];
		var n = 0;
		for (var p in ret) {
			obj[p] = {};
			obj[p].label = ret[p].type;
			n += ret[p].value;
			obj[p].value = ret[p].value;
		}
		if (!loaded) {
			create_chat(obj, n);
		}
		var tpl = $('#tpl_used').html();
		var content = doT.template(tpl);
		$('#content-used').html(content({
			data : obj,
			n : n
		}));
		return false;
	}
	ajaxRequest('api/v2.1/scale/browsers', 'get', {//018.1  学习用时占比（new）
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
			var obj = [];
			var n = 0;
			for (var p in ret.data) {
				obj[p] = {};
				obj[p].label = ret.data[p].type;
				n += ret.data[p].value;
				obj[p].value = ret.data[p].value;
			}
			if (!loaded) {
				create_chat(obj, n);
			}
			var tpl = $('#tpl_used').html();
			var content = doT.template(tpl);
			$('#content-used').html(content({
				data : obj,
				n : n
			}));
		} else {
			//api.toast({
			//	msg : ret.msg,
			//	location : 'middle'
			//});
			//return false;
		}
	});*/
	//定死的数据（学时用时占比）
	var ret = [{
			"type" : "看课",
			"value" : 40
		}, {
			"type" : "笔记",
			"value" : 10
		}, {
			"type" : "问答",
			"value" : 10
		}, {
			"type" : "做题",
			"value" : 30
		}, {
			"type" : "讨论",
			"value" : 10
		}];
		var obj = [];
		var n = 0;
		for (var p in ret) {
			obj[p] = {};
			obj[p].label = ret[p].type;
			n += ret[p].value;
			obj[p].value = ret[p].value;
		}
		if (!loaded) {
			create_chat(obj, n);
		}
		var tpl = $('#tpl_used').html();
		var content = doT.template(tpl);
		$('#content-used').html(content({
			data : obj,
			n : n
		}));
		return false;
}

function set_line() {
	$.each($('.percent_box'), function(k, v) {
		var s = $(v).attr('s');
		$(v).parent('.chapter_box').siblings('.progress_line').children('.line_box').css('width', s + '%');
		if (s == 0) {
			$(v).css('background', '#999')
		}
	});
}

//能力评估
function get_ability() {
	//接口数据（暂时不用）
	if (is_debug) {
		var able = {
			"ranking" : 3249, //排名
			"total" : 10009, //做过的试题总数
			"error" : 1, //曾经做错的试题总数
			"chapter" : 10, //章节错题百分比10%
			"intelligent" : 10, //智能组卷错题百分比8%
			"knowledgePoint" : 20, //考点联系错题百分比10%
			"real" : 40, //历年真题错题百分比10%
			"simulated" : 20 //模拟错题百分比10%
		};
		var tpl = $('#tpl_able').html();
		var tpl_score = $('#tpl_score').html();
		var content = doT.template(tpl);
		$('#content_able').html(content(able));
		var content_score = doT.template(tpl_score);
		$('#content_score').html(content_score(able));
		$('.ranking').html(able.ranking);
		set_line();
		circleProgress();
		//圆环动画
		return false;
	}
	var able = $api.getStorage('capabilityAssessment');
	able = '';
	if (!isEmpty(able)) {
		var tpl = $('#tpl_able').html();
		var tpl_score = $('#tpl_score').html();
		var content = doT.template(tpl);
		$('#content_able').html(content(able));
		var content_score = doT.template(tpl_score);
		$('#content_score').html(content_score(able));
		$('.ranking').html(able.ranking);
		set_line();
		circleProgress();
		//圆环动画
		return false;
	}
	ajaxRequest('api/v2/capabilityAssessment', 'get', {//008.017  能力评估
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
			$api.setStorage('capabilityAssessment', ret.data[0]);
			if (!isEmpty(ret.data[0])) {
				var tpl = $('#tpl_able').html();
				var tpl_score = $('#tpl_score').html();
				var content = doT.template(tpl);
				$('#content_able').html(content(ret.data[0]));
				var content_score = doT.template(tpl_score);
				$('#content_score').html(content_score(ret.data[0]));
				$('.ranking').html(ret.data[0].ranking);
				set_line();
				circleProgress();
				//圆环动画
				api.parseTapmode();
			}
		} else {
			//api.toast({
			//	msg : ret.msg,
			//	location : 'middle'
			//});
			//return false;
		}
	});
	//定义死的数据（能力评估）
	// var able = {
	// 		"ranking" : 3249, //排名
	// 		"total" : 5688, //做过的试题总数
	// 		"error" : 150, //曾经做错的试题总数
	// 		"chapter" : 10, //章节错题百分比10%
	// 		"intelligent" : 10, //智能组卷错题百分比8%
	// 		"knowledgePoint" : 20, //考点联系错题百分比10%
	// 		"real" : 40, //历年真题错题百分比10%
	// 		"simulated" : 20 //模拟错题百分比10%
	// 	};
	// var tpl = $('#tpl_able').html();
	// var tpl_score = $('#tpl_score').html();
	// var content = doT.template(tpl);
	// $('#content_able').html(content(able));
	// var content_score = doT.template(tpl_score);
	// $('#content_score').html(content_score(able));
	// $('.ranking').html(able.ranking);
	// set_line();
	// circleProgress();
	// //圆环动画
	// return false;
}

function get_error() {
	//接口数据
	/*ajaxRequest('api/v2/state/test', 'get', {//018.016  统计剩余错题数，已消灭错题数
		token : $api.getStorage('token')
	}, function(ret, err) {
		if (err) {
			api.toast({
				msg : err.msg,
				location : 'middle'
			});
			return false;
		}
		if (ret.state == 'success') {alert(JSON.stringify(ret))
			var tpl = $('#tpl_error').html();
			var content = doT.template(tpl);
			$('#content_error').html(content(ret.data[0]));
			api.parseTapmode();
		} else {
			//api.toast({
			//	location : 'middle',
			//	msg : ret.msg
			//});
			//return false;
		}
	});*/
	//定义死的数据（错题本）
	var tpl = $('#tpl_error').html();
	var content = doT.template(tpl);
	$('#content_error').html(content({'correct':10,'leave':6}));
}

if (is_debug) {
	//在学的课程
	get_study();
	//个人学习与所有人平均用时对比
	//get_used_avg();
	//学习用时占比
	//get_used();
	//能力评估
	//get_ability();
	//消灭错题
	//get_error();
	//财萃活动
	get_activity();
}
var loaded = false;
apiready = function() {
    api.addEventListener({
        name : 'flush_index'
    }, function(ret) {
        //在学的课程
        get_study();
        //个人学习与所有人平均用时对比
        //get_used_avg();
        //学习用时占比
        //get_used();
        //能力评估
        //get_ability();
        //消灭错题
        //get_error();
        //财萃活动
		get_activity();
    });
	//监听下拉刷新
	api.setRefreshHeaderInfo({
		visible : true,
		loadingImg : 'widget://image/arrow-down-o.png',
		bgColor : '#f3f3f3',
		textColor : '#787b7c',
		textDown : '下拉更多',
		textUp : '松开刷新',
		showTime : false
	}, function(ret, err) {
		//在学的课程
		get_study();
		//个人学习与所有人平均用时对比
		//get_used_avg();
		//学习用时占比
		//get_used();
		//能力评估
		//get_ability();
		//消灭错题
		//get_error();
		//财萃活动
		get_activity();
	});
	//在学的课程
	get_study();
	//个人学习与所有人平均用时对比
	//get_used_avg();
	//学习用时占比
	//get_used();
	//能力评估
	//get_ability();
	//消灭错题
	//get_error();
	//财萃活动
	get_activity();

};
