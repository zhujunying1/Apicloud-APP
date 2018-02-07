// var course_detail_expire = 86400 * 14 * 1000;
var course_detail_expire = 86400*1000 ;
// var course_detail_expire = 60*1000 ;
//SHA1加密算法
function SHA1(msg) {
	function rotate_left(n, s) {
		var t4 = (n << s ) | (n >>> (32 - s));
		return t4;
	}

	function lsb_hex(val) {
		var str = "";
		var i;
		var vh;
		var vl;

		for ( i = 0; i <= 6; i += 2) {
			vh = (val >>> (i * 4 + 4)) & 0x0f;
			vl = (val >>> (i * 4)) & 0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	}

	function cvt_hex(val) {
		var str = "";
		var i;
		var v;

		for ( i = 7; i >= 0; i--) {
			v = (val >>> (i * 4)) & 0x0f;
			str += v.toString(16);
		}
		return str;
	}

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	}

	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;

	msg = Utf8Encode(msg);

	var msg_len = msg.length;

	var word_array = [];
	for ( i = 0; i < msg_len - 3; i += 4) {
		j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
		word_array.push(j);
	}

	switch (msg_len % 4) {
		case 0:
			i = 0x080000000;
			break;
		case 1:
			i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
			break;

		case 2:
			i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
			break;

		case 3:
			i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
			break;
	}

	word_array.push(i);

	while ((word_array.length % 16) != 14)
	word_array.push(0);

	word_array.push(msg_len >>> 29);
	word_array.push((msg_len << 3) & 0x0ffffffff);

	for ( blockstart = 0; blockstart < word_array.length; blockstart += 16) {

		for ( i = 0; i < 16; i++)
			W[i] = word_array[blockstart + i];
		for ( i = 16; i <= 79; i++)
			W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;

		for ( i = 0; i <= 19; i++) {
			temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}
		for ( i = 20; i <= 39; i++) {
			temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for ( i = 40; i <= 59; i++) {
			temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for ( i = 60; i <= 79; i++) {
			temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;

	}

	var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

	return temp.toLowerCase();
}

//md5加密
function md5(string) {  
    function md5_RotateLeft(lValue, iShiftBits) {  
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));  
    }  
    function md5_AddUnsigned(lX, lY) {  
        var lX4, lY4, lX8, lY8, lResult;  
        lX8 = (lX & 0x80000000);  
        lY8 = (lY & 0x80000000);  
        lX4 = (lX & 0x40000000);  
        lY4 = (lY & 0x40000000);  
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);  
        if (lX4 & lY4) {  
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);  
        }  
        if (lX4 | lY4) {  
            if (lResult & 0x40000000) {  
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);  
            } else {  
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);  
            }  
        } else {  
            return (lResult ^ lX8 ^ lY8);  
        }  
    }  
    function md5_F(x, y, z) {  
        return (x & y) | ((~x) & z);  
    }  
    function md5_G(x, y, z) {  
        return (x & z) | (y & (~z));  
    }  
    function md5_H(x, y, z) {  
        return (x ^ y ^ z);  
    }  
    function md5_I(x, y, z) {  
        return (y ^ (x | (~z)));  
    }  
    function md5_FF(a, b, c, d, x, s, ac) {  
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));  
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);  
    };  
    function md5_GG(a, b, c, d, x, s, ac) {  
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));  
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);  
    };  
    function md5_HH(a, b, c, d, x, s, ac) {  
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));  
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);  
    };  
    function md5_II(a, b, c, d, x, s, ac) {  
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));  
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);  
    };  
    function md5_ConvertToWordArray(string) {  
        var lWordCount;  
        var lMessageLength = string.length;  
        var lNumberOfWords_temp1 = lMessageLength + 8;  
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;  
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;  
        var lWordArray = Array(lNumberOfWords - 1);  
        var lBytePosition = 0;  
        var lByteCount = 0;  
        while (lByteCount < lMessageLength) {  
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;  
            lBytePosition = (lByteCount % 4) * 8;  
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));  
            lByteCount++;  
        }  
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;  
        lBytePosition = (lByteCount % 4) * 8;  
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);  
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;  
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;  
        return lWordArray;  
    };  
    function md5_WordToHex(lValue) {  
        var WordToHexValue = "",  
            WordToHexValue_temp = "",  
            lByte, lCount;  
        for (lCount = 0; lCount <= 3; lCount++) {  
            lByte = (lValue >>> (lCount * 8)) & 255;  
            WordToHexValue_temp = "0" + lByte.toString(16);  
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);  
        }  
        return WordToHexValue;  
    };  
    function md5_Utf8Encode(string) {  
        string = string.replace(/\r\n/g, "\n");  
        var utftext = "";  
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                utftext += String.fromCharCode(c);  
            } else if ((c > 127) && (c < 2048)) {  
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
                utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                utftext += String.fromCharCode((c & 63) | 128);  
            }  
        }  
        return utftext;  
    };  
    var x = Array();  
    var k, AA, BB, CC, DD, a, b, c, d;  
    var S11 = 7,  
        S12 = 12,  
        S13 = 17,  
        S14 = 22;  
    var S21 = 5,  
        S22 = 9,  
        S23 = 14,  
        S24 = 20;  
    var S31 = 4,  
        S32 = 11,  
        S33 = 16,  
        S34 = 23;  
    var S41 = 6,  
        S42 = 10,  
        S43 = 15,  
        S44 = 21;  
    string = md5_Utf8Encode(string);  
    x = md5_ConvertToWordArray(string);  
    a = 0x67452301;  
    b = 0xEFCDAB89;  
    c = 0x98BADCFE;  
    d = 0x10325476;  
    for (k = 0; k < x.length; k += 16) {  
        AA = a;  
        BB = b;  
        CC = c;  
        DD = d;  
        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);  
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);  
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);  
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);  
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);  
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);  
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);  
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);  
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);  
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);  
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);  
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);  
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);  
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);  
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);  
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);  
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);  
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);  
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);  
        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);  
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);  
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);  
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);  
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);  
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);  
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);  
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);  
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);  
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);  
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);  
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);  
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);  
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);  
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);  
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);  
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);  
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);  
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);  
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);  
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);  
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);  
        d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);  
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);  
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);  
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);  
        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);  
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);  
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);  
        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);  
        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);  
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);  
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);  
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);  
        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);  
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);  
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);  
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);  
        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);  
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);  
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);  
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);  
        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);  
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);  
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);  
        a = md5_AddUnsigned(a, AA);  
        b = md5_AddUnsigned(b, BB);  
        c = md5_AddUnsigned(c, CC);  
        d = md5_AddUnsigned(d, DD);  
    }  
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();  
}

//图片上传限制
var allowPicTtype=['.png','.jpg','.jpeg','.gif'];
//title–消息标题，
//content – 消息内容
//type – 消息类型，1:消息 2:通知
//platform - 0:全部平台，1：ios, 2：android
//groupName - 推送组名，多个组用英文逗号隔开.默认:全部组。eg.group1,group2 .
//userIds - 推送用户id, 多个用户用英文逗号分隔，eg. user1,user2。
var push_url = "https://p.apicloud.com/api/push/message";
function push(bodyParam) {
	bodyParam.platform = 0;
	bodyParam.userIds = api.deviceId;
	var now = Date.now();
	var appKey = SHA1("A6999359375355" + "UZ" + "517EC3E7-8C65-1147-07D5-D2E0F943C4A7" + "UZ" + now) + "." + now;
	var headers = {
		'X-Requested-With' : 'XMLHttpRequest',
		'X-APICloud-AppId' : 'A6999359375355',
		'X-APICloud-AppKey' : appKey,
		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
	};
	api.ajax({
		url : push_url,
		method : 'post',
		cache : false,
		headers : headers,
		data : {
			values : bodyParam
		}
	}, function(ret, err) {
		//api.alert({msg:ret});
	});
}

var push_timer;
function init_push() {
	var time = isEmpty($api.getStorage('notice_time')) ? '' : $api.getStorage('notice_time');
	if (!isEmpty(time)) {
		//alert(time);
		clearInterval(push_timer);
		push_timer = setInterval(function() {
			var date = new Date(Date.now());
			var hourse = extra(date.getHours());
			var minute = extra(date.getMinutes());
			var s = extra(date.getSeconds());
			if (time == (hourse + ':' + minute) && s == '00') {
				push({
					title : '学习提醒',
					content : get_loc_val('mine', 'nickName') + '同学，时间到了，赶紧开始学习吧！',
					type : 2,
					platform : 0,
					userIds : api.deviceId
				});
			}
		}, 1000);
	}
}

function sentTimeFormat(date) {
	var time = date / 1000;
	var sentTime = new Date().getTime() / 1000 - time;
	if (sentTime < 60) {
		return "1分钟前";
		//($sentTime)."秒前";
	} else if (sentTime < 3600) {
		return Math.floor(sentTime / 60) + "分钟前";
	} else if (sentTime < 86400) {
		return Math.floor(sentTime / 3600) + "小时前";
	} else {
		if (Math.floor(sentTime / 86400) < 11) {
			return Math.floor(sentTime / 86400) + "天前";
		} else {
			return formatDate(time, 'Y') + '-' + formatDate(time, 'M') + '-' + formatDate(time, 'D');
		}
	}
}

//补位函数。
function extra(x) {
	//如果传入数字小于10，数字前补一位0。
	if (parseInt(x) < 10) {
		return "0" + parseInt(x);
	} else {
		return x;
	}
}

var err_conf_007 = {
	'-1000' : '程序异常',
	'1000' : '参数有误！',
	'1001' : '没绑定账号',
	'1002' : '账号没启用',
	'1003' : '账号被禁用',
	'1004' : '验证码错误',
	'1005' : '用户名或密码错误',
	'1006' : '用户名不可用',
	'1007' : '同意《会员注册协议》方可注册',
	'1008' : '用户名已存在',
	'1009' : '手机号已注册',
	'1010' : '没有访问权限',
	'1011' : '第三方账号已绑定',
	'1012' : '用户不存在',
	'1013' : '还没完善用户信息',
	'nologin' : '没有登录'
};
var debug = false;
var show_pro = true;
var common_url, static_url;
if (debug) {
    //测试地址
    common_url = 'http://demo.caicui.com';
    //common_url = 'https://demoapi.caicui.com';
    static_url = 'http://demo.caicui.com';
} else {
    //正式地址
    common_url = 'http://api.caicui.com';
    //common_url = 'https://apis.caicui.com';
    //static_url = 'http://static.caicui.com'
    static_url = 'http://cdnimg.caicui.com';
}
var default_img = static_url + '/upload/201501/titletit.png';
//ajax重写
function myajaxRequest(url, method, params, callBack) {
	var headers = {
		//		'X-Requested-With' : 'XMLHttpRequest',
		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
	};
	var src = url;
	var data = {};
	if (method == "get") {
		var urlquery = "";
		for (var key in params) {
			urlquery += key + "=" + params[key] + "&";
		}
		if (urlquery != "") {
			if (url.indexOf("?") > 0) {
				url += "&" + urlquery;
			} else {
				url += "?" + urlquery;
			}
		}
	} else {
		data.values = params;
	}
	api.ajax({
		url : common_url + '/' + url,
		method : method,
		cache : false,
		timeout : 1200,
		headers : headers,
		data : data
	}, function(ret, err) {
		if (api.connectionType == 'none' || api.connectionType == 'unknown') {
			is_ok = true;
		}
		// api.hideProgress();
		// api.refreshHeaderLoadDone();
		// if (src != 'api/zbids/member/getmemberinfo' && !isEmpty(ret) && ret.state == 'error' && ret.msg == 'nologin') {
		// 	api.sendEvent({
		// 		name : 'to_login'
		// 	});
		// }
		callBack(ret, err);
	});
}

// function ajaxRequest(url, method, params, callBack) {
// 	var headers = {
// 		'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
// 	};
// 	var src = url;
// 	var data = {};
// 	if (method == "get") {
// 		var urlquery = "";
// 		for (var key in params) {
// 			urlquery += key + "=" + params[key] + "&";
// 		}
// 		if (urlquery != "") {
// 			if (url.indexOf("?") > 0) {
// 				url += "&" + urlquery;
// 			} else {
// 				url += "?" + urlquery;
// 			}
// 		}
// 	} else {
// 		data.values = params;
// 	}
// 	api.ajax({
// 		url : common_url + '/' + url,
// 		method : method,
// 		cache : false,
// 		timeout : 1200,
// 		headers : headers,
// 		data : data
// 	}, function(ret, err) {
// 		if (api.connectionType == 'none' || api.connectionType == 'unknown') {
// 			is_ok = true;
// 		}
// 		api.hideProgress();
// 		api.refreshHeaderLoadDone();
// 		if (ret && ret.msg == 1010) {
// 			set_token(function(res, errors) {
// 				if (res && res.status) {
// 					$api.setStorage('token', res.data.token);
// 					params.token = res.data.token;
// 					myajaxRequest(url, method, params, function(re, er) {
// 						api.hideProgress();
// 						api.refreshHeaderLoadDone();
// 						if (src != 'api/zbids/member/getmemberinfo' && !isEmpty(re) && re.state == 'error' && re.msg == 'nologin') {
// 							api.sendEvent({
// 								name : 'to_login'
// 							});
// 						}
// 						callBack(re, er);
// 					});
// 				}
// 			});
// 		}
// 		if (src != 'api/zbids/member/getmemberinfo' && !isEmpty(ret) && ret.state == 'error' && ret.msg == 'nologin') {
//
// 		}
// 		callBack(ret, err);
// 	});
// }

function ajaxRequest(url, method, params, callBack) {
	var src = '';
    var origin = '';
    var href = '';
    if(typeof url == 'string'){
      src = url;
    }else if(typeof url == 'object'){
      origin = url.origin;
      src = url.pathname;
    }
    
	var headers = {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	};
	var data = {};
	if (method == "get" || method == "GET") {
		var urlquery = "";
		for (var key in params) {
			urlquery += key + "=" + params[key] + "&";
		}
		if (urlquery != "") {
			if (src.indexOf("?") > 0) {
				src += "&" + urlquery;
			} else {
				src += "?" + urlquery;
			}
		}
	} else {
		data.values = params;
	}
	if(origin){
      href = origin + src;
    }else{
      href = common_url + '/' + src
    }
	api.ajax({
		url: href,
		method: method,
		cache: false,
		timeout: 1200,
		headers: headers,
		data: data
	}, function (ret, err) {
		
		if (api.connectionType == 'none' || api.connectionType == 'unknown') {
			is_ok = true;
		}
		api.hideProgress();
		api.refreshHeaderLoadDone();
		// if (ret && ret.msg == '1010') {
		//     set_token(function (res, errors) {
		//         if (res && res.status) {
		//             $api.setStorage('token', res.data.token);
		//             params.token = res.data.token;
		//             myajaxRequest(url, method, params, function (re, er) {
		//                 api.hideProgress();
		//                 api.refreshHeaderLoadDone();
		//                 if (src != 'api/zbids/member/getmemberinfo' && !isEmpty(re) && re.state == 'error' && re.msg == 'nologin') {
		//                     out();
		//                 }
		//                 callBack(re, er);
		//             });
		//         }
		//     });
		// }
		if (src != 'api/zbids/member/getmemberinfo' && !isEmpty(ret) && ret.state == 'error' && ret.msg == 'nologin') {
			$api.rmStorage("password");
			api.sendEvent({
				name : 'to_login'
			});
			return false;
			// var password = isEmpty($api.getStorage('password')) ? '' : $.trim($api.getStorage('password'));
			// var account = isEmpty($api.getStorage('account')) ? '' : $.trim($api.getStorage('account'));
			// if(password && account){
			// 	set_token(function(res, errors) {
			// 		if (res && res.state == 'success') {
			// 			//继续登录
			// 			var param = {};
			// 			param.account = account;
			// 			param.password = password;
			// 			param.token = res.data.token;
			// 			myajaxRequest('api/v2.1/login', 'post', param, function(ret1, err1) {//007.005 会员登录
			// 				if (ret1 && ret1.state == 'success') {
			// 					$api.setStorage('account', account);
			//
			// 					$api.setStorage('password', password);
			//
			// 					$api.setStorage('token', ret1.data.token);
			// 					$api.setStorage('mine', ret1.data);
			// 					if (ret1.data.isAvatar == false) {
			// 						api.openWin({
			// 							name : 'sign-edit',
			// 							url : './html/sign-edit.html',
			// 							slidBackEnabled : false,
			// 							bgColor : '#fff',
			// 							delay : 200,
			// 							pageParam : {
			// 								nickName : ret1.data.nickName
			// 							}
			// 						});
			// 						return false;
			// 					} else {
			// 						ajaxRequest(url, method, params, function(result,error){
            //
			// 							callBack(result,error);
            //
			// 						});
			// 						return false;
			// 					}
			// 				}
			// 			});
			// 		}
			// 	});
			// }else{
			// 	api.sendEvent({
			// 		name : 'to_login'
			// 	});
			// }
		}
		callBack(ret, err);
	});
}




function set_token(callback) {
	var systype = api.systemType;
	var param = {};
	if (systype == 'ios') {
		param.appType = 'iPad';
		param.appId = 'iPadCourse';
		param.appKey = 'bd2de9a5d1606fe68083026e911def3a';
	} else if (systype == 'android') {
		param.appType = 'aPhone';
		param.appId = 'aPhoneCourse';
		param.appKey = '4b6454d8cf903498116e26b26dd5791a';
	}
	myajaxRequest('api/zbids/app/gettoken/v1.0', 'POST', param, function(ret, err) {
		callback(ret, err);
	});
}

function get_token() {
	set_token(function(ret, err) {
		if (err) {
			api.toast({
				msg : err.msg,
				location : 'middle'
			});
			return false;
		}
		if (ret.state == 'success') {
			$api.setStorage('token', ret.data.token);
		} else {
			if (!isEmpty(err_conf_007[ret.msg])) {
				var error = err_conf_007[ret.msg];
				api.toast({
					msg : error,
					location : 'middle'
				});
			}
			
		}
	});
}

function getstor(key) {
	var val = get_loc_val('mine', key);
	if (val) {
		return val;
	} else {
		return false;
	}
}

//时间戳转成对应日期时间，格式为：2009-03-23
function timetoDate(tm) {
	var date = new Date(parseInt(tm) * 1000);
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if (month < 10)
		month = "0" + month;
	if (day < 10)
		day = "0" + day;

	return date.getFullYear() + "-" + month + "-" + day;
}

function formatDate(now, t) {
	var date = new Date(parseInt(now * 1000));
	if (t == 'Y') {
		Y = date.getFullYear();
		return Y;
	}
	if (t == 'M') {
		M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
		return M;
	}
	if (t == 'D') {
		D = date.getDate();
		return extra(D);
	}
	if (t == 'h') {
		h = date.getHours();
		return extra(h);
	}
	if (t == 'm') {
		m = date.getMinutes();
		return extra(m);
	}
	if (t == 's') {
		s = date.getSeconds();
		return extra(s);
	}
}

//秒数转成分秒
function formatSeconds(value) {
	var theTime = parseInt(value);
	// 秒

	var theTime1 = 0;
	// 分

	var theTime2 = 0;
	// 小时

	if (theTime > 60) {

		theTime1 = parseInt(theTime / 60);

		theTime = parseInt(theTime % 60);

		if (theTime1 > 60) {

			theTime2 = parseInt(theTime1 / 60);

			theTime1 = parseInt(theTime1 % 60);

		}

	}
	var i, s, h;
	if (theTime2 >= 10) {
		h = theTime2;
	} else {
		h = '0' + theTime2;
	}
	if (theTime1 >= 10) {
		i = theTime1;
	} else {
		i = '0' + theTime1;
	}
	if (theTime >= 10) {
		s = theTime;
	} else {
		s = '0' + theTime;
	}
	//return i + ':' + s;
	if (h > 0) {
		return parseInt(parseInt(i) + parseInt(h * 60)) + ':' + s;
	} else {
		return i + ':' + s;
	}
}

//秒数转成时分秒
function formatSec(value) {
	var theTime = parseInt(value);
	// 秒
	var theTime1 = 0;
	// 分
	var theTime2 = 0;
	// 小时
	if (theTime >= 60) {
		theTime1 = parseInt(theTime / 60);
		theTime = parseInt(theTime % 60);
		if (theTime1 >= 60) {
			theTime2 = parseInt(theTime1 / 60);
			theTime1 = parseInt(theTime1 % 60);
		}
	}
	var i, s, h;
	if (theTime2 >= 10) {
		h = theTime2;
	} else {
		h = '0' + theTime2;
	}
	if (theTime1 >= 10) {
		i = theTime1;
	} else {
		i = '0' + theTime1;
	}
	if (theTime >= 10) {
		s = theTime;
	} else {
		s = '0' + theTime;
	}
	if (h > 0) {
		return parseInt(parseInt(i) + parseInt(h * 60)) + ':' + s;
	} else {
		return i + ':' + s;
	}
}

//任务类型
function formatType(type, value) {
//  if (isEmpty(value) || value == 0) {
    if (value == "-1") {
        return '';
    } else {
//      switch (type) {
//          case 'video':
                var theTime = parseInt(value);
                // 秒
                var theTime1 = 0;
                // 分
                var theTime2 = 0;
                // 小时
                if (theTime >= 60) {
                    theTime1 = parseInt(theTime / 60);
                    theTime = parseInt(theTime % 60);
                    if (theTime1 >= 60) {
                        theTime2 = parseInt(theTime1 / 60);
                        theTime1 = parseInt(theTime1 % 60);
                    }
                }
                var i, s, h;
                if (theTime2 >= 10) {
                    h = theTime2;
                } else {
                    h = '0' + theTime2;
                }
                if (theTime1 >= 10) {
                    i = theTime1;
                } else {
                    i = '0' + theTime1;
                }
                if (theTime >= 10) {
                    s = theTime;
                } else {
                    s = '0' + theTime;
                }
                if (h > 0) {
                    return parseInt(parseInt(i) + parseInt(h * 60)) + ':' + s;
                } else {
                    return i + ':' + s;
                }
                //return h + ':' + i + ':' + s;
//              break;
//          case 'exam':
//              return ' 第' + value + '题';
//              break;
//          default:
//              return ' 第' + value + '页';
//              break;
//      }
    }
}

//判断是否为空
function isEmpty(data) {
	data = $.trim(data);
	if (isEmpty1(data) || isEmpty2(data)) {
		return true;
	}
	return false;
}

function isEmpty1(data) {
	if (data == undefined || data == null || data == 'null' || data == "" || data == 'NULL' || data == false || data == 'False' || data == 'false' || data == 'NaN' || data == NaN) {
		return true;
	}
	return false;
}

function isEmpty2(v) {
	switch (typeof v) {
		case 'undefined' :
			return true;
		case 'string' :
			if ($api.trim(v).length == 0)
				return true;
			break;
		case 'boolean' :
			if (!v)
				return true;
			break;
		case 'number' :
			if (0 === v)
				return true;
			break;
		case 'object' :
			if (null === v)
				return true;
			if (undefined !== v.length && v.length == 0)
				return true;
			for (var k in v) {
				return false;
			}
			return true;
			break;
	}
	return false;
}

function get_loc_val(key, index) {
	
	var val = $api.getStorage(key);
	if (isEmpty(val)) {
		return false;
	}
	if (isEmpty(val[index])) {
		return false;
	}
	// if (isEmpty(val[index])) {
	// 	return val["id"];
	// }
	return val[index];
}

function app_installed(appBundle, callback) {
	api.appInstalled({
		appBundle : appBundle
	}, function(ret, err) {
		if (ret.installed) {
			callback(true);
		} else {
			callback(false);
		}
	});
}

function getFixName(filename) {//获取文件后缀名
	var index1 = filename.lastIndexOf(".");
	var index2 = filename.length;
	return filename.substring(index1, index2);
	//后缀名
}

function htmldecode(str) {
	//str = str.replace(/&/g, '&amp;');
	//str = str.replace(/</g, '&lt;');
	//str = str.replace(/>/g, '&gt;');
	//str = str.replace(/(?:t| |v|r)*n/g, '<br />');
	//str = str.replace(/  /g, '&nbsp; ');
	//str = str.replace(/t/g, '&nbsp; &nbsp; ');
	//str = str.replace(/x22/g, '&quot;');
	//str = str.replace(/x27/g, '&#39;');
	return str;
}

function html_decode(str) {
	//str = str.replace(/&/g, '&amp;');
	//str = str.replace(/</g, '&lt;');
	//str = str.replace(/>/g, '&gt;');
	//str = str.replace(/(?:t| |v|r)*n/g, '<br />');
	//str = str.replace(/  /g, '&nbsp; ');
	//str = str.replace(/t/g, '&nbsp; &nbsp; ');
	//str = str.replace(/x22/g, '&quot;');
	//str = str.replace(/x27/g, '&#39;');
	return str;
}

var cache_model = null;
function video_cache(method, title, ccid, UserId, apiKey, callback) {
	var param = {
		title : title,
		videoId : ccid,
		UserId : UserId,
		apiKey : apiKey
	};
	if (cache_model == null) {
		cache_model = api.require('lbbVideo');
	}
	if (isEmpty(cache_model)) {
		callback(false);
	}
	if (method == 'download') {
		getCCconfig(function(CCconfig) {
			if (CCconfig) {
				//alert(UserId+'====='+(isEmpty(CCconfig[UserId]) ? 0 : 1));
				param['isEncryption'] = isEmpty(CCconfig[UserId]) ? 0 : 1;
				cache_model.download(param, function(ret, err) {
					// if(api.systemType == "ios" && parseInt(ret.status)==2){
		   //      			return;
		   //      		}
					// callback(ret, err);
					
					if (api.systemType == "ios" && parseInt(ret.status) == 2) {
						api.toast({
							msg : ret.result,
							location : 'middle'
						})
                        return false;
                    }
//                  alert(JSON.stringify(ret))
                    if(ret.finish == "YES"){
                    	$api.setStorage("status"+ret.videoId,"YES");
                    	$api.rmStorage('speedT'+ret.videoId);
                    }
				});
			}
		});
	} else if (method == 'downloadStop') {
		cache_model.downloadStop({"userId":getstor('memberId')},function(ret, err) {
            callback(ret, err);
        });
	} else if (method == 'downloadStart') {
		cache_model.downloadStart(function(ret, err) {
			callback(ret, err);
		});
		//cache_model.downloadStart(function(ret, err) {
		//    callback(ret, err);
		//});
	}
}

//function rmVideo(videoIds) {
//	if (cache_model == null) {
//		cache_model = api.require('lbbVideo');
//	}
//	if (!isEmpty(cache_model) && !isEmpty(videoIds)) {
//		for (var p in videoIds) {
//			cache_model.rmVideo({
//				videoId : videoIds[p]
//			});
//		}
//	}
//}

function write_file(filename, data, callback) {
	api.writeFile({
		path : 'box://' + filename,
		data : data
	}, function(ret, err) {
		callback(ret, err);
	});
}

function read_file(filename, callback) {
	if(api.systemType == "ios"){
		api.readFile({
			path : 'fs://' + filename
		}, function(ret, err) {
			callback(ret, err);
		});
	}else{
		api.readFile({
			path : 'box://' + filename
		}, function(ret, err) {
			callback(ret, err);
		});
	}
	
}

function in_array(str, array) {
	for (var p in array) {
		if (array[p] == str) {
			return true;
		}
	}
	return false;
}

function set_cache(courseId, data) {
	$api.setStorage(courseId, data[0]);
    //var memberId = getstor('memberId');
    //var obj_data = $api.getStorage(memberId + 'video-buffer');
    var param = $api.getStorage('my_to_down');
    param.courseJson = data;
    $api.setStorage('my_to_down', param);
    // if (!isEmpty(obj_data)) {
    //     // if (!in_array(courseId, obj_data)) {
    //         obj_data.push(courseId);
    //         //$api.setStorage(memberId + 'video-buffer', obj_data);
    //         //write_file(memberId + courseId + '.db', JSON.stringify(data), function(ret, err) {})
    //         param.courseJson = data;
    //         $api.setStorage('my_to_down', param);
    //     // }
    // } else {
    //     obj_data = [];
    //     obj_data.push(courseId);
    //     //$api.setStorage(memberId + 'video-buffer', obj_data);
    //     //write_file(memberId + courseId + '.db', JSON.stringify(data), function(ret, err) {})
    //     param.courseJson = data;
    //     $api.setStorage('my_to_down', param);
    // }
}

function set_cache_lst(courseId, chapId) {
	var uid = getstor('memberId');
	var cid = courseId;
	var time1 = Date.now();
	var data = isEmpty($api.getStorage(cid + '-' + uid)) ? '' : $api.getStorage(cid + '-' + uid);
	if (data && time1 - data['time'] < course_detail_expire) {
		set_cache(courseId, data['data']);
	} else {
		var param = {};
		param.courseId = courseId;
		// ajaxRequest('api/v2.1/course/courseDetail', 'get', param, function(rets, errs) {
		ajaxRequest('api/teachsource/course/courseDetail', 'get', param, function(rets, errs) {
			if (rets && rets.state == 'success') {
				var data = rets.data;
				if (isEmpty(data)) {
					return false;
				}
				set_cache(courseId, data);
				var time_now = Date.now();
				var res = {
					'time' : time_now,
					'data' : data
				};
				$api.setStorage(cid + '-' + uid, res);
			}
		});
	}
}

function getFixName(filename) {//获取文件后缀名
	var index1 = filename.lastIndexOf(".");
	var index2 = filename.length;
	return filename.substring(index1, index2);
	//后缀名
}
 
//下载按钮点击
function down(_this) {
	if ($(_this).attr('sel') == 1) {
		$(_this).siblings("input[type='hidden']").attr('sel', 1);
	}
	var memberId = getstor('memberId');
	var path = "";
    var courseId = $(_this).attr('courseid'),
        type = $(_this).attr('type'),
        chapterIdA = $(_this).attr('chapterida'),
        chapterIdB = $(_this).attr('chapteridb'),
        chapterIdC = $(_this).attr('chapteridc'),
        chapterNameA = $(_this).attr('chapterNamea'),
        chapterNameB = $(_this).attr('chapterNameb'),
        chapterNameC = $(_this).attr('chapterNamec'),
        courseName = $(_this).attr('courseName'),
        versionId = $(_this).attr('versionId'),
        index = $(_this).attr('key'),
        taskId = $(_this).attr('taskid'),
        tasks = $.trim($(_this).siblings('.down_data').html());
	$api.setStorage("clickStatus",type);
	if (isEmpty(tasks)) {
		api.toast({
			msg : '无视频任务',
			location : 'middle'
		});
		return false;
	}
	
	if(!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)){
        path = chapterIdA;
    }
    if(!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)){
        path = chapterIdA + "//"+chapterIdB;
    }
    if(!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)){
        path = chapterIdA + "//"+chapterIdB + "//" + chapterIdC;
    }
    var param = {
        courseId: courseId,
        courseName : courseName,
        type: type,
        chapterIdA: chapterIdA,
        chapterIdB: chapterIdB,
        chapterIdC: chapterIdC,
        path : courseId+"//"+path+"//"+JSON.parse(tasks).videoCcid,
        pathname : courseName+"//"+chapterNameA+"//"+chapterNameB+"//"+chapterNameC+"//"+JSON.parse(tasks).title,
        index : index,
        taskId : taskId,
        tasks: JSON.parse(tasks)
    };
    var coursestatus = $api.getStorage("coursestatus"+versionId);
    param.islock = coursestatus.islock;
    param.activestate = coursestatus.activestate;
    param.expirationTime = coursestatus.expirationTime;                
    param.isbuy = coursestatus.isbuy;  

    //请求cc获取视频文件大小
    if(type == 3 && api.systemType != "ios"){
    	var data = {};
    	data.format = "json";
    	data.userid = $(_this).attr("videositeid");
    	data.videoid = JSON.parse(tasks).videoCcid;
    	data.time = Date.now();
    	var apikey = $(_this).attr("apikey"),
    		hash = md5("format="+data.format+"&userid="+data.userid+"&videoid="+data.videoid+"&time="+data.time+"&salt="+apikey);
    	data.hash = hash;
		ajaxRequest({ 'origin': 'http://spark.bokecc.com/', 'pathname': 'api/video/v2' }, 'get',data, function(res, err) {            	

	     	if(res){  
	     		if(isEmpty(res.video)){
	     			param.totalSize = "未知";
	     		}else{
		     		param.totalSize = res.video.definition[1].filesize;
	     		}   		
	     		
	     		$api.setStorage('my_to_down', param);
			    var jsfun = "my_to_down();";
			    api.execScript({
			        name: 'root',
			        script: jsfun
			    });
	     	}
	    })
    }else{
    	$api.setStorage('my_to_down', param);
	    var jsfun = "my_to_down();";
	    api.execScript({
	        name: 'root',
	        script: jsfun
	    });
    }

}

function set_down(data) {
	var res = JSON.stringify(data);
	var jsfun = "set_down_status(" + res + ")";
	api.hideProgress();
	api.execScript({
		name : 'course',
		frameName : 'course-chapter-f',
		script : jsfun
	});
	api.execScript({
		name : 'root',
		frameName : 'video-cache-f',
		script : jsfun
	});
	api.execScript({
		name : 'video',
		frameName : 'video-menu',
		script : jsfun
	});
	api.execScript({
        frameName: 'tasks-cache-f',
        script: jsfun
    });
    api.execScript({
    	name : 'course',
        frameName: 'tasks-cache-f',
        script: jsfun
    });
}



var is_added = true;
function mydown(result) {
    is_added = true;
    var down_data = result;
    var memberId = getstor('memberId');
    var tasks = result;
    var courseId = result.courseId,
        type = result.type,
        chapterIdA = result.chapterIdA,
        chapterIdB = result.chapterIdB,
        chapterIdC = result.chapterIdC,
        item = result.tasks.videoCcid;
    if (!CourseIsexpire(courseId)) {
        api.alert({
            title: '温馨提示',
            msg: '该课程已过期'
        }, function(ret, err) {});
        return false;
    }
    var is_down = isEmpty($api.getStorage(memberId + 'downed')) ? '' : $api.getStorage(memberId + 'downed');
    var data = {
        type: type,
        chapterIdA: chapterIdA,
        chapterIdB: chapterIdB,
        chapterIdC: chapterIdC,
        item : item
    };
    set_cache_lst(courseId, '');
    if (isEmpty(tasks)) {
        //无视频任务
        data.type = 'no_video';
        set_down(data);
        return false;
    }

    if(data.type != 4){
        var param = $api.getStorage('my_to_down');
        var memberId = getstor('memberId');
           cache_model = api.require('lbbVideo');
        var downObj = {
            userId : memberId,
            courseId : param.courseId,
            apiKey : result.tasks.apiKey,
            videoId : param.tasks.videoCcid,
            expirationTime : param.expirationTime,
            path : param.path,
            isbuy : param.isbuy,
            islock : param.islock,
            activestate : param.activestate,
            videoNum : 10
        }
        if(api.systemType != "ios"){
            downObj.totalSize = param.totalSize;
        }

 		var UserId = result.tasks.videoSiteId;       
        downObj['UserId'] = UserId;
        getCCconfig(function(CCconfig) {
            if (CCconfig) {
                downObj['isEncryption'] = isEmpty(CCconfig[UserId]) ? 0 : 1;              
            }
        });
 		 //保存任务数据库 		
        cache_model.insertDowndCourseState(downObj,function(ret,err){
              $api.setStorage('isDownding',ret.isDownding);
//            alert($api.getStorage('isDownding'))
        })
        // 保存课程信息库
        if(api.systemType == "ios"){
	        cache_model.inserCourseDetailJson({
	            "userId" : memberId,
	            "courseId" : param.courseId,
	            "courseJson" : JSON.stringify(param.courseJson)
	        },function(ret,err){
				// alert(JSON.stringify(ret))
	        })
        }else{
        	cache_model.inserCourseDetailJson({
	            "userId" : memberId,
	            "courseId" : param.courseId,
	            "courseJson" :param.courseJson
	        },function(ret,err){
	//			alert(JSON.stringify(ret))
	        })
        }
             	
        
        api.sendEvent({
	        name: 'open_getStatusTime'
	    }); 
      
    }

    switch (type) {
        case '1':
        case 1:
            //正在下载-》暂停
            stop_down(function(r) {
                if (api.systemType == "ios" && parseInt(r.status) == 0) {
                    return false;
                }
                // $api.rmStorage(memberId + 'downed');
                data.type = 2;
                  set_down(data);
                $api.setStorage('downloadIng',0);
            });
            break;
        case '2':
        case 2:
            //暂停-》开始下载
               stop_down(function(r) {
                if (api.systemType == "ios" && parseInt(r.status) == 0) {
                    return false;
                }
                   $api.rmStorage(memberId + 'downed');
                result.type = 3;
                  set_down(data);
                $api.setStorage('downloadIng',1);
                mydown(result);
               });
            break;
        case '5':
        case 5:
            //暂停-》开始下载
            stop_down(function(r) {
                if (api.systemType == "ios" && parseInt(r.status) == 0) {
                    return false;
                }
                // $api.rmStorage(memberId + 'downed');
                result.type = 3;
                set_down(data);
                $api.setStorage('downloadIng',1);
                mydown(result);
            });
            break;
        case '3':
        case 3:
            api.getFreeDiskSpace(function(Space, err) {
                var size = (Space.size / 1000 / 1000).toFixed(0);
                if (size < 300) {
                    data.type = 'less_space';
                    set_down(data);
                } else {

                    //暂停/(未下载过)-》下载中
                    //开始下载
                    var downloadIng = $api.getStorage('downloadIng');
                    if(downloadIng){
                      result.type = 5;
                        set_down(data);
                    }else{
                      $api.setStorage('downloadIng',1);
                      result.type = 1;
                        set_down(data);
                    }
                    var task_data = [];
    
                    for (var p in tasks) {
                        if (tasks[p].taskType == 'video') {
                            task_data.push({
                                chapterIdA: chapterIdA,
                                chapterIdB: chapterIdB,
                                chapterIdC: chapterIdC,
                                data: tasks[p]
                            });
                        }
                    }
                    var cache;
                    var task_length = Object.keys(task_data).length;
                    if (task_data.length >= 1) {
                        to_down(0);
                    } else {
                        //无视频任务
                        data.type = 'no_video';
                        set_down(data);
                        return false;
                    }

                    function to_down(m) {
                        if (isEmpty(task_data[m]) || isEmpty(task_data[m].data.videoCcid) || isEmpty(task_data[m].data.apiKey)) {
                            return false;
                        }
                        
                        var title = task_data[m].data.title,
                            videoCcid = task_data[m].data.videoCcid,
                            videoSiteId = task_data[m].data.videoSiteId,
                            apiKey = task_data[m].data.apiKey,
                            taskId = task_data[m].data.taskId;
                        var isDownding = $api.getStorage('isDownding');
                        var clickStatus = $api.getStorage('clickStatus');
                        
                        if(isDownding == "false"){
                        	isDownding = false;
                        }else if(isDownding == 'true'){
                        	isDownding = true;
                        }
                       
                        if (!isEmpty(isDownding) && clickStatus != 2) {
                       
                            //一级章节下载记录
                            if (!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                                $api.setStorage(memberId + chapterIdA + 'progress', 1);
                            }
                            //二级章节下载记录
                            if (!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                                $api.setStorage(memberId + chapterIdA + 'progress', 1);
                                $api.setStorage(memberId + chapterIdB + 'progress', 1);
                            }
                            //三级章节下载记录
                            if (!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)) {
                                $api.setStorage(memberId + chapterIdA + 'progress', 1);
                                $api.setStorage(memberId + chapterIdB + 'progress', 1);
                                $api.setStorage(memberId + chapterIdC + 'progress', 1);
                            }
                            //下载队列
                            // read_file(memberId + 'Queue.db', function(res, err) {
                            //     if (res.status && res.data) {
                            //         var Queue = JSON.parse(res.data);
                            //         ////变成等待中的状态
                            //         // data.type = 'wait';
                            //         // data.type = 5;
                            //         // set_down(data);
                            //         var flag = true;
                            //         for (var p in Queue) {
                            //             //一级章节下载记录
                            //             if (!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                            //                 if ((!isEmpty(Queue[p]['chapterIdA']) && Queue[p]['chapterIdA'] == chapterIdA) || (!isEmpty(Queue[p]['chapterida']) && Queue[p]['chapterida'] == chapterIdA)) {
                            //                     flag = false;
                            //                 }
                            //             }
                            //             //二级章节下载记录
                            //             if (!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                            //                 if ((!isEmpty(Queue[p]['chapterIdB']) && Queue[p]['chapterIdB'] == chapterIdB) || (!isEmpty(Queue[p]['chapteridb']) && Queue[p]['chapteridb'] == chapterIdB)) {
                            //                     flag = false;
                            //                 }
                            //             }
                            //             //三级章节下载记录
                            //             if (!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)) {
                            //                 if ((!isEmpty(Queue[p]['chapterIdC']) && Queue[p]['chapterIdC'] == chapterIdC) || (!isEmpty(Queue[p]['chapteridc']) && Queue[p]['chapteridc'] == chapterIdC)) {
                            //                     flag = false;
                            //                 }
                            //             }
                            //         }
                            //         if (flag) {
                            //             Queue.push(down_data);
                            //             write_file(memberId + 'Queue.db', JSON.stringify(Queue), function(ret, err) {})
                            //         }
                            //     } else {
                            //         Queue = [];
                            //         Queue.push(down_data);
                            //         write_file(memberId + 'Queue.db', JSON.stringify(Queue), function(ret, err) {})
                            //     }
                            // });
                            
                            return false;
                            
                        }
                 		stop_down(function(r) {});
                        video_cache('download', title, videoCcid, videoSiteId, apiKey, autoDownCallback);
                        //下载中ui监听
                        // data.type = 'ing';
                        // data.type = 1;
                        // set_down(data);
						
						var autoDownCallback = function(ret,err){
							alert(JSON.stringify(ret))
						
						}
						
						
						
                        var lslcallback = function(ret, err) {
                            //alert(JSON.stringify(ret));
                            // api.sendEvent({
                            //     name: 'DOWN',
                            //     extra: {
                            //         ret:ret
                            //     }
                            // });
                            if (api.systemType == 'ios' && (ret.status == 3 || ret.status == '3')) {
                                var downed = $api.getStorage(memberId + 'downed');
                                if (downed) {
                                    var mychapterIdA = isEmpty(downed['chapterIdA']) ? '' : downed['chapterIdA'];
                                    var mychapterIdB = isEmpty(downed['chapterIdB']) ? '' : downed['chapterIdB'];
                                    var mychapterIdC = isEmpty(downed['chapterIdC']) ? '' : downed['chapterIdC'];
                                    //一级章节下载记录
                                    if (!isEmpty(mychapterIdA) && isEmpty(mychapterIdB) && isEmpty(mychapterIdC)) {
                                        $api.rmStorage(memberId + mychapterIdA + 'progress');
                                    }
                                    //二级章节下载记录
                                    if (!isEmpty(mychapterIdA) && !isEmpty(mychapterIdB) && isEmpty(mychapterIdC)) {
                                        $api.rmStorage(memberId + mychapterIdB + 'progress');
                                    }
                                    //三级章节下载记录
                                    if (!isEmpty(mychapterIdC) && !isEmpty(mychapterIdA) && !isEmpty(mychapterIdB)) {
                                        $api.rmStorage(memberId + mychapterIdC + 'progress');
                                    }
                                    return false;
                                }
                            }
                            if (ret.progress <= 0 && ret && ret.status != 0) {
                                return false;
                            }


                            if (api.systemType == 'android') {
                                if (ret.status == '300' || ret.status == 300) {
                                    clearInterval(down_timer);
                                    clearTimeout(down_setTimeout);
                                    is_count = false;
                                    // data.type = 'wait';
                                    // data.type = 5;
                                    // set_down(data);
                                    return false;
                                }
                            }

                            if (ret && (ret.status == 1 || ret.status == '1')) {
                                var progress = parseInt(ret.progress);
                                if (progress > 100) {
                                    return false;
                                }

                                $api.setStorage(videoCcid, ret.finish);
                                if (is_added) {
                                    //下载中ui监听
                                    // data.type = 'ing';
                                    // data.type = 1;
                                    // set_down(data);
                                    //下载队列
                                    read_file(memberId + 'Queue.db', function(res, err) {
                                        if (res.status && res.data) {
                                            var Queue = JSON.parse(res.data);
                                            var flag = true;
                                            for (var p in Queue) {
                                                //一级章节下载记录
                                                if (!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                                                    if ((!isEmpty(Queue[p]['chapterIdA']) && Queue[p]['chapterIdA'] == chapterIdA) || (!isEmpty(Queue[p]['chapterida']) && Queue[p]['chapterida'] == chapterIdA)) {
                                                        flag = false;
                                                    }
                                                }
                                                //二级章节下载记录
                                                if (!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                                                    if ((!isEmpty(Queue[p]['chapterIdB']) && Queue[p]['chapterIdB'] == chapterIdB) || (!isEmpty(Queue[p]['chapteridb']) && Queue[p]['chapteridb'] == chapterIdB)) {
                                                        flag = false;
                                                    }
                                                }
                                                //三级章节下载记录
                                                if (!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)) {
                                                    if ((!isEmpty(Queue[p]['chapterIdC']) && Queue[p]['chapterIdC'] == chapterIdC) || (!isEmpty(Queue[p]['chapteridc']) && Queue[p]['chapteridc'] == chapterIdC)) {
                                                        flag = false;
                                                    }
                                                }
                                            }
                                            if (flag) {
                                                Queue.push(down_data);
                                                write_file(memberId + 'Queue.db', JSON.stringify(Queue), function(ret, err) {})
                                            }
                                        } else {
                                            Queue = [];
                                            Queue.push(down_data);
                                            write_file(memberId + 'Queue.db', JSON.stringify(Queue), function(ret, err) {})
                                        }
                                    });
                                    is_added = false;
                                }
                                var cahce_data = $api.getStorage('cahce_data' + memberId + courseId);


                                if (isEmpty(cahce_data)) {
                                    cahce_data = {};
                                }
                                if (typeof cahce_data[chapterIdA] == "undefined" || isEmpty(cahce_data[chapterIdA])) {
                                    cahce_data[chapterIdA] = {};
                                }
                                var n = 0;
                                var num = 0;
                                var cahce_dataKeys;

                                //一级章节下载记录
                                if (!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                                    cahce_data[chapterIdA][ret.videoId] = progress;
                                    cahce_dataKeys = Object.keys(cahce_data[chapterIdA]);
                                    for (var key in cahce_dataKeys) {
                                        if (cahce_dataKeys[key] != 'progress') {
                                            n += parseInt(cahce_data[chapterIdA][cahce_dataKeys[key]]);
                                        }
                                    }
                                    //当前环形进度
                                    // num = parseInt(n / task_length);
                                    // cahce_data[chapterIdA]['progress'] = num;
                                    num = ret.progress;
                                    cahce_data[chapterIdA]['progress'] = num;
                                }
                                //二级章节下载记录
                                if (!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                                    if (typeof cahce_data[chapterIdA][chapterIdB] == "undefined" || isEmpty(cahce_data[chapterIdA][chapterIdB])) {
                                        cahce_data[chapterIdA][chapterIdB] = {};
                                    }
                                    cahce_data[chapterIdA][chapterIdB][ret.videoId] = progress;
                                    cahce_dataKeys = Object.keys(cahce_data[chapterIdA][chapterIdB]);
                                    for (var key in cahce_dataKeys) {
                                        if (cahce_dataKeys[key] != 'progress') {
                                            n += parseInt(cahce_data[chapterIdA][chapterIdB][cahce_dataKeys[key]]);
                                        }
                                    }
                                    //当前环形进度
                                    // num = parseInt(n / task_length);
                                    num = ret.progress;
                                    cahce_data[chapterIdA][chapterIdB]['progress'] = num;
                                }
                                //三级章节下载记录
                                if (!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)) {
                                    if (typeof cahce_data[chapterIdA][chapterIdB] == "undefined" || isEmpty(cahce_data[chapterIdA][chapterIdB])) {
                                        cahce_data[chapterIdA][chapterIdB] = {};
                                    }
                                    if (typeof cahce_data[chapterIdA][chapterIdB][chapterIdC] == "undefined" || isEmpty(cahce_data[chapterIdA][chapterIdB][chapterIdC])) {
                                        cahce_data[chapterIdA][chapterIdB][chapterIdC] = {};
                                    }
                                    cahce_data[chapterIdA][chapterIdB][chapterIdC][ret.videoId] = progress;
                                    cahce_dataKeys = Object.keys(cahce_data[chapterIdA][chapterIdB][chapterIdC]);
                                    for (var key in cahce_dataKeys) {
                                        if (cahce_dataKeys[key] != 'progress') {
                                            n += parseInt(cahce_data[chapterIdA][chapterIdB][chapterIdC][cahce_dataKeys[key]]);
                                        }
                                    }
                                    //当前环形进度
                                    // num = parseInt(n / task_length);
                                    num = ret.progress;
                                    cahce_data[chapterIdA][chapterIdB][chapterIdC]['progress'] = num;
                                }




                                $api.setStorage('cahce_data' + memberId + courseId, cahce_data);
                                //当前下载记录
                                if (m < task_length) {
                                    cache = {
                                        videoSiteId: videoSiteId,
                                        apiKey: apiKey,
                                        // progress: num,
                                        progress : ret.progress,
                                        courseId: courseId,
                                        chapterIdA: chapterIdA,
                                        chapterIdB: chapterIdB,
                                        chapterIdC: chapterIdC,
                                        taskId: taskId,
                                        videoCcid: videoCcid,
                                        title: title,
                                        tasks: tasks
                                    };
                                    var cache_ccid = {};
                                    cache_ccid[videoCcid] = cache;
                                    $api.setStorage('cache' + videoCcid, cache_ccid);
                                    $api.setStorage(memberId + 'downed', cache);
                                }
                                //一级章节下载记录
                                if (!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                                    // $api.setStorage(memberId + chapterIdA + 'progress', num == 0 ? 1 : num);
                                    $api.setStorage(memberId + chapterIdA + 'progress', ret.progress == 0 ? 1 : ret.progress);

                                }
                                //二级章节下载记录
                                if (!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                                    $api.setStorage(memberId + chapterIdA + 'progress', 1);
                                    // $api.setStorage(memberId + chapterIdB + 'progress', num == 0 ? 1 : num);
                                    $api.setStorage(memberId + chapterIdB + 'progress', ret.progress == 0 ? 1 : ret.progress);
                                }
                                //三级章节下载记录
                                if (!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)) {
                                    $api.setStorage(memberId + chapterIdA + 'progress', 1);
                                    $api.setStorage(memberId + chapterIdB + 'progress', 1);
                                    // $api.setStorage(memberId + chapterIdC + 'progress', num == 0 ? 1 : num);
                                    $api.setStorage(memberId + chapterIdC + 'progress', ret.progress == 0 ? 1 : ret.progress);
                                }





                                api.getFreeDiskSpace(function(retd, err) {
                                    var size = (retd.size / 1000 / 1000).toFixed(2);
                                    if (size <= 300) {
                                        stop_down(function(r) {
                                            data.type = 'less_space';
                                            set_down(data);
                                        });
                                    } else {
                                        var downed = $api.getStorage(memberId + 'downed');
                                        // if (!isEmpty(downed) && parseInt(num) < parseInt(downed[progress])) {
                                        if (!isEmpty(downed) && parseInt(ret.progress) < parseInt(downed[progress])) {
                                            return false;
                                        }
                                        //下载进度回调
                                        // data.type = 'progress';
                                        data.size = size;
                                        // data.progress = num;
                                        data.progress = ret.progress;
                                        // set_down(data);
                                        count_speed();


                                        $api.setStorage(videoCcid, ret.progress);
                                        //进度圈圈样式
                                        if (parseInt(ret.progress) >= 100) {
                                            $api.setStorage(videoCcid, ret.finish);
                                            if (ret.finish != 'YES') {
                                                return false;
                                            }
                                            // if ((m == task_data.length - 1 || num == 100)) {
                                            if ((m == task_data.length - 1 || ret.progress == 100)) {

                                                cache = {
                                                    videoSiteId: videoSiteId,
                                                    apiKey: apiKey,
                                                    progress: 100,
                                                    courseId: courseId,
                                                    chapterIdA: chapterIdA,
                                                    chapterIdB: chapterIdB,
                                                    chapterIdC: chapterIdC,
                                                    taskId: taskId,
                                                    videoCcid: videoCcid,
                                                    title: title,
                                                    tasks: task_data
                                                };
                                                var cache_ccid = {};
                                                cache_ccid[videoCcid] = cache;
                                                $api.setStorage('cache' + videoCcid, cache_ccid);
                                                $api.setStorage(memberId + 'downed', cache);
                                                //一级章节下载记录
                                                if (!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                                                    $api.setStorage(memberId + chapterIdA + 'progress', 100);
                                                }
                                                //二级章节下载记录
                                                if (!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                                                    $api.setStorage(memberId + chapterIdA + 'progress', 1);
                                                    $api.setStorage(memberId + chapterIdB + 'progress', 100);
                                                }
                                                //三级章节下载记录
                                                if (!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)) {
                                                    $api.setStorage(memberId + chapterIdA + 'progress', 1);
                                                    $api.setStorage(memberId + chapterIdB + 'progress', 1);
                                                    $api.setStorage(memberId + chapterIdC + 'progress', 100);
                                                }
                                                //下载完成
                                                $api.rmStorage(memberId + 'downed');
                                                // data.type = 'end';
                                                data.type = 4;
                                                set_down(data);
                                                //删除下载队列  接着下一下载
                                                //下载队列
                                                read_file(memberId + 'Queue.db', function(res, err) {
                                                    if (res.status && res.data) {
                                                        var Queue = JSON.parse(res.data);
                                                        for (var p in Queue) {
                                                            if ((!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC) && !isEmpty(Queue[p]['chapterIdA']) && Queue[p]['chapterIdA'] == chapterIdA) ||
                                                                (!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC) && !isEmpty(Queue[p]['chapterida']) && Queue[p]['chapterida'] == chapterIdA) ||
                                                                (!isEmpty(chapterIdB) && !isEmpty(chapterIdA) && isEmpty(chapterIdC) && !isEmpty(Queue[p]['chapterIdB']) && Queue[p]['chapterIdB'] == chapterIdB) ||
                                                                (!isEmpty(chapterIdB) && !isEmpty(chapterIdA) && isEmpty(chapterIdC) && !isEmpty(Queue[p]['chapteridb']) && Queue[p]['chapteridb'] == chapterIdB) ||
                                                                (!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB) && !isEmpty(Queue[p]['chapterIdC']) && Queue[p]['chapterIdC'] == chapterIdC) ||
                                                                (!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB) && !isEmpty(Queue[p]['chapteridc']) && Queue[p]['chapteridc'] == chapterIdC)
                                                            ) {
                                                                Queue.splice(p, 1);
                                                                if (Queue.length > 0) {
                                                                    var next = isEmpty(Queue[0]) ? '' : Queue[0];
                                                                    if (next) {
                                                                        result.chapterIdA = next['chapterIdA'];
                                                                        result.chapterIdB = next['chapterIdB'];
                                                                        result.chapterIdC = next['chapterIdC'];
                                                                        result.tasks = next['tasks'];
                                                                        set_down(result);
                                                                        result.type = 3;
                                                                        mydown(result);
                                                                    }
                                                                }
                                                                write_file(memberId + 'Queue.db', JSON.stringify(Queue), function(ret, err) {});
                                                                break;
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                            // m++;
                                            // if (m < task_length) {
                                            //     to_down(m);
                                            // }
                                        }
                                    }
                                });
                            } else if (ret.status == 0 || ret.status == '0') {
                                if (window.shut_network == false && window.allow_down == true && api.connectionType == 'wifi') {
                                    clearInterval(down_timer);
                                    clearTimeout(down_setTimeout);
                                    is_count = false;
                                    if ($api.getStorage(memberId + 'downed')) {
                                        data.type = 'error';
                                        //$api.rmStorage(memberId + 'downed');
                                    } else {
                                        data.type = 'redown';
                                    }
                                    set_down(data);
                                    return false;
                                }
                            }
                        };

                        if (m < task_length && !isEmpty($api.getStorage(videoCcid)) && $api.getStorage(videoCcid) == 'YES') {
                            var retlsl = {};
                            retlsl.status = 1;
                            retlsl.finish = 'YES';
                            retlsl.progress = 100;
                            retlsl.videoId = videoCcid;
                            
                            lslcallback(retlsl);
                            return false;
                        } else {
                            var retlsl = {};
                            retlsl.status = 1;
                            retlsl.finish = 'NO';
                            retlsl.progress = !isEmpty($api.getStorage(videoCcid)) ? $api.getStorage(videoCcid) : 1;
                            retlsl.videoId = videoCcid;
                            lslcallback(retlsl);
                        }
                        
                    }

                }
            });
            break;
        case '4':
        case 4:
            //已完成
            break;
    }
}


function accAdd(num1, num2) {
	var r1, r2, m;
	try {
		r1 = num1.toString().split('.')[1].length;
	} catch(e) {
		r1 = 0;
	}
	try {
		r2 = num2.toString().split(".")[1].length;
	} catch(e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	// return (num1*m+num2*m)/m;
	return Math.round(num1 * m + num2 * m) / m;
}

function get_dowm(chapterIdA, chapterIdB, chapterIdC) {
	var sel = '';
	if (!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
		sel = chapterIdA;
	}
	if (!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
		sel = chapterIdB;
	}
	if (!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)) {
		sel = chapterIdC;
	}
	var memberId = getstor('memberId');
	var type = memberId + sel + 'progress';
	var precent = isEmpty($api.getStorage(type)) || $api.getStorage(type) == undefined || $api.getStorage(type) == 'NaN' ? 0 : $api.getStorage(type);
	return precent;
}

function is_loadA(chata) {
	var memberId = getstor('memberId');
	chata = memberId + chata + 'progress';
	if (!isEmpty($api.getStorage(chata) && $api.getStorage(chata) == 0)) {
		return '';
	}
	return (isEmpty($api.getStorage(chata)) || $api.getStorage(chata) == undefined || $api.getStorage(chata) == 'NaN') ? 'none' : '';
}

function is_loadB(chatab) {
	var memberId = getstor('memberId');
	chatab = memberId + chatab + 'progress';
	if (!isEmpty($api.getStorage(chatab) && $api.getStorage(chatab) == 0)) {
		return '';
	}
	return isEmpty($api.getStorage(chatab)) || $api.getStorage(chatab) == undefined || $api.getStorage(chatab) == 'NaN' ? 'none' : '';
}

function is_loadC(chatac) {
	var memberId = getstor('memberId');
	chatac = memberId + chatac + 'progress';
	if (!isEmpty($api.getStorage(chatac) && $api.getStorage(chatac) == 0)) {
		return '';
	}
	return isEmpty($api.getStorage(chatac)) || $api.getStorage(chatac) == undefined || $api.getStorage(chatac) == 'NaN' ? 'none' : '';
}

function my_to_down() {
    var data = $api.getStorage('my_to_down');

    //已完成
    if(data.type == 4 || data.type == '4'){
        return false;
    }
    //4G网络是否下载
   
    if((api.connectionType == '4g' || api.connectionType == '4G') && (data.type == 2 || data.type == '2' || data.type == 3 || data.type == '3') && api.connectionType != 'wifi'){
        api.confirm({
            title: '友情提示',
            msg: '当前处于4G网络，会消耗您的大量流量，您确定要下载吗？',
            buttons: ['确定', '取消']
        }, function(ret, err) {
            if (2 == ret.buttonIndex) {//用户取消
                return false;
            }
            if (1 == ret.buttonIndex) {//确定
                 mydown(data);
                return false;
            }
        });
         return false;
    }
    
    if((api.connectionType == '4g' || api.connectionType == '4G') && (data.type == 1 || data.type == '1') && api.connectionType != 'wifi'){
        mydown(data);
        return false;
    }
    
    if (api.connectionType == 'wifi') {//为wifi可以下载

        mydown(data);

        return false;
    }

    if (api.connectionType == 'none' ||  api.connectionType == 'unknown') {

        data.type = 'shut_network';

        set_down(data);

        return false;
    }
    if (api.connectionType!='wifi') {

        data.type = 'deny_down';

        set_down(data);

        return false;
    }
}

function down_stop(callback) {//删除下载
    var memberId = getstor('memberId');
    var downed = $api.getStorage(memberId + 'downed');

    if (cache_model == null) {
        cache_model = api.require('lbbVideo');
    }
    cache_model.downloadStop({"userId":getstor('memberId')},function (ret, err) {

        $api.rmStorage(memberId + 'downed');
        if (downed) {
            var chapterIdA = isEmpty(downed['chapterIdA']) ? '' : downed['chapterIdA'];
            var chapterIdB = isEmpty(downed['chapterIdB']) ? '' : downed['chapterIdB'];
            var chapterIdC = isEmpty(downed['chapterIdC']) ? '' : downed['chapterIdC'];
            //一级章节下载记录
            if (!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                $api.rmStorage(memberId + chapterIdA + 'progress');
            }
            //二级章节下载记录
            if (!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)) {
                $api.rmStorage(memberId + chapterIdB + 'progress');
            }
            //三级章节下载记录
            if (!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)) {
                $api.rmStorage(memberId + chapterIdC + 'progress');
            }
            callback(true);
        }
    });
}

function stop_down(callback) {//暂停下载
    var memberId = getstor('memberId');

    if (cache_model == null) {
        cache_model = api.require('lbbVideo');
    }
    cache_model.downloadStop({"userId":getstor('memberId')},function (ret, err) {
        $api.rmStorage(memberId + 'downed');
        callback(true);
    });
}

function rmVideo(res) {
    var videoIds = JSON.parse(res);
    if (cache_model == null) {
        cache_model = api.require('lbbVideo');
    }
    if (!isEmpty(cache_model) && !isEmpty(videoIds)) {
        for (var p in videoIds) {
            delVideoFile(videoIds[p]);
            /*cache_model.rmVideo({
             videoId: videoIds[p]
             });*/
        }
    }
}

/*
 下载速度计算
 */
var is_count = false;
var down_timer;
var count_timer;
function count_speed() {
	// if (!is_count) {
	// 	clearInterval(down_timer);
	// 	clearTimeout(count_timer);
	// 	down_timer = setInterval(function() {
	// 		api.getFreeDiskSpace(function(ret, err) {
	// 			var size1 = ret.size;
	// 			var count_timer = setTimeout(function() {
	// 				api.getFreeDiskSpace(function(retd, err) {
	// 					var size2 = retd.size;
	// 					if (size1 >= size2) {
	// 						var speed = (((size1 - size2) / 1000 / 1000) * 1024).toFixed(0);
	// 						api.sendEvent({
	// 							name : 'down_speed',
	// 							extra : {
	// 								speed : speed
	// 							}
	// 						});
	// 					}
	// 				})
	// 			}, 1500);
	// 		});
	// 	}, 1500);
	// 	is_count = true;
	// }
}
//苹果appstore
window.allow_down = true;
window.shut_network = false;

function delVideoFile(videoId){

	var userid = getstor("memberId");
    $api.rmStorage(videoId);
//  cache_model.downloadStop({"userId":getstor('memberId')},function(){});
    $api.rmStorage('cache' + videoId);
    cache_model.rmVideo({
    	userId : userid,
     	videoId: videoId 
     });

    return false;
//	alert(videoId);
    var userid = getstor("memberId");
    var courseArr = $api.getStorage(userid+"video-buffer");
    var videoIdArr = [];
    if(!isEmpty(courseArr)){
        for(var key in courseArr){
            var courseId = courseArr[key];
            var data = JSON.parse(api.readFile({sync:true,path: 'box://'+userid+courseId+".db"}));
            //alert(data);
            //把正在下在的列表中的视频id放入一个数据中
            for(var i in data){
                var data1 = data[i].chapters;
                //chapters
                for(var j in data1){
                    var data2 = data1[j];
                    if(data2.isLeaf == "true"){//一级处理
                        //api.toast({msg:"111111-----"+data2.chapterId});
                        if(is_loadA(data2.chapterId) == ''){
                            var data3 = data2.tasks;
                            for(var g in data3){
                                //判断是否在下载
                                videoIdArr.push(data3[g].videoCcid);
                            }
                        }
                    }else{
                        //二级处理
                        var children = data2[j];
                        for(var c in children){
                            var data4 = children[c];
                            if(data4.isLeaf == "true"){
                                if("" ==is_loadB(data4.chapterId)){
                                    var data5 = data4.tasks;
                                    for(var k in data5){
                                        //判断是否在下载
                                        videoIdArr.push(data5[k].videoCcid);
                                    }
                                }
                            }else{
                                //三级处理
                                var children3 = data4[c];
                                for(var c3 in children3){
                                    var data6 = children3[c3];
                                    if(data6.isLeaf == "true"){
                                        if("" == is_loadC(data6.chapterId)){
                                            var data7 = data6.tasks;
                                            for(var m in data7){
                                                //判断是否在下载
                                                videoIdArr.push(data7[m].videoCcid);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
//      alert(videoId);
        // api.alert({msg:videoIdArr});
    }
    //判断是否删除
    var isdel = true;
    for(var v1 in videoIdArr){
        if(videoIdArr[v1] == videoId){
            isdel = false;
            break;
        }
    }
    if(isdel){
        //alert(isdel+"----"+videoId);
        $api.rmStorage(videoId);
        $api.rmStorage('cache' + videoId);
        cache_model.rmVideo({videoId:videoId});
    }
}

function getdownrecord(){
	cache_model = api.require('lbbVideo');
    var param = {
        "userId" : getstor('memberId'),
        "readTime" : lastgettime
    }
    cache_model.getTaskData(param,function(ret,err){
        //------------------结束获取--------------------------
        var saverecordObj = JSON.parse(ret.data);
        // console.log(JSON.stringify(ret))
        ///设置下一次读取下载的某个时间之后变化的所有记录
        lastgettime = saverecordObj.readTime;
        //循环处理每一条返回的下载记录，并统计分析最后变化值
        for(i=0;i< saverecordObj.data.length;i++){
        	saverecordObj.data[i].progress = Number(saverecordObj.data[i].progress)
            procRecord(saverecordObj.data[i]);
        }
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
                videoDownInfo[strs[j]].totalSize = videorecord.totalSize;
                videoDownInfo[strs[j]].downloadSize = videorecord.downloadSize;
                // videoDownInfo[strs[j]].downloadSize = videorecord.downloadSize;
                //如果子节点有一个处于下载，则为下载，如果没有，如果有一个在队列，则为队列，如果没有，则为停止，如果全部下载完成，则为下载完成
                //0:停止  1:等待  2:下载中  3: 下载完成
                //以下节点下载状态叶子节点是准的,父节点不准,没考虑其它子节点的下载状态
                if(videoDownInfo[strs[j]].progress == 100 || videoDownInfo[strs[j]].status == 4){
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
            videoDownInfo[strs[j]].totalSize = videorecord.totalSize;
            videoDownInfo[strs[j]].downloadSize = videorecord.downloadSize;
            // videoDownInfo[strs[j]].downloadSize = videorecord.downloadSize;
            //如果子节点有一个处于下载，则为下载，如果没有，如果有一个在队列，则为队列，如果没有，则为停止，如果全部下载完成，则为下载完成
            //0:停止  1:等待  2:下载中  3: 下载完成
            //以下节点下载状态叶子节点是准的,父节点不准,没考虑其它子节点的下载状态
            if(videoDownInfo[strs[j]].progress == 100 || videoDownInfo[strs[j]].status == 4){
                videoDownInfo[strs[j]].status = 4;
            }else{
                videoDownInfo[strs[j]].status = videorecord.state;
            }
        }

    }
    $api.setStorage("videochangelist",videochangelist);
    initDomDownStatus();
    
}

//更新界面下载状态有变化的下载节点
function initDomDownStatus(){
    if(isEmpty($api.getStorage("videochangelist"))){
        return false;
    }

    var strs = $api.getStorage("videochangelist").split(","); //字符分割
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

            // alert(domid+"==="+domprogress)
            // ------------------设置界面对应id节点dom下载状态，并设置为可见--------------------------
            
            $(".task"+domid).attr("type",domstatus);
            $(".task"+domid).find(".val").html(domprogress);
            // alert($(".task"+domid).html())
        }    
    }
    //处理圈圈
    isSolidcircle('circle', '', '');
    init_process();
    //------------------设置结束--------------------------
    // console.log(strs[j]);
    // console.log(domInfo);
}
 //判断实心圈、半心圈、空心圈，参数type:'circle'、'progress',参数chap_id二级章节id
     function init_process(){
    circleProgress();
    //圆形进度条绘制
    $.each($('.down-progress'), function(k, v) {
        var num = parseInt($(v).find('.val').html());
        if (!isEmpty(num)) {
            var percent = num / 100, perimeter = Math.PI * 0.9 * $('#svgDown').width();
            $(v).find('circle').eq(1).css('stroke-dasharray', parseInt(perimeter * percent) + " " + parseInt(perimeter * (1 - percent)));
        }
    });
    //初始化下载状态
    // var downed = $api.getStorage(memberId+'downed');
    // if (downed) {
    //     var chapterIdA = get_loc_val(memberId + 'downed', 'chapterIdA'),
    //         chapterIdB = get_loc_val(memberId + 'downed', 'chapterIdB'),
    //         chapterIdC = get_loc_val(memberId + 'downed', 'chapterIdC'), 
    //         progress = get_loc_val(memberId + 'downed', 'progress');
    //     var id='';
    //     //一级章节下载记录
    //     if(!isEmpty(chapterIdA) && isEmpty(chapterIdB) && isEmpty(chapterIdC)){
    //         id=chapterIdA;
    //     }
    //     //二级章节下载记录
    //     if(!isEmpty(chapterIdA) && !isEmpty(chapterIdB) && isEmpty(chapterIdC)){
    //         id=chapterIdB;
    //     }
    //     //三级章节下载记录
    //     if(!isEmpty(chapterIdC) && !isEmpty(chapterIdA) && !isEmpty(chapterIdB)){
    //         id=chapterIdC;
    //     }

    //     if (progress == 100) {
    //         $("#" + id).attr({
    //             'type' : 4
    //         });
    //     } else {
    //         $("#" + id).attr({
    //             'type' : 1
    //         });
    //     }
    // }else{
    //     $('.down-progress[type="1"]').attr({
    //         type : 2
    //     });
    // }
}

function getVersionId(data){
    var versionId = data.versionId;
    var coursestatus ={};
    ajaxRequest('api/business/learning/courseactivestatus', 'get',{"token":$api.getStorage('token'),"versionId":versionId}, function(ret, err) {
        if(ret.state == "success"){
            var lockStatusNum = 0;
            for(var i=0;i<ret.data.length;i++){
                if(ret.data[i].lockStatus == 0){
                    lockStatusNum = i;
                }   
            }
            coursestatus.islock = ret.data[lockStatusNum].lockStatus;
            coursestatus.activestate = ret.data[lockStatusNum].activeState;
            coursestatus.expirationTime = ret.data[lockStatusNum].expirationTime;
            coursestatus.activeTime = ret.data[lockStatusNum].activeTime;
            if(ret.data[lockStatusNum].activeState == "acitve"){
                coursestatus.isbuy = 1;
            }                   
            $api.setStorage("coursestatus"+versionId,coursestatus)
        }
    })
} 

//计算下载速度
function getFormatSize(size){
    
	var kiloByte = size/1024; 
      if(kiloByte < 1) {  
          return size + "B/s";  
     }   
     var megaByte = kiloByte/1024;  
     if(megaByte < 1) { 
      	return kiloByte.toFixed(0)/2+ "KB/s"; 
     }  
     
     var gigaByte = megaByte/1024;  
     if(gigaByte < 1) {  
     	return megaByte.toFixed(0)/2+ "MB/s";  
     }  
       
    var teraBytes = gigaByte/1024;  
     if(teraBytes < 1) {  
     	return gigaByte.toFixed(0)/2+ "GB/s";   
     }  

}
//计算视频文件大小
function getVideoSize(size){
    
	var kiloByte = size/1024; 
      if(kiloByte < 1) {  
          return size + "B";  
     }   
     var megaByte = kiloByte/1024;  
     if(megaByte < 1) { 
      	return kiloByte.toFixed(0)+ "KB"; 
     }  
     
     var gigaByte = megaByte/1024;  
     if(gigaByte < 1) {  
     	return megaByte.toFixed(0)+ "MB";  
     }  
       
    var teraBytes = gigaByte/1024;  
     if(teraBytes < 1) {  
     	return gigaByte.toFixed(0)+ "GB";   
     }  

}
//处理图片路径
function getImgPath(imgPath){
	if(imgPath.length>0){	 
		  if(imgPath.substr(0,4)!="http"){
		     return static_url+imgPath;
		  }else{
		  	return imgPath;
		  }
	 }else{
	 	return imgPath;
	 }
}

function getreolyImg(html){
   var divHtml = $("<div>");
   divHtml.html(html);
   var divHtmlimg = divHtml.find("img");
   if(divHtmlimg.length<1){
        return '';
   }
   var divHtmlimgArr = [];
   $.each(divHtmlimg,function(k,v){
        divHtmlimgArr.push($(this).attr("src"));
   })
   return divHtmlimgArr;
}

//去除title多余标签
function outTitle(title){
    var title = title.replace(/\t|\n|<.*?>/ig, function (tag) {
        if (tag.indexOf('<img ') === 0) {
            return tag;
        } else {
            return '';
        }
    })
    return title
}

function stringToEntity(str){
    var newStr = '';
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"','#39':"'"};
    newStr = str.replace(/&(lt|gt|nbsp|amp|quot|#39);/ig,function(all,t){return arrEntities[t];});
    return newStr;
}