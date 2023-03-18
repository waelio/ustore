import * as memoryDriver from 'localforage-driver-memory';
import * as localforage from 'localforage';
const NAME = "idbStorage";
let store: LocalForage;

try {
  localforage.config({
    driver: localforage.INDEXEDDB,
    name: NAME,
    version: 1.0,
    size: 4980736,
    storeName: NAME,
    description: "uStore.idbStorage",
  });
  store = localforage.createInstance({
    name: NAME,
  });
  localforage.defineDriver(memoryDriver);
  localforage.setDriver(memoryDriver._driver);
} catch (error) {
  store = localforage
}

export { store };

export const idbStorage = ({
  get: async (key: string) => {
    try {
      return store.ready().then(() => {
        store.getItem(key, (err: any, value: any) => {
          if (!!err) {
            return "Error getting item";
          }
          return value;
        });
      })
    } catch (error: unknown) {
      return error;
    }
  },
  getItem: async (key: string) => {
    try {
      return store.ready().then(() => {
        return store.getItem(key, (err: any, value: unknown) => {
          if (!!err) {
            return "Error getting item";
          }
          return value;
        });
      })
    } catch (error: unknown) {
      return error;
    }
  },
  set: async (key: any, value: any): Promise<any> => {
    try {
      store.ready().then(() => {
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
        })
      })

    } catch (error: unknown) {
      return error;
    }
  },
  setItem: async (key: any, value: any): Promise<any> => {
    try {
      store.ready().then(() => {
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
        })
      })

    } catch (error: unknown) {
      return error;
    }
  },
  has: async (key: string): Promise<boolean> => {
    try {
      await store.ready();
      return await (store.getItem(key) as Promise<boolean>);
    } catch (_err) {
      return false;
    }
  },
  hasItem: async (key: string): Promise<boolean> => {
    try {
      await store.ready();
      return await (store.getItem(key) as Promise<boolean>);
    } catch (_err) {
      return false;
    }
  },
  remove: async (key: string) => {
    return store.ready().then(async () => {
      store.removeItem(key);
      console.log("Key is cleared!");
      const value = await store.getItem(key);
      return value;
    }).
      catch((error: any) => {
        return error;
      })
  },
  removeItem: async (key: string) => {
    return store.ready().then(async () => {
      store.removeItem(key);
      console.log("Key is cleared!");
      const value = await store.getItem(key);
      return value;
    }).
      catch((error: any) => {
        return error;
      })
  },
});

export default idbStorage;
