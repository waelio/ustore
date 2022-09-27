"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStorage = void 0;
exports.sessionStorage = ({
    get: function (key) { return window.sessionStorage.getItem(key); },
    set: function (key, value) { return window.sessionStorage.setItem(key, value); },
    remove: function (key) { return window.sessionStorage.removeItem(key); },
});
//# sourceMappingURL=sessionStorage.js.map