"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureStorage = void 0;
const waelio_utils_1 = require("waelio-utils");
const memoryStorage_1 = require("./memoryStorage");
let memoryStore = memoryStorage_1.memoryStorage;
const secureStorage = ({
    get: function () {
        return memoryStore;
    },
    getItem: function (key) {
        return memoryStore[key] ? (0, waelio_utils_1._decrypt)(memoryStore[key]) : (0, waelio_utils_1._decrypt)(key);
    },
    set: function (key, value) {
        memoryStore[key] = (0, waelio_utils_1._encrypt)(value);
        return { [key]: memoryStore[key] };
    },
    has(key) {
        var _a;
        return (_a = memoryStore[key]) !== null && _a !== void 0 ? _a : false;
    },
    remove(key) {
        delete memoryStore[key];
        return this.has(key);
    },
});
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