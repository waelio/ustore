import * as localforage from "localforage";
import memoryStorage from "./memoryStorage";
const NAME = "webqlStorage";
let store;
let webqlStorage;
if (localforage.supports(localforage.INDEXEDDB)) {
    localforage.config({
        driver: [
            localforage.WEBSQL,
            localforage.LOCALSTORAGE
        ],
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
        get: async (key) => {
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
}
else {
    store = memoryStorage;
}
export { store as webqlStorage };
export default webqlStorage = store;
;
//# sourceMappingURL=webqlStorage.js.map