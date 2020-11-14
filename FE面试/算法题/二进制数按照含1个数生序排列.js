/**
 * @param {number[]} arr
 * @return {number[]}
 */
var sortByBits = function (arr) {
    let hashObj = [];
    arr.map(item => {
        let ev = item.toString(2);
        //转换后的每一个数含有的1的个数
        let len = ev.split('').filter(i => i == 1).length;
        hashObj[len] ? hashObj[len].push(parseInt(ev, 2)) :
            hashObj[len] = [parseInt(ev,2)];
    })
    let res = [];
    hashObj.map(item => {
        item.sort((a, b) => a - b);
        res=res.concat(item);
    })
    return res;
};
console.log(sortByBits([0, 1, 2, 3, 4, 5, 6, 7, 8]))