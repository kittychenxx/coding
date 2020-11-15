function isType(content, typing) {
    return Object.prototype.toString.call(content) == `[object ${typing}]`;

}
// 
console.log(isType('hello', 'String'));


const currying = (fn, arr = []) => {
    let len = fn.length; //函数的参数个数
    return (...args) => {
        let newArr = [...arr, ...args];
        if(newArr.length<len){
            return currying(fn,newArr);
        }else{
            return fn(...newArr);
        }
    }
}


let fs = require('fs'); //fileSystem

fs.readFile('./name.text');