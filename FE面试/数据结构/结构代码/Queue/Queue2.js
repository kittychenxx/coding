// 优先级队列

class QueueElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQueue extends Queue {
    equeue(element, priority) {

        const queueElement = new QueueElement(element, priority);

        if (this.isEmpty()) {
            this.item.push(queueElement);
        } else {
            let add = false;
            for (let i = 0; i < this.size(); i++) {
                if (this.item[i].priority > queueElement.priority) {
                    this.item.splice(i, 0, queueElement);
                    add = true;
                    break;
                }
            }
            if (!add) {
                this.item.push(queueElement);
            }
        }
    }
}