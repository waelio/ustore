"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.piniaStorage = void 0;
exports.piniaStorage = ({
    get: function (key) { return window.localStorage.getItem(key); },
    set: function (key, value) { return window.localStorage.setItem(key, value); },
});
//# sourceMappingURL=piniaStorage.js.map