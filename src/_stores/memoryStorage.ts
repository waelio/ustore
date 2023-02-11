import { UStoreClass } from "../.d";
import { UCORE } from "../core/index";

let memoryStore = new UCORE()

export const memoryStorage: UStoreClass = {
  get: (key: string) => {
    return memoryStore.value[key] ? memoryStore.value[key] : key;
  },
  getItem: (key: string) => {
    return memoryStore.value[key] ? memoryStore.value[key] : key;
  },
  has: (key: string) => {
    return memoryStore.value[key] ? true : false;
  },
  hasItem: (key: string) => {
    return memoryStore.value[key] ? true : false;
  },
  set: (key: string, value: any) => {
    try {
      return memoryStore.setItem(key, value)
    } catch (error) {
      return error
    }      
  },
  setItem: (key: string, value: any) => {
    try {
      return memoryStore.setItem(key, value)
    } catch (error) {
      return error
    }
  },
  remove: (key: string) => {
    return memoryStore.removeItem(key)    
  },
  removeItem: (key: string) => {
    return memoryStore.removeItem(key)
  },
};
export default memoryStorage;
