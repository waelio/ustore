import { _encrypt, _decrypt } from "waelio-utils";
import { uStore } from "../.d";
const memoryStore = {};
type TOPTIONS = { salt: string }

const secureStorage: uStore = {
  get: function () {
    return memoryStore;
  },
  // @ts-ignore
  getItem: function (key: string, options: TOPTIONS) {

    return options && options.salt ? _decrypt(memoryStore[key], options.salt) : _decrypt(memoryStore[key]);
  },
  // @ts-ignore
  set: function (key: string, value: string[], options: TOPTIONS) {
    memoryStore[key] = options && options.salt ? _encrypt(value, options.salt) : _encrypt(value);
    return { [key]: memoryStore[key] };
  },
  // @ts-ignore
  setItem: function (key: string, value: string[], options: TOPTIONS) {
    memoryStore[key] = options && options.salt ? _encrypt(value, options.salt) : _encrypt(value);
    return { [key]: memoryStore[key] };
  },
  has(key: string): string | boolean {
    return memoryStore[key] ?? false;
  },
  hasItem(key: string): string | boolean {
    return memoryStore[key] ?? false;
  },
  remove(key: string) {
    delete memoryStore[key];
    return this.has(key);
  },
  removeItem(key: string) {
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
