// 1. executor 执行器会默认立即执行
// 2. 默认promise的状态是等待态（三个状态 等待成功失败）
// 3.调用完resolve时 会变成成功态 调用reject 会变成失败态
// 4.返回的实例上有一个then方法 提供两个参数 分别是 成功对应的函数和失败对应的函数
// 5.只采取第一次的调用的结果
// 6.抛出异常走失败逻辑
// 7.成功时可以传入成功的值，失败时可以传失败的原因
let Promise = require('./promise.js');
let promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve('ok');
    // throw new Error();//fail
})
promise.then((val) => {
    console.log('success', val);
}, (reason) => {
    console.log('fail', reason);
})
console.log(2);


// 1.同一个promise可以then多次
// 调用then时 当前状态如果时等待态 需要将成功和失败的回调分别进行存放
// 调用resolve时 将订阅的函数执行