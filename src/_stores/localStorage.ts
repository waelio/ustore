import storeTwo from "store2";
import { IUStoreClassInterface } from "../.d";;
const store = storeTwo.namespace("uStore:localStorage");

export const localStorage: IUStoreClassInterface = {
  get: (key: string) => {
    try {
      return store.get(key);
    } catch (error: unknown) {
      return error || null;
    }
  },
  set: (key: string, value: unknown) => {
    try {
      return store.set(key, value);
    } catch (error: unknown) {
      return error || null;
    }
  },
  //@ts-ignore
  has: (key: string): Boolean => {
    try {
      return Boolean(store.has(key));
    } catch (error: unknown) {
      return false;
    }
  },
  remove: (key: string) => {
    try {
      return store.remove(key);
    } catch (error: unknown) {
      return error || null;
    }
  },
};
export default localStorage;
