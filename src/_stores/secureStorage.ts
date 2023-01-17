import { _encrypt, _decrypt } from "waelio-utils";
import { IuStore } from "../.d";
import { memoryStorage } from "./memoryStorage";
let memoryStore = memoryStorage;

const secureStorage: IuStore = {
  get: function () {
    return memoryStore;
  },
  getItem: function (key: string) {
    //@ts-ignore
    return memoryStore[key]
      ? _decrypt(memoryStore[key])
      : (_decrypt(key) as unknown as string);
  },
  set: function (key, value) {
    memoryStore[key] = _encrypt(value);
    return { [key]: memoryStore[key] };
  },
  has(key: string): string | boolean {
    //@ts-ignore
    return memoryStore[key] ?? false;
  },
  remove(key: string) {
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
