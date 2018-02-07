var last_progress;
//上次的学习进度
var course_detail;
//课程详情
var courseId;
//课程id
var  pageName ="course-list";
var chapters_num = 0;
//第几个章节
var chapters_child_num = 0;
//第几个子章节（从0开始）
var child_task_num = 0;
//子章节的任务（从0开始）
var chapters_info = '';
//当前一级章节信息
var chapters_child_info = '';
//当前二级章节信息
var task_info = '';
var is_debug=false;
var videoData;

var  memberId;
function my_data(){
    //当前任务信息
    var data = [{"createTime":"1433229349","effectiveDay":"180","taskTotal":"111","chapters":[{"isLeaf":"false","isFree":"false","chapterId":"ff8080814dad5062014db32051bf01a3","tasks":null,"chapterFiles":null,"chapterExtends":null,"chapterTitle":"INTRODUCTION","children":[{"isLeaf":"true","isFree":"true","chapterId":"ff8080814dad5062014db32051c601a4","tasks":[{"attachmentPath":"/upload/201511/374e1ea9c2344a1e896896db409b1b86.pdf","videoTime":933,"apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","videoCcid":"9BA2B71CAE5EB9CE9C33DC5901307461","videoSiteId":"D550E277598F7D23","taskType":"video","title":"F1-课程介绍","taskId":"ff8080814dad5062014db32051cd01a5","taskLevel":null,"id":"ff8080814816c9de01481c2aaf9f00ab"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080815123b568015123bb7b5f0005","taskType":"exam","title":"题库题型大全","taskId":"ff8080815123b568015123cadab20022","taskLevel":null,"id":"ff8080815123b568015123bb7b5f0005"},{"entryUrl":null,"taskType":"entry","title":"","taskId":"ff808081513ca21001513d8aab4600b7","taskLevel":null,"id":"ff8080814c25dd11014c313ef9b6011c"},{"totalCount":null,"pdfPic":["/cache/ff8080814f3eb9ed014f4eb5eb201f24_0001.png","/cache/ff8080814f3eb9ed014f4eb5eb201f24_0002.png","/cache/ff8080814f3eb9ed014f4eb5eb201f24_0003.png","/cache/ff8080814f3eb9ed014f4eb5eb201f24_0004.png","/cache/ff8080814f3eb9ed014f4eb5eb201f24_0005.png","/cache/ff8080814f3eb9ed014f4eb5eb201f24_0006.png","/cache/ff8080814f3eb9ed014f4eb5eb201f24_0007.png","/cache/ff8080814f3eb9ed014f4eb5eb201f24_0008.png","/cache/ff8080814f3eb9ed014f4eb5eb201f24_0009.png","/cache/ff8080814f3eb9ed014f4eb5eb201f24_0010.png","/cache/ff8080814f3eb9ed014f4eb5eb201f24_0011.png","/cache/ff8080814f3eb9ed014f4eb5eb201f24_0012.png","/cache/ff8080814f3eb9ed014f4eb5eb201f24_0013.png"],"pdfUrl":"/resCourse/2015/08/21/C0FD4599005B470F93445EB696D41020.pdf","taskType":"pdfread","title":"","taskId":"ff808081513ca21001513d8b79fe00b8","taskLevel":null,"id":"ff8080814f3eb9ed014f4eb5eb201f24"}],"chapterFiles":[{"title":"splan","url":"/resCourse/2015/08/21/16B291CDA213481C8D074CC72D95DB6E.pdf","updateTime":1448438109,"id":"ff808081513ca21001513da395bc00d3","type":"pdf","size":"81155"}],"chapterExtends":[{"title":"特许公认会计师公会(The Association of Chartered Certified Accountants，简称ACCA)","url":"http://baike.baidu.com/link?url=bgitTdoOfmjtdmGG8ucvXGEp6v3Rz00FJSUwIWtLpn8Shsk7UwyPBnbI6eWqQG8cLxBNNSylxZm7Wb8_D-H_i4tc1Ls2SzE1VrGC4r3Nsxv2EwROfeGFYxZkWWs5TKUQ","updateTime":1448438212,"id":"ff808081513ca21001513da5265100d4"}],"chapterTitle":"F1-课程介绍","children":null}]},{"isLeaf":"false","isFree":"false","chapterId":"ff8080814dad5062014db32051d101a6","tasks":null,"chapterFiles":null,"chapterExtends":null,"chapterTitle":"PART A BUSINESS ORGANISATIONAL STRUCTURE, FUNCTION AND GOVERNANCE","children":[{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db320529401d1","tasks":[{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f25336cfa0156","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68bc144017ad","taskLevel":null,"id":"ff8080814f24c33f014f25336cfa0156"},{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART A-Chapter 9 Committees in Business Organisation.PDF","videoTime":1700,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"2C4C28F3BA9A0B079C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 9 Committees in Business Organisation","taskId":"ff8080814dad5062014db320529b01d2","taskLevel":null,"id":"ff808081473905e701477c3b93d800b8"},{"attachmentPath":"","videoTime":"251","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"728C50E4DDCA2AB89C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 9 课后习题","taskId":"ff8080814dad5062014db32052a501d4","taskLevel":null,"id":"ff80808147c904170147c994b2c3000b"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d85f1500456","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68bc93a617ae","taskLevel":null,"id":"ff8080814f0b1b74014f0d85f1500456"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 9 Committees in Business Organisation","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db320523b01bb","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART A-Chapter 5 Informal Business Organisation.PDF","videoTime":1716,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"8A007C9317A58F919C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 5 Informal Business Organisation","taskId":"ff8080814dad5062014db320524101bc","taskLevel":null,"id":"ff808081473905e701477c3956cb00b4"},{"attachmentPath":"","videoTime":259,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"F9B234EA0E68DA8A9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 5 课后习题","taskId":"ff8080814dad5062014db320524a01be","taskLevel":null,"id":"ff80808147c904170147c986d3db0006"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f25a8cf014f25d58d120087","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68b3f5771795","taskLevel":null,"id":"ff8080814f25a8cf014f25d58d120087"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d83357b044e","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68b498221796","taskLevel":null,"id":"ff8080814f0b1b74014f0d83357b044e"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 5 Informal Business Organisation","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32052a801d6","tasks":[{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f25904615022e","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68bd1be117af","taskLevel":null,"id":"ff8080814f24c33f014f25904615022e"},{"attachmentPath":"","videoTime":3151,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"C3B67A5A8CB8F7D99C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 10 Governance and Social Responsibility in Business-1","taskId":"ff8080814dad5062014db32052ae01d7","taskLevel":null,"id":"ff808081473905e701477c3c0d7300b9"},{"attachmentPath":"","videoTime":2224,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"99E14CACC338C35B9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 10 Governance and Social Responsibility in Business-2","taskId":"ff8080814dad5062014db32052b801d9","taskLevel":null,"id":"ff80808147c904170147c996985f000c"},{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART A-Chapter 10 Governance and Social Responsibility in Business-3.PDF","videoTime":2140,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"EBC4FC1CAEF8CFAB9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 10 Governance and Social Responsibility in Business-3","taskId":"ff8080814dad5062014db32052c101db","taskLevel":null,"id":"ff80808147c904170147c998ad59000d"},{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART A-Chapter 10 Governance and Social Responsibility in Business-4.PDF","videoTime":4923,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"27B88350BD95A3B19C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 10 Governance and Social Responsibility in Business-4","taskId":"ff8080814dad5062014db32052ca01dd","taskLevel":null,"id":"ff80808147c904170147c999ef41000e"},{"attachmentPath":"","videoTime":583,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"F3F5E83A71371A769C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 10 课后习题","taskId":"ff8080814dad5062014db32052d401df","taskLevel":null,"id":"ff80808147c904170147c99b7000000f"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d864c8b0457","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68bdba4317b0","taskLevel":null,"id":"ff8080814f0b1b74014f0d864c8b0457"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 10 Governance and Social Responsibility in Business","children":null},{"isLeaf":"true","isFree":"true","chapterId":"ff8080814dad5062014db32051d501a7","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART A-Chapter 1 Organisation and Types of Organisation.PDF","videoTime":5037,"apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","videoCcid":"22F407B45223FB8A9C33DC5901307461","videoSiteId":"D550E277598F7D23","taskType":"video","title":"Chapter 1 Organisation and Types of Organisation","taskId":"ff8080814dad5062014db32051db01a8","taskLevel":null,"id":"ff808081473905e701477c36972f00b0"},{"attachmentPath":"","videoTime":269,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"104DBF95CE722DE39C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 1 课后习题","taskId":"ff8080814dad5062014db333f30d0255","taskLevel":null,"id":"ff80808147c904170147c96a33f90001"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f2518383b00ec","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68abde5a178e","taskLevel":null,"id":"ff8080814f24c33f014f2518383b00ec"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d768994043e","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68ab2072178d","taskLevel":null,"id":"ff8080814f0b1b74014f0d768994043e"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 1 Organisation and Types of Organisation","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db320524e01c0","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART A-Chapter 6 Organisational Culture in Business-1.PDF","videoTime":2493,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"7843CEED4E70DE269C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 6 Organisational Culture in Business-1","taskId":"ff8080814dad5062014db320525401c1","taskLevel":null,"id":"ff808081473905e701477c39b35800b5"},{"attachmentPath":"","videoTime":3871,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"4F1E5EF28A03F6A49C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 6 Organisational Culture in Business-2","taskId":"ff8080814dad5062014db320525d01c3","taskLevel":null,"id":"ff80808147c904170147c98e65020008"},{"attachmentPath":"","videoTime":341,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"CCF118E4973FEB2C9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 6 课后习题","taskId":"ff8080814dad5062014db320526701c5","taskLevel":null,"id":"ff80808147c904170147c98814100007"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f25a8cf014f25d509ab0081","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68b5e94317a0","taskLevel":null,"id":"ff8080814f25a8cf014f25d509ab0081"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d839c4b044f","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68b6a7d317a1","taskLevel":null,"id":"ff8080814f0b1b74014f0d839c4b044f"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 6 Organisational Culture in Business","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32051ea01ac","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART A-Chapter 2 Types of Business Organisation.PDF","videoTime":4215,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"4E5E80AD6D22CEB89C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 2 Types of Business Organisation","taskId":"ff8080814dad5062014db32051f001ad","taskLevel":null,"id":"ff808081473905e701477c3725da00b1"},{"attachmentPath":"","videoTime":510,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"15E8576515590BB69C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 2 课后习题","taskId":"ff8080814dad5062014db32051f901af","taskLevel":null,"id":"ff80808147c904170147c96d3e7b0002"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d81f35e0446","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68afdbda1790","taskLevel":null,"id":"ff8080814f0b1b74014f0d81f35e0446"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f25090e4600de","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68ae98b2178f","taskLevel":null,"id":"ff8080814f24c33f014f25090e4600de"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 2 Types of Business Organisation","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db320526b01c7","tasks":[{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f252ff0d5013d","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68b767cf17a2","taskLevel":null,"id":"ff8080814f24c33f014f252ff0d5013d"},{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART A-Chapter 7 Stakeholders in Business Organisaition.PDF","videoTime":1999,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"DD64168C4EF5F75B9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 7 Stakeholders in Business Organisaition","taskId":"ff8080814dad5062014db320527301c8","taskLevel":null,"id":"ff808081473905e701477c3a34a700b6"},{"attachmentPath":"","videoTime":540,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"FDDDB7DE05DDDE639C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 7 课后习题","taskId":"ff8080814dad5062014db320527d01ca","taskLevel":null,"id":"ff80808147c904170147c9908ad20009"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d84f9b40454","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68b7d49717a3","taskLevel":null,"id":"ff8080814f0b1b74014f0d84f9b40454"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 7 Stakeholders in Business Organisaition","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32051fc01b1","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART A-Chapter 3 Business Models.PDF","videoTime":4232,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"6E32651226F563129C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 3 Business Models","taskId":"ff8080814dad5062014db320520201b2","taskLevel":null,"id":"ff808081473905e701477c3882b500b2"},{"attachmentPath":"","videoTime":276,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"359D2B984FAA88579C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 3 课后习题","taskId":"ff8080814dad5062014db320520b01b4","taskLevel":null,"id":"ff80808147c904170147c97cad440004"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f2524b9be010e","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68b0be6d1791","taskLevel":null,"id":"ff8080814f24c33f014f2524b9be010e"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d8256740447","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68b16e3f1792","taskLevel":null,"id":"ff8080814f0b1b74014f0d8256740447"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 3 Business Models","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db320528001cc","tasks":[{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f25910b3b0236","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68bad2b217a4","taskLevel":null,"id":"ff8080814f24c33f014f25910b3b0236"},{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART A-Chapter 8 Information Technology and Information Systems in Business.PDF","videoTime":4813,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"2549A30105510D7C9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 8 Information Technology and Information Systems in Business","taskId":"ff8080814dad5062014db320528701cd","taskLevel":null,"id":"ff808081473905e701477c3b2cee00b7"},{"attachmentPath":"","videoTime":461,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"60DE8C58A1C5BC1B9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 8 课后习题","taskId":"ff8080814dad5062014db320529101cf","taskLevel":null,"id":"ff80808147c904170147c99297ab000a"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d856cf40455","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68bb65f717ac","taskLevel":null,"id":"ff8080814f0b1b74014f0d856cf40455"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 8 Information Technology and Information Systems in Business","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db320522101b6","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART A-Chapter 4 Function of Main Departments in Business Organisation.PDF","videoTime":2394,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"B25DBBA58D7264379C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 4 Function of Main Departments in Business Organisation","taskId":"ff8080814dad5062014db320522f01b7","taskLevel":null,"id":"ff808081473905e701477c38fe3e00b3"},{"attachmentPath":"","videoTime":557,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"46446E0AAE977AAB9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 4 课后习题","taskId":"ff8080814dad5062014db320523801b9","taskLevel":null,"id":"ff80808147c904170147c98486130005"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f25a8cf014f25d672860093","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68b2866e1793","taskLevel":null,"id":"ff8080814f25a8cf014f25d672860093"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d82c2e80448","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68b332f71794","taskLevel":null,"id":"ff8080814f0b1b74014f0d82c2e80448"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 4 Function of Main Departments in Business Organisation","children":null}]},{"isLeaf":"false","isFree":"false","chapterId":"ff8080814dad5062014db32052d701e1","tasks":null,"chapterFiles":null,"chapterExtends":null,"chapterTitle":"PART B THE BUSINESS ENVIRONMENT","children":[{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db320530b01ee","tasks":[{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f259812150252","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68c6f49717f9","taskLevel":null,"id":"ff8080814f24c33f014f259812150252"},{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART B-Chapter 14 Micro-economic Factors.PDF","videoTime":4634,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"815DB9816A6E78EB9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 14 Micro-economic Factors","taskId":"ff8080814dad5062014db320531201ef","taskLevel":null,"id":"ff808081473905e701477c3f071b00bf"},{"attachmentPath":"","videoTime":714,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"A44176E1E27D0FF29C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 14 课后习题","taskId":"ff8080814dad5062014db320531c01f2","taskLevel":null,"id":"ff808081485e0f2601485eab01470068"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d8778aa045a","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68c4ebac17f8","taskLevel":null,"id":"ff8080814f0b1b74014f0d8778aa045a"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 14 Micro-economic Factors","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db320531f01f3","tasks":[{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f259967230255","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68c7dd1817fa","taskLevel":null,"id":"ff8080814f24c33f014f259967230255"},{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART B-Chapter 15 Social-cultural, Technological and Environmental Factors.PDF","videoTime":1569,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"DBC63380D4F3FB4A9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 15 Social-cultural, Technological and Environmental Factors","taskId":"ff8080814dad5062014db320532601f4","taskLevel":null,"id":"ff808081473905e701477c3f8da400c0"},{"attachmentPath":"","videoTime":253,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"E19B4140E5A3866E9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 15 课后习题","taskId":"ff8080814dad5062014db320533001f7","taskLevel":null,"id":"ff808081485e0f2601485eabcaaf0069"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d883e45045b","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68c8792317fb","taskLevel":null,"id":"ff8080814f0b1b74014f0d883e45045b"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 15 Social-cultural, Technological and Environmental Factors","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32052db01e2","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART B-Chapter 11 External Environment.PDF","videoTime":383,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"5902AABEDCC6DF7C9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 11 External Environment","taskId":"ff8080814dad5062014db32052e201e3","taskLevel":null,"id":"ff808081473905e701477c3db20e00bc"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 11 External Environment","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db320533301f8","tasks":[{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f259a92520259","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68c946ae1808","taskLevel":null,"id":"ff8080814f24c33f014f259a92520259"},{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART B-Chapter 16 Business Analysis Models.PDF","videoTime":1757,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"44EAB77273B014F19C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 16 Business Analysis Models","taskId":"ff8080814dad5062014db320533a01f9","taskLevel":null,"id":"ff808081473905e701477c3fd50900c1"},{"attachmentPath":"","videoTime":513,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"8E63EC9C2462B81B9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 16 课后习题","taskId":"ff8080814dad5062014db320534501fc","taskLevel":null,"id":"ff808081485e0f2601485e8285c30045"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d8891c4045c","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68c9c4e01809","taskLevel":null,"id":"ff8080814f0b1b74014f0d8891c4045c"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 16 Business Analysis Models","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32052e501e4","tasks":[{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f25938283023b","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68bf905917b1","taskLevel":null,"id":"ff8080814f24c33f014f25938283023b"},{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART B-Chapter 12 The Political and Legal Factors.PDF","videoTime":2524,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"F922AFCCCF2858369C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 12 The Political and Legal Factors","taskId":"ff8080814dad5062014db32052ec01e5","taskLevel":null,"id":"ff808081473905e701477c3e138400bd"},{"attachmentPath":"","videoTime":199,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"EF404E5758A4B4E49C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 12 课后习题","taskId":"ff8080814dad5062014db32052f501e7","taskLevel":null,"id":"ff80808147c904170147c99dfa090010"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d86bd160458","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68c0380917b2","taskLevel":null,"id":"ff8080814f0b1b74014f0d86bd160458"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 12 The Political and Legal Factors","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32052f801e9","tasks":[{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f259517750245","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68c129e317d7","taskLevel":null,"id":"ff8080814f24c33f014f259517750245"},{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART B-Chapter 13 Macro-economic Factors.PDF","videoTime":5503,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"C5295E72509B2C399C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 13 Macro-economic Factors","taskId":"ff8080814dad5062014db32052ff01ea","taskLevel":null,"id":"ff808081473905e701477c3e786900be"},{"attachmentPath":"","videoTime":477,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"E059B3A971D61D4C9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 13 课后习题","taskId":"ff8080814dad5062014db320530901ed","taskLevel":null,"id":"ff808081485e0f2601485eaa314b0067"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f0b1b74014f0d8717570459","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68c1d05317d8","taskLevel":null,"id":"ff8080814f0b1b74014f0d8717570459"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 13 Macro-economic Factors","children":null}]},{"isLeaf":"false","isFree":"false","chapterId":"ff8080814dad5062014db320534901fd","tasks":null,"chapterFiles":null,"chapterExtends":null,"chapterTitle":"PART C ACCOUNTING AND REPORTING SYSTEMS, CONTROLS AND COMPLIANCE","children":[{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32053610203","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART C-Chapter 18 Law and Regulation Governing Accounting.PDF","videoTime":788,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"F0B84857DCC818FE9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 18 Law and Regulation Governing Accounting","taskId":"ff8080814dad5062014db32053680204","taskLevel":null,"id":"ff808081473905e701477c407c6e00c3"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f259d03480264","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68cbc6621821","taskLevel":null,"id":"ff8080814f24c33f014f259d03480264"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 18 Law and Regulation Governing Accounting","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db320536b0206","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART C-Chapter 19 Financial Systems and Procedures (Financial Control System).PDF","videoTime":2197,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"EB6817E20899F2769C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 19 Financial Systems and Procedures (Financial Control System)","taskId":"ff8080814dad5062014db32053720207","taskLevel":null,"id":"ff808081473905e701477c415e8000c4"},{"attachmentPath":"","videoTime":165,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"098347CBBC4AC5769C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 19 课后习题","taskId":"ff8080814dad5062014db33293df0254","taskLevel":null,"id":"ff808081485e0f2601485e89440f0047"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f25a1906302a8","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68ccd8851828","taskLevel":null,"id":"ff8080814f24c33f014f25a1906302a8"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 19 Financial Systems and Procedures (Financial Control System)","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db3205380020b","tasks":[{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f259e0e280267","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68cd7f751829","taskLevel":null,"id":"ff8080814f24c33f014f259e0e280267"},{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART C-Chapter 20 IT Systems Security and Safety.PDF","videoTime":1063,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"271ABA4BC2EAEBEB9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 20 IT Systems Security and Safety","taskId":"ff8080814dad5062014db3205387020c","taskLevel":null,"id":"ff808081473905e701477c4217dc00c5"},{"attachmentPath":"","videoTime":56,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"A2EE2D785028FD8F9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 20 课后习题","taskId":"ff8080814dad5062014db3205392020f","taskLevel":null,"id":"ff808081485e0f2601485e8b38790048"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 20 IT Systems Security and Safety","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32053960210","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART C-Chapter 21 Fraud and Fraudulent Behaviour and Their Prevention in Business.PDF","videoTime":1982,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"97F9CBE1797E8E009C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 21 Fraud and Fraudulent Behaviour and Their Prevention in Business","taskId":"ff8080814dad5062014db320539e0211","taskLevel":null,"id":"ff808081473905e701477c42642300c6"},{"attachmentPath":"","videoTime":405,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"037C050924A555129C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 21 课后习题","taskId":"ff8080814dad5062014db32526bd0252","taskLevel":null,"id":"ff808081485e0f2601485e8d5a940049"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f259f032e0269","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68ce8677182a","taskLevel":null,"id":"ff8080814f24c33f014f259f032e0269"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 21 Fraud and Fraudulent Behaviour and Their Prevention in Business","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db320534d01fe","tasks":[{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f259bc096025f","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68cab284180a","taskLevel":null,"id":"ff8080814f24c33f014f259bc096025f"},{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART C-Chapter 17 Function of Accounting in Business.PDF","videoTime":1451,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"5FA316ACF10B88FE9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 17 Function of Accounting in Business","taskId":"ff8080814dad5062014db320535401ff","taskLevel":null,"id":"ff808081473905e701477c402f6300c2"},{"attachmentPath":"","videoTime":338,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"82E1C2A0F09DE9BC9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 17 课后习题","taskId":"ff8080814dad5062014db320535e0202","taskLevel":null,"id":"ff808081485e0f2601485e868bc30046"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 17 Function of Accounting in Business","children":null}]},{"isLeaf":"false","isFree":"false","chapterId":"ff8080814dad5062014db32053ac0215","tasks":null,"chapterFiles":null,"chapterExtends":null,"chapterTitle":"PART D LEADING AND MANAGING INDIVIDUALS AND TEAMS","children":[{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32053c7021b","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART D-Chapter 23 Nature of Management.PDF","videoTime":3235,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"225E599EC5B74C979C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 23 Nature of Management","taskId":"ff8080814dad5062014db32053cf021c","taskLevel":null,"id":"ff808081473905e701477c433ca500c8"},{"attachmentPath":"","videoTime":85,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"469B9C6F13A2BAF59C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 23 课后习题","taskId":"ff8080814dad5062014db32053db021f","taskLevel":null,"id":"ff808081485e0f2601485e970f430054"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f25a01469026f","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68d065de182c","taskLevel":null,"id":"ff8080814f24c33f014f25a01469026f"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 23 Nature of Management","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32053df0220","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART D-Chapter 24 Leadership and Styles.PDF","videoTime":3537,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"EEFCC77A173EFA959C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 24 Leadership and Styles","taskId":"ff8080814dad5062014db32053e60221","taskLevel":null,"id":"ff808081473905e701477c43846700c9"},{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f25a3902002b0","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68d11b44183c","taskLevel":null,"id":"ff8080814f24c33f014f25a3902002b0"},{"attachmentPath":"","videoTime":295,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"2CC348EBCBBCAD0A9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 24 课后习题","taskId":"ff8080814dad5062014db32053f40224","taskLevel":null,"id":"ff808081485e0f2601485e97a3360055"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 24 Leadership and Styles","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32053f80225","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART D-Chapter 25 Individual and Group Behaviour in Business Organisation.PDF","videoTime":1130,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"F31017B0FE2C5C329C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 25 Individual and Group Behaviour in Business Organisation","taskId":"ff8080814dad5062014db32054010226","taskLevel":null,"id":"ff808081473905e701477c43eb8d00ca"},{"attachmentPath":"","videoTime":81,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"E097F515E2808C739C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 25 课后习题","taskId":"ff8080814dad5062014db320540d0228","taskLevel":null,"id":"ff808081485e0f2601485e9a46ad0057"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 25 Individual and Group Behaviour in Business Organisation","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32054100229","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART D-Chapter 26 Team Formation, Development and Management.PDF","videoTime":3177,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"A6DD26F710918C9F9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 26 Team Formation, Development and Management","taskId":"ff8080814dad5062014db3205417022a","taskLevel":null,"id":"ff808081473905e701477c44474200cb"},{"attachmentPath":"","videoTime":334,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"EE527941931FD7E29C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 26 课后习题","taskId":"ff8080814dad5062014db3205422022c","taskLevel":null,"id":"ff808081485e0f2601485e9929750056"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 26 Team Formation, Development and Management","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32053b10216","tasks":[{"totalCount":null,"difficulty":"简单","examenType":"chapter","examUrl":"/exam/examination/examinationTask/ff8080814f24c33f014f25a29a3902ac","taskType":"exam","title":"","taskId":"ff8080814f607c24014f68cf9c37182b","taskLevel":null,"id":"ff8080814f24c33f014f25a29a3902ac"},{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART D-Chapter 22 Leadership, Management and Supervision.PDF","videoTime":587,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"4BD2145C35EBCD449C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 22 Leadership, Management and Supervision","taskId":"ff8080814dad5062014db32053b90217","taskLevel":null,"id":"ff808081473905e701477c42b80600c7"},{"attachmentPath":"","videoTime":128,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"B4E9012A2C81B4A69C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 22 课后习题","taskId":"ff8080814dad5062014db32053c4021a","taskLevel":null,"id":"ff808081485e0f2601485e95d2280052"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 22 Leadership, Management and Supervision","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db3205425022d","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART D-Chapter 27 Motivating Individuals and Groups.PDF","videoTime":2619,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"70A5F18C4B4986489C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 27 Motivating Individuals and Groups","taskId":"ff8080814dad5062014db320542d022e","taskLevel":null,"id":"ff808081473905e701477c449b5900cc"},{"attachmentPath":"","videoTime":388,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"4FA8BB1A7960E1CD9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 27 课后习题","taskId":"ff8080814dad5062014db32054380230","taskLevel":null,"id":"ff808081485e0f2601485e9ac2c00058"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 27 Motivating Individuals and Groups","children":null}]},{"isLeaf":"false","isFree":"false","chapterId":"ff8080814dad5062014db320543b0231","tasks":null,"chapterFiles":null,"chapterExtends":null,"chapterTitle":"PART E RECRUITING AND DEVELOPING EFFECTIVE EMPLOYEES","children":[{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db320549a0242","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART E-Chapter 32 Sources of Conflict and Techniques for Conflict Resolution and Avoidance.PDF","videoTime":813,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"80700B9F5332E27A9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 32 Sources of Conflict and Techniques for Conflict Resolution and Avoidance","taskId":"ff8080814dad5062014db32054a30243","taskLevel":null,"id":"ff808081473905e701477c4612fb00d1"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 32 Sources of Conflict and Techniques for Conflict Resolution and Avoidance","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32054400232","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART E-Chapter 28 Recruitment and Selection, Equal Opportunity and Managing Diversity.PDF","videoTime":3178,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"F9297806DACF8BCD9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 28 Recruitment and Selection, Equal Opportunity and Managing Diversity","taskId":"ff8080814dad5062014db32054470233","taskLevel":null,"id":"ff808081473905e701477c44e66600cd"},{"attachmentPath":"","videoTime":347,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"438B97AEB0F087A59C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 28 课后习题","taskId":"ff8080814dad5062014db32054520235","taskLevel":null,"id":"ff808081485e0f2601485e9b38f7005b"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 28 Recruitment and Selection, Equal Opportunity and Managing Diversity","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32054a60244","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART E-Chapter 33 Personal Effectiveness at Work and Their Benefits.PDF","videoTime":1660,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"0C2EB8B08EFB845E9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 33 Personal Effectiveness at Work and Their Benefits","taskId":"ff8080814dad5062014db32054ae0245","taskLevel":null,"id":"ff808081473905e701477c4663c200d2"},{"attachmentPath":"","videoTime":249,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"522C881775E0189C9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 33 课后习题","taskId":"ff8080814dad5062014db32054ba0247","taskLevel":null,"id":"ff808081485e0f2601485ea0705e0063"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 33 Personal Effectiveness at Work and Their Benefits","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32054550236","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART E-Chapter 29 Review and Appraisal of Individual Performance.PDF","videoTime":1151,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"B9439101098E457E9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 29 Review and Appraisal of Individual Performance","taskId":"ff8080814dad5062014db320545d0237","taskLevel":null,"id":"ff808081473905e701477c452c0100ce"},{"attachmentPath":"","videoTime":200,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"4E03FEA9E53C6B339C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 29 课后习题","taskId":"ff8080814dad5062014db32054690239","taskLevel":null,"id":"ff808081485e0f2601485e9ba56d005c"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 29 Review and Appraisal of Individual Performance","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db32054be0248","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART E-Chapter 34 Ethical Consideration.PDF","videoTime":2472,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"796A4020EF23C4269C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 34 Ethical Consideration","taskId":"ff8080814dad5062014db32054c60249","taskLevel":null,"id":"ff808081473905e701477c47381a00d3"},{"attachmentPath":"","videoTime":427,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"F1E3EEBD5A0F57F79C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 34 课后习题","taskId":"ff8080814dad5062014db32054d3024b","taskLevel":null,"id":"ff808081485e0f2601485ea15fb50064"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 34 Ethical Consideration","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db320546c023a","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART E-Chapter 30 Training, Development and Learning in Busines.PDF","videoTime":2432,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"495E0341ACC9FC789C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 30 Training, Development and Learning in Business","taskId":"ff8080814dad5062014db3205474023b","taskLevel":null,"id":"ff808081473905e701477c45868c00cf"},{"attachmentPath":"","videoTime":95,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"9BE1A20661C854199C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 30 课后习题","taskId":"ff8080814dad5062014db3205481023d","taskLevel":null,"id":"ff808081485e0f2601485e9c2f22005d"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 30 Training, Development and Learning in Business","children":null},{"isLeaf":"true","isFree":"false","chapterId":"ff8080814dad5062014db3205484023e","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F1/ACCA F1 Accountant in Business/02-ACCA-F1-讲义-基础-PART E-Chapter 31 Communication in Business.PDF","videoTime":1100,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"AF904333238EF6C09C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 31 Communication in Business","taskId":"ff8080814dad5062014db320548d023f","taskLevel":null,"id":"ff808081473905e701477c45d36700d0"},{"attachmentPath":"","videoTime":233,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"437C3A1502557F1A9C33DC5901307461","videoSiteId":"E5DD260925A6084B","taskType":"video","title":"Chapter 31 课后习题","taskId":"ff8080814dad5062014db32054970241","taskLevel":null,"id":"ff808081485e0f2601485e9cf030005f"}],"chapterFiles":null,"chapterExtends":null,"chapterTitle":"Chapter 31 Communication in Business","children":null}]}],"categoryId":"ff808081473905e701475cd3c2080001","courseId":"ff8080814dad5062014db32051b801a2","teacherName":"David Xi","chapterNum":"35","taskNum":"111","categoryName":"ACCA","subjectName":"F1","teacherImage":"/upload/201506/888ce40873854b46bf3087cd51d341d5.jpg","subjectId":"ff808081473905e701476204cb6c006f","versionId":"ff808081473905e701476205d8740070","teacherHonor":"ACCA金牌讲师","courseBackgroundImage":"/upload/201502/6096a5abb99846e3b9597f5bbb1a7b61.jpg","courseName":"ACCA F1 Accountant in Business","lastModifyTime":"1433229"}];
    var tpl = $('#tpl').html();
    var content = doT.template(tpl);
    course_detail=data;
    $('#content').html(content(data[0]));
    return false;
}
if(is_debug){
    my_data();
}
var getStatusTime = null;
var videoDownInfo =new Object(); //缓存每个节点的下载状态，一个节点一个id
var videochangelist = ""; //记录每次定时器和数据库同步数据后发生改变的dom节点id
var couselist = ""; //记录缓存包括的课程id
var lastgettime = 1388509261;//记录每次获取数据库的时间点，下次获取就只获取该时间点之后变化的记录(第一次获取可以获取2014年1月1日1时1分1秒//)
function getData() {
	lastgettime = 1388509261;
	$api.setStorage("closeSetTimeOut",false);
	api.showProgress({
       title: '加载中',
       modal: false
	});
	cache_model = api.require('lbbVideo');
function getdownrecord(){
    videoDownInfo =new Object(); //缓存每个节点的下载状态，一个节点一个id
    videochangelist = ""; //记录每次定时器和数据库同步数据后发生改变的dom节点id
    var param = {
        "userId" : getstor('memberId'),
        "readTime" : lastgettime
    }
   
    cache_model.getTaskData(param,function(ret,err){
        //------------------结束获取--------------------------
     	var usedTime,speedDown;
        var saverecordObj = JSON.parse(ret.data);
        // console.log(JSON.stringify(ret))
        ///设置下一次读取下载的某个时间之后变化的所有记录
        lastgettime = saverecordObj.readTime;
        //循环处理每一条返回的下载记录，并统计分析最后变化值
        var downloadIng = 0;
        for(i=0;i< saverecordObj.data.length;i++){
            if(saverecordObj.data[i].state == 1){
              downloadIng++;
              
              usedTime = (lastgettime-saverecordObj.data[i].creatTime)/1000;
              if(usedTime ==0){usedTime = 1;}
              speedDown = (saverecordObj.data[i].progress/usedTime)/1024;
//            alert(speedDown)
            }
            saverecordObj.data[i].progress = Number(saverecordObj.data[i].progress)
            procRecord(saverecordObj.data[i]);
        }
        if(downloadIng){
          $api.setStorage('downloadIng',1);

        }else{
          $api.setStorage('downloadIng',0);

        }
        // console.log(JSON.stringify(videoDownInfo))
    })
    
}

function procRecord(videorecord){
    var strs=videorecord.path.split("//"); //字符分割
    var pathlen = strs.length;
    if( pathlen < 2 ) return "";
    //判断是否是新课程
    if(couselist.indexOf(strs[0]) < 0){
        couselist = couselist + "," + strs[0];
    }
	
    //判断是否新任务
    if(videoDownInfo[strs[pathlen-1]]){
        //判断任务状态是否有变化
        if(videoDownInfo[strs[pathlen-1]].progress != videorecord.progress || videoDownInfo[strs[pathlen-1]].status != videorecord.state){
            //有变化
            for (j=0; j<pathlen;j++ ){
                //节点id放入已变化id集合
                if(videochangelist.indexOf(strs[j]) < 0){
                    videochangelist = videochangelist + "," + strs[j];
                }
                //更新进度，已有任务变更: (当前进度*任务数量+(当前任务新进度-当前任务老进度)/(任务数量)
                videoDownInfo[strs[j]].progress =(videoDownInfo[strs[j]].progress*videoDownInfo[strs[j]].tasknum+(videorecord.progress-videoDownInfo[strs[pathlen-1]].progress))/videoDownInfo[strs[j]].tasknum;
                //如果子节点有一个处于下载，则为下载，如果没有，如果有一个在队列，则为队列，如果没有，则为停止，如果全部下载完成，则为下载完成
                //0:停止  1:等待  2:下载中  3: 下载完成
                //以下节点下载状态叶子节点是准的,父节点不准,没考虑其它子节点的下载状态
                if(videoDownInfo[strs[j]].progress == 100){
                    videoDownInfo[strs[j]].status = 4;
                }else{
                    videoDownInfo[strs[j]].status = videorecord.state;
                }
            }
        }

    }else{
        //新任务处理
        for (j=0; j<pathlen;j++ ){
            //判断path各个节点是否存在
            if(!videoDownInfo[strs[j]]){
                videoDownInfo[strs[j]] = {};
                videoDownInfo[strs[j]].progress =0;
                videoDownInfo[strs[j]].tasknum =0;
                videoDownInfo[strs[j]].status = 0;
            }
            //节点id放入已变化id集合
            if(videochangelist.indexOf(strs[j]) < 0){
                videochangelist = videochangelist + "," + strs[j];
            }
            //更新进度，新下载任务: (当前进度*任务数量+新任务进度)/(任务数量+1)
            videoDownInfo[strs[j]].progress =(videoDownInfo[strs[j]].progress*videoDownInfo[strs[j]].tasknum+videorecord.progress)/(videoDownInfo[strs[j]].tasknum+1);
            videoDownInfo[strs[j]].tasknum ++;
            //如果子节点有一个处于下载，则为下载，如果没有，如果有一个在队列，则为队列，如果没有，则为停止，如果全部下载完成，则为下载完成
            //0:停止  1:等待  2:下载中  3: 下载完成
            //以下节点下载状态叶子节点是准的,父节点不准,没考虑其它子节点的下载状态
            if(videoDownInfo[strs[j]].progress == 100){
                videoDownInfo[strs[j]].status = 4;
            }else{
                videoDownInfo[strs[j]].status = videorecord.state;
            }
        }
    }
    
    
    // $api.setStorage("videochangelist",videochangelist);
    initDomDownStatus();
}

//更新界面下载状态有变化的下载节点
function initDomDownStatus(){
    if(isEmpty(videochangelist)){
        return false;
    }

    var strs = videochangelist.split(","); //字符分割

    var pathlen = strs.length;
    //从1开始，因为拼接videochangelist的时候用,开始的
    // alert(strs+"====="+JSON.stringify(videoDownInfo))
    for (j=1; j<pathlen;j++ ){
        var domInfo = videoDownInfo[strs[j]];
        var domid = strs[j];
        // alert(JSON.stringify(domInfo))
    
        if(!isEmpty(domInfo)){
            var domprogress = videoDownInfo[strs[j]].progress;
            var domstatus = videoDownInfo[strs[j]].status;
            var domtasknum = videoDownInfo[strs[j]].tasknum;
            // ------------------设置界面对应id节点dom下载状态，并设置为可见--------------------------
            $(".task"+domid).attr("type",domstatus);
            $(".task"+domid).find(".val").html(domprogress);
            // alert($(".task"+domid).html())
        }    
    }
    //处理圈圈
    circleProgress();
    init_process();
    //------------------设置结束--------------------------
    // console.log(strs[j]);
    // console.log(domInfo);
}

//初始化下载界面，但是所有节点hidden
function initDom(){
	var Course_info=$api.getStorage('Course_info');
    courseId = Course_info.courseId;
     var param = {};
     param.courseId = courseId;
     // ajaxRequest('api/v2.1/course/courseDetail', 'get', param, function(ret, err) {
     ajaxRequest('api/teachsource/course/courseDetail', 'get', param, function(ret, err) {
         api.parseTapmode();
         if (err) {
             /*api.toast({
                 msg : err.msg,
                 location : 'middle'
             });*/
             return false;
         }
         var tpl = $('#tpl').html();
         var content = doT.template(tpl);
         if (ret && ret.state == 'success') {
             if (isEmpty(ret.data)) {
                 $('body').addClass('null');
                 return false;
             }
             var ret_data = ret.data;
             course_detail = ret_data[0];
             //课程状态
             getVersionId(ret_data[0]);
    		 
             // ajaxRequest({ 'origin': 'http://192.168.10.112:8083/', 'pathname': 'api/v2.1/course/getVideoDetail' }, 'get', {"taskId":"8a22ecb55575d41f015576a3ccae002f"}, function(res, err) {
             // 	if(res.state == "success"){
             		
	     		api.getFreeDiskSpace(function(ret, err) {
	                 var size = (ret.size / 1000 / 1000).toFixed(2);
	                 var htm = "<div class='avaiace' tapmode onclick='to_cache()'><span class='manage'>缓存管理</span><p class='space'>可用空间" + size + "MB<span></span></p></div>";
	                 
	                 // course_detail = courseVideoDetail(course_detail,res.data);
	            	 // $api.setStorage(courseId,course_detail)
	                 htm = htm + content(ret_data[0]);
	                 $('#content').html(htm);

	                 initDomDownStatus();
	                 
	                 api.parseTapmode();

	                 //处理圈圈
	                 isSolidcircle('circle', '', '');
	                 init_process();
					
	                 clearInterval(getStatusTime);
					getStatusTime = setInterval(function(){
					    getdownrecord();
					    
					    setSpace();

					    if($api.getStorage("closeSetTimeOut") == "true"){
					    	clearInterval(getStatusTime);
					    }
					},2000)
	                 api.hideProgress();
             	// 	})
             	// }  
              // 
             });
         } else {
      	// api.hideProgress();
             api.toast({
                 msg : ret.msg,
                 location : 'middle'
             });
         }
     });
	   
}
	
	//1:获取所有下载记录并解析
	getdownrecord();
	//2:根据couselist获取所有缓存课程的章节详情，如果在线，从服务器获取，否则本地数据库获取
	initDom();

	
//3:定时器调用获取变化的数据，并调整界面下载状态
// getdownrecord();
//
//根据分析统计结果更新界面dom节点的显示状态
// initDomDownStatus();


// var data={"categoryIndex":5,"createTime":1433472737,"effectiveDay":180,"taskTotal":"61","chapters":[{"chapterTitle":"INTRODUCTION","isLeaf":"false","tasks":null,"chapterFiles":null,"chapterExtends":null,"chapterId":"ff8080814db86d41014dc1a2201604d1","isFree":"false","knowledgePointId":null,"children":[{"chapterTitle":"F3-课程介绍","isLeaf":"true","tasks":[{"attachmentPath":"","videoCcid":"97B707513FA2E2BF9C33DC5901307461","videoSiteId":"D550E277598F7D23","videoTime":351,"apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","title":"F3-课程介绍","taskId":"ff8080814db86d41014dc1a2202004d3","taskType":"video","taskLevel":null,"id":"ff808081482a031501482a1a7d0a0007"}],"chapterFiles":null,"chapterExtends":null,"chapterId":"ff8080814db86d41014dc1a2201a04d2","isFree":"true","knowledgePointId":null,"children":null}]},{"chapterTitle":"正式课程","isLeaf":"false","tasks":null,"chapterFiles":null,"chapterExtends":null,"chapterId":"ff8080814db86d41014dc1a2202304d4","isFree":"false","knowledgePointId":null,"children":[{"chapterTitle":"Chapter1 Introduction of Accounting","isLeaf":"true","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F3/ACCA F3 Financial Accounting/02-ACCA-F3-讲义-基础--Chapter1 Introduction of Accounting-1.pdf","videoCcid":"C4B7B80330064C859C33DC5901307461","videoSiteId":"D550E277598F7D23","videoTime":2224,"apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","title":"Chapter1 Introduction of Accounting-1","taskId":"ff8080814db86d41014dc1a2202d04d6","taskType":"video","taskLevel":null,"id":"ff808081473905e701477c5ae3fe00eb"},{"attachmentPath":"/upload/videohandout/ACCA/F3/ACCA F3 Financial Accounting/02-ACCA-F3-讲义-基础--Chapter1 Introduction of Accounting-2.pdf","videoCcid":"8E9A8B616E045DF59C33DC5901307461","videoSiteId":"D550E277598F7D23","videoTime":1492,"apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","title":"Chapter1 Introduction of Accounting-2","taskId":"ff8080814db86d41014dc1a2203504d8","taskType":"video","taskLevel":null,"id":"ff80808147c904170147d21f65600079"},{"examUrl":"/exam/examination/examinationTask/8a22ecb555af683b0155b50afb2f0085","totalCount":4,"difficulty":"简单","examenType":"chapter","title":"ACCA F3 Financial Accounting-CH1章节测评","taskId":"8a22ecb555af683b0155b50cb060008a","taskType":"exam","taskLevel":null,"id":"8a22ecb555af683b0155b50afb2f0085"}],"chapterFiles":null,"chapterExtends":null,"chapterId":"ff8080814db86d41014dc1a2202704d5","isFree":"true","knowledgePointId":null,"children":null},{"chapterTitle":"Chapter2 The Regulatory and Concept Framework","isLeaf":"true","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F3/ACCA F3 Financial Accounting/02-ACCA-F3-讲义-基础--Chapter2 The Regulatory and Concept Framework-1.pdf","videoCcid":"3E3959948BF8677E9C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":2185,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","title":"Chapter2 The Regulatory and Concept Framework-1","taskId":"ff8080814db86d41014dc1a2203e04db","taskType":"video","taskLevel":null,"id":"ff808081473905e701477c5b401000ec"},{"attachmentPath":"/upload/videohandout/ACCA/F3/ACCA F3 Financial Accounting/02-ACCA-F3-讲义-基础--Chapter10 Control Accounts-2.pdf","videoCcid":"B43B1DD7B8F597629C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":1564,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","title":"Chapter2 The Regulatory and Concept Framework-2","taskId":"ff8080814db86d41014dc1a2204604dd","taskType":"video","taskLevel":null,"id":"ff80808147c904170147d2256b03007a"},{"examUrl":"/exam/examination/examinationTask/8a22ecb555af683b0155b50a9576007b","totalCount":9,"difficulty":"简单","examenType":"chapter","title":"ACCA F3 Financial Accounting-CH2章节测评","taskId":"8a22ecb555af683b0155b50cfdd2008b","taskType":"exam","taskLevel":null,"id":"8a22ecb555af683b0155b50a9576007b"}],"chapterFiles":null,"chapterExtends":null,"chapterId":"ff8080814db86d41014dc1a2203804da","isFree":"false","knowledgePointId":null,"children":null},{"chapterTitle":"Chapter3 The Financial Statements","isLeaf":"true","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F3/ACCA F3 Financial Accounting/02-ACCA-F3-讲义-基础--Chapter16 Consolidated Financial Statements - 1.pdf","videoCcid":"AEC37E349BA8E3479C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":1931,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","title":"Chapter16 Consolidated Financial Statements - 1","taskId":"ff8080814db86d41014dc1a221a0052e","taskType":"video","taskLevel":null,"id":"ff808081473905e701477c5f682400fa"},{"attachmentPath":"/upload/videohandout/ACCA/F3/ACCA F3 Financial Accounting/02-ACCA-F3-讲义-基础--Chapter16 Consolidated Financial Statements - 2.pdf","videoCcid":"2BE1ADC6A344C3829C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":3302,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","title":"Chapter16 Consolidated Financial Statements - 2","taskId":"ff8080814db86d41014dc1a221a90530","taskType":"video","taskLevel":null,"id":"ff808081482a031501482b1001e4007d"},{"attachmentPath":"/upload/videohandout/ACCA/F3/ACCA F3 Financial Accounting/02-ACCA-F3-讲义-基础--Chapter16 Consolidated Financial Statements - 3.pdf","videoCcid":"98C54DE226AEF2829C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":3562,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","title":"Chapter16 Consolidated Financial Statements - 3","taskId":"ff8080814db86d41014dc1a221b20532","taskType":"video","taskLevel":null,"id":"ff808081482a031501482b11069a007e"},{"attachmentPath":"/upload/videohandout/ACCA/F3/ACCA F3 Financial Accounting/02-ACCA-F3-讲义-基础--Chapter16 Consolidated Financial Statements - 4.pdf","videoCcid":"F6671BBED1854FE59C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":1789,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","title":"Chapter16 Consolidated Financial Statements - 4","taskId":"ff8080814db86d41014dc1a221ba0534","taskType":"video","taskLevel":null,"id":"ff808081482a031501482b127833007f"},{"examUrl":"/exam/examination/examinationTask/8a22ecb555af683b0155b9d60d4d0112","totalCount":6,"difficulty":"中等","examenType":"chapter","title":"ACCA F3 Financial Accounting-CH16章节测评","taskId":"8a22ecb555af683b0155b9f2f34b0122","taskType":"exam","taskLevel":null,"id":"8a22ecb555af683b0155b9d60d4d0112"}],"chapterFiles":null,"chapterExtends":null,"chapterId":"ff8080814db86d41014dc1a2219a052d","isFree":"false","knowledgePointId":null,"children":null},{"chapterTitle":"Chapter17 Interpretation of Financial Statements","isLeaf":"true","tasks":[{"attachmentPath":"/upload/videohandout/ACCA/F3/ACCA F3 Financial Accounting/02-ACCA-F3-讲义-基础--Chapter17 Interpretation of Financial Statements.pdf","videoCcid":"7CA23C487567C0A49C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":2631,"apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","title":"Chapter17 Interpretation of Financial Statements","taskId":"ff8080814db86d41014dc1a221c30536","taskType":"video","taskLevel":null,"id":"ff808081473905e701477c5fc17200fb"},{"examUrl":"/exam/examination/examinationTask/8a22ecb555af683b0155b9dfb5de0119","totalCount":6,"difficulty":"中等","examenType":"chapter","title":"ACCA F3 Financial Accounting-CH17章节测评","taskId":"8a22ecb555af683b0155b9f352fa0123","taskType":"exam","taskLevel":null,"id":"8a22ecb555af683b0155b9dfb5de0119"}],"chapterFiles":null,"chapterExtends":null,"chapterId":"ff8080814db86d41014dc1a221bd0535","isFree":"false","knowledgePointId":null,"children":null}]}],"coverPath":"/upload/201502/fb9f1cfc2911499da1666e8aa5383d47.jpg","courseId":"ff8080814db86d41014dc1a2200f04d0","outline":"","teacherName":"Cindy Deng","taskNum":"61","categoryName":"ACCA","subjectName":"F3","courseIndex":5,"teacherHonor":"ACCA资深会员,金牌讲师","availability":"","categoryId":"ff808081473905e701475cd3c2080001","bigCoverPath":"/upload/201607/e00d91d12a1d451fbc59adf11c17b0af.png","chapterNum":"36","knowledgePointId":"","courseModuleType":"KNOWLEDGE_MODULE","aim":"<p>\r\n\t<span>作为初级阶段的课程，F3可能对有些同学而言会感觉比其它两门稍难，特别是对于一些毫无会计基础的同学来说，或许有些知识点存在一个所谓入门的过程。根据以往接触到的大量学员的情况来看，好多学生反而是在经历了一段茫然困惑之后豁然开朗，并且自此爱上了财务会计。只要你想弄通，没有想不通的问题。关键是，坚持不放弃！</span> \r\n</p>\r\n<p>\r\n\t<br />\r\n</p>","teacherImage":"/upload/201606/448ebf46b76e43158d1431d94c90836a.png","subjectId":"ff808081473905e701476252b4390073","versionId":"ff808081473905e7014762700dfa0081","courseBackgroundImage":"/upload/201502/fb9f1cfc2911499da1666e8aa5383d47.jpg","subjectIndex":4,"courseName":"ACCA F3 Financial Accounting","lastModifyTime":1433472}
//             var tpl = $('#tpl').html();
//     var content = doT.template(tpl);
//     $('#content').html(content(data));
//     isSolidcircle('circle', '', '');
//     init_process();

}

function setSpace(){
	//设置下载速度
	cache_model.getCurrentDownloadVideoSize({"userId" : getstor('memberId')},function(ret,err){
    	var videoId = ret.currentVideoId;
    	if(ret.data == -1){
       		$('.down_speed').addClass("none");
       		return false;
       	}
 //       	console.log(JSON.stringify(ret))
       	api.getFreeDiskSpace(function(ret, err) {
	         var size = (ret.size / 1000 / 1000).toFixed(2);
	         if (Math.ceil(size) < 300) {
                clearInterval(down_timer);
                //// clearTimeout(down_setTimeout);
                clearInterval(getStatusTime);
                $('.down-progress[type="1"]').attr({
                    type : 2
                }).siblings('.down_speed').html('').addClass('none');
                api.toast({
                    msg : '可用空间不足,下载已暂停',
                    location : 'middle'
                });
                cache_model.downloadStop({"userId":getstor('memberId')},function(ret, err) {
		        });
             } else {
                $(".space").html("可用空间" + size + "MB<span></span>");
                
             }
	    });
	   
   		var speedT = $api.getStorage("speedT"+videoId) ? $api.getStorage("speedT"+videoId) : 0;  		
   		
   		$api.setStorage("speedT"+videoId,ret.data);  		
   		speedTime = ret.data - speedT;	
   		if(speedTime<0){
   			speedTime = 0;
   		}	

		var down_speed = getFormatSize(speedTime);
		$('.down_speed').addClass("none");
       	$('.task'+videoId).siblings('.down_speed').html(down_speed).removeClass('none');
   })

}

function init_process(){
	//Android可用空间icon位置调整
	if(api.systemType != "ios"){
    	$(".space span").css({"margin-top":"0.6rem"});
    }
    circleProgress();
    //圆形进度条绘制
    $.each($('.down-progress'), function(k, v) {
        var num = parseInt($(v).find('.val').html());
        if (!isEmpty(num)) {
            var percent = num / 100, perimeter = Math.PI * 0.9 * $('#svgDown').width();
            $(v).find('circle').eq(1).css('stroke-dasharray', parseInt(perimeter * percent) + " " + parseInt(perimeter * (1 - percent)));
        }
    });

}
function get_input(cls){
    var data=[];
    $.each($("input[name='"+cls+"'][sel=1]"),function(k,v){
        if(!isEmpty($(v).val())){
            data.push($(v).val());
        }
    });
    if(data.length==0){
        return false;
    }
    return data;
}
var is_del_downed=false;
function set_down_status(str){
    //var data=JSON.parse(str);
    var data = str;
    var type = data.type, 
        chapterIdA = isEmpty(data.chapterIdA) ? '' : data.chapterIdA,
        chapterIdB = isEmpty(data.chapterIdB) ? '' : data.chapterIdB,
        chapterIdC = isEmpty(data.chapterIdC) ? '' : data.chapterIdC,
        item = data.item;
    var id='';
    //一级章节下载记录
    if(!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)) id=chapterIdA;
    //二级章节下载记录
    if(!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)) id=chapterIdB;
    //三级章节下载记录
    if(!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)) id=chapterIdC;
    // var obj = $('#' + id);
    var obj = $('.task' + item);

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
            var _w = $('#svgDown').width();
            var percent = num / 100, perimeter = Math.PI * _w * 0.9;
            $(obj).find('circle').eq(1).css('stroke-dasharray', parseInt(perimeter * percent) + " " + parseInt(perimeter * (1 - percent)));
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
            clearTimeout(down_setTimeout);
            is_count = false;
            $(obj).attr({
                type : 2
            });
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
            clearTimeout(down_setTimeout);
            is_count = false;
            $(obj).attr({
                type : 2
            });
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
            clearTimeout(down_setTimeout);
            is_count = false;
            $(obj).attr({
                type : 2
            });
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
            clearTimeout(down_setTimeout);
            is_count = false;
            $(obj).attr({
                type : 2
            });
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
            clearTimeout(down_setTimeout);
            is_count = false;
            $(obj).attr({
                'type' : 2
            }).siblings('.down_speed').html('').addClass('none');
            break;
        case '1':
        case 1:
            clearInterval(down_timer);
            clearTimeout(down_setTimeout);
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
                type : 2
            });
            break;
        case '5':
        case 5:
            //等待->下载中
            // $('.down-progress[type="1"]').attr({
            //     type : 2
            // });
            // $('.down_speed').html('').addClass('none');
            // $(obj).attr({
            //     type : 1
            // });

            var type1 = $('.down-progress[type="1"]');
            if(type1 && type1.length){
              type1.attr({
                type : 2
              })
            }
            $(obj).attr({
                type : 1
            });

            break;
        case '3':
        case 3:
        	
           
            var isDownding = $api.getStorage('isDownding');
                    
            if(isDownding == "false"){
            	isDownding = false;
            }else if(isDownding == 'true'){
            	isDownding = true;
            }
            if(isDownding){
	             var type1 = $('.down-progress[type="1"]');
	            if(type1 && type1.length){
	              $(obj).attr({
	                  type : 5
	              });
	            }else{
	              // $('.down-progress[type="1"]').attr({
	              //     type : 2
	              // });
	           
	              
	            }
            }else{
	            $(obj).attr({
	                  type : 1
	              });
            }
            
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
            // $(obj).attr({
            //     type : 1
            // });
            var percent = data.progress / 100, perimeter = Math.PI * 0.9 * $('#svgDown').width();
            $(obj).find('circle').eq(1).css('stroke-dasharray', parseInt(perimeter * percent) + " " + parseInt(perimeter * (1 - percent)));
            if (data.progress >= 100) {
                $(obj).attr({
                    type : 4
                }).siblings('.down_speed').html('').addClass('none');
            }

            $('.space').html("可用空间" + data.size + "MB<span></span>");
            $(obj).find('.val').text(data.progress);
            break;
        case 'end':
            clearInterval(down_timer);
            clearTimeout(down_setTimeout);
            is_count = false;
            $(obj).attr({
                type : 4
            }).siblings('.down_speed').html('').addClass('none');
            break;
    }
}

apiready = function() {
    //alert(api.winName+'=='+api.frameName);

    //api.addEventListener({
    //     name : 'DOWN'
    //}, function(ret) {
    //    api.toast({
    //        msg:JSON.stringify(ret.value),
    //        location:'middle'
    //    })
    //});

    saveTasksProgress.getCourseTaskProgress([courseId]);
    memberId = getstor('memberId');
  	getData();
  	api.addEventListener({
  		name : 'flush_catalog'
  	}, function(ret) {
  		if(!isEmpty(ret.value)){
            // api.showProgress({
            //     title: '加载中',
            //     modal: true
            // });
            var Course_info=$api.getStorage('Course_info');
            Course_info.courseId = ret.value.courseId;
            $api.setStorage('Course_info',Course_info)
            setTimeout(function(){
                getData();
            },50)
            // 
        }
        clearInterval(getStatusTime);
  		getStatusTime = setInterval(function(){

            getdownrecord();
            
            // getCurrentDownloadTaskState();

            setSpace();
            
            if($api.getStorage("closeSetTimeOut") == "true"){
                clearInterval(getStatusTime);
            }
        },2000)
  	});

  	api.addEventListener({
     	name: 'reloadPage'
    }, function(ret, err) {
        lastgettime = 1388509261;
        videochangelist = "";
        couselist = "";
        videoDownInfo = new Object();
        getData();
    });
    
  	// api.setRefreshHeaderInfo({
   //      visible: true,
   //      loadingImg: 'widget://image/arrow-down-o.png',
   //      bgColor: '#f3f3f3',
   //      textColor: '#787b7c',
   //      textDown: '下拉更多',
   //      textUp: '松开刷新',
   //      showTime: false
   //  }, function (ret, err) {
   //      getData();
   //  });
    // $('.circle_btn').click(function() {
    //     if ($(this).find('.active_btn').hasClass('hide')) {
    //         $(this).find('.active_btn').removeClass('hide');
    //     } else {
    //         $(this).find('.active_btn').addClass('hide');
    //     }
    // });
};





function to_cache(name) {
	clearInterval(getStatusTime);
	api.sendEvent({
        name: 'clearlist-group'
    });
	
    $api.setStorage("video-cacheTime",true);
	name = 'video-cache-f';
	api.openFrame({
		name : name,
		url : name + '.html',
		delay : 200,
		reload : true,
		rect: {
            x: leftLw,
            y: headLh,
            w: api.winWidth - leftLw,
            h: api.winHeight - headLh
        },
		pageParam: {
			courseId : courseId
		}
	});
}
/*
//点击列表上的课程的二级章节标题，跳转学习页面
function toStudying(num1, num2) {
	var chapters_num = num1;
	var chapters_child_num = num2;
	var child_task_num = 0;
	var chapters_info = course_detail.chapters[chapters_num];
	if(isEmpty(chapters_info) || isEmpty(chapters_info.children)){
		api.toast({
			msg:'该章节信息不完善',
			location:'middle'
		});
		return false;
	}
	//当前一级章节信息
	var chapters_child_info = chapters_info.children[chapters_child_num];
	//当前二级章节信息
    if(isEmpty(chapters_child_info) || isEmpty(chapters_child_info.tasks)){
        api.toast({
            msg:'该章节暂无学习任务',
            location:'middle'
        });
        return false;
    }
	var task_info = chapters_child_info.tasks[child_task_num];
	//当前任务信息
	//判断当前任务类型
	if (isEmpty(task_info) || isEmpty(task_info.taskType)) {
		api.toast({
			msg : '无课程任务',
			location : 'middle'
		});
		return;
	}
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
			msg : '课程任务异常，请稍后再试或联系客服',
			location : 'middle'
		});
		return false;
	}
	//需要传递的参数
	var pageParams = {
		from : 'course-studying',
		last_progress : 0, //上次的学习进度
		course_detail : course_detail, //课程详情
		chapters_num : chapters_num, //一级章节索引
		chapters_child_num : chapters_child_num, //二级章节索引
		child_task_num : child_task_num, //任务索引
		task_info : task_info, //当前要学习的任务信息
		type : 'task'
	};
	//跳转到横屏页面
	api.openWin({
		name : new_win_name,
		url : new_win_url,
		delay : 200,
		slidBackEnabled : false, //iOS7.0及以上系统中，禁止通过左右滑动返回上一个页面
		pageParam : pageParams
	});
}
$('.icon-check').parent().addClass('none');
*/