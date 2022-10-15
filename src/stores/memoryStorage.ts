import { UStoreClass } from "../.d";
let memoryStore = {};

export const memoryStorage: UStoreClass = ({
  get: (key: string) => (memoryStore[key] ? memoryStore[key] : key),
  set: (key: string, value: any) => {
    memoryStore[key] = value;
    return true;
  },
  remove: (key: string) => {
    memoryStore[key] ? delete memoryStore[key] : null;
    return true;
  },
});
export default memoryStorage;
