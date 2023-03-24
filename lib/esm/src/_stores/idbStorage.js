import * as memoryDriver from "localforage-driver-memory";
import * as localforage from "localforage";
const NAME = "idbStorage";
let store;
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
}
catch (_error) {
    store = localforage;
}
export { store };
export const idbStorage = {
    get: async (key) => {
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
    getItem: async (key) => {
        try {
            return store.ready().then(async () => {
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
            return store.ready().then(() => {
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
            return store.ready().then(() => {
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
            return Boolean(store.ready().then(() => store.getItem(key)));
        }
        catch (_) {
            alert(_);
            return false;
        }
    },
    hasItem: async (key) => {
        try {
            return Boolean(store.ready().then(() => store.getItem(key)));
        }
        catch (_) {
            alert(_);
            return false;
        }
    },
    remove: async (key) => {
        try {
            return store.ready().then(async () => {
                await store.removeItem(key);
                console.log("Key is cleared!");
                return store.getItem(key).then((value) => {
                    return value;
                });
            });
        }
        catch (error) {
            return error;
        }
    },
    removeItem: async (key) => {
        try {
            return store.ready().then(async () => {
                await store.removeItem(key);
                console.log("Key is cleared!");
                return store.getItem(key).then((value) => {
                    return value;
                });
            });
        }
        catch (error) {
            return error;
        }
    },
};
export default idbStorage;
//# sourceMappingURL=idbStorage.js.map