import * as localforage from "localforage";
import memoryStorage from "./memoryStorage";

const NAME = "idbStorage";
let idbStorage: any;

if (
  typeof localforage.supports === "function" &&
  localforage.supports(localforage.INDEXEDDB)
) {
  localforage.config({
    driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
    name: NAME,
    version: 1.0,
    size: 4980736,
    storeName: NAME,
    description: "uStore.idbStorage",
  });

  const store = localforage.createInstance({
    name: NAME,
  });

  idbStorage = {
    get: async (key: string) => {
      try {
        await store.ready();
        return await store.getItem(key);
      } catch (error: unknown) {
        return error;
      }
    },
    getItem: async (key: string) => {
      try {
        await store.ready();
        return await store.getItem(key);
      } catch (error: unknown) {
        return error;
      }
    },
    set: async (key: any, value: any): Promise<any> => {
      try {
        await store.ready();
        await store.setItem(key, value);
        return await store.getItem(key);
      } catch (error: unknown) {
        return error;
      }
    },
    setItem: async (key: any, value: any): Promise<any> => {
      try {
        await store.ready();
        await store.setItem(key, value);
        return await store.getItem(key);
      } catch (error: unknown) {
        return error;
      }
    },
    has: async (key: string): Promise<boolean> => {
      try {
        await store.ready();
        const value = await store.getItem(key);
        return value !== null;
      } catch (_err) {
        return false;
      }
    },
    hasItem: async (key: string): Promise<boolean> => {
      try {
        await store.ready();
        const value = await store.getItem(key);
        return value !== null;
      } catch (_err) {
        return false;
      }
    },
    remove: async (key: string) => {
      try {
        await store.ready();
        await store.removeItem(key);
        console.log("Key is cleared!");
        return await store.getItem(key);
      } catch (error: any) {
        return error;
      }
    },
    removeItem: async (key: string) => {
      try {
        await store.ready();
        await store.removeItem(key);
        console.log("Key is cleared!");
        return await store.getItem(key);
      } catch (error: any) {
        return error;
      }
    },
  };
} else {
  idbStorage = memoryStorage;
}

export { idbStorage };
export default idbStorage;
