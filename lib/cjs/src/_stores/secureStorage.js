"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureStorage = void 0;
const waelio_utils_1 = require("waelio-utils");
const memoryStore = {};
const secureStorage = ({
    get: function () {
        return memoryStore;
    },
    getItem: function (key, options) {
        return options && options.salt
            ? (0, waelio_utils_1._decrypt)(memoryStore[key], options.salt)
            : (0, waelio_utils_1._decrypt)(memoryStore[key]);
    },
    set: function (key, value, options) {
        memoryStore[key] =
            options && options.salt ? (0, waelio_utils_1._encrypt)(value, options.salt) : (0, waelio_utils_1._encrypt)(value);
        return { [key]: memoryStore[key] };
    },
    setItem: function (key, value, options) {
        memoryStore[key] =
            options && options.salt ? (0, waelio_utils_1._encrypt)(value, options.salt) : (0, waelio_utils_1._encrypt)(value);
        return { [key]: memoryStore[key] };
    },
    has(key) {
        return memoryStore[key] ?? false;
    },
    hasItem(key) {
        return memoryStore[key] ?? false;
    },
    remove(key) {
        delete memoryStore[key];
        return this.has(key);
    },
    removeItem(key) {
        delete memoryStore[key];
        return this.has(key);
    }
});
exports.secureStorage = secureStorage;
const descriptor = Object.create(memoryStore);
descriptor.value = "readonly";
Object.defineProperty(secureStorage, "myStore", descriptor);
Object.defineProperty(secureStorage, "_data", {
    enumerable: false,
    configurable: false,
    writable: false,
});
exports.default = secureStorage;
//# sourceMappingURL=secureStorage.js.map