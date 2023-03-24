import * as localforage from "localforage";
import * as memoryDriver from "localforage-driver-memory";
const NAME = "webqlStorage";
let store;
try {
    localforage.config({
        driver: localforage.WEBSQL,
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
    store = localforage;
}
catch (_error) {
    store = localforage;
}
export { store };
export const webqlStorage = {
    get: async (key) => {
        try {
            return store
                .ready()
                .then(async () => {
                store.getItem(key, (err, value) => {
                    if (!!err) {
                        return "Error getting item";
                    }
                    return value;
                });
            })
                .catch((err) => {
                return err;
            });
        }
        catch (error) {
            return error;
        }
    },
    getItem: async (key) => {
        try {
            return store
                .ready()
                .then(() => {
                store.getItem(key, (err, value) => {
                    if (!!err) {
                        return "Error getting item";
                    }
                    return value;
                });
            })
                .catch((err) => {
                return err;
            });
        }
        catch (error) {
            return error;
        }
    },
    set: async (key, value) => {
        try {
            return store.ready().then(() => {
                store.setItem(key, value, function (err) {
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
    has: (key) => {
        try {
            return Boolean(store.ready().then(() => store.getItem(key)));
        }
        catch (_) {
            alert(_);
            return false;
        }
    },
    hasItem: (key) => {
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
export default webqlStorage;
//# sourceMappingURL=webqlStorage.js.map