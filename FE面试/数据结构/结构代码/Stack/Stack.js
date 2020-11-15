// 基于数组实现Stack
class Stack {
    constructor() {
        this.item = [];
    }

    // push(ele) 添加新元素到栈顶
    push(element) {
        this.item.push(element);
    }

    // pop() 出栈
    pop() {
        return this.item.pop();
    }

    // peek() 返回栈顶元素
    peek() {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.item[this.item.length - 1];
        }
    }

    // isEmpty() 判断栈是否为空
    isEmpty() {
        return this.item.length === 0;
    }

    // size() 获取栈的长度
    size() {
        return this.item.length;
    }
}


// 十进制转二进制
function tenToTwo(num) {
    const stack = new Stack();

    while (num > 0) {
        let remainder = num % 2;
        num = Math.floor(num / 2);
        stack.push(remainder);
    }

    // 拼接字符串
    let binary = "";
    while (!stack.isEmpty()) {
        binary += stack.pop()
    }

    return binary;
}