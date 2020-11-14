

## JS底层机制

- 浏览器渲染的时候(编译器)
    - 词法解析
    - AST抽象语法树
    - 构建能够执行的代码
    - 引 擎（v8）
    - 变量提升、作用域，闭包 、堆栈内存。
    - GO、VO、AO、EC、ECStack
### 堆、栈内存
- JS代码在浏览器运行的环境是栈内存(STACK)
	- 栈内存是代码执行的环境
	- 堆内存是存放各种属性方法
- EC(Excution Context) ->执行环境栈
	- 全局执行上下文 EC(G) ：要进栈执行
	- 函数中的代码都会在一个单独的私有的上下文中执行
	- 块级的执行上下文
- VO（变量对象)：在当前上下文中用来创建变量和和值的地方（每一个执行上下文中都会有自己的变量对象，私有上下文中的变量对象为AO）(1个html只有一个VO(G))，VO(G)不是GO，只是某种情况下的VO(G)的变量和全局的变量有关联（映射机制）
- GO 全局变量 是一块堆内存 存放浏览器的api属性和方法
- 创建函数：
	- 函数堆：
		
		1、把函数体中的代码当做字符串存放在函数堆里，"代码都是破字符串"，创建函数不执行，函数没有用
		
		2、函数也可以是对象，有自己的键值对
- 作用域 [[scope]]，函数创建的时候就定义函数的作用域->创建函数所在的上下文
  - 函数执行的目的：形成新的私有上下文，供代码执行（进栈执行） 
    <!-- AST语法解析  词法解析 -->
    1、创建一个值
    - 基本数据类型值是直接存储到栈内存中
    - 引用类型值是开辟一个堆内存，把代码串放入堆内存中
  
    2、创建一个变量
    3、让变量和值进行关联，所有的指针赋值都是指针的关联执行

### 数据类型7+2
- 基本类型是按值操作，引用类型是按地址操作

基本数据类型
```javascript
    null undefined number string boolean
    typeof 返回值类型
    typeof null == 'object' 
    typeof undefined === 'undefined'
    typeof 12 === 'number'
    typeof '123' === 'string'
    typeof true === 'boolean'
```

引用数据类型：
- 1、创建一个堆内存
- 2、把键值对存储到堆内存中
- 3、堆内存地址放到栈中提供变量使用
```javascript
    // object function 
    typeof [123] === 'object'
    typeof {} === 'object'
    typeof function(){} === 'function'
```

### 类型转化规则

1.对象==字符串  对象转换成字符串

```js
[10]=='10' //=>true
```

2.null==undefined（三个等号任何情况都不相等），但是和其它任何的值都不相等

```js
0==null //=>false
```

3.NaN不等于谁包括自己
**4.剩下的情况都是转换成数字做比较**

### 取反操作符的规则

对象转换为布尔类型都是true
其它类型只有0/NaN/null/undefined/‘’ 这五个值为false，其他值为true

### { } 特殊性

1.可以表示对象{}
2.代表代码块{块作用域}

```js
{} + 0 =>0 
0 +{} =>"0[object Object]"
{} + 0 + {} =>"[object Object]0[object Object]"
{}+0 == false;// NaN->false false==false //=>true
0+{} == true;//=>false 转换成数字比较
```

### let /var 区别

- var声明会给全局对象GO增加一个对应的对应的属性
- 全局作用域下，使用let声明的变量并没有给window加上对应的属性
- 同一个作用域，let不能重复声明
- let解决了typeof的一个暂时性死区问题
- let会存在块作用域（除对象以外的大括号都可以被看做块级私有作用域）

```js
    let x =1;
    let x=2; //Uncaught SyntaxError: Identifier 'x' has already been declared
```
### let/const区别

- let声明的变量可以更改指针的指向，可以重新赋值
- const声明的变量不允许更改指针的指向
- let /const 不会给全局增加变量



### 数组的迭代方法

（遍历数组中的每一项做一些特殊的处理）

 *    forEach 遍历数组每一项（数组中有多少项，就会触发执行多少次回调函数，每一次把**迭代的当前项**和**当前项的索引**传递给回调函数）
 *    map 和forEach类似，只不过支持返回值，回调函数中的返回值会把当前迭代的这一项替换掉
 *    find 迭代数据每一项的时候，只要有一项在回调函数中返回TRUE则找到内容，后面不会在迭代了,返回的是找到的这一项
 *    filter 迭代每一项的时候，回调函数中所有返回TRUE的这一项获取到，以新数组返回（包含筛选出来的所有项）
 *    every 和some类似，返回的都是布尔值，但是验证数组必须整体都符合筛选条件，回调函数才返回TRUE
 *    some 验证数组中是否存在符合某个筛选条件的,只要有一个符合结果就是TRUE
 *    reduce 上一次回调函数中运算的结果会作为下一次处理的信息
```
     let total=arr.reduce(function(n,item){
				return n+item;
			},0);
```

### parseInt深入理解

- parseInt([value]): 把VALUE转换为数字，要求VALUE是字符串（不是字符串先默认转换为字符串），从字符串左边开始查找，找到有效数字字符转换为数字（遇到一个非有效的数字字符，则停止查找）
- parseInt([value],[radix])：首先[VALUE]是这个字符串，他是把个值看做[RADIX]这个进制，然后最后转换为10进制的数字
- radix省略或者为0，则radix默认按照10进行处理（特殊：字符串以 0x/oX 开头，radix默认按照16进行处理）
  **// radix不在2~36之间，最后结果都为NaN**

```js
parseInt(1,0) //=>NaN
```

- parseFloat没有第二个参数可以传，急事传了也没有影响

### 对象的属性名

- 普通对象的属性名只能是字符串，也可以是基本数据类型值
- Map对象的属性名可以是对象

```js
var a={}, b={n:'1'}, c={m:'2'};
a[b]='珠峰';
a[c]='培训';
console.log(a[b]);//珠峰(错)

//
b、c都是对象，对象存放这键值对，对象a的属性名必须是字符串,所以bc都会转换成字符串传入a
b.toSting =>[object Object]
c.toSting =>[object Object]
//=>console.log([object Object]) =>'培训'

```

普通对象的toString是调用Object.prototype.toString，是用来**检测对象的数据类型**，而不是转换成字符串，默认值为[object Object]


## 变量提升机制
**在当前上下文中（全局/块级/私有)，JS代码自上而下执行前，浏览器会提前处理一些事情，将当前上下文中带有VAR/FUNCTION关键字的提前进行声明或者定义**

- 带var的提前声明
- 带function的提前声明+定义

- 出现在判断体里的function，不管条件成不成立，只会function进行提前声明，不做赋值（新浏览器为了向前兼容ES3）
- 真实项目中建议采用函数表达式的方法创建函数，这样代码在还没有执行的时候，只是进行了提前的声明，没有进行赋值
- [老版本的浏览器ES3/5规范]
	1、判断体和函数体不存在块级上下文，上下文只有全局和私有
	2、无论判断体(function在判断体里）的条件是否成立，带function都提前声明+定义
- [最新的浏览器]
	1、遇到大括号中出现let/const/function，会形成一个全新的私有上下文
	2、无论判断体(function在判断体里）的条件是否成立，带function只会提前声明，不定义
	3、新形成的上下文中对function进行声明+定义，代码执行的时候因为函数不会再执行，但是因为函数在全局下也声明了，当js运行到函数这行代码时，会把之前函数相关的操作映射给全局一份，后面的代码就和全局没有关系了（只要在全局声明过的函数，私有上下文中，执行到相应的函数的代码就要映射一份给全局）
```js
	var func=funcion(){}; //->创建匿名函数
	
	var func=function AAA(){};
	AAA();
	//具名化函数不能在外部访问，只能当做函数内部的变量使用，且它的值不能被修改
	//好处是：具名化函数可以实现函数的递归调用，避免使用了严格模式下都不支持的argument.callee，同时在函数的内部不可以对函数名变量重新赋值，arguments.callee.caller当前函数执行的上下文
```

## 闭包作用域
**概念：我们把函数执行，形成私有上下文，来保存和保护私有变量的机制，称之为“闭包”  =>它是一种机制**

- 函数执行会形成新的私有上下文，这个上下文可能会被释放，也可能不会被释放，无论是否会被释放，它的作用是
	1、保护：划分一个独立的代码执行区域，在这个区域中有自己私有变量存储的空间，而用到的私有变量和其它区域中的变量不会有任何的冲突（防止全局变量污染）
	2、 保存：如果上下文不被销毁，那么存储的私有变量的值也不会被销毁，可以被其下级上下文中调取使用

**市面上一般认为只有形成的私有上下文不被释放，才算是闭包（因为如果一但释放，之前的东西也就不存在了）；还有人认为，只有一下级上下文用到了此上下文中的东西才算闭包；**


- 后期画图的时候 省略执行环境栈的绘制  我们只画执行上下文，默认我们知道，每一个执行上下文出现后，都要进栈执行
- GO 全局对象window    堆内存   浏览器内置的API
- VO(G) 全局变量对象   上下文中的空间   全局上下文中创建的变量
- 基于VAR/FUNCTION在全局上下文中声明的全局变量也会给GO赋值一份（映射机制）
- 但是就LET/CONST等ES6方式在全局上下文中创建的全局变量和GO没有关系

- var/function存在变量提升  但是let/const不会
- 函数的length为形参的个数

### 浏览器的垃圾回收机制（自己内部处理）：

[谷歌等浏览器是“**基于引用查找**“来进行垃圾回收的]

1. 开辟的堆内存，浏览器自己默认会在空闲的时候，查找所有内存的引用，把那些不被引用的内存释放掉
2. 开辟的栈内存（上下文）一般在代码执行完都会出栈释放，如果遇到上下文中的东西被外部占用，则不会释放

[IE等浏览器是“**基于计数器**”机制来进行内存管理的]

1. 创建的内存被引用一次，则计数1，在被引用一次，计数2...  移除引用减去1...  当减为零的时候，浏览器会把内存释放掉
=>真实项目中，某些情况导致计数规则会出现一些问题，造成很多内存不能被释放掉，产生“内存泄漏”；查找引用的方式如果形成相互引用，也会导致“内存泄漏“

- 思考题：总结内存泄露导致的情况
	

### 4.29Day2/3作业

- return的是值  return函数：
  **1、创建一个函数**
  **2、把函数的堆内存地址做为值返回**
- 只有“在除函数体以外大括号中的函数“，在不同的浏览器中表现不一致：低版本是声明+定义   高版本只声明（高版本还会把大括号当做块作用域）

## 箭头函数和THIS

[箭头函数（Arrow Function)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，它的定义用的是一个箭头，相当于匿名函数，简化了函数定义

```js
1.只含一个表达式，一个形参
x=>x*x;
//=>function (x){
		return x*x;
}
2.多个形参要用括号()括起来
3.如果返回对象字面量=>{}，会与函数体有语法冲突，所以要用括()括起来
x=>({foo:x}),如果没有(),foo会被认为是一个标签，而非对象字面量的组成部分
4.箭头函数不能作为构造器，使用new会抛出错误
5.没有prototype属性
6.不能使用yield关键字
7.在参数和箭头之间不能换行，在=>之后可以通过(){}实现换行
8.箭头函数内的定义的变量和作用域
//参数括号内的变量是局部变量
//函数体{}内带var声明的都是局部变量，没有var是全局变量
9.可以使用闭包和实现递归
```

this

箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别：箭头函数内部的`this`是词法作用域，由上下文确定。

- call()，apply()都改变不了this的指向，用call和apply调用箭头函数时，无法对this进行绑定，即传入的第一个参数会被忽略

```js
'use strict'
var arr = [10, 20, 1, 2];

arr.sort((x, y) => {
	return x-y;
});
console.log(arr); // [1, 2, 10, 20]
```

- 不能绑定arguments

```js
var arguments = [1, 2, 3];
var arr = () => arguments[0];

arr(); // 1

function foo(n) {
  var f = () => arguments[0] + n; // 隐式绑定 foo 函数的 arguments 对象. arguments[0] 是 n,即传给foo函数的第一个参数
  return f();
}

foo(1); // 2
foo(2); // 4
foo(3); // 6
foo(3,2);//6 
```

## argument对象

> 剩余参数和 `arguments`对象之间的区别主要有三个：
>
> - 剩余参数只包含那些没有对应形参的实参，而 `arguments` 对象包含了传给函数的所有实参。
> - `arguments`对象不是一个真正的数组，而剩余参数是真正的 `Array`实例，也就是说你能够在它上面直接使用所有的数组方法，比如 `sort`，`map`，`forEach`或`pop`。
> - `arguments`对象还有一些附加的属性 （如`callee`属性）。

**剩余参数、默认参数和解构赋值参数**

> - 在严格模式下，[剩余参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)、[默认参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters)和[解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)参数的存在不会改变 `arguments`对象的行为，但是在非严格模式下就有所不同了。
>
> - 当非严格模式中的函数**没有**包含[剩余参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)、[默认参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters)和[解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)，那么`arguments`对象中的值**会**跟踪参数的值；如果函数**有**包含[剩余参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)、[默认参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters)和[解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)，那么`arguments`对象中的值**不会**跟踪参数的值

**解构赋值**语法是一种 Javascript 表达式。通过**解构赋值,** 可以将属性/值从对象/数组中取出,赋值给其他变量。

**函数默认参数**允许在没有值或`undefined`被传入时使用默认形参。

```js
function multiply(a, b = 1) {
  return a * b;
}
//=>当调用multiply()没有传实参时，可以使用默认形参

这里考虑到，平时面试题考查arguments和形参之间的映射，在非严格模式下，没有剩余参数、默认参数、解构参数的情况，这两者才是有映射关系的；
在函数创建的阶段，如果有默认参数的设置的话，就不存在映射关系，变量和arguments不会有关系，记住！还需要注意的是，如果函数体里有var声明的变量，则函数体的大括号会形成一个块级作用域，执行代码
```





## 惰性函数

- 第一次执行的时候就初始化进行判断了，懒惰的意思是，在第二次执行的时候就可以跳过这个初始化判断的过程，直接开始调用第一次判断后的结果（利用闭包）


```js
(绑定事件的方式)
DOM0级事件
	元素.onclick=function(){};
	事 件绑定：element['on'+click]=func;
DOM2事件模型
  元素.addEventListener() IE6~8不兼容
  元素.attachEvent() 低版本浏览器
```

**单例设计模式--最原始的模块化思想（框架开发模式下不需要用单例处理）**

```js
let weatherModule = (function () {
	let index = 0;
	function queryData() {}
	function getElement() {}
	// 想让闭包之外的东西调用方法，可以基于WINDOW.XXX把其暴露到全局上（如果向全局暴露的东西过多，也会存在冲突的问题）
	// window.getElement = getElement;
	// 建议使用RETURN的方式
	return {
		// getElement: getElement
		getElement //ES6支持的写法 
	};
})();
```

在开发模块中需要调用大量的业务方法时，可以直接封装在init函数里，按照需求调用（init作为模块业务的出口）

```js
return {
		// init:function(){}
		init() {
			// 在单例设计模式的基础上，增加一个命令模式，init作为当前模块业务的入口，以后只需要执行informationModule.init()，我们在init中根据业务需求，把编写的方法按照顺序依次调用执行即可
			queryData();
			bindHTML();
			handleEvent();
		}
```



## 柯里化函数
- 函数思想：利用闭包的机制，把一些内容事先存储和处理，等到后期需要的时候拿来即用即可
含义：一个大函数执行返回一个小函数

```js
function bind(func,context,...args){
  return function proxy(){
    func.call(context,...args);
    //=>fn.call(obj,200,300)
  };
}
setTimeout(bind(fn,obj,200,300),1000);
//=>func:fn
//=>context:obj
//=>args:[200,300]
```

- call、apply都会把函数立即执行，bind不会立即执行函数，预先存储一些内容，都可以改变this的指向（bind不兼容IE8及以下
- bind方法
```js
~function(proto){
	function bind(context=window,...outerArgs){
		//=>this:要处理的函数
		let _this=this;
		return function proxy(...innerArgs){
		let args=outerArgs.concat(interArgs);
		_this.call(context,...args);
		};
	}
	proto.bind=bind;
}(Function.prototype);
let obj={};
function fn(y,ev){}

//兼容版本
~function(proto){
	function bind(context){
    context=context || window;
		//=>this:要处理的函数
	  var _this=this;
    var outerArgs=Array.prototype.slice.call(arguments,1);
		return function proxy(){
    	var innerArgs=[].slice.call(arguments,0);
		 	let args=outerArgs.concat(interArgs);
			_this.call(context,args);
		};
	}
	proto.bind=bind;
}(Function.prototype);
let obj={};
function fn(y,ev){} 
```

## compose函数实现函数调用扁平化

```js
function compose(...funcs){
  //=>funcs：传递函数的集合
  return function proxy(...args){
    //=>args：第一次调用函数的参数集合
    let len=funcs.length;
    if(len===0){
      //=>一个函数都不要执行，直接返回args
      return args;}
    if(len===1){
      //=>只需要执行一个函数，把函数执行，返回结果
      return funcs[0](...args);
    }
    return funcs.reduce((x,y)=>{
      //=>如果有函数集合返回的不是函数，而是数值，那就直接传入数值到集合里的下一个函数执行
      return typeof x==="function"?y(x(...args)):y(x);
    });
  };
}  
```

## 面向对象

> 编程语言：JAVA  PYTHON  PHP  C#  C  C++  RUBY  GO   JS  NODE .... 编程语言
> 面向对象  除了C
> 面向过程  C
>
> HTML / CSS 标记语言
>
> LESS / SASS / STYLUS ... CSS预编译器  用面向对象的思想去编写CSS，最后把其生成浏览器可以识别的普通的CSS

> 对象、类、实例
>
> JS本身就是基于面向对象研发出来的编程语言：内置类
>
> - 数据类型7+2
> - DOM元素

#### 创建一个自定义的类

- 首先创建一个函数，直接执行是一个普通函数，但是"new"执行，它会被称为一个自定义的类
```js
function func(){
}
let f1=func();//=>普通函数执行
let f2=new func();//=>创建实例对象
//如果函数有自己的返回值，则以自己的返回值为准，如果没有则返回当前类的实例
```

#### NEW函数执行

```js
1. 形成一个新的执行上下文
2. 形成一个AO变量对象
3. 初始化ARGUMENTS，形参赋值
4. 初始化作用域链
5. [新]默认创建了一个对象，而这个对象就是当前类的实例 let obj={};
6. [新]声明了THIS指向，让THIS指向这个新创建的实例 let result=Func.call(obj,...args);
7. 代码执行
8. [新]无论其是否写return，都会把新创建的实例返回（特殊点）
if(result!==null && typeof result==="object"|| typeof result==="function"){return result;}//=>用户本身有return对象
return obj;//=>return 实例
//如果要自己去编写类构造函数，要注意原型的指向，obj.__proto__=Func.prototype,只有这样才是真正的属于我们设想的类
//更好的做法是在创建类的实例的时候
let obj=Object.create(Func.prototype);
```

```js
function func(){
	//let obj={};//=>这个对象就是实例对象
	//this->obj
	let x=100;
	this.num=x+100;//=>相当于给创建的实例对象新增了一个num的属性 obj.num=200(因为具备普通函数执行的一面，所有只有this.xxx=xxx才能和创建的实例有关系，此案例中的x只是AO中的私有变量)
	//return obj; 用户自己返回内容，如果返回的是一个引用类型值，则会把默认返回的实例给覆盖掉（此时返回的值就不再是类的实例了;如果返回的是基本类型值，则返回的是实例对象）
}
let f = new func();
console.log(f);
let f2 = new func();
console.log(f2===f);//=>false
//每一次new处理的都是一个新的实例对象，一个新的堆内存

//func();//=>this:window AO(FUNC):{x=100}...普通函数执行
```

### 原型`prototype`和原型链`__proto__`的底层机制

- 每一个类（函数）都具有prototype，并且属性值是一个对象
- 对象上天生就有一个属性：constructor
- 每个对象（普通对象、prototype、实例、函数等）都具备：`__proto__`，属性值是当前实例所属类的原型

 ```js
Fn();//=>普通函数执行
new Fn; new Fn();//=>都是创建类的实例，第二个可以传参数
 ```

**对象数据类型值**：普通对象，数组/正则/日期对象，实例，函数也是对象=>万物皆是对象

**原型链`__proto__`**`：先找自己私有的，没有的情况，基于``__proto__`找所属实例prototype上公有的属性，再没有继续向上查找，一直找到Object.prototype为止

Object.prototype的`__proto__`是null(如果指向也是自己)

function类`__proto__`都指向Function.prototype

Object这个类也指向Function.prototype

最终的Function.prototype指向Object.prototype

**Function.prototype**是一个函数，匿名空函数

 ![1588581195834](C:\Users\陈晓琪\AppData\Roaming\Typora\typora-user-images\1588581195834.png)





