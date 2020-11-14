/* 
    纯AJAX四步操作
*/
/* let xhr = new XMLHttpRequest;
xhr.open('get', './data.json', true);
xhr.onreadystatechange = function () {
    if(xhr.status===200){
        let n=xhr.readyState;
        if(n===2){
            console.log("响应头的信息返回了", xhr.getAllResponseHeaders());
        }
        if(n===4){
            console.log("响应主体信息返回了",xhr.responseText);
        }
    }
}
xhr.send(null); */


/* 参数序列化处理 */
function paramsSerialize(obj) {
    if (!obj || typeof obj !== "object") return obj;
    let result = ``;
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) break;
        // result = Qs.stringify(obj);
        result += `&${key}=${obj[key]}`;
    }
    // 去除第一个&符号
    result=result.substring(1);
    return result;
}

function ajax(options) {
    // init params
    options = Object.assign({
        url: '',
        method: 'get',
        params: null,
        data: null,
        success: Function.prototype
    }, options);

    // params serialize 参数序列化 如果没有参数就不传
    options.params ? options.params = paramsSerialize(options.params) : null;
    options.data ? options.data = paramsSerialize(options.data) : null;

    // 判断GET请求
    let isGET = /^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.method);
    if (isGET && options.params) {
        // GET请求，在url后加上参数，两种情况，有问号和无问号
        options.url += `${options.url.indexOf('?') >= 0 ? '&' : '?'}${options.params}`;
    }

    // send ajax 
    let xhr = new XMLHttpRequest;
    xhr.open(options.method, options.url);
    // POST请求，参数信息基于请求主体发生请求，需要在请求头添加“Content-Type”，方法：setResquestHeader
    !isGET ? xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded') : null;
    xhr.onreadystatechange = function () {
        // 解构赋值xhr的属性
        let {
            status,
            readyState,
            responseText
        } = xhr;
        if (/^2\d{2}$/.test(status) && readyState === 4) {
            // 获取服务器响应主体信息
            responseText = JSON.parse(responseText); //返回要是JSON形式
            // 默认success是函数，传了才执行
            options.success && options.success(responseText);
        }
    };
    xhr.send(isGET ? null : options.data);
}