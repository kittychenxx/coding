// b.js
let count = 1
let plusCount = () => {
    count++
}
setTimeout(() => {
    console.log('b.js的定时器执行了', count)
}, 1000)

// module.exports = {
//     count,
//     plusCount
// }

//同步更改
module.exports = {
    get count() {
        return count
    },
    plusCount
}

