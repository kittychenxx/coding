// 双向链表
class DoubleNode extends Node {
    constructor(element) {
        // 用super()可以直接被父类初始化
        super(element);
        this.prev = null;
    }
}

class DoubleLinked_list extends Linked_list {
    constructor() {
        super();
        this.tail = null;
    }

    // 链表追加
    append(element) {
        const node = new DoubleNode(element);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.length++;
    }

    // 链表插入
    insert(position, element) {
        // 判断是否越界
        if (position < 0 || position > this.length) return false;
        // 2.创建新的节点
        const node = new DoubleNode(element);
        // 3.插入元素
        if (position === 0) {
            if (this.head === null) {
                this.head = node;
                this.tail = node;
            } else {
                node.next = this.head;
                this.head.prev = node;
                this.head = node;
            }
        } else if (position === this.length) {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        } else {
            let index = 0;
            let current = this.head;
            let previous = null;
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            previous.next = node;
            node.prev = previous;
            node.next = current;
            current.prev = node;
        }
        this.length++;

        return true;
    }

    // 获取位置的元素

    // 获取元素所属的位置

    // 删除某个位置的元素
    removeAt(position) {
        if (position < 0 || position > this.length - 1) return null;

        let current = this.head;
        if (position === 0) {
            // 重要：length===0的情况在边界判断时已经排除
            if (this.length === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
                this.head.prev = null;
            }
        } else if (position === this.length - 1) {
            current = this.tail;
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else {
            let index = 0;
            let previous = null;
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
            current.next.prev = previous;
        }
        this.length--;

        return current.element;
    }

    // 更新某个位置的元素

    // 从链表中移除一项

    // 判断是否为空

    // 判断长度

}