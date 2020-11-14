function bubbleSort(arr) {
    if (!Array.isArray(arr)) return "it's not a array";
    let i = arr.length - 1;
    while (i > 0) {
        var pos = 0, temp;
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j;
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        i = pos;
    }
    return arr;
}
let arr = [3, 5, 2, 7, 9, 3, 2, 1];
console.log(bubbleSort(arr))