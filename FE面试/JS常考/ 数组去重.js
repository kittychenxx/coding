function quitDubble(arr){
    return Array.from(new Set(arr))
}
console.log(quitDubble([1,1,3,4,5,2,3,4,22]))


