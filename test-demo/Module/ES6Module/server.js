var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    fs.readFile(pathname.substring(1), function (err, data) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data.toString());
        }
        // 发送响应数据
        // console.log(data.toString())//html页面字符串
        res.end();
    })


}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');