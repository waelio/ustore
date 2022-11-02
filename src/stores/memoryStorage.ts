import { UStoreClass } from "../.d";
const memoryStore = {};

export const memoryStorage: UStoreClass = {
  get: (key: string) => {
    return memoryStore[key] ? memoryStore[key] : key;
  },
  set: (key: string, value: unknown) => {
    memoryStore[key] = value;
    return true;
  },
  remove: (key: string) => {
    memoryStore[key] ? delete memoryStore[key] : null;
    return true;
  },
};
export default memoryStorage;
