import { _encrypt, _decrypt } from 'waelio-utils';
import { uStore } from '../.d';
const memoryStore = {};

const secureStorage: uStore = {
  get: function () {
    return memoryStore;
  },
  getItem: function (key: string) {
    const test = memoryStore[key];
    return test ? _decrypt(test) : key;
  },
  set: function (key, value) {
    memoryStore[key] = _encrypt(value);
  },
  has(key: string): string | boolean {
    return memoryStore[key] ?? false;
  },
  remove(key: string) {
    delete memoryStore[key];
    return this.has(key);
  }
};

const descriptor = Object.create({});
descriptor.value = 'readonly';

Object.defineProperty(secureStorage, 'myStore', descriptor);

Object.defineProperty(secureStorage, '_data', {
  enumerable: false,
  configurable: false,
  writable: false
});
export { secureStorage };
export default secureStorage;
