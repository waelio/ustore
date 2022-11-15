import { UStoreClass } from "../types";
import LocalForage from "localforage";
const NAME = "idbStorage";
LocalForage.config({
  driver: LocalForage.INDEXEDDB,
  name: NAME,
  version: 1.0,
  size: 4980736,
  storeName: NAME,
  description: "uStore.idbStorage",
});
let store: LocalForage;

try {
  store = LocalForage.createInstance({
    name: NAME,
  });
} catch (error) {
  console.log(error);
}
import { _to } from "waelio-utils";

export const idbStorage: UStoreClass = {
  get: async (key: string) => {
    try {
      //@ts-ignore
      const [error, success] = await _to(store.getItem(key));
      if (error) {
        throw "Error getting item";
      }
      return success;
    } catch (error: unknown) {
      alert(error);
      return error;
    }
  },
  getItem: async (key: string) => {
    try {
      //@ts-ignore
      const [error, success] = await _to(store.getItem(key));
      if (error) {
        return "Error getting item";
      }
      return success;
    } catch (error: unknown) {
      alert(error);
      return error;
    }
  },
  set: async (key: any, value: any) => {
    try {
      const [error, success] = await _to(store.setItem(key, value));
      if (error) {
        return "Error getting item";
      }
      return success;
    } catch (error: unknown) {
      alert(error);
      return error;
    }
  },
  //@ts-ignore
  has: function (key: string): boolean {
    try {
      return Boolean(store.getItem(key));
    } catch (_) {
      alert(_);
      return false;
    }
  },
  remove: async (key: string) => {
    try {
      //@ts-ignore
      const [error, _] = await _to(store.removeItem(key));
      if (error) {
        return "Error getting item";
      }
      return (await store.getItem(key)) as string | boolean;
    } catch (error) {
      alert(error);
      return error;
    }
  },
};

export default idbStorage;
