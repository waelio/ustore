let data = { index: "name", value: "uStoreR" };
let target: null | Function = null;

export class Dep {
  subscripers: any[];
  constructor() {
    this.subscripers = [];
  }
  depend() {
    if (target && !this.subscripers.includes(target)) {
      this.subscripers.push(target);
      this.notify();
    }
  }
  notify() {
    this.subscripers.forEach((sub) => sub());
  }
}

Object.keys(data).forEach((key) => {
  let dep = new Dep();

  let inernalValue = data[key];

  Object.defineProperty(data, key, {
    get() {
      dep.depend();
      console.log("I was accessed");
      return inernalValue;
    },
    set(newVal: any) {
      console.log(`Data ${inernalValue} was changed to ${newVal}`);
      inernalValue = newVal;
      dep.notify();
      return inernalValue;
    },
  });
});
