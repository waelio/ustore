(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dep = void 0;
    let data = { index: "name", value: "uStoreR" };
    let target = null;
    class Dep {
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
    exports.Dep = Dep;
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
});
//# sourceMappingURL=reactive.js.map