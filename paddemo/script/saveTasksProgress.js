;
(function(window) {
    var saveTasksProgress = {
        user_nickname: '',
        user_token: '',
        user_memberId: '',
        saveServerNum: 0,
        saveServerTimes : 0,
        saveServerIndex : 50,
        saveDBNum: 0,
        courseIdNum: 0,
        init: function() {
            if (saveTasksProgress.online()) {
                saveTasksProgress.saveServerNum = 0;
                saveTasksProgress.saveDBNum = 0;
                saveTasksProgress.courseIdNum = 0;
                saveTasksProgress.save();
            } else {

            }
        },
        online: function() {
            if (api.connectionType != 'unknown' || api.connectionType != 'none') {
                return true;
            } else {
                return false;
            }
        },
        save: function(courseId) {
            DB.getCourseIdAll(function(ret, err) {
                // alert(JSON.stringify(ret)+';'+JSON.stringify(err))
                if (ret && ret.length) {
                    saveTasksProgress.getCourseTaskProgress(ret);
                }
            })
        },
        getCourseTaskProgress: function(courseIdArr) {
            if (saveTasksProgress.courseIdNum >= (courseIdArr.length)) {
                saveTasksProgress.courseIdNum = 0;
                return false;
            }
            DB.getCourseTaskProgress(courseIdArr[saveTasksProgress.courseIdNum], function(data) {
                if (data && data.length) {
                    saveTasksProgress.getUpdateDBData(courseIdArr[saveTasksProgress.courseIdNum], data, function(updateDBData, updateServerData) {
                        // alert('updateDBData::'+JSON.stringify(updateDBData))
                        // alert('updateServerData::'+JSON.stringify(updateServerData))
                        if (updateDBData && updateDBData.length) {
                            saveTasksProgress.saveDB(updateDBData);
                        }
                        // if(updateServerData && updateServerData.length){
                        // 	saveTasksProgress.saveServer(updateServerData);
                        // }

                    });
                    DB.getTasksProgressSupplyAll(function(data) {
                        saveTasksProgress.saveServer(data, function() {
                            saveTasksProgress.courseIdNum++;
                            saveTasksProgress.getCourseTaskProgress(courseIdArr);
                        });
                    })

                }
            })
        },
        getUpdateDBData: function(courseId, data, callback) {
            var updateTasksProgressDB = [];
            var updateTasksProgressServer = [];
            var tasksProgressDB = data;
            var tasksProgressDBLength = data.length;
            var tasksProgressServer = [];
            var tasksProgressServerLength = 0;


            //获取课程任务进度列表（new）tested
            var param = {
                'token': getstor('token'), //必须
                'memberId': getstor('memberId'),
                'courseId': courseId //课程ID,必须
            };
            //ajaxRequest('api/userAction/course/getTasksProgress/v1.0/', 'get', param, function (ret, err) {
            ajaxRequest({ 'origin': 'http://action.caicui.com/', 'pathname': 'api/userAction/course/getTasksProgress/v1.0/' }, 'get', param, function(ret, err) {
            // ajaxRequest('api/v2/study/getTasksProgress', 'get', param, function(ret, err) { //008.022 获取课程任务进度列表（new）tested，接口编号：008-022
                if (err) {
                    return false;
                } else if (ret && ret.state == 'success') {
                    tasksProgressServer = ret.data;
                    tasksProgressServerLength = ret.data.length;
                     // alert('/v2/study/getTasksProgre'+JSON.stringify(tasksProgressDB)+JSON.stringify(tasksProgressServer))
                    // for(var i=0;i<tasksProgressDBLength;i++){
                    //     var different = 0;
                    //     for(var j=0;j<tasksProgressServerLength;j++){
                    //         if(tasksProgressDB[i].taskId==tasksProgressServer[j].taskId){
                    //         	//createDate 比较创建时间
                    //         	var createDateDB = parseInt(tasksProgressDB[i].createDate)
                    //         	var createDateServer = parseInt(tasksProgressServer[j].createDate)
                    //             if(createDateDB>createDateServer){
                    //               updateTasksProgressServer.push(tasksProgressDB[i]);
                    //             }else if(createDateDB<createDateServer){
                    //             	updateTasksProgressDB.push(tasksProgressServer[j]);
                    //             }
                    //         }else{
                    //             different ++;
                    //         }
                    //     }
                    //     if(different >= tasksProgressServerLength){
                    //       updateTasksProgressServer.push(tasksProgressDB[i]);
                    //   }
                    // }
                    for (var i = 0; i < tasksProgressServerLength; i++) {
                        var different = 0;
                        for (var j = 0; j < tasksProgressDBLength; j++) {
                            if (tasksProgressDB[j].taskId == tasksProgressServer[i].taskId) {
                                var createDateDB = parseInt(tasksProgressDB[j].createDate)
                                var createDateServer = parseInt(tasksProgressServer[i].createDate)
                                if (createDateDB < createDateServer) {
                                    updateTasksProgressDB.push(tasksProgressServer[i]);
                                }
                            } else {
                                different++;
                            }
                        }
                        if (different >= tasksProgressDBLength) {
                            updateTasksProgressDB.push(tasksProgressServer[i]);
                        }
                    }
                    if (callback) { callback(updateTasksProgressDB, updateTasksProgressServer) };
                }
            });
        },
        saveDB: function(data) {
            if (saveTasksProgress.saveDBNum >= data.length) {
                saveTasksProgress.saveDBNum = 0;
                return false;
            }
            DB.saveTasksProgress(data[saveTasksProgress.saveDBNum], function(ret, err) {
                saveTasksProgress.saveDBNum++;
                saveTasksProgress.saveDB(data);
            });
        },
        saveServer: function(data) {
        		var length = parseInt(data.length/saveTasksProgress.saveServerIndex);
        		if (saveTasksProgress.saveServerTimes > length) {
      		    saveTasksProgress.saveServerTimes = 0;
              DB.clearTasksProgressLog();
      		    return false;
        		}
      			var progressArr = [];
      			if(length){
      				var loopJ = (saveTasksProgress.saveServerIndex*i);
      				var loopL = 0;
      				if(i==length){
      					loopL = data.length-loopJ;
      					for(var j=loopJ;j<loopL;j++){
      						progressArr.push(data[j]);
      					}
      				}else{
      					loopL = (saveTasksProgress.saveServerIndex*(i+1))
      					for(var j=loopJ;j<loopL;j++){
      						progressArr.push(data[j]);
      					}
      				}
      			}else{
      				progressArr = data;
      			}
        		var param = {
        			record : []
        		}
            for(var i=0;i<progressArr.length;i++){
            	var taskProgressData = progressArr[i];

            	var post_param = {
            	    token: taskProgressData.token, //必须，用户token    144594636417159iPhoneCourse
            	    memberId: taskProgressData.memberId, //必须，用户id ff8080815065f95a01506627ad4c0007
            	    memberName: taskProgressData.memberName, //必须，用户昵称   zhangxiaoyu01

            	    categoryId: taskProgressData.categoryId, //必须，证书id    ff808081473905e701475cd3c2080001
            	    categoryName: taskProgressData.categoryName, 
            	    subjectId: taskProgressData.subjectId, //必须，科目id  ff808081473905e7014762542d940078
            	    subjectName: taskProgressData.subjectName,
            	    courseId: taskProgressData.courseId, //必须，课程id    ff808081486933e6014889882d9c0590
            	    courseName: taskProgressData.courseName, //必须，课程名称    courseName
            	    chapterId: taskProgressData.chapterId, //必须，章节id   chapterId
            	    chapterName: taskProgressData.chapterName, //必须，章节名称   chapterName
            	    taskId: taskProgressData.taskId, //必须，任务id    1
            	    taskName: taskProgressData.title, //必须，任务名称   taskName

            	    progress: parseInt(taskProgressData.progress), //必须，当前进度值，视频为秒，试卷为题数量，文档为页码   5
            	    total: parseInt(taskProgressData.total), //必须，任务总长度   48
            	    state: parseInt(taskProgressData.state), //必须，进度状态默认init，完成：complate    complate
            	    // createDate : taskProgressData.createDate,
            	    // isSupply : 1
            	};
            	param.record.push(post_param)
            }
            if(param.record &&param.record.length){
              ajaxRequest({ 'origin': 'http://action.caicui.com/', 'pathname': 'api/userAction/course/taskProgressPackets/v1.0/' }, 'post', {'token':getstor('token'),'messages':JSON.stringify(param)}, function(ret, err) {
               if (err) {
                      return false;
                  } else {
                      saveTasksProgress.saveServerTimes++;
                      saveTasksProgress.saveServer(data);
                  }
              });
            }
            
        }
    }
    window.saveTasksProgress = {
        init: saveTasksProgress.init,
        getCourseTaskProgress: saveTasksProgress.getCourseTaskProgress
    }
})(window);
