"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureStorage = void 0;
const waelio_utils_1 = require("waelio-utils");
const memoryStore = {};
const secureStorage = {
    get: function () {
        return memoryStore;
    },
    getItem: function (key) {
        return (0, waelio_utils_1._decrypt)(memoryStore[key]);
    },
    set: function (key, value) {
        memoryStore[key] = (0, waelio_utils_1._encrypt)(value);
        return { [key]: memoryStore[key] };
    },
    has(key) {
        return memoryStore[key] ?? false;
    },
    remove(key) {
        delete memoryStore[key];
        return this.has(key);
    },
};
exports.secureStorage = secureStorage;
const descriptor = Object.create({});
descriptor.value = "readonly";
Object.defineProperty(secureStorage, "myStore", descriptor);
Object.defineProperty(secureStorage, "_data", {
    enumerable: false,
    configurable: false,
    writable: false,
});
exports.default = secureStorage;
//# sourceMappingURL=secureStorage.js.map