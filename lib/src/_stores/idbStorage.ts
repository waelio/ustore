import LocalForage from "localforage";
import { secureStorage } from "./index";
import localforage from "localforage";
const NAME = "idbStorage";
var store;

try {
  localforage.config({
    driver: LocalForage.INDEXEDDB,
    name: NAME,
    version: 1.0,
    size: 4980736,
    storeName: NAME,
    description: "uStore.idbStorage",
  });
  store = localforage.createInstance({
    name: NAME,
  });
} catch (error) {
  localforage
    .dropInstance({
      name: NAME,
    })
    .then(function () {
      console.log(`Dropped ${NAME} database`);
    });
  store = secureStorage;
}

export { store };

export const idbStorage = {
  get: async (key: string) => {
    try {
      store.getItem(key, (err: any, value: unknown) => {
        if (!!err) {
          return "Error getting item";
        }
        return value;
      });
    } catch (error: unknown) {
      return error;
    }
  },
  getItem: async (key: string) => {
    try {
      store.getItem(key, function (err: any, value) {
        if (err) {
          return "Error getting item";
        }
        return value;
      });
    } catch (error: unknown) {
      return error;
    }
  },
  set: async (key: any, value: any): Promise<any> => {
    try {
      store.setItem(key, value, function (err: unknown) {
        if (err) {
          return "Error getting item";
        }
        store.getItem(key, function (err: any, value) {
          if (err) {
            return "Error getting item";
          }
          return value;
        });
      });
    } catch (error: unknown) {
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
      store.removeItem(key).then(function () {
        console.log("Key is cleared!");
        store.getItem(key).then(function (value) {
          return value;
        });
      });
    } catch (error) {
      return error;
    }
  },
};

export default idbStorage;