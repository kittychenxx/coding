function quickSort(array, left, right) {
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array' && typeof left === 'number' && typeof right === 'number') {
        if (left < right) {
            var key = array[right], i = left - 1, temp;
            for (var j = left; j <= right; j++) {
                //这里的条件是 <=x 是要把基准值作为插入排好序的最后一项
                if (array[j] <= key) {
                    //比标准值x小的都要排到前面，i是记录已经排好的数组最大值的索引，i+1就是要插入的位置，j是要被交换的位置
                    i++;
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            //再把按照基准分好的子数列排序 以i为界限
            quickSort(array, left, i - 1);
            quickSort(array, i + 1, right);
        }
        return array;
    } else {
        return 'array is not an Array or left or right is not a number!';
    }
}

let arr = [3, 5, 2, 7, 9, 3, 2, 1];
console.log(quickSort(arr,0,arr.length-1))