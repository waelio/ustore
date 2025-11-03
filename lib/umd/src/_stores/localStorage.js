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
    const local = store2_1.default.namespace("uStore");
    exports.localStorage = {
        get: (key) => {
            try {
                return local.get(key);
            }
            catch (error) {
                console.error("Error in get method:", error);
                return null;
            }
        },
        getItem: (key) => {
            try {
                return local.get(key);
            }
            catch (error) {
                console.error("Error in getItem method:", error);
                return null;
            }
        },
        has: (key) => {
            try {
                return Boolean(local.get(key));
            }
            catch (error) {
                console.error("Error in has method:", error);
                return false;
            }
        },
        hasItem: (key) => {
            try {
                return Boolean(local.get(key));
            }
            catch (error) {
                console.error("Error in hasItem method:", error);
                return false;
            }
        },
        set: (key, value) => {
            try {
                return local.set(key, value);
            }
            catch (error) {
                console.error("Error in set method:", error);
                return null;
            }
        },
        setItem: (key, value) => {
            try {
                return local.set(key, value);
            }
            catch (error) {
                console.error("Error in setItem method:", error);
                return null;
            }
        },
        remove: (key) => {
            try {
                return local.remove(key);
            }
            catch (error) {
                console.error("Error in remove method:", error);
                return null;
            }
        },
        removeItem: (key) => {
            try {
                return local.remove(key);
            }
            catch (error) {
                console.error("Error in removeItem method:", error);
                return null;
            }
        },
    };
    exports.default = exports.localStorage;
});
//# sourceMappingURL=localStorage.js.map