import * as localforage from "localforage";
import memoryStorage from "./memoryStorage";
const NAME = "idbStorage";
let store;
let idbStorage;
if (localforage.supports(localforage.INDEXEDDB)) {
    localforage.config({
        driver: [
            localforage.INDEXEDDB,
            localforage.LOCALSTORAGE
        ],
        name: NAME,
        version: 1.0,
        size: 4980736,
        storeName: NAME,
        description: "uStore.idbStorage",
    });
    store = localforage.createInstance({
        name: NAME,
    });
    store = localforage;
    idbStorage = {
        get: async (key) => {
            try {
                return store.ready().then(() => {
                    store.getItem(key, (err, value) => {
                        if (!!err) {
                            return "Error getting item";
                        }
                        return value;
                    });
                });
            }
            catch (error) {
                return error;
            }
        },
        getItem: async (key) => {
            try {
                return store.ready().then(() => {
                    return store.getItem(key, (err, value) => {
                        if (!!err) {
                            return "Error getting item";
                        }
                        return value;
                    });
                });
            }
            catch (error) {
                return error;
            }
        },
        set: async (key, value) => {
            try {
                store.ready().then(() => {
                    return store.setItem(key, value, function (err) {
                        if (err) {
                            return "Error getting item";
                        }
                        store.getItem(key, (err, value) => {
                            if (err) {
                                return "Error getting item";
                            }
                            return value;
                        });
                    });
                });
            }
            catch (error) {
                return error;
            }
        },
        setItem: async (key, value) => {
            try {
                store.ready().then(() => {
                    return store.setItem(key, value, function (err) {
                        if (err) {
                            return "Error getting item";
                        }
                        store.getItem(key, (err, value) => {
                            if (err) {
                                return "Error getting item";
                            }
                            return value;
                        });
                    });
                });
            }
            catch (error) {
                return error;
            }
        },
        has: async (key) => {
            try {
                await store.ready();
                return await store.getItem(key);
            }
            catch (_err) {
                return false;
            }
        },
        hasItem: async (key) => {
            try {
                await store.ready();
                return await store.getItem(key);
            }
            catch (_err) {
                return false;
            }
        },
        remove: async (key) => {
            return store
                .ready()
                .then(async () => {
                store.removeItem(key);
                console.log("Key is cleared!");
                const value = await store.getItem(key);
                return value;
            })
                .catch((error) => {
                return error;
            });
        },
        removeItem: async (key) => {
            return store
                .ready()
                .then(async () => {
                store.removeItem(key);
                console.log("Key is cleared!");
                const value = await store.getItem(key);
                return value;
            })
                .catch((error) => {
                return error;
            });
        },
    };
}
else {
    store = memoryStorage;
}
export { store as idbStorage };
export default idbStorage = store;
//# sourceMappingURL=idbStorage.js.map