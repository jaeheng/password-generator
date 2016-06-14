// 获取密码
var password = (function () {

	/**
	 * 使用id获取元素并返回
	 * @param  string id dom的id
	 * @return object dom
	 */
	var $ = function (id) {
		return document.getElementById(id);
	};

	/**
	 * 给URL添加参数
	 * @param string url   url
	 * @param string name  参数名
	 * @param string value 参数值
	 */
	var addURLParam = function(url, name, value){
		url += (url.indexOf("?") == -1 ? "?" : "&");
		url += encodeURIComponent(name) + "=" +encodeURIComponent(value);
		return url;
	};

	/**
	 * 发送get请求
	 * @param  string:url, object:url,asyn(是否异步),success,data
	 */
	var get = function (arg1) {
		var xhr 	= new XMLHttpRequest(),
			args 	= arguments,
			url,
			asyn,
			callback;

		// 回调函数
		callback = (typeof args[1] === 'function') ? args[1] : function () {
			console.log('there is no callback');
		};

		// 是否异步
		asyn = (typeof args[2] === 'boolean') ? args[2] : 1;

		if(typeof arg1 === 'string'){
			url = arg1;
		}else if(typeof arg1 === 'object'){
			url = arg1.url;
			asyn = (typeof arg1.asyn === 'boolean') ? arg1.asyn : asyn;
			callback = (typeof arg1.success === 'function') ? arg1.success : asyn;

			for (var key in arg1.data) {	
				url = addURLParam(url,key,arg1.data[key]);
			}
		}

		// 发送请求
		xhr.open('get',url, asyn);
		xhr.send(null);

		// 请求完成后执行回调函数
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4){
				var resp = xhr.responseText;
				try{
					if((xhr.status >= 200 && xhr.status < 300) || (xhr.status == 304)){
						resp = JSON.parse(resp);
						resp.status = 1;
					}else{
						resp = {
							info : 'request was unsuccessful:' + xhr.status,
							status:0
						};
					}				
					callback(resp);
				}catch(e){
					console.log(e.message);
					console.log(resp);
				}
			}
		};
	};
	
	// 表单提交事件处理
	var submitHandle = function () {
		var username = $('username').value,
			website = $('website').value,
			salt = $('salt').value,
			actionUrl = "api/index.php";

		// 验证表单
		if (username.length === 0) {
			alert('请填写用户名');
			return false;
		}
		if (website.length === 0) {
			alert('请填写网站域名');
			return false;
		}
		if (salt.length === 0) {
			alert('请填写标识码');
			return false;
		}

		// 发送请求
		get({
			url:actionUrl,
			data:{
				username:username,
				website:website,
				salt:salt
			},
			success: function (resp) {
				console.log(resp);
				if(resp.status){
					$('password').innerHTML = resp.password;
				}else{
					$('password').innerHTML = resp.info;
				}
			}
		});
	};

	// 表单提交事件绑定
	var submitEventHandle = function () {
		var form = $('password_form');

		form.onsubmit = function (event) {
			submitHandle();
			return false;
		};
	};

	// 初始化
	var init = function () {
		submitEventHandle();
	};

	return {
		init : init
	};

})();