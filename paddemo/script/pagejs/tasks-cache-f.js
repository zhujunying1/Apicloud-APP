var course_detail;
var pageName = 'catalog';
var total = 0;
var task_arr;
var courseId; //课程id

var is_debug = false;
    var getStatusTime = null;
    var videoDownInfo =new Object(); //缓存每个节点的下载状态，一个节点一个id
    var videochangelist = $api.getStorage("videochangelist") ? $api.getStorage("videochangelist") : ""; //记录每次定时器和数据库同步数据后发生改变的dom节点id
    var couselist = ""; //记录缓存包括的课程id
    var lastgettime = 1388509261;//记录每次获取数据库的时间点，下次获取就只获取该时间点之后变化的记录(第一次获取可以获取2014年1月1日1时1分1秒//)


    function tasksCache(){
        if(is_debug){
          var arr = {"categoryIndex":100,"createTime":1450931470,"effectiveDay":180,"taskTotal":"47","chapters":[{"chapterId":"8a22ecb551d6da350151e8155bc81526","isFree":"true","knowledgePointId":null,"chapterTitle":"OBU 简介","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/24f6f94eda4a417ba97c2b6b51f4d5a9.pdf","apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","videoCcid":"9C3B3C7A64B1E4A09C33DC5901307461","videoSiteId":"D550E277598F7D23","videoTime":674,"express":null,"taskType":"video","title":"OBU-课程简介","taskId":"8a22ecb551ed44ca0151ed9c6d5300f1","taskLevel":null,"id":"8a22ecb551ed44ca0151ed6903fc0045"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3abcebb018f","isFree":"true","knowledgePointId":null,"chapterTitle":"第一部分\tIntroductions of OBU BSc in Applied Accounting （论文项目介绍）","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/e4201bc495c240c8b531615b79b37a50.pdf","apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","videoCcid":"F528AD32806FDC1C9C33DC5901307461","videoSiteId":"D550E277598F7D23","videoTime":411,"express":null,"taskType":"video","title":"LESSON 1\t   OBU简史及论文能力要求","taskId":"8a22ecb551ed44ca0151ed9ca00200f4","taskLevel":null,"id":"8a22ecb551ed44ca0151ed693a620049"},{"attachmentPath":"/upload/201512/3eebce913b61426ab3a787f433d8d2ac.pdf","apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","videoCcid":"26065BC881BE2EAC9C33DC5901307461","videoSiteId":"D550E277598F7D23","videoTime":246,"express":null,"taskType":"video","title":"LESSON 2\t  论文导师的责任与角色","taskId":"8a22ecb551ed44ca0151ed9cd3d800f5","taskLevel":null,"id":"8a22ecb551ed44ca0151ed6960cf004a"},{"attachmentPath":"/upload/201512/6961639786524b84937380abd57721a6.pdf","apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","videoCcid":"E0E6BB2CD6C9FD819C33DC5901307461","videoSiteId":"D550E277598F7D23","videoTime":330,"express":null,"taskType":"video","title":"LESSON 3\t  论文剽窃、欺骗的预防及处罚","taskId":"8a22ecb551ed44ca0151ed9d2dab00f7","taskLevel":null,"id":"8a22ecb551ed44ca0151ed699b7f004b"},{"examUrl":"/exam/examination/examinationTask/8a22ecb551f699b60151f83229be030f","totalCount":12,"difficulty":"简单","examenType":"chapter","express":null,"taskType":"exam","title":"第一部分 Introductions of OBU BSc in Applied Accounting （论文项目介绍）","taskId":"8a22ecb551f699b60151f85b47f103a0","taskLevel":null,"id":"8a22ecb551f699b60151f83229be030f"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3abf12f0190","isFree":"true","knowledgePointId":null,"chapterTitle":"第二部分\tEligibility of applying OBU BSc in Applied Accounting（论文申请资格及要求）","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/bf70b1b0fc424449af204d1707dba3cd.pdf","apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","videoCcid":"04D9670B2117F3119C33DC5901307461","videoSiteId":"D550E277598F7D23","videoTime":327,"express":null,"taskType":"video","title":"LESSON 4\t  论文申请步骤、时效及免试影响","taskId":"8a22ecb551ed44ca0151ed9ddfa400fd","taskLevel":null,"id":"8a22ecb551ed44ca0151ed6a269c0053"},{"attachmentPath":"/upload/201512/e2c86ee81d68458dae2e00570a578e6f.pdf","apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","videoCcid":"DC8C46AA594AA9629C33DC5901307461","videoSiteId":"D550E277598F7D23","videoTime":341,"express":null,"taskType":"video","title":"LESSON 5\t  英语水平证明及证明提交","taskId":"8a22ecb551ed44ca0151ed9e188400fe","taskLevel":null,"id":"8a22ecb551ed44ca0151ed6a50c60055"},{"examUrl":"/exam/examination/examinationTask/8a22ecb551f699b60151f834dafc0320","totalCount":6,"difficulty":"简单","examenType":"chapter","express":null,"taskType":"exam","title":"第二部分 Eligibility of applying OBU BSc in Applied Accounting（论文申请资格及要求）","taskId":"8a22ecb551f699b60151f85c64c503a9","taskLevel":null,"id":"8a22ecb551f699b60151f834dafc0320"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3ac10aa0191","isFree":"true","knowledgePointId":null,"chapterTitle":"第三部分 Basic knowledge of applying OBU BSc in Applied Accounting（论文申请基本知识）","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/602d30b6601644ca8f5a7b345f872495.pdf","apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","videoCcid":"E77BD3159B5B168E9C33DC5901307461","videoSiteId":"D550E277598F7D23","videoTime":310,"express":null,"taskType":"video","title":"LESSON 6\t  在线提交日期及提交方法","taskId":"8a22ecb551ed44ca0151eda07d970101","taskLevel":null,"id":"8a22ecb551ed44ca0151ed6a764e0056"},{"attachmentPath":"/upload/201512/6cfe27fde0d54805a416b303c7b9304f.pdf","apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","videoCcid":"70F68F02E7EB75F79C33DC5901307461","videoSiteId":"D550E277598F7D23","videoTime":447,"express":null,"taskType":"video","title":"LESSON 7\t  在线提交格式、费用及信息更新","taskId":"8a22ecb551ed44ca0151eda0f3db0103","taskLevel":null,"id":"8a22ecb551ed44ca0151ed6aba450057"},{"attachmentPath":"/upload/201512/e07dcd44149f47bab5de22871807b5ca.pdf","apiKey":"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez","videoCcid":"81CBA016AAB46D039C33DC5901307461","videoSiteId":"D550E277598F7D23","videoTime":613,"express":null,"taskType":"video","title":"LESSON 8\t  论文等级评估标准、方式及重新提交原则","taskId":"8a22ecb551ed44ca0151eda142070105","taskLevel":null,"id":"8a22ecb551ed44ca0151ed6af5350058"},{"examUrl":"/exam/examination/examinationTask/8a22ecb551f699b60151f8386de6032b","totalCount":6,"difficulty":"简单","examenType":"chapter","express":null,"taskType":"exam","title":"第三部分 Basic knowledge of applying OBU BSc in Applied Accounting（论文申请基本知识）","taskId":"8a22ecb551f699b60151f8575de4039a","taskLevel":null,"id":"8a22ecb551f699b60151f8386de6032b"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3ac38160193","isFree":"false","knowledgePointId":null,"chapterTitle":"第四部分Project topic areas and titles and research question（论文的选题及开题）","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/f9b143b646d5472ea3f11d7841c980be.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"EA00C71962D738AB9C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":428,"express":null,"taskType":"video","title":" LESSON 9\t论文选题","taskId":"8a22ecb551ed44ca0151f104056b0602","taskLevel":null,"id":"8a22ecb551ed44ca0151f0bbd88b0465"},{"attachmentPath":"/upload/201512/8d5713d6a8a44585880fa3fb496b461a.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"8C84C02DA24A2A399C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":779,"express":null,"taskType":"video","title":"LESSON 10\t公司选择及论题确定","taskId":"8a22ecb551ed44ca0151f10628a50606","taskLevel":null,"id":"8a22ecb551ed44ca0151f0fc84bd05a1"},{"examUrl":"/exam/examination/examinationTask/8a22ecb551f699b60151f838f9fe032c","totalCount":4,"difficulty":"简单","examenType":"chapter","express":null,"taskType":"exam","title":"第四部分Project topic areas and titles and research question（论文的选题及开题）","taskId":"8a22ecb551f699b60151f858d6a3039d","taskLevel":null,"id":"8a22ecb551f699b60151f838f9fe032c"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3ac52920194","isFree":"false","knowledgePointId":null,"chapterTitle":"第五部分 Structure of Research Report （Research Report 的结构、内容及要求）","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/0cf8bd18249e4ac98d5d00653846edff.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"BB12F9E460AB60D99C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":850,"express":null,"taskType":"video","title":"LESSON 11\tRR的整体结构、封皮及第一部分内容","taskId":"8a22ecb551ed44ca0151f1074229060b","taskLevel":null,"id":"8a22ecb551ed44ca0151f0bc21900466"},{"attachmentPath":"/upload/201512/62bc04dd099b4e29ae6552a06fa02a7c.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"F3A428360B3602969C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":1222,"express":null,"taskType":"video","title":"LESSON 12\tRR的第二部分具体内容","taskId":"8a22ecb551ed44ca0151f107868d060d","taskLevel":null,"id":"8a22ecb551ed44ca0151f0bc478a0469"},{"attachmentPath":"/upload/201512/b7b20dd75179431b8424aa9a880ab406.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"B2E53E92D43564659C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":975,"express":null,"taskType":"video","title":"LESSON 13\tRR的第三部分内容","taskId":"8a22ecb551ed44ca0151f107d053060e","taskLevel":null,"id":"8a22ecb551ed44ca0151f0bca975046a"},{"attachmentPath":"/upload/201512/bec841ef51df4d04aeac6f82dcb025b9.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"2ED40293F0F9B9A59C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":544,"express":null,"taskType":"video","title":"LESSON 14\tRR字数要求及格式要求","taskId":"8a22ecb551ed44ca0151f1080ad2060f","taskLevel":null,"id":"8a22ecb551ed44ca0151f0bcd6da046c"},{"examUrl":"/exam/examination/examinationTask/8a22ecb551f699b60151f83aee7d0333","totalCount":10,"difficulty":"简单","examenType":"chapter","express":null,"taskType":"exam","title":"第五部分 Structure of Research Report （Research Report 的结构、内容及要求）","taskId":"8a22ecb551f699b60151f86c35b003c3","taskLevel":null,"id":"8a22ecb551f699b60151f83aee7d0333"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3ac72ec0195","isFree":"false","knowledgePointId":null,"chapterTitle":"第六部分 Project mentoring （论文指导）","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/7b6e94d5512f40639c2e7f1806985cbc.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"E3ABF52B4DF2E3119C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":253,"express":null,"taskType":"video","title":"LESSON 15\t论文导师的角色及与导师的会见","taskId":"8a22ecb551ed44ca0151f1089ebf0610","taskLevel":null,"id":"8a22ecb551ed44ca0151f0bd9f97046d"},{"attachmentPath":"/upload/201512/4a5d0c9aedc6414a8046edc8d332748d.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"69F73453EB31FF419C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":321,"express":null,"taskType":"video","title":"LESSON 16\t三次会见及论文答辩","taskId":"8a22ecb551ed44ca0151f108cf0a0614","taskLevel":null,"id":"8a22ecb551ed44ca0151f0cb1bd00485"},{"examUrl":"/exam/examination/examinationTask/8a22ecb551f699b60151f849ec290376","totalCount":5,"difficulty":"简单","examenType":"chapter","express":null,"taskType":"exam","title":"第六部分 Project mentoring （论文指导）","taskId":"8a22ecb551f699b60151f86c96f903c4","taskLevel":null,"id":"8a22ecb551f699b60151f849ec290376"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3ac9a3e0196","isFree":"false","knowledgePointId":null,"chapterTitle":"第七部分 Skills and Learning Statement (SLS)（技能和学习记录）","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/d7715026c19a438785ca78edf0da2f45.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"F23D5D032A92DDDF9C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":528,"express":null,"taskType":"video","title":"LESSON 17\tSLS、Reflection及交流技巧","taskId":"8a22ecb551ed44ca0151f10900e80615","taskLevel":null,"id":"8a22ecb551ed44ca0151f0cb3e030487"},{"attachmentPath":"/upload/201512/53d2353bd9914ed4b7720f9f35a95219.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"0129B753B05FB6489C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":252,"express":null,"taskType":"video","title":"LESSON 18\tSLS字数要求及答辩PPT要求","taskId":"8a22ecb551ed44ca0151f1092a010618","taskLevel":null,"id":"8a22ecb551ed44ca0151f0cb69bf048a"},{"examUrl":"/exam/examination/examinationTask/8a22ecb551f699b60151f83ce4580339","totalCount":6,"difficulty":"简单","examenType":"chapter","express":null,"taskType":"exam","title":"第七部分 Skills and Learning Statement (SLS)（技能和学习记录）","taskId":"8a22ecb551f699b60151f86eca6503c7","taskLevel":null,"id":"8a22ecb551f699b60151f83ce4580339"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3acb7c50197","isFree":"false","knowledgePointId":null,"chapterTitle":"第八部分 A guide to citing and referencing （关于标记引用及参考的指导）","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/573843cf5532441b8c22ffae67027ed7.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"DDC5A3B75DAB9F2E9C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":672,"express":null,"taskType":"video","title":"LESSON 19\t引用与参考","taskId":"8a22ecb551ed44ca0151f10953470619","taskLevel":null,"id":"8a22ecb551ed44ca0151f0cbc5b7048b"},{"attachmentPath":"/upload/201512/bd4ded4c21444b30b833f804557e9746.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"B09AD3B3227CCA5F9C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":1606,"express":null,"taskType":"video","title":"LESSON 20\t论文内容中引用标记与参考列表","taskId":"8a22ecb551ed44ca0151f109790a061a","taskLevel":null,"id":"8a22ecb551ed44ca0151f0cd5be90497"},{"examUrl":"/exam/examination/examinationTask/8a22ecb551f699b60151f83d48bb033b","totalCount":12,"difficulty":"简单","examenType":"chapter","express":null,"taskType":"exam","title":"第八部分 A guide to citing and referencing （关于标记引用及参考的指导）","taskId":"8a22ecb551f699b60151f872ba6903ca","taskLevel":null,"id":"8a22ecb551f699b60151f83d48bb033b"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3acd5ef0198","isFree":"false","knowledgePointId":null,"chapterTitle":"第九部分 关于学生Fail RAP的常见问题及规避方式","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/12bc934db09b4d428795ef60dfbd49d0.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"E9306DC096F7ADD79C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":735,"express":null,"taskType":"video","title":"LESSON 21\t论文未通过的常见问题及规避方式","taskId":"8a22ecb551ed44ca0151f109d359061b","taskLevel":null,"id":"8a22ecb551ed44ca0151f0cdb1380499"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3ad0a54019a","isFree":"false","knowledgePointId":null,"chapterTitle":"第十部分 基础Ratio 分析","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/ad26df7f621b4a4d92198d4672729275.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"E527B9F9512B0B0E9C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":395,"express":null,"taskType":"video","title":"LESSON 22\t财务比率分析介绍","taskId":"8a22ecb551ed44ca0151f114bcea0644","taskLevel":null,"id":"8a22ecb551ed44ca0151f10e7f180621"},{"attachmentPath":"/upload/201512/603db3bae6604685bb7dad9506a55d16.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"78F5A869532BAAB89C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":432,"express":null,"taskType":"video","title":"LESSON 23\t投资回报比率及盈利比率","taskId":"8a22ecb551ed44ca0151f115755d0646","taskLevel":null,"id":"8a22ecb551ed44ca0151f10ea39c0622"},{"attachmentPath":"/upload/201512/f3f8451a3791417ca3bb3034a2cf6fdb.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"42020D86F0B771129C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":268,"express":null,"taskType":"video","title":"LESSON 24\t流动性比率","taskId":"8a22ecb551ed44ca0151f11699e50654","taskLevel":null,"id":"8a22ecb551ed44ca0151f10ecabd0624"},{"attachmentPath":"/upload/201512/462d3672425049e98f9d170f21e0e3c0.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"187785497B1B39759C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":230,"express":null,"taskType":"video","title":"LESSON 25\t经营效率比率","taskId":"8a22ecb551ed44ca0151f1173bc4065e","taskLevel":null,"id":"8a22ecb551ed44ca0151f10ef3bc0625"},{"attachmentPath":"/upload/201512/aaa38625400d4b20b6c8ab1c2cfb2db6.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"2BBD409BA3DB107C9C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":273,"express":null,"taskType":"video","title":"LESSON 26\t资本结构比率","taskId":"8a22ecb551ed44ca0151f1178af70660","taskLevel":null,"id":"8a22ecb551ed44ca0151f10f1ab80627"},{"attachmentPath":"/upload/201512/1c17ccc2267a4c6fb8d9f954d29b48c2.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"75C9A62D623443F29C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":131,"express":null,"taskType":"video","title":"LESSON 27\t股东收益比率","taskId":"8a22ecb551ed44ca0151f118981f0661","taskLevel":null,"id":"8a22ecb551ed44ca0151f10f6ee90628"},{"attachmentPath":"/upload/201512/26f26735077d42b7b0d6db6f4640ed0d.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"598BDAD9C07E4C4A9C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":139,"express":null,"taskType":"video","title":"LESSON 28\t财务比率分析的局限性","taskId":"8a22ecb551ed44ca0151f11a7efc0662","taskLevel":null,"id":"8a22ecb551ed44ca0151f10fa8950629"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3ad2fe8019b","isFree":"false","knowledgePointId":null,"chapterTitle":"第十一部分 基础商业分析","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/d4d6aa174b86408dae4618d73d520c8f.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"35166790B5AA8FE49C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":82,"express":null,"taskType":"video","title":"LESSON 29\t商业分析介绍","taskId":"8a22ecb551ed44ca0151f11ad4d90663","taskLevel":null,"id":"8a22ecb551ed44ca0151f10fcc27062b"},{"attachmentPath":"/upload/201512/52b87084901a4c6bbbb808d3ac12866b.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"0FEE812398EA9C419C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":531,"express":null,"taskType":"video","title":"LESSON 30\tPESTEL分析","taskId":"8a22ecb551ed44ca0151f11b31f40665","taskLevel":null,"id":"8a22ecb551ed44ca0151f10ff8a2062c"},{"attachmentPath":"/upload/201512/b3d682326f8e4cfab321e33fb84713a8.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"0EB61C2C8D3F09919C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":313,"express":null,"taskType":"video","title":"LESSON 31\tSWOT分析","taskId":"8a22ecb551ed44ca0151f11b68b00666","taskLevel":null,"id":"8a22ecb551ed44ca0151f1101e35062d"},{"attachmentPath":"/upload/201512/3eed2280b5874bb480f6ea6c3f45237d.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"67729FB985B657F19C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":673,"express":null,"taskType":"video","title":"LESSON 32\t波特五力分析","taskId":"8a22ecb551ed44ca0151f11ba1790667","taskLevel":null,"id":"8a22ecb551ed44ca0151f1104454062f"},{"attachmentPath":"/upload/201512/3b5616eb1b3640048deb71034f918135.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"79C9DED5FD871D2C9C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":345,"express":null,"taskType":"video","title":"LESSON 33\t波特价值分析","taskId":"8a22ecb551ed44ca0151f11be4010668","taskLevel":null,"id":"8a22ecb551ed44ca0151f11070d50630"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3ad544e019c","isFree":"false","knowledgePointId":null,"chapterTitle":"第十二部分 基础IT应用","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/f6f2994729c5444cae4199ceff643920.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"1B3C48DBB024BC149C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":729,"express":null,"taskType":"video","title":"LESSON 34\t基础WORD应用演示","taskId":"8a22ecb551ed44ca0151f11caee60669","taskLevel":null,"id":"8a22ecb551ed44ca0151f110975a0631"},{"attachmentPath":"/upload/201512/b06d8ea6e9f84e53a8aa4cf7e5468fb5.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"184F3E89C5F42BA39C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":626,"express":null,"taskType":"video","title":"LESSON 35\t基础EXCEL应用演示","taskId":"8a22ecb551ed44ca0151f11df8eb066b","taskLevel":null,"id":"8a22ecb551ed44ca0151f110be1a0632"},{"attachmentPath":"/upload/201512/c182d7e617064803aec4edd0e2776b69.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"90C9C65B4B4BFBF59C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":336,"express":null,"taskType":"video","title":"LESSON 36\t基础PPT应用演示","taskId":"8a22ecb551ed44ca0151f11e6adb066e","taskLevel":null,"id":"8a22ecb551ed44ca0151f110e8a50633"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3ad78c6019d","isFree":"false","knowledgePointId":null,"chapterTitle":"第十三部分 关于OBU项目中交流与沟通技巧的解读与指导","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/47728be534b04f4b9784f404c41a2907.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"E54602E1BBDF64359C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":2461,"express":null,"taskType":"video","title":"LESSON 37\t项目中交流与沟通技巧的解读与指导","taskId":"8a22ecb551ed44ca0151f11ed5ee066f","taskLevel":null,"id":"8a22ecb551ed44ca0151f11134bb0634"}],"chapterFiles":null,"chapterExtends":null,"children":null},{"chapterId":"8a22ecb551d2eee90151d3ad9531019e","isFree":"false","knowledgePointId":null,"chapterTitle":"第十四部分 关于论文格式样例的指导讲解","isLeaf":"true","tasks":[{"attachmentPath":"/upload/201512/92408b0baf0043b887e81acec761c45e.pdf","apiKey":"3tF0Ao1MWHEdFp4Lf4LuEgkU8LKpOPLi","videoCcid":"AE9F875051C2B9A09C33DC5901307461","videoSiteId":"E5DD260925A6084B","videoTime":1608,"express":null,"taskType":"video","title":"LESSON 38\tOBU 论文 格式内容样例","taskId":"8a22ecb551ed44ca0151f157807d06fe","taskLevel":null,"id":"8a22ecb551ed44ca0151f111ca32063b"}],"chapterFiles":null,"chapterExtends":null,"children":null}],"coverPath":"/upload/201512/3421d9597f9044b785e5138665fec42e.jpg","courseId":"8a22ecb551cf56cb0151d24140aa028a","outline":"","teacherName":"OBU 明星讲师团","taskNum":"47","categoryName":"OBU","subjectName":"OBU 论文提高课","courseIndex":2,"teacherHonor":"孙志远、贵荣广、多年OBU辅导经验","availability":"","categoryId":"8a22ecb551cf56cb0151d2152b5c0252","bigCoverPath":"/upload/201512/b2ff13c9c5234e0b8a1cd8bba07e37a5.png","chapterNum":"15","courseModuleType":"KNOWLEDGE_MODULE","aim":"","teacherImage":"/upload/201507/3bfaf8b86cb14985a194c01d9e9fbbb1.png","subjectId":"8a22ecb551f17b3e0151f1e161900125","versionId":"8a22ecb551cf56cb0151d24140aa028a","courseBackgroundImage":"/upload/201512/3421d9597f9044b785e5138665fec42e.jpg","subjectIndex":50,"courseName":"OBU 论文提高课","lastModifyTime":1450931,"state":"success","msg":""}
           var task_tpl = $('#task_tpl').html();
          var content = doT.template(task_tpl);
          $('#chaTask').html(content(arr)).show();

          init_check();
          return false;
        }
        
    }
    //tasksCache()
   function initDomDownStatus(){

    if(isEmpty(videochangelist)){
        return false;
    }       

    var strs = videochangelist.split(","); //字符分割
    var pathlen = strs.length;
    //从1开始，因为拼接videochangelist的时候用,开始的
    $(".chapt"+api.pageParam.chapterId).show();

    $(".video-catego").hide();

    for (j=1; j<pathlen;j++ ){
        var domInfo = videoDownInfo[strs[j]];
		var domid = strs[j];
        if(!isEmpty(domInfo)){
	        
            var domprogress = videoDownInfo[strs[j]].progress;
            var domstatus = videoDownInfo[strs[j]].status;
            var domtasknum = videoDownInfo[strs[j]].tasknum;
            var totalSize = videoDownInfo[strs[j]].totalSize;
            var downloadSize = videoDownInfo[strs[j]].downloadSize;
            // ------------------设置界面对应id节点dom下载状态，并设置为可见--------------------------
			//          alert(domid+"==="+api.pageParam.chapterId);
			
            if($(".task"+domid).attr("id") == api.pageParam.chapterId){

                $(".task"+domid).parents("li").show();
                $(".task"+domid).attr("type",domstatus);
	            $(".task"+domid).find(".val").html(domprogress);
	            $(".task"+domid).parent().prev().find(".v-progress").find("span").css("width",domprogress+"%");

	            if(totalSize == -1){
	            	$(".task"+domid).parent().prev().find(".v-name").find(".span11 b").text(getVideoSize(downloadSize));
	            }else if(totalSize == "未知"){
	            	$(".task"+domid).parent().prev().find(".v-name").find(".span11 b").text("大小未知");
	            }else{
	            	$(".task"+domid).parent().prev().find(".v-name").find(".span11 b").text(getVideoSize(totalSize));
	            }
	            
//	            $(".task"+domid).parent().prev().find(".v-name").find("span").eq(1).text(Math.round(domprogress)+"%");
            }
            
            
        } 
    }

}
//测试
// var aa={"courseJson":"[{\"availability\":\"<p>\\r\\n\\tCMA P1 中文 前导讲义有更新，更新章节：\\r\\n</p>\\r\\n<p>\\r\\n\\t第1章-第1节-知识点1\\r\\n</p>\\r\\n<p>\\r\\n\\t<span style=\\\"line-height:1.5;\\\">第1章-第2节-知识点2</span> \\r\\n</p>\\r\\n第3章-第1节-知识点1<br />\",\"courseBackgroundImage\":\"/upload/201604/92da0abdac4a45f5b46f9546ade771ac.jpg\",\"categoryName\":\"CMA中文\",\"courseIndex\":130,\"knowledgePointId\":\"\",\"teacherName\":\"QiQi Wu\",\"chapters\":[{\"chapterId\":\"8a22ecb553eab1280153f3774d3a0080\",\"isFree\":\"true\",\"knowledgePointId\":null,\"chapterTitle\":\"第一章 管理会计基础\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb553eab1280153f38a4e240087\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"前导\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540452360300b6\",\"videoCcid\":\"1636D8924AA82ED29C33DC5901307461\",\"videoTime\":256,\"taskType\":\"video\",\"title\":\"前导课\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044018bd009a\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f384b5c30084\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第一节 管理会计的产生与发展\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b428d7faa063d\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 管理会计的产生\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540468f39800ba\",\"videoCcid\":\"72D12CCB7EBFE95C9C33DC5901307461\",\"videoTime\":1263,\"taskType\":\"video\",\"title\":\"知识点1 管理会计的形成\",\"taskLevel\":null,\"id\":\"8a22ecb553eab128015404410a66009c\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201703/ca2b169f8e9b4baf8106ce21e62e0b74.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b428db65c063e\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点2 管理会计的发展\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab128015404696af800bb\",\"videoCcid\":\"15F603BEEC1D737C9C33DC5901307461\",\"videoTime\":1157,\"taskType\":\"video\",\"title\":\"知识点2 管理会计的发展\",\"taskLevel\":null,\"id\":\"8a22ecb553eab12801540441487a009d\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/78b9c138f43246ecafe3c0cf1303a6c4.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f3857f2f0085\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第二节 管理会计和财务会计的关系\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b428dfb64063f\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 管理会计和财务会计的区别\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154046a01eb00bc\",\"videoCcid\":\"224E39210AD2ED299C33DC5901307461\",\"videoTime\":1295,\"taskType\":\"video\",\"title\":\"知识点1 管理会计和财务会计的区别\",\"taskLevel\":null,\"id\":\"8a22ecb553eab12801540445c98000a0\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/6a7cd4b8b89343479c927b179d5b1b4b.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b428e3c470640\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点2 管理会计和财务会计的联系\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154046a5cca00bd\",\"videoCcid\":\"619E2E8F9E67C7069C33DC5901307461\",\"videoTime\":773,\"taskType\":\"video\",\"title\":\"知识点2 管理会计和财务会计的联系\",\"taskLevel\":null,\"id\":\"8a22ecb553eab128015404461e5b00a1\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201703/a8f4ea0173c64b23b54a85b0cdb1283b.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f386da630086\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第三节 管理会计的职能与目标\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b428e96a00641\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 管理会计的目标\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab128015404717e5d00be\",\"videoCcid\":\"64D4A4A6C6DFEFDB9C33DC5901307461\",\"videoTime\":657,\"taskType\":\"video\",\"title\":\"知识点1 管理会计的目标\",\"taskLevel\":null,\"id\":\"8a22ecb553eab12801540441c9c9009e\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/3f96ba19658747d3b96bb0db2c265a35.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b428ee9ae0642\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点2 管理会计的职能\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540472130c00bf\",\"videoCcid\":\"CF1338E6CCBD08BE9C33DC5901307461\",\"videoTime\":1534,\"taskType\":\"video\",\"title\":\"知识点2 管理会计的职能\",\"taskLevel\":null,\"id\":\"8a22ecb553eab128015404424d88009f\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/caca3dcb54ed444cb0c8659907c4a51d.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f3ada7730088\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第四节 管理会计的基本原则\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b428f72b40643\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 管理会计的基本原则\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154047a85fd00c0\",\"videoCcid\":\"597686C27C1E399E9C33DC5901307461\",\"videoTime\":974,\"taskType\":\"video\",\"title\":\"知识点1 管理会计的基本假设和原则\",\"taskLevel\":null,\"id\":\"8a22ecb553eab128015404472fdc00a4\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/b9ce17fb3dca44a39cb4a2d7ac07d1bc.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f37e94c40082\",\"isFree\":\"true\",\"knowledgePointId\":null,\"chapterTitle\":\"第二章 成本会计基础\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb553eab1280153f3aeb5a00089\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"前导\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154047b2ac200c1\",\"videoCcid\":\"12D3532E116F451E9C33DC5901307461\",\"videoTime\":236,\"taskType\":\"video\",\"title\":\"前导课\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044ce58d00af\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f3af23ec008a\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第一节 成本的概述\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b428fc3050644\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 成本的概述\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154047c42aa00c2\",\"videoCcid\":\"046063D29FF4BB029C33DC5901307461\",\"videoTime\":1228,\"taskType\":\"video\",\"title\":\"知识点1 成本的概述\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044dc65c00b0\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/1190b1db4b4b4c94bd2cb72f57c43b25.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f3afdeb0008b\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第二节 成本分类\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b42900abd0645\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 财务会计中的成本分类\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154047dc29300c3\",\"videoCcid\":\"CFD7A741EC682FA29C33DC5901307461\",\"videoTime\":1234,\"taskType\":\"video\",\"title\":\"知识点1 财务会计中成本的分类\",\"taskLevel\":null,\"id\":\"8a22ecb55aeff242015b14aa07ca0338\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b429045f60646\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点2 成本性态分析\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540481f60200c4\",\"videoCcid\":\"E541DE80C943D0819C33DC5901307461\",\"videoTime\":1310,\"taskType\":\"video\",\"title\":\"知识点2 成本性态分析\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044e95e100b2\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201704/1692af46a74946afa94c1e82b277254d.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b42909bf60647\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点3 短期决策下的成本概念\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540482853a00c5\",\"videoCcid\":\"4D61D12747687DF99C33DC5901307461\",\"videoTime\":1315,\"taskType\":\"video\",\"title\":\"知识点3 短期决策下的成本概念-1\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044eff7200b4\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/223feb776d5a4ff3b36a16a36977d194.pdf\",\"express\":null},{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540482b1a900c6\",\"videoCcid\":\"B9AD8B8C5F613F059C33DC5901307461\",\"videoTime\":803,\"taskType\":\"video\",\"title\":\"知识点3 短期决策下的成本概念-2\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044f381100b5\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f37f16340083\",\"isFree\":\"true\",\"knowledgePointId\":null,\"chapterTitle\":\"第三章 财务会计基础\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb553eab1280153f3b0337b008c\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"前导\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab128015404832d2300c7\",\"videoCcid\":\"C9875EB0FC628EC09C33DC5901307461\",\"videoTime\":303,\"taskType\":\"video\",\"title\":\"前导课\",\"taskLevel\":null,\"id\":\"8a22ecb553eab12801540447e63100a5\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f3b28f04008d\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第一节 财务会计概述\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b4290e0d00648\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 财务会计的基本要素\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540483c08200c8\",\"videoCcid\":\"9FEC4E4EFA2461F19C33DC5901307461\",\"videoTime\":869,\"taskType\":\"video\",\"title\":\"知识点1 财务会计的基本要素\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044a5a8400a7\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201703/a1af2e68aa4648cba8be16406e71d8c6.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null},{\"chapterId\":\"8a22ecb553eab1280153f3b3983e008e\",\"isFree\":\"false\",\"knowledgePointId\":null,\"chapterTitle\":\"第二节 会计要素的分类\",\"isLeaf\":\"false\",\"tasks\":null,\"chapterFiles\":null,\"children\":[{\"chapterId\":\"8a22ecb55b1ec7e9015b429110200649\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点1 资产要素\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab1280154048549a100c9\",\"videoCcid\":\"E6F24766709759E59C33DC5901307461\",\"videoTime\":957,\"taskType\":\"video\",\"title\":\"知识点1 资产要素\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044af56d00a8\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201705/fcfa40b606db404895be16f1b2053f79.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b42914044064a\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点2 负债要素\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540485b5ff00ca\",\"videoCcid\":\"429903A1FCE4237E9C33DC5901307461\",\"videoTime\":677,\"taskType\":\"video\",\"title\":\"知识点2 负债要素\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044b8c0200aa\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/3bfd1a77c7184f0ea7be9af76c834578.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b42917097064b\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点3 所有者权益\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540486417500cb\",\"videoCcid\":\"35D1EBCCC9D174539C33DC5901307461\",\"videoTime\":716,\"taskType\":\"video\",\"title\":\"知识点3 所有者权益要素\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044bc61700ab\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/a57911a75fef471694d44e9dd75cfded.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b4291a30f064c\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点4 收入要素\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab128015404868b2800cc\",\"videoCcid\":\"9FC98FC38164DD1B9C33DC5901307461\",\"videoTime\":594,\"taskType\":\"video\",\"title\":\"知识点4 收入要素\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044c22a700ad\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/592693fe6b234ed49f4a90c48cc4b132.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null},{\"chapterId\":\"8a22ecb55b1ec7e9015b4291d20a064d\",\"isFree\":\"false\",\"knowledgePointId\":\"\",\"chapterTitle\":\"知识点5 费用和利润类要素\",\"isLeaf\":\"true\",\"tasks\":[{\"apiKey\":\"q6pLhLMSit3QuuYAD4TIyQ3pJNKiY0Ez\",\"taskId\":\"8a22ecb553eab12801540486cce400cd\",\"videoCcid\":\"84DFF8BDDE292B079C33DC5901307461\",\"videoTime\":1153,\"taskType\":\"video\",\"title\":\"知识点5 费用和利润类要素\",\"taskLevel\":null,\"id\":\"8a22ecb553eab1280154044c7d9e00ae\",\"videoSiteId\":\"D550E277598F7D23\",\"attachmentPath\":\"/upload/201702/c18f86bb73c44a7ca2469e88136423d6.pdf\",\"express\":null}],\"chapterFiles\":null,\"children\":null,\"chapterExtends\":null}],\"chapterExtends\":null}],\"chapterExtends\":null}],\"bigCoverPath\":\"/upload/201507/32b2575cc3094dde8461f32731ea3058.png\",\"subjectName\":\"CMA 中文 Part-1\",\"outline\":\"\",\"aim\":\"P1前导课主要学习管理会计、财务会计、成本会计的基础知识，前导课偏重基础知识的理解，要求重点掌握管理会计与财务会计的联系与区别，分别从管理会计和财务会计的角度理解并记忆成本的分类，以及财务报表的六大要素\",\"versionId\":\"ff808081491181a3014917d1bec90762\",\"effectiveDay\":280,\"coverPath\":\"/upload/201604/92da0abdac4a45f5b46f9546ade771ac.jpg\",\"teacherImage\":\"/upload/201606/09c9342818e24393a970aa93d25b9a4d.png\",\"courseModuleType\":\"KNOWLEDGE_MODULE\",\"subjectId\":\"ff808081486933e601489c799f0f0868\",\"courseId\":\"8a22ecb553eab1280153f36f380a007f\",\"courseName\":\"CMA Part I 中文 前导\",\"lastModifyTime\":1460078,\"taskNum\":\"21\",\"taskTotal\":\"21\",\"createTime\":1460078065,\"chapterNum\":\"48\",\"teacherHonor\":\"吴奇奇\",\"subjectIndex\":50,\"categoryId\":\"ff808081486933e601489c4662f60851\",\"categoryIndex\":10}]"}
// var task_tpl = $('#task_tpl').html();
// ret_data = JSON.parse(aa.courseJson) 		
// course_detail = ret_data[0];
// var content = doT.template(task_tpl);
// $('#chaTask').html(content(course_detail)).show();

    // tasksCache();
    
    function initDom(){
	     setTimeout(function() {
	         api.hideProgress();
	         api.refreshHeaderLoadDone();
	     }, 100);
	     $('body').removeClass('checking');
	   cache_model = api.require('lbbVideo');
	   courseId = api.pageParam.courseId;
	   cache_model.getCourseJsonWithCourseId({"userId":getstor('memberId'),"courseId":courseId},function(ret,err){
	   		
	   		var ret_data = JSON.parse(JSON.parse(ret.data)[0].courseJson);
	   		var task_tpl = $('#task_tpl').html();
	   		

	   		
	      course_detail = ret_data[0];
	      var content = doT.template(task_tpl);

	      // getVersionId(ret_data[0])
	      $('#chaTask').html(content(course_detail)).show();
	      
	      initDomDownStatus();
	      init_check();

	     
	      
	      api.parseTapmode();
	      task_arr = save_tasks(course_detail);
	      
      	  courseId = course_detail.courseId; //课程id
      	  var len = 0;
 		  $.each($(".video-catego"),function(k,v){
	     	 if($(v).css("display") != "none"){
	     		len++;
	     	 }
	      })
	      if(len<1){
	  	     $('#chaTask').html('');
		     $('body').addClass('null');
		     return false;
	      }

	   })
	 
    }
	function setSpeed(){
		cache_model.getCurrentDownloadVideoSize({"userId" : getstor('memberId')},function(ret,err){
    	
	    	var videoId = ret.currentVideoId;
	    	api.getFreeDiskSpace(function(ret, err) {
	             var size = (ret.size / 1000 / 1000).toFixed(2);
	             if (Math.ceil(size) < 300) {
	                clearInterval(down_timer);
	                //clearTimeout(down_setTimeout);
	                clearInterval(getStatusTime);
	                $('.down-progress[type="1"]').attr({
	                    type : 2
	                }).siblings('.down_speed').html('').addClass('none');
	                api.toast({
	                    msg : '可用空间不足,下载已暂停',
	                    location : 'middle'
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
			$('.down-progress[type="1"]').parent().prev().find(".v-name").find("span").eq(1).text(down_speed);
	       	$.each($('.down-progress[type="2"]'),function(){
	       		$(this).parent().prev().find(".v-name").find("span").eq(1).text("等待中");
	       	})
	       	$.each($('.down-progress[type="5"]'),function(){
	       		$(this).parent().prev().find(".v-name").find("span").eq(1).text("等待中");
	       	})
	       	$.each($('.down-progress[type="4"]'),function(){
	       		$(this).parent().prev().find(".v-name").find("span").eq(1).text("完成");
	       	})

	   })
	}
    apiready = function(){
      
      //1:获取所有下载记录并解析
      getdownrecord();
      //2:根据couselist获取所有缓存课程的章节详情，如果在线，从服务器获取，否则本地数据库获取
      initDom();
      clearInterval(getStatusTime);
      getStatusTime = setInterval(function(){
          getdownrecord();
          setSpeed();
      },2000)
       
//    api.setRefreshHeaderInfo({
//      visible: true,
//      loadingImg: 'widget://image/arrow-down-o.png',
//      bgColor: '#f3f3f3',
//      textColor: '#787b7c',
//      textDown: '下拉更多',
//      textUp: '松开刷新',
//      showTime: false
//    }, function(ret, err) {
//      initDom();
//    });
      	
      api.addEventListener({
          name: 'flush_catalog'
      }, function(ret) {
      		clearInterval(getStatusTime);
      		getStatusTime = setInterval(function(){
	          getdownrecord();
	          setSpeed();
	      },2000)
      })
      api.addEventListener({
          name: 'open_getStatusTime'
      }, function(ret) {
      		clearInterval(getStatusTime);
      		getStatusTime = setInterval(function(){
	          getdownrecord();
	          setSpeed();
	      },2000)
      })

      api.addEventListener({
          name: 'opena'
      }, function(ret) {
          if (ret.value.sethomepage == 1) { //删除
              $('body').addClass('checking');
              var ccids = [];
             $.each($(".video-catego"),function(k,v){
             	if($(v).css("display") != "none"){
             		if($(v).find(".icon-check").hasClass("active")){
             			var ccid = $(v).find(".icon-check").attr("dataccid");
             			ccids.push(ccid);
        
             		}
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
             	$.each($(".video-catego"),function(k,v){
             		if($(v).find(".icon-check").hasClass("active")){
             			$(v).hide();
             		}
	             })
	            
	             api.hideProgress();
	              $('body').removeClass('checking');
                  $('.icon-check').removeClass('active');    
                api.sendEvent({
                    name: "cancle_del"
                 });
                clearInterval(getStatusTime);        	
              	var len = 0;
				$.each($(".video-catego"),function(k,v){
		         	 if($(v).css("display") != "none"){
		         		len++;
		         	 }
		        })
	            if(len<1){
	          	   $('#chaTask').html('');
	    		   $('body').addClass('null');
	    		   return false;
	            }

	         },1000)
          } else if (ret.value.sethomepage == 2) { //取消
              $('body').removeClass('checking');
              $('.icon-check').removeClass('active');
          } else if (ret.value.sethomepage == 3) { //全选
              $('.icon-check').addClass('active');
          }
      });

     //监听关闭
    api.addEventListener({
        name : 'closeFrameAll'
    }, function() {
        api.closeFrame();
    });
}
      
function init_check() {
	$('.video-catego').on("click","dd",function() {
		if($(this).find(".icon-check").css("display") != "none"){
			if ($(this).find(".icon-check").hasClass('active')) {
		        $(this).find(".icon-check").removeClass('active')
		    } else {
		        $(this).find(".icon-check").addClass('active');
		    }
		}	
	    
	});
}  

function next(obj, num1 , courseId) {
      var courseId = courseId;
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
                          msg: '暂无任务',
                          location: 'middle'
                      });
                      return false;
                  }

                  course_detail = ret.data[0];

                  //课程详情数据
                  // $api.setStorage(courseId, course_detail);
                  // var task_arr2 = save_tasks(course_detail);
                  // var task_info_detail2;
                  // for (var i in task_arr2) {
                  //     if (task_arr2[i].chapterId == cid) {
                  //         task_info_detail2 = task_arr2[i];
                  //         break;
                  //     }
                  // }
                  var tasks = $.trim($(obj).next().find(".down_data").html());

                  if (isEmpty(tasks)) {
                      api.toast({
                          msg: '暂无任务',
                          location: 'middle'
                      });
                      return false;
                  }
                  judge_task(JSON.parse(tasks), 0);
              }
          });
      } else {
          course_detail = tmp_course_detail;

          // var task_arr2 = save_tasks(course_detail);
          // var task_info_detail2 = [];
          // for (var i in task_arr2) {
          //     if (task_arr2[i].chapterId == cid) {
          //         task_info_detail2 = task_arr2[i];
          //         break;
          //     }
          // }
          var tasks = $.trim($(obj).next().find(".down_data").html());
          if (isEmpty(tasks)) {
              api.toast({
                  msg: '暂无任务',
                  location: 'middle'
              });
              return false;
          }
          judge_task(JSON.parse(tasks), 0);
      }

}
//判断任务类型，跳转相应的页面
//function judge_task(res_process) {
function judge_task(task_info, lastProgress) {

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
      //study_progress: res_process,//学习进度
      last_progress: lastProgress,//学习进度
      course_detail: course_detail,//课程详情
      task_info: task_info,//当前要学习的任务信息
      type: 'task'
  };


  api.hideProgress();
  //设置屏幕向右翻转
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

/*================================================================*/


function set_down_status(str){
    //var data=JSON.parse(str);
    var data=str;
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
            //clearTimeout(down_setTimeout);
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
            //clearTimeout(down_setTimeout);
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
            //clearTimeout(down_setTimeout);
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
            //clearTimeout(down_setTimeout);
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
            //clearTimeout(down_setTimeout);
            is_count = false;
            $(obj).attr({
                'type' : 2
            }).siblings('.down_speed').html('').addClass('none');
            break;
        case '1':
        case 1:
            clearInterval(down_timer);
            //clearTimeout(down_setTimeout);
            is_count = false;
            //下载中->暂停
            // $('.down-progress[type="1"]').attr({
            //     type : 2
            // }).siblings('.down_speed').html('').addClass('none');

            $(obj).attr({
                'type' : 2
            });
            break;
        case '2':
        case 2:
            //暂停->下载中
            $('.down-progress[type="1"]').parent().prev().find(".v-name").find("span").eq(1).text("等待中");
            $('.down-progress[type="1"]').attr({
                type : 2
            });
            
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
            //clearTimeout(down_setTimeout);
            is_count = false;
            $(obj).attr({
                type : 4
            }).siblings('.down_speed').html('').addClass('none');
            break;
    }
}

//点击本章任务
function task_event(obj, num, task_id,chapter_id) {
	clearInterval(getStatusTime);
	$api.setStorage("setchapterId",chapter_id);
    task_info = task_arr[task_id].taskInfo; //任务信息
    // 如果要打开新的窗口，则关闭旧窗口
    var downState = $(obj).next().find(".down-progress").attr("type");
        //传递的页面参数
        var page_param = {
            courseId: courseId, //课程id
            course_detail: course_detail, //课程详情
            //study_progress : study_progress,
            task_info: task_info, //任务信息
            type: 'task'
        };
        
        if(downState == 4){
      	   page_param.isFinish = true;
        }else{
      	   page_param.isFinish = false;
        }
        
        
        //判断当前任务类型
        if (task_info.taskType == 'video') {
            var winName = 'video';
            var winUrl = 'video.html';
        } else {
            var winName = 'course-test';
            var winUrl = 'course-test.html';
            api.sendEvent({
                name: 'close_video_demo'
            });
        }
        api.openWin({
            name: winName,
            url: winUrl,
            reload: true,
            pageParam: page_param,
            slidBackEnabled: false, //iOS7.0及以上系统中，禁止通过左右滑动返回上一个页面
            delay: 200
        });
        
}