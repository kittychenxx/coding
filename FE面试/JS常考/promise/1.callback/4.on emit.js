let obj = {};
let fs = require('fs'); //fileSystem
let event = {
    _arr: [],
    on(fn) { //订阅事件

    },
    emit() { //发布事件
        this._arr.forEach(fn => fn());
    }
}
event.on(function () { //计划1  先订阅 再触发 之间没有关联 可以用来解耦操作
    if (Object.keys(obj).length === 2) {
        console.log(obj)
    }
})
event.on(function () { //计划2

})

fs.readFile('./name.text', 'utf8', (err, data) => {
    obj.name = 'name';
    event.emit(); //发布
})
fs.readFile('./age.text', 'utf8', (err, data) => {
    obj.age = 'age';
    event.emit();
})