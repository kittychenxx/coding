import { plusCount, count } from './b.js';
plusCount();
console.log(count);
setTimeout(() => {
    console.log('a.js的定时器执行了', count)
}, 1000)