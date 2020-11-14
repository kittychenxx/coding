'use strict';

// b.js
let count = 10;
let plusCount = () => {
    console.log('成功导入b.js');
    count++;
};
setTimeout(() => {
    console.log('b.js的定时器执行了', count);
}, 1000);

// a.js
plusCount();
console.log(count);
setTimeout(() => {
    console.log('a.js的定时器执行了', count);
}, 1000);

//ES6的模块语法是import/export
//依赖模块会被写在最脚本文件的最顶部，