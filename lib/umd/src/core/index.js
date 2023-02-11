(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "vue"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.computed = exports.ref = exports.UCORE = void 0;
    const vue_1 = require("vue");
    Object.defineProperty(exports, "ref", { enumerable: true, get: function () { return vue_1.ref; } });
    Object.defineProperty(exports, "computed", { enumerable: true, get: function () { return vue_1.computed; } });
    class UCORE {
        constructor(initial = {}) {
            this._STORE = (0, vue_1.ref)(null);
            if (initial) {
                this._STORE.value = JSON.stringify(initial[0] === "{")
                    ? JSON.stringify(initial)
                    : initial;
            }
        }
        get(key = "undefined") {
            const ls = this._STORE.value;
            if (typeof key !== "undefined")
                return ls;
            try {
                return ls[key];
            }
            catch (error) {
                return undefined;
            }
        }
        getItem(key) {
            if (key.match(/:/)) {
                const keys = key.split(":");
                const storeKey = this._buildNestedKey(keys[0]);
                return storeKey[keys[0]][keys[1]];
            }
            return this._STORE.value[key];
        }
        setItem(k, val) {
            var self = this;
            let ls = self._STORE.value;
            if (k.match(/:/)) {
                const keys = k.split(":");
                if (keys.length > 2)
                    throw new Error("cannot nest more that one layer");
                keys.length;
                if ((keys.length = 2)) {
                    try {
                        ls[keys[0]] = { [keys[0]]: { [keys[1]]: val } };
                        self._STORE.value = { ...ls };
                        return ls[keys[0]];
                    }
                    catch (error) {
                        return "undefined";
                    }
                }
            }
            ls = { ...{ [k]: val } };
            self._STORE.value = { ...ls };
            return this.getItem(k);
        }
        removeItem(k) {
            if (!k)
                throw new Error("Key is needed");
            var self = this;
            let ls = self._STORE.value;
            if (k.match(/:/)) {
                const keys = k.split(":");
                if (keys.length > 2)
                    throw new Error("cannot nest more that one layer");
                if ((keys.length = 2)) {
                    try {
                        delete ls[keys[0]];
                        self._STORE.value = { ...ls };
                        return ls[keys[0]];
                    }
                    catch (error) {
                        return "undefined";
                    }
                }
            }
            ls = { [k]: null };
            delete ls[k];
            self._STORE.value = { ...ls };
            return !!(this.getItem(k) === 'null');
        }
        set value(v) {
            this._STORE.value = JSON.stringify(v[0] === "{") ? JSON.stringify(v) : v;
        }
        get value() {
            return (0, vue_1.unref)(this._STORE.value);
        }
        has(key) {
            return Boolean(this.getItem(key));
        }
        _buildNestedKey(nestedKey) {
            const keys = nestedKey.split(":");
            let storeKey = this._STORE.value;
            keys.forEach(function (k) {
                try {
                    storeKey = storeKey[k];
                }
                catch (e) {
                    return undefined;
                }
            });
            return storeKey;
        }
    }
    exports.UCORE = UCORE;
});
//# sourceMappingURL=index.js.map