// 观察着者模式 （基于发布订阅的 而且观察者模式发布订阅之间是有关系的 发布订阅模式

// 观察者 观察者和被观察者

class Subject { //被观察者
    constructor(name) {
        this.name = name;
        this.observers = [];
    }
    attach(p) {
        this.observers.push(p);
    }
    setState(newState) {
        this.state = newState;
        this.observers.forEach(p => p.update(this));
    }
}
class Observer { //观察者
    constructor(name) {
        this.name = name;
    }
    update(baby) {
        console.log(this.name + '知道了当前' + baby.name + "状态是" + baby.state);
    }
}

let baby = new Subject('小宝');
let p1 = new Observer('baba');
let p2 = new Observer('mama');
baby.attach(p1);
baby.attach(p2);

baby.setState('unhappy');