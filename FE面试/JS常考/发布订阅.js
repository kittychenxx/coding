
class Event {
  constructor() {
    this.pool = [];
  }

  on(type, callback) {
    this.pool[type] ? null : this.pool[type] = [];
    if (typeof callback !== 'function') {
      return;
    }
    this.pool[type].push(callback);
  }

  off(type, callback) {
    if (!this.pool[type]) return 'There aren\'t this type event';
    for (let i = 0; i < this.pool[type].length; i++) {
      if (this.pool[type][i] === callback) {
        this.pool[type].splice(i, 1);
        i--;
        return;
      }

    }
    return "Nothing event to be off";
  }

  emit(type,...args) {
    if (!this.pool[type]) return 'Not callback to emit';
    let events=this.pool[type];
    events.forEach(fn => {
      fn.apply(this, args)})
  }
}

let ev=new Event();
function AA(a) {
  console.log('A'+a)
}
function BB(a) {
  console.log('B'+a)
}
function CC(a) {
  console.log('C'+a)
}
ev.on('kitty', BB);
ev.on('kitty', AA);
ev.on('kitty', CC);
ev.on('kitty1', CC);
ev.on('kitty1', AA);
ev.emit('kitty',"1")
ev.emit('kitty1',"2")