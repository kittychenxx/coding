// 哈希化：将大数字转化成数组范围内下标的过程
// 哈希函数：通常我们会将单词转成大数字(避免重复),将大数字哈希化的函数称为哈希函数
// 最终将数据插入到这个数组,对整个结构进行封装,我们就称之为哈希表

// 哈希表在插入/查询/删除都有非常高的效率
// 哈希的缺点：空间利用率不高,不能快速找到最大值/最小值

const Max_load_factor = 0.75;
const Min_load_factor = 0.25;

function hash(str, max) {
    let hashCode = 0;

    // 霍纳算法
    for (let i = 0; i < str.length; i++) {
        hashCode = 31 * hashCode + str.charCodeAt(i);
    }

    hashCode = hashCode % max;

    return hashCode;
}

// 判断是否是质数/素数
// 性能低
// function isPrime(num) {
//     for (let i = 2; i < num; i++) {
//         if (num % i === 0) {
//             return false;
//         }
//     }
//     return true;
// }

function isPrime(num) {
    // 1.获取num的平方根
    let temp = Math.sqrt(num);
    let temp1 = Math.ceil(Math.sqrt(num));
    if (!(temp % 1)) {
        return false;
    }

    for (let i = 2; i < temp1; i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}

class HashTable {
    constructor() {
        this.storage = []; // 数组存储元素
        this.count = 0; // 当前存放了多少个元素
        this.limit = 7; // hash表总长度
    }
    hash(str, max) {
        let hashCode = 0;

        // 霍纳算法
        for (let i = 0; i < str.length; i++) {
            hashCode = 31 * hashCode + str.charCodeAt(i);
        }

        hashCode = hashCode % max;

        return hashCode;
    }

    // 插入/修改元素
    put(key, value) {
        const index = this.hash(key, this.limit);
        // 取出哈希表中的容器
        let bucket = this.storage[index];
        if (bucket === undefined) {
            bucket = [];
            this.storage[index] = bucket;
            bucket.push([key, value]);
            this.count++;
        } else {
            for (let i = 0; i < bucket.length; i++) {
                let tuple = bucket[i];
                if (tuple[0] === key) {
                    tuple[1] = value;
                    return;
                }
            }
            bucket.push([key, value]);
            this.count++;
        }

        if (this.count > this.limit * Max_load_factor) {
            let newLimit = this.limit * 2;
            newLimit = this.getPrime(newLimit);
            this.resize(newLimit);
        }
    }

    // 根据key 获取value
    get(key) {
        const index = this.hash(key, this.limit);
        const bucket = this.storage[index];
        if (bucket === undefined) {
            return null;
        }

        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] === key) {
                return tuple[1];
            }
        }
        return null;

    }

    // 根据key 删除元素
    remove(key) {
        const index = this.hash(key, this.limit);
        const bucket = this.storage[index];
        if (bucket === undefined) {
            return null;
        }

        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] === key) {
                bucket.splice(i, 1);
                this.count--;

                if (this.limit > 7 && this.count < this.limit * Min_load_factor) {
                    let newLimit = Math.floor(this.limit / 2);
                    newLimit = this.getPrime(newLimit);
                    this.resize(newLimit);
                }

                return tuple[1];
            }
        }

        return null;
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }

    // 扩容函数
    resize(newLimit) {
        let oldStorage = this.storage;

        this.limit = newLimit;
        this.storage = [];
        this.count = 0;

        // 取出oldStorage中的元素重新放到Storage里
        oldStorage.forEach((bucket) => {

            // 重要：forEach()会跳过undefined
            if (bucket.length === 0) {
                return null;
            }

            for (let i = 0; i < bucket.length; i++) {
                let tuple = bucket[i];
                this.put(tuple[0], tuple[1]);
            }
        })
    }

    // 判断是否为质数/素数(1不是质数)
    isPrime(num) {
        // 1.获取num的平方根
        let temp = Math.sqrt(num);
        let temp1 = Math.ceil(Math.sqrt(num));
        if (temp % 1 === 0) {
            return false;
        }

        for (let i = 2; i < temp1; i++) {
            if (num % i === 0) {
                return false;
            }
        }

        return true;
    }

    getPrime(num) {
        while (!this.isPrime(num)) {
            num++;
        }

        return num;
    }

}