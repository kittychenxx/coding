// a.js
let mod = require('./b.js')
console.log('a.js', mod.count)
// mod.plusCount()
// console.log('a.js-2', mod.count)
setTimeout(() => {
    mod.count = 3
    console.log('a.js的定时器执行了', mod.count)
}, 2000)

//执行的顺序说明。a.js同步代码执行完，才会去加载b.js的代码
//同步执行完b.js的代码后，再执行b.js异步代码，b.js代码执行完后
//再继续执行a.js的异步代码