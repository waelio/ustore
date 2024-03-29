import * as localforage from "localforage";
import memoryStorage from "./memoryStorage";

const NAME = "webqlStorage";
let store: any;
let webqlStorage: any;
if (localforage.supports(localforage.INDEXEDDB)) {
  localforage.config({
    driver: [localforage.WEBSQL, localforage.LOCALSTORAGE],
    name: NAME,
    version: 1.0,
    size: 4980736,
    storeName: NAME,
    description: "uStore.webqlStorage",
  });
  store = localforage.createInstance({
    name: NAME,
  });
  store = localforage;
  webqlStorage = {
    get: async (key: string) => {
      try {
        return store
          .ready()
          .then(() => {
            store.getItem(key, (err: any, value: unknown) => {
              if (!!err) {
                return "Error getting item";
              }
              return value;
            });
          })
          .catch((err: any) => {
            return err;
          });
      } catch (error: unknown) {
        return error;
      }
    },
    getItem: async (key: string) => {
      try {
        return store
          .ready()
          .then(() => {
            store.getItem(key, (err: any, value: unknown) => {
              if (!!err) {
                return "Error getting item";
              }
              return value;
            });
          })
          .catch((err: any) => {
            return err;
          });
      } catch (error: unknown) {
        return error;
      }
    },
    set: async (key: any, value: any): Promise<any> => {
      try {
        return store.ready().then(() => {
          store.setItem(key, value, function (err: unknown) {
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
    has: (key: string): boolean => {
      try {
        return Boolean(store.ready().then(() => store.getItem(key)));
      } catch (_) {
        alert(_);
        return false;
      }
    },
    hasItem: (key: string): boolean => {
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
} else {
  store = memoryStorage;
}

export { store as webqlStorage };
export default webqlStorage = store;
