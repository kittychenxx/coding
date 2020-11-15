### 原生JS四步使用
第一步：创建xhr
第二步：打开url
第三步：监听状态和获取数据
第四步：发送请求
除了第二步要在第四步前，二和三、三和四没有先后顺序。

```javascript
//创建XHR
let xhr = new XMLHttpRequest;
//打开URL
xhr.open('get','/index.php?what=info');
//使用post请求，是必须要加的：表示传递给服务器的数据格式为字符串
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//监听状态和获取数据
xhr.onreadystatechange = function(){
    let status = xhr.status,
        state = xhr.readyState,
        result = null;
    if(state===2){//响应头回来了
        console.log(xhr.getAllResponseHeaders());
        console.log(xhr.getResponseHeader('content-Type'));
      	if(!/^(2|3)\d{2}$/.test(status)){
       	 	console.log('请求错误');
        	console.log(status);
     		  return;
    		}
        return;
    }
    if(state===4){//响应信息传输完毕
        result = xhr.response;
        console.log(result);
    }
}
//发送请求
xhr.send();
```
#### 兼容性处理
**注意：** 不仅要IE10以下兼容XMLHttpRequest，请特别注意IE10及以下，同样不支持ES6语法的let，会报错。要全部换成var。
```javascript
var xhr = new XMLHttpRequest||ActiveXObject;
```
### 封装代码展示
注意：
1. 发送post请求时，若自己传的数据是字符串，别忘了加`    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");`
2. 同样，要兼容ie10及以下时，要按照上面的处理兼容性
3. 特别注意一点：若是服务器返回的格式是json格式，一定要把返回的数据处理一下`defalutConfig.success(JSON.parse(xhr.responseText));`,要不然，返回的汉字会变成utf-8格式哟！

```javascript
// 封装的属性 method（方法）、url（目标地址）、success（成功执行的函数、error（失败执行的函数）、params（get请求参数）、data（post请求参数）

//自己写的老是报错 xhr.open() is not a funtion.是因为没加new
function paramsSerialize(url, params) {
    if (Object.prototype.toString.call(params) == '[object Null]' || Object.keys(params).length == 0) return url;
    let paramsEncoded = '';
    for (let key of Object.keys(params)) {
        paramsEncoded += `&${key}=${params[key]}`;
    };
    if (url != null) {
        return url + "?" + paramsEncoded.substring(1);
    } else {
        return paramsEncoded.substring(1);
    }
}

function ajax(config) {
    let defalutConfig = Object.assign({
        url: '',
        method: 'get',
        params: null,
        data: null,
        success: function () { },
        error: function () { }
    }, config);

    let xhr = new XMLHttpRequest,
        isGET = /(get|delete|head|options)/i.test(defalutConfig.method);
    isGET ? defalutConfig.url = paramsSerialize(defalutConfig.url, defalutConfig.params) : null;


    xhr.open(defalutConfig.method, defalutConfig.url);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        let status = xhr.status,
            readyState = xhr.readyState;
        if (!/^(2|3)\d{2}$/.test(status)) {
            console.log("请求错误：" + status);
            defalutConfig.error(JSON.parse(xhr.responseText));
        }
        if (readyState === 4) {
            defalutConfig.success(JSON.parse(xhr.responseText));
        }
    }

    xhr.send(isGET ? null : paramsSerialize(null, defalutConfig.params));
}
```
#### 使用实例

```javascript
ajax({
    url: '/index.php',
    params: { what: 'otherInfo' },
    method: 'get',
    success: function (res) {
        console.log(res);
    },
    error: function (res) {
        console.log(res);
    }
})
```
### 利用ES6的class和闭包封装+常用方法封装
要点：
1. 闭包防止全局污染
2. 将封装的ajax暴露到全局

参数介绍：`method（方法）、url（目标地址）、success（成功执行的函数、error（失败执行的函数）、params（get请求参数）`

```javascript

(function(){
    class yxAjax{
        constructor(config){

            this.config = Object.assign({
                url: '',
                method: 'get',
                params: null,
                // data: null,get和post都用params
                success: function () { },
                error: function () { }
            }, config);

            this.isGET = /^(GET|HEAD|DELETE|OPTIONS)$/i.test(config.method);
            this.init();
        }

        init(){
            var xhr = new XMLHttpRequest||ActiveXObject;
            this.isGET?xhr.open(this.config.method,this.paramsSerialize(this.config.url,this.config.params)):null;
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange =  () =>{
                let status = xhr.status,
                    readyState = xhr.readyState;
                if (!/^(2|3)\d{2}$/.test(status)) {
                    console.log("请求错误：" + status);
                    this.config.error(JSON.parse(xhr.responseText));
                }
                if (readyState === 4) {

                    this.config.success(JSON.parse(xhr.responseText));
                }
            }
            xhr.send(this.isGET ? null : this.paramsSerialize(null, this.config.params));
        }

        //将传的对象参数转为 字符串参数格式。
        paramsSerialize(url, params) {
            if (Object.prototype.toString.call(params) == '[object Null]' || Object.keys(params).length == 0) return url;
            let paramsEncoded = '';
            for (let key of Object.keys(params)) {
                paramsEncoded += `&${key}=${params[key]}`;
            };
            if (url != null) {
                return url + "?" + paramsEncoded.substring(1);
            } else {
                return paramsEncoded.substring(1);
            }
        }
    }
    function ajax(config={}){
        return new yxAjax(config);
    }
    
    //把ajax做成一个普通对象,将方法挂载到对象上。
    ['get', 'delete', 'head', 'options'].forEach(name => {
		ajax[name] = function (url = "", config = {}) {
			config.method = name;
			config.url = url;
			return ajax(config);
		};
	});
	['post', 'put'].forEach(name => {
		ajax[name] = function (url = "", data = {}, config = {}) {
			config.method = name;
			config.url = url;
			config.data = data;
			return ajax(config);
		};
    });
    
    
    window.yxAjax = ajax;
})();
```
使用例子

```javascript
yxAjax({
    method:'get',
    url:'/index.php',
    params:{what: 'otherInfo'},
    success:function(res){
        console.log(res);
    }
})
```
