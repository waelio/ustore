import { _encrypt, _decrypt } from "waelio-utils";
import { uStore } from "../.d";
const memoryStore = {};

const secureStorage: uStore = {
  get: function () {
    return memoryStore;
  },
  getItem: function (key: string) {
    return _decrypt(memoryStore[key]);
  },
  set: function (key, value) {
    memoryStore[key] = _encrypt(value);
    return { [key]: memoryStore[key] };
  },
  setItem: function (key, value) {
    memoryStore[key] = _encrypt(value);
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
