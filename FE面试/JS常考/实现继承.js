function Parent() {
    this.age = 33;
    this.color = 'blue';
}
Parent.prototype.getB = function () {
    return 'parent';
}

function Child() {
    Parent.call(this);//继承父级属性
    this.age = 22;
}

Child.prototype = Object.create(Parent.prototype);//自原型链,继承父类的共有方法
Child.prototype.constructor = Child;
Child.prototype.getA = function getA() {
    return 'child';
}
let child = new Child('kitty');
console.log(child.age);
console.log(child.color);
child.color = 'changeColor';
console.log(new Parent('jacket').age)
console.log(new Parent('jacket').color)