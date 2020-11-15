class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class Linked_list {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    // 链表追加
    append(element) {
        const node = new Node(element);
        if (!this.head) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }

    // 链表插入
    insert(position, element) {
        // 判断是否越界
        if (position < 0 || position > this.length) return false;
        // 2.创建新的节点
        const node = new Node(element);
        // 3.插入元素
        if (position === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let index = 0;
            let current = this.head;
            let previous = null;
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            previous.next = node;
            node.next = current;
        }
        this.length++;

        return true;
    }

    // 获取位置的元素
    get(position) {
        //判断越界
        if (position < 0 || position > this.length - 1) return null;
        // 查找位置元素
        let index = 0;
        let current = this.head;
        while (index++ < position) {
            current = current.next;
        }
        return current.element;
    }

    // 获取元素所属的位置
    indexOf(element) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (current.element === element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }

    // 删除某个位置的元素
    removeAt(position) {
        if (position < 0 || position > this.length - 1) return null;
        let current = this.head;
        let previous = null;
        if (position === 0) {
            this.head = current.next;
        } else {
            let index = 0;
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.length--;

        return current.element;
    }

    // 更新某个位置的元素
    update(position, element) {
        const result = this.removeAt(position);
        this.insert(position, element);

        return result;
    }

    // 从链表中移除一项
    remove(element) {
        const index = this.indexOf(element);
        if (index === -1) return -1;
        this.removeAt(index);
        return index;
    }

    // 判断是否为空
    isEmpty() {
        return this.length === 0;
    }

    // 判断长度
    size() {
        return this.length;
    }

}