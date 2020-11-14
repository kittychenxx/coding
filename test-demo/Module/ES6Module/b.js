// b.js
let count = 10;
let plusCount = () => {
    console.log('成功导入b.js')
    count++;
}
setTimeout(() => {
    console.log('b.js的定时器执行了', count)
}, 1000)


export { plusCount, count };
