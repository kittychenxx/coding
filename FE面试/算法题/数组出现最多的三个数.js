function findThreeNum(arr) {
    let hashObj = {};
    for (let i = 0; i < arr.length; i++) {
        if (hashObj[arr[i]]) {
            hashObj[arr[i]] += 1;
        }
        else {
            hashObj[arr[i]] = 1;
        }
    }
    let res = Object.entries(hashObj);
    res.sort((a, b) => b[1] - a[1])
    return [res[0][0], res[1][0], res[2][0]];
}
console.log(findThreeNum([1, 2, 1, 4, 1, 5, 2, 2, 1]));