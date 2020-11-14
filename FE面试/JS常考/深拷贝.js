function deepClone(obj, hash = new WeakMap) {
    if (obj == null) return null;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (hash.has(obj)) {
        return hash.get(obj)
    }
    let cloneObj = Array.isArray(obj) ? [] : {};
    hash.set(obj, cloneObj)
    for (let key in obj) {
        if (typeof obj[key] == "object") {
            cloneObj[key] = deepClone(obj[key], hash)
        } else {
            cloneObj[key] = obj[key]
        }
    }
    return cloneObj;
}
let obj={
    a:"111",
    c:function(){},
    d:Symbol(1),
    k:/\d+/ig,
    m:[1,2,3],
    f:{a:{s:[1,2]}}
}
obj.obj=obj;
console.log(deepClone(obj));