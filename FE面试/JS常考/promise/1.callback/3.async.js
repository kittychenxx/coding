let fs = require('fs'); //fileSystem

// 概念 实现异步并发
// 异步解决方案 通过回调解决
let obj = {};

const after = (times, callback) => () => {
    if (--times == 0) {
        callback()
    };
}
let out = after(2, () => {
    console.log(obj);
});
fs.readFile('./name.text', 'utf8', (err, data) => {
    obj.name = data;
    out();
})
fs.readFile('./age.text', 'utf8', (err, data) => {
    obj.age = 'age';
    out();
})