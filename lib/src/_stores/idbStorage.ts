import * as memoryDriver from "localforage-driver-memory";
import * as localforage from "localforage";
import { UStoreClass } from "../.d";

const NAME = "idbStorage";

let store: LocalForage;

try {
  localforage.config({
    driver: localforage.INDEXEDDB,
    name: NAME,
    version: 1.0,
    size: 4980736,
    storeName: NAME,
    description: `uStore.${NAME}`,
  });
  store = localforage.createInstance({
    name: NAME,
  });
  localforage.defineDriver(memoryDriver);
  localforage.setDriver(memoryDriver._driver);
} catch (_error) {
  store = localforage;
}

export { store };

export const idbStorage: UStoreClass = {
  get: async (key: string) => {
    try {
      return store.ready().then(() => {
        return store.getItem(key, (err: any, value: any) => {
          if (!!err) {
            return "Error getting item";
          }
          return value;
        });
      });
    } catch (error: unknown) {
      return error;
    }
  },
  getItem: async (key: string) => {
    try {
      return store.ready().then(async () => {
        return store.getItem(key, (err: any, value: unknown) => {
          if (!!err) {
            return "Error getting item";
          }
          return value;
        });
      });
    } catch (error: unknown) {
      return error;
    }
  },
  set: async (key: any, value: any): Promise<any> => {
    try {
      return store.ready().then(() => {
        return store.setItem(key, value, function (err: unknown) {
          if (err) {
            return "Error getting item";
          }
          store.getItem(key, (err: any, value: any) => {
            if (err) {
              return "Error getting item";
            }
            return value;
          });
        });
      });
    } catch (error: unknown) {
      return error;
    }
  },
  setItem: async (key: any, value: any): Promise<any> => {
    try {
      return store.ready().then(() => {
        return store.setItem(key, value, function (err: unknown) {
          if (err) {
            return "Error getting item";
          }
          store.getItem(key, (err: any, value: any) => {
            if (err) {
              return "Error getting item";
            }
            return value;
          });
        });
      });
    } catch (error: unknown) {
      return error;
    }
  },
  has: async (key: string): Promise<boolean> => {
    try {
      return Boolean(store.ready().then(() => store.getItem(key)));
    } catch (_) {
      alert(_);
      return false;
    }
  },
  hasItem: async (key: string): Promise<boolean> => {
    try {
      return Boolean(store.ready().then(() => store.getItem(key)));
    } catch (_) {
      alert(_);
      return false;
    }
  },
  remove: async (key: string) => {
    try {
      return store.ready().then(async () => {
        await store.removeItem(key);
        console.log("Key is cleared!");
        return store.getItem(key).then((value: any) => {
          return value;
        });
      });
    } catch (error) {
      return error;
    }
  },
  removeItem: async (key: string) => {
    try {
      return store.ready().then(async () => {
        await store.removeItem(key);
        console.log("Key is cleared!");
        return store.getItem(key).then((value: any) => {
          return value;
        });
      });
    } catch (error) {
      return error;
    }
  },
};

export default idbStorage;
