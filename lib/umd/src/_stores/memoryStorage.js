(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../core/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.memoryStorage = void 0;
    const index_1 = require("../core/index");
    let memoryStore = new index_1.UCORE();
    exports.memoryStorage = {
        get: (key) => {
            return memoryStore.value[key] ? memoryStore.value[key] : key;
        },
        getItem: (key) => {
            return memoryStore.value[key] ? memoryStore.value[key] : key;
        },
        has: (key) => {
            return memoryStore.value[key] ? true : false;
        },
        hasItem: (key) => {
            return memoryStore.value[key] ? true : false;
        },
        set: (key, value) => {
            try {
                return memoryStore.setItem(key, value);
            }
            catch (error) {
                return error;
            }
        },
        setItem: (key, value) => {
            try {
                return memoryStore.setItem(key, value);
            }
            catch (error) {
                return error;
            }
        },
        remove: (key) => {
            return memoryStore.removeItem(key);
        },
        removeItem: (key) => {
            return memoryStore.removeItem(key);
        },
    };
    exports.default = exports.memoryStorage;
});
//# sourceMappingURL=memoryStorage.js.map