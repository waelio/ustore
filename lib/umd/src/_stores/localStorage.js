var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "store2"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.localStorage = void 0;
    const store2_1 = __importDefault(require("store2"));
    ;
    const store = store2_1.default.namespace("uStore:localStorage");
    exports.localStorage = {
        get: (key) => {
            try {
                return store.get(key);
            }
            catch (error) {
                return error || null;
            }
        },
        set: (key, value) => {
            try {
                return store.set(key, value);
            }
            catch (error) {
                return error || null;
            }
        },
        has: (key) => {
            try {
                return Boolean(store.has(key));
            }
            catch (error) {
                return false;
            }
        },
        remove: (key) => {
            try {
                return store.remove(key);
            }
            catch (error) {
                return error || null;
            }
        },
    };
    exports.default = exports.localStorage;
});
//# sourceMappingURL=localStorage.js.map