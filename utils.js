// JS 工具库

/**
 * 函数描述
 * @param { 参数的数据类型 } 参数名1 描述
 * @return { 返回值的数据类型 } 描述
 */

/**
 * 获取时间差
 * @param { TIME } time1 时间节点1
 * @param { TIME } time2 时间节点1
 * @return { OBJECT } 以对象形式返回时间差
 * */
function getTimeDifference(time1, time2) {
	var diffTime = Math.round(Math.abs(time1.getTime() - time2.getTime()) / 1000);
	var day = parseInt(diffTime / (60 * 60 * 24));
	var hours = parseInt((diffTime % (60 * 60 * 24)) / (60 * 60));
	var minutes = parseInt((diffTime % (60 * 60)) / 60);
	var seconds = diffTime % 60;

	return {
		day: day,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
	};
}

/**
 * 时间格式化
 * @param { TIME } time 日期时间
 * @return { OBJECT } timeObj 返回汉字格式的日期时间
 * */
function conDate(time) {
	var arr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var week = time.getDay();
	var hours = time.getHours();
	var mitutes = time.getMinutes();
	var seconds = time.getSeconds();

	function conYear(year) {
		var qw = parseInt(year / 1000);
		var bw = parseInt((year % 1000) / 100);
		var sw = parseInt((year % 100) / 10);
		var gw = parseInt(year % 10);

		return arr[qw] + arr[bw] + arr[sw] + arr[gw];
	}

	function conOtherDate(num) {
		var sw = parseInt((num % 100) / 10);
		var gw = parseInt(num % 10);
		if (num <= 10) {
			return arr[num];
		} else if (num < 20) {
			return "十" + arr[gw];
		} else if (num % 10 == 0) {
			return arr[sw] + "十";
		} else {
			return arr[sw] + "十" + arr[gw];
		}
	}
	if (week == 0) {
		week = "日";
	} else {
		week = conOtherDate(week);
	}

	var timeObj = {
		year: conYear(year),
		month: conOtherDate(month),
		date: conOtherDate(date),
		week: week,
		hours: conOtherDate(hours),
		mitutes: conOtherDate(mitutes),
		seconds: conOtherDate(seconds),
	};

	return timeObj;
}

/**
 * 范围内随机整数
 * @param { NUMBER } a 数字1
 * @param { NUMBER } b 数字2
 * @return { NUMBER } randomNum 返回一个范围内随机整数
 * */
function rangeRandom(a, b) {
	var max = Math.max(a, b);
	var min = Math.min(a, b);
	var randomNum = Math.round(Math.random() * (max - min + 1) + min);

	return randomNum;
}

/**
 * 随机颜色
 * @return { STRING } color 返回一个随机的rgb颜色
 * */
function randomColor() {
	var color = `rbg(${rangeRandom(0, 255)}, ${rangeRandom(
		0,
		255
	)}, ${rangeRandom(0, 255)})`;
	return color;
}

/**
 * 解析查询字符串
 * @param { STRING } str 要解析的查询字符串
 * @return { Object } 解析后的结果
 * */
function parseQueryString(str) {
	var queryObj = {};
	if (str) {
		var tmp = str.slice(1).split("&");
		tmp.forEach(function(item) {
			var t = item.split("=");
			queryObj[t[0]] = t[1];
		});
	}
	return queryObj;
}

/**
 * 获取元素样式
 * @param { ELEMENT } ele 要获取样式的元素
 * @param { ELEMENT } pseudo 伪元素
 * @param { STRING } style 样式名
 * @return { STRING } 获取到的元素样式
 * */
function getStyle(ele, pseudo, style) {
	if ("getComputedStyle" in window) {
		return window.getComputedStyle(ele, pseudo)[style];
	} else {
		return ele.currentStyle[style];
	}
}

/**
 * 事件绑定兼容处理
 * @param { ELEMENT } ele 事件源
 * @param { STRING } type 事件类型
 * @param { FUNCTION } handler 事件处理函数
 * */
function on(ele, type, handler) {
	if (!ele) throw new Error("事件源参数为空");
	if (ele.nodeType !== 1 && ele.nodeType !== 9) throw new Error("事件源参数类型错误");
	if (ele.addEventListener) {
		ele.addEventListener(type, handler);
	} else if (ele.attachEvent) {
		ele.attachEvent("on" + type, handler);
	} else {
		ele["on" + type] = handler;
	}
}

/**
 * 事件解绑兼容处理
 * @param { ELEMENT } ele 事件源
 * @param { STRING } type 事件类型
 * @param { FUNCTION } handler 事件处理函数
 */
function off(ele, type, handler) {
	if (!ele) throw new Error("事件源参数为空");
	if (ele.nodeType !== 1 && ele.nodeType !== 9) throw new Error("事件源参数类型错误");
	if (ele.removeEventListener) {
		ELE.removeEventListener(type, handler);
	} else if (ele.detachEvent) {
		ele.detachEvent("on" + type, handler);
	} else {
		ele["on" + type] = null;
	}
}

/**
 * 简单运动函数
 * @param { ELEMENT } ele 要运动的元素 
 * @param { OBJECT } target 要运动的属性 
 * @param { NUMBER } kic 运动影响系数 
 * @param { FUNCTION } target 运动结束的回调函数 
 */
function move(ele, target, kic = 10, fn = () => {}) {
	let count = 0;
	for (let key in target) {
		if (key === "opacity") target[key] *= 100;
		count++;
		let temer = setInterval(function() {
			let current = key === "opacity" ? getStyle(ele, null, "opacity") * 100 : parseInt(getStyle(ele,
				null, key));
			let distance = (target[key] - current) / kic;
			distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance);
			if (current === target[key]) {
				clearInterval(temer);
				count--;
				if (!count) fn();
			} else {
				ele.style[key] = key === "opacity" ? (current + distance) / 100 : (current + distance) + "px";
			}
		}, 30)
	}
}

/**
 * 设置cookie
 * @param { STRING } key cookie 的 key
 * @param { STRING } value cookie 的 value
 * @param { NUM } expires 有效期秒数
 * @param { STRING } path cookie 存储路径
 * */
function setCookie(key, value, expires, path) {
	var str = key + "=" + value;
	if (expires) {
		var time = new Date();
		time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + expires * 1000);
		str += ";expires=" + time;
	}
	if (path) str += ";path=" + path;
	document.cookie = str;
}

/**
 * 获取cookie
 * @param { STRING } key 选填。要获取的cookie的key
 * @return { STRING | OBJECT } 填写参数是指定key的值，不填写是整个cookie的对象形式
 */
function getCookie(key) {
	var temp = document.cookie.split("; ");
	var o = key ? "" : {};
	temp.forEach(function(item) {
		var t = item.split("=");
		if (key) {
			if (t[0] === key) {
				o = t[1];
			}
		} else {
			o[t[0]] = t[1];
		}
	});
	return o;
}

/**
 * 删除cookie
 * @param { STRING } key 要删除的cookie的key
 */
function delCookie(key) {
	setCookie(key, "", -1);
}

/**
 * 创建 ajax 实例化对象
 * @return { OBJECT } 创建好的 ajax 实例化对象
 */
function createXhr() {
	var xhr = null;
	var flag = false;
	var arr = [
		function() {
			return new XMLHttpRequest()
		},
		function() {
			return new ActiveXObject("Microsoft.XMLHTTP")
		},
		function() {
			return new ActiveXObject("Msxml.XMLHTTP")
		},
		function() {
			return new ActiveXObject("Msxml2.XMLHTTP")
		}
	];
	for (let i = 0; i < arr.length; i++) {
		try {
			xhr = arr[i]();
			createXhr = arr[i];
			flag = true;
			break;
		} catch (err) {}
	}
	if (!flag) {
		xhr = "您的浏览器不支持 ajax，请更换浏览器后重试！";
		throw new Error(xhr);
	}
	return xhr;
}

/**
 * 发送 ajax 请求
 * @param { OBJECT } options 请求的所有配置项
 */
function ajax(options = {}) {
	if (!options.url) {
		throw new Error("url 不能为空");
	}
	if (!(options.type == undefined || options.type.toUpperCase() === "GET" || options.type.toUpperCase() === "POST")) {
		throw new Error("目前只支持 GET 和 POST 请求方式");
	}
	if (!(options.async == undefined || typeof options.async === "boolean")) {
		throw new Error("async 需要一个 Boolean 数据类型");
	}
	if (!(options.dataType == undefined || options.dataType.toUpperCase() === "STRING" || options.dataType.toUpperCase() === "JSON")) {
		throw new Error("目前只支持 string 和 json 格式解析");
	}
	if (!(options.data == undefined || typeof options.data === "string" || Object.prototype.toString.call(options.data) === "[object Object]")) {
		throw new Error("data 参数只支持 string 和 object 数据类型");
	}
	if (!(options.success == undefined || typeof options.success === "function")) {
		throw new Error('success 需要传递一个函数类型');
	}
	if (!(options.error == undefined || typeof options.error === "function")) {
		throw new Error('error 需要传递一个函数类型');
	}
	var _default = {
		url: options.url,
		type: options.type || "GET",
		async: typeof options.async === "boolean" ? options.async : true,
		dataType: options.dataType || "string",
		data: options.data || "",
		success: options.success || function() {},
		error: options.error || function() {}
	}
	if (typeof _default.data === "object") {
		var str = "";
		for (var key in _default.data) {
			str += key + "=" + _default.data[key] + "&";
		}
		_default.data = str.slice(0, -1);
	}
	
	var xhr = createXhr();
	if (_default.type.toUpperCase() === "GET" || _default.data) {
		_default.url += "?" + _default.data;
	}
	xhr.open(_default.type, _default.url, _default.async);
	xhr.onreadystatechange = function() {
		if (xhr.status >= 200 && xhr.status < 300 && xhr.readyState === 4) {
			if (_default.dataType.toUpperCase() === "JSON") {
				_default.success(JSON.parse(xhr.responseText));
			} else if (_default.dataType.toUpperCase() === "STRING") {
				_default.success(xhr.responseText);
			}
		}
		if (xhr.status >= 400 && xhr.readyState === 4) {
			_default.error(xhr.status);
		}
	};
	if (_default.type.toUpperCase() === "POST" || _default.data) {
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	}
	xhr.send(_default.data);
}

/**
 * promise 发送 ajax 请求
 * @param { OBJECT } options 请求的所有配置项
 * @returns { PROMISE } promise 对象
 */

function proAjax(options) {
	return new Promise(function(resolve, reject) {
		ajax({
			url: options.url,
			type: options.type,
			async: options.async,
			data: options.data,
			dataType: options.dataType,
			success(res) {
				resolve(res);
			},
			error(err) {
				reject(err);
			}
		});
	});
}
