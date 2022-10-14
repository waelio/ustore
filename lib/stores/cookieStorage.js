"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieStorage = void 0;
exports.cookieStorage = ({
    get: function (key) {
        try {
            return window.document.cookie
                .split(";")
                .find(function (item) { return item.split("=")[0] === key; });
        }
        catch (error) {
            return error || null;
        }
    },
    set: function (key, value) {
        try {
            window.document.cookie = "".concat(key, "=").concat(value);
            return true;
        }
        catch (error) {
            return error || null;
        }
    },
    remove: function (key) {
        try {
            window.document.cookie = "".concat(key, "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;");
            return true;
        }
        catch (error) {
            return error || null;
        }
    },
});
exports.default = exports.cookieStorage;
//# sourceMappingURL=cookieStorage.js.map