"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieStorage = exports.memoryStore = void 0;
var isReady = Boolean(typeof window !== "undefined");
exports.memoryStore = {};
exports.cookieStorage = {
    get: function (key) {
        try {
            return !isReady
                ? exports.memoryStore[key]
                : window.document.cookie
                    .split(";")
                    .find(function (item) { return item.split("=")[0] === key; });
        }
        catch (error) {
            return error || null;
        }
    },
    set: function (key, value) {
        try {
            var payload = {};
            payload[key] = value;
            return !isReady
                ? (exports.memoryStore = payload)
                : (window.document.cookie = "".concat(key, "=").concat(value));
        }
        catch (error) {
            return error || null;
        }
    },
    remove: function (key) {
        try {
            return !isReady
                ? (exports.memoryStore = __assign({ key: null }))
                : (window.document.cookie = "".concat(key, "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"));
        }
        catch (error) {
            return error || null;
        }
    },
};
exports.default = exports.cookieStorage;
//# sourceMappingURL=cookieStorage.js.map