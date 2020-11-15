/* 1.验证是否为有效数字

  规则分析
 1.可能出现正负号[+-]?
 2.首位不能为0 [1-9]\d+
 3.小数点可有可无，有的话后面必须跟着数字 (\.\d+)?
 */
// let reg = /^[-+]?(\d|[1-9]\d+)(\.\d+)?$/;
// console.log(reg.test("-0.1"));
/* 2.验证密码

规则分析
1.密码位数在6-16之间
2.只能是数字、字母、下划线
*/
// let reg = /^\w{6,16}$/;

/* 3.验证真实姓名 */
/* 规则分析
1. 汉字 /^[\u4E00-\u9FA5]$/
2. 名字长度2-10 [\u4E00-\u9FA5]{2,10}
3. 汉译名·  (·[\u4E00-\u9AF5]{2,10}){0,2}
*/
// let reg=/^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9AF5]{2,10}){0,2}$/;

/* 4.验证邮箱 */
/* 规则分析
1.开头是数字字符下划线（1到多位）
2.@后面跟的是数字，还可以再跟-._|和数字
3.域名部分，.数字字母结尾，可以有多个域名
 */
// let reg =/^\w+((\.\w+)|(-\w+))*@[0-9A-Za-z]+((\.|-)[A-Z0-9a-z]+)*\.[0-9A-Za-z]+$/;
// let reg1=/^\w+((\.\w+)|(-\w+))*@[0-9a-zA-Z]+((.-_|)[A-Za-z0-9]+)*\.[0-9a-zA-Z]+$/;

/* 5.身份证号码 */
/* 规则分析
1.第二代身份证18位，最后一位可能为X
2.前17位为数值
身份证前六位：省市县 440582
中间八位：出生年月日
最后四位：
    最后一位X|数字
    倒数第二位 偶女奇男
    其余位经过算法计算出来

 */
// let reg=/^\d{17}(\d|X)$/;
// 将每部分都分开
// let reg=/^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X)$/;
// console.log(reg.exec("440582199812143248"));

// (7) ["440582199812143248", "440582", "1998", "12", "14", "4", "8"
// 捕获的结果是一个数组，包含每个小分子单独获取的内容

/* 正则表达式的创建方式
1.字面量
2.构造函数方式
 */
// let reg="kitty";
// let result = new RegExp("^#" + reg + "#$");
// console.log(result.test("#kitty#"))

/* .的用法：匹配除了换行符之外的任何单个字符 */
// let str = "cat pat attat";
// let reg = /(.at)/g;
// console.log(reg.test(str));//=>cat
// console.log(RegExp.$1);//=>cat
// console.log(reg.exec(str));//=>pat
// console.log(reg.exec(str));//=> at


/* 字符串替换方法 */
// 一般伴随正则使用
// // 1.不要正则
// let str = "kitty@2020|kitty@2021";
// str = str.replace("kitty", "小七").replace("kitty", "小七");
// console.log(str);
// // 2.正则表达式
// str=str.replace(/kitty/g,"小七");//=>注意正则表达式不能用""包起来
// console.log(str);

/* 替换复杂的字符串 */
// let str = "kitty@2020|kitty@2021";
// str=str.replace(/kitty/g,"kittychen");
// console.log(str);


/* replace案例  
把时间字符串进行处理  */
// 1.先把三个值捕获再拼接
// let time="2020-05-05";
// let reg=/^(\d{4})-(\d{1,2})-(\d{2})$/;
// time=time.replace(reg,"$1年$2月$3日");
// console.log(time);//=>2020年05月05日

/* 2.箭头函数处理，replace接受一个参数，参数可以是回调函数
replace内置方法，还给方法传递了实参信息，和exec捕获的内容一致的信息：
大正则匹配内容，小分组匹配的信息 */
// let time="2020-05-05";
// let reg=/^(\d{4})-(\d{1,2})-(\d{2})$/;
// time=time.replace(reg,(...arg)=>{
//     let [,$1,$2,$3]=arg;
//     //月、日，个位数的情况
//     $2.length<2?$2="0"+$2:null;
//     $3.length<2?$2="0"+$3:null;
//     return $1+"年"+$2+"月"+$3+"日";
// });
// console.log(time);//=> 2020年05月05日

/* 案例 单词首字母大写 */
// let str="good good study, day day up!";
// let arg=/\b([a-zA-Z])[a-zA-Z]*\b/g;// \b字母边界
// str=str.replace(arg,(...arg)=>{
//     let [content,$1]=arg;
//     $1=$1.toUpperCase();
//     content=content.substring(1);
//     return $1+content;
// })
// console.log(str);

/* 案例 验证一个字符串，哪个字母出现的最多，多少次 */
/* ==去重方法== */
// 思路：
//   1.首先用forEach遍历字符串的每一项，用键值对的形式存在对象里，每出现一次就加一
//      2.循环比较每个字母出现的个数，找到最大的
//      3.还需要再循环查找多个和最大出现个数一样的字母，push到数组里

/* let str = "Romeisnotbulidinoneday";
let obj = {};
[].forEach.call(str, char => {
    if (obj[char] !== undefined) {
        obj[char]++
        return;
    }
    obj[char] = 1;
});
console.log(obj);
let max = 1,
    res = [];
for (let key in obj) {
    let item = obj[key];
    item > max ? max = item : null;
}
for (let key in obj) {
    let item = obj[key];
    if (item == max) {
        res.push(key);
    }
}
console.log(res);
console.log(`出现最多的字母是${res}, 次数为${max}`); */


/* ==正则 排序== */
// 思路：
// 分离字符串后，字母进行排序
// 

/*  字母比较用localCompare 
字符串变成数组 split
数组组成字符串 join
捕获的方法 字符串用match 正则用exec */

/* let str = "Romeisnotbulidinoneday";
str = str.split('').sort((a, b) => a.localeCompare(b)).join('');
console.log(str);
let ary = str.match(/([A-Za-z])\1+/g).sort((a, b) => b.length - a.length);
console.log(ary);
let max = ary[0].length,
    res = [ary[0].substr(0, 1)];
for (let i = 1; i < ary.length; i++) {
    if (ary[i].length < max) { break; }
    res.push(ary[i].substr(0, 1))
}
console.log(res)
console.log(`出现最多的字母是${res},次数为${max}`); */

// 从最大到最小找
/* let str = "Romeisnotbulidinoneday",
    max = 0,
    res = [],
    flag = false;
str = str.split('').sort((a, b) => a.localeCompare(b)).join('');
for (let i = str.length; i > 0; i--) {
    // 注意构造函数的写法，没有两个斜杆，有特殊意义的符号要两个\
    let reg = new RegExp("([a-zA-Z])\\1{" + (i - 1) + "}", "g");
    str.replace(reg, (content, $1) => {
        res.push($1);
        max = i;
        flag = true;
    });
    console.log(str)
    if (flag) { break; }
}
console.log(`出现最多的字母是${res}, 次数为${max}`);  */


// 案例 时间字符串
/* 1.timeAry:捕获匹配输入字符串的数组 
   2.template：用户想要输出的模板
   3.(...arg): 匹配模板获得的数组，第一次匹配结果[ '{0}', '0', 0, '{0}年{1}月{2}日 {3}时{4}分{5}秒' ] =》字符 字符里的数组 开始匹配的索引 模板字符串
   4.time：通过之前匹配用户输入的获取年月日时分秒各索引替换成我们最后模板的数据结构
   5.index:模板想要用户数据的索引值 0：年 1：月...
*/
/* ~function () {
    // 模板匹配可以具体到{0}：年份信息，{1}：月份信息
    function formatTime(template = "{0}年{1}月{2}日 {3}时{4}分{5}秒") {
        let timeAry = this.match(/\d+/g);
        // 0：2010 1：05....
        console.log(timeAry);//=>[ '2010', '05', '06', '18', '32', '44' ]
        return template = template.replace(/\{(\d+)\}/g, (...arg) => {
            // replace匹配的正则表达式每一次执行产生的数组的第二项给取到
            let [, index] = arg;
            let time = timeAry[index] || "00";
            console.log(time);//=> 2010 05 06 18 32 44
            return time.length < 2 ? "0" + time : time;
        });
    }
    ["formatTime"].forEach(item => {
        // String.prototype[item] = eval(item);//=>eval()javascript解析器，可以将传入的字符串当做js代码
        //最好不要用eval(),防止他人恶意修改代码，同时会降低性能，因为会调用到JS引擎
    });
}()
let time = "2010-05-06 18:32:44";
console.log(time.formatTime());//调用方法别忘记了（）
console.log(time.formatTime("{0}/{1}/{2}  {3}：{4}：{5}")) */

// 案例 获取url？后面的信息
/* ~function () {
    function queryURLParams() {
        let obj = {};
        this.replace(/([^#?&=]+)=([^#?&=]+)/g, (...[, $1, $2]) => { obj[$1] = $2; });
        this.replace(/#([^#?&=]+)/g, (...[, $1]) => { obj["HASH"] = $1; });
        return obj;
    }

    ["queryURLParams"].forEach(item => {
        String.prototype[item] = eval(item);
    });
}()
let url = "https://www.google.com/search?q=%E6%89%A3%E6%89%A3%E9%9F%B3%E4%B9%90&oq=%E6%89%A3%E6%89%A3%E9%9F%B3%E4%B9%90&aqs=chrome..69i57j0.8434j0j7&sourceid=chrome&ie=UTF-8";
console.log(url.queryURLParams());
 */


/* 案例  千分符 */
~function () {
    function millimeter() {
        return this.replace(/\d{1,3}(?=(\d{3})+$)/g, content => content + ',');
    }
    ["millimeter"].forEach(item => {
        String.prototype[item] = eval(item);
    });
}()
let num = "1387498264926";
console.log(num.millimeter());