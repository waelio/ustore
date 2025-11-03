let data = { index: "name", value: "uStoreR" };
let target = null;
export class Dep {
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
        set(newVal) {
            console.log(`Data ${inernalValue} was changed to ${newVal}`);
            inernalValue = newVal;
            dep.notify();
            return inernalValue;
        },
    });
});
export const reactiveData = data;
export function effect(fn) {
    target = fn;
    void data.index;
    target = null;
}
export function effectOn(key, fn) {
    target = fn;
    void data[key];
    target = null;
}
export default reactiveData;
//# sourceMappingURL=reactive.js.map