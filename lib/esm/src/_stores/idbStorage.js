import * as localforage from "localforage";
import memoryStorage from "./memoryStorage.js";
const NAME = "idbStorage";
let idbStorage;
if (typeof localforage.supports === "function" &&
    localforage.supports(localforage.INDEXEDDB)) {
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
        get: async (key) => {
            try {
                await store.ready();
                return await store.getItem(key);
            }
            catch (error) {
                return error;
            }
        },
        getItem: async (key) => {
            try {
                await store.ready();
                return await store.getItem(key);
            }
            catch (error) {
                return error;
            }
        },
        set: async (key, value) => {
            try {
                await store.ready();
                await store.setItem(key, value);
                return await store.getItem(key);
            }
            catch (error) {
                return error;
            }
        },
        setItem: async (key, value) => {
            try {
                await store.ready();
                await store.setItem(key, value);
                return await store.getItem(key);
            }
            catch (error) {
                return error;
            }
        },
        has: async (key) => {
            try {
                await store.ready();
                const value = await store.getItem(key);
                return value !== null;
            }
            catch (_err) {
                return false;
            }
        },
        hasItem: async (key) => {
            try {
                await store.ready();
                const value = await store.getItem(key);
                return value !== null;
            }
            catch (_err) {
                return false;
            }
        },
        remove: async (key) => {
            try {
                await store.ready();
                await store.removeItem(key);
                console.log("Key is cleared!");
                return await store.getItem(key);
            }
            catch (error) {
                return error;
            }
        },
        removeItem: async (key) => {
            try {
                await store.ready();
                await store.removeItem(key);
                console.log("Key is cleared!");
                return await store.getItem(key);
            }
            catch (error) {
                return error;
            }
        },
    };
}
else {
    idbStorage = memoryStorage;
}
export { idbStorage };
export default idbStorage;
//# sourceMappingURL=idbStorage.js.map