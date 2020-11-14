function insertSort(arr) {
    //判断对象是否为数组
    if (Object.prototype.toString.call(arr).slice(8, -1) == 'Array') {
        let len = arr.length;
        //共遍历len-2次，第一项会在第一次的时候比较到
        for (let i = 1; i < len; i++) {
            //记录每一次排序的标准，大于key才能往后排
            var key = arr[i];
            var j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];//大于key的往后排
                j--;//向前遍历
            }
            //剩下前面（第j项）比key的小，所以j+1项为key
            arr[j + 1] = key;
        }
        return arr;
    } else {
        return "It is not an array!"
    }
}
let arr = [1, 5, 4, 3, 7, 4, 9];
console.log(insertSort(arr))