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
    exports.memoryStorage = void 0;
    const memoryStore = {};
    exports.memoryStorage = {
        get: (key) => {
            return memoryStore[key] ? memoryStore[key] : key;
        },
        set: (key, value) => {
            memoryStore[key] = value;
            return true;
        },
        remove: (key) => {
            memoryStore[key] ? delete memoryStore[key] : null;
            return true;
        },
    };
    exports.default = exports.memoryStorage;
});
//# sourceMappingURL=memoryStorage.js.map