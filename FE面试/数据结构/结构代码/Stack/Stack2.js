// 基于链表实现栈
class Stack {
    constructor() {
        this.item = new Linked_list();
    }

    push(element) {
        this.item.append(element);
    }

    pop() {
        return this.item.removeAt(this.item.length - 1);
    }

    // peek() 返回栈顶元素
    peek() {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.item.get(this.item.length - 1);
        }
    }

    isEmpty() {
        return this.item.length === 0;
    }

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