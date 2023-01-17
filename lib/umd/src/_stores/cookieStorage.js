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
    exports.cookieStorage = exports.memoryStore = void 0;
    const isReady = Boolean(typeof window !== "undefined");
    exports.memoryStore = {};
    exports.cookieStorage = {
        get: (key) => {
            try {
                return !isReady
                    ? exports.memoryStore[key]
                    : window.document.cookie
                        .split(";")
                        .find((item) => item.split("=")[0] === key);
            }
            catch (error) {
                return error || null;
            }
        },
        has: (key) => {
            try {
                return !isReady
                    ? Boolean(exports.memoryStore[key])
                    : Boolean(window.document.cookie
                        .split(";")
                        .find((item) => item.split("=")[0] === key));
            }
            catch (error) {
                return error || null;
            }
        },
        set: (key, value) => {
            try {
                const payload = {};
                payload[key] = value;
                return !isReady
                    ? (exports.memoryStore = payload)
                    : (window.document.cookie = `${key}=${value}`);
            }
            catch (error) {
                return error || null;
            }
        },
        remove: (key) => {
            try {
                return !isReady
                    ? (exports.memoryStore = Object.assign({ key: null }))
                    : (window.document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`);
            }
            catch (error) {
                return error || null;
            }
        },
    };
    exports.default = exports.cookieStorage;
});
//# sourceMappingURL=cookieStorage.js.map