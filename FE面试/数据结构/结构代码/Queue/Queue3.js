// 基于链表实现队列
class Queue {
    constructor() {
        this.item = new Linked_list();
    }

    // 向队尾添加元素
    equeue(element) {
        this.item.append(element);
    }

    // 从队首弹出元素
    dqueue() {
        return this.item.removeAt(0);
    }

    // 返回队列的第一个元素
    front() {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.item.get(0);
        }
    }

    // 判断队列是否为空
    isEmpty() {
        return this.item.length === 0;
    }

    // 查看队列的长度
    size() {
        return this.item.length;
    }
}

// 击鼓传花
function passGame(list, num) {
    // 重要：为何对象和数组(复杂数据类型)可以用const,因为对象和数组所存到变量里的不是内容是地址
    // const只是保证了对象和数组的地址不变,内容是可变的
    const queue = new Queue();
    for (let i = 0; i < list.length; i++) {
        queue.equeue(list[i])
    }

    while (queue.size() > 1) {
        for (let i = 0; i < num - 1; i++) {
            queue.equeue(queue.dqueue());
        }
        queue.dqueue();
    }
    return queue.front();
}