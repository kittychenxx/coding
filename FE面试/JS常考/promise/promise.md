## 高阶函数的两个特点

1、 如果一个函数的参数中有函数，那么这个函数就是高阶函数（回调函数）
2、一个函数返回一个函数 当前函数就是高阶函数

前端常见的设计模式 -> promise

## 高阶函数应用 函数柯里化
- 细化函数功能
```js
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
```

- // 判断一个元素的类型 数组 对象...

  类型判断方法
  1.typeof 不能区分对象类型
  2.constructor 可以判断这个实例时通过谁构造出来的
  3.instanceof 区分实例 __proto__
  4.Object.prototype.toString.call() 区分具体的类型 不能区分实例

## 偏函数 
- 表示分开传递参数 但是参数个数不一定是一个

## 发布订阅 观察者模式
```js
node 读文件api let fs=require('fs'); //fileSystem

fs.readFile('./name.text')
```