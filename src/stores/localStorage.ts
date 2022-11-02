import storeTwo from "store2";
import { UStoreClass } from "../.d";
const local = storeTwo.namespace("uStore");

export const localStorage: UStoreClass = {
  get: (key: string) => {
    try {
      return local.get(key);
    } catch (error: unknown) {
      return error || null;
    }
  },
  set: (key: string, value: unknown) => {
    try {
      return local.set(key, value);
    } catch (error: unknown) {
      return error || null;
    }
  },
  remove: (key: string) => {
    try {
      return local.remove(key);
    } catch (error: unknown) {
      return error || null;
    }
  },
};
export default localStorage;
