import { _encrypt, _decrypt } from "waelio-utils";
const memoryStore = {};
const secureStorage = {
    get: function () {
        return memoryStore;
    },
    getItem: function (key, options) {
        return options && options.salt
            ? _decrypt(memoryStore[key], options.salt)
            : _decrypt(memoryStore[key]);
    },
    set: function (key, value, options) {
        memoryStore[key] =
            options && options.salt ? _encrypt(value, options.salt) : _encrypt(value);
        return { [key]: memoryStore[key] };
    },
    setItem: function (key, value, options) {
        memoryStore[key] =
            options && options.salt ? _encrypt(value, options.salt) : _encrypt(value);
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
    },
};
const descriptor = Object.create(memoryStore);
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