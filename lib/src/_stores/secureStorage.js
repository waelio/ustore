import { _encrypt, _decrypt } from "waelio-utils";
import { memoryStorage } from "./memoryStorage";
let memoryStore = memoryStorage;
const secureStorage = {
    get: function () {
        return memoryStore;
    },
    getItem: function (key) {
        return memoryStore[key]
            ? _decrypt(memoryStore[key])
            : _decrypt(key);
    },
    set: function (key, value) {
        memoryStore[key] = _encrypt(value);
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
};
const descriptor = Object.create({});
descriptor.value = "readonly";
Object.defineProperty(secureStorage, "myStore", descriptor);
Object.defineProperty(secureStorage, "_data", {
    enumerable: false,
    configurable: false,
    writable: false,
});
export { secureStorage };
export default secureStorage;
//# sourceMappingURL=secureStorage.js.map