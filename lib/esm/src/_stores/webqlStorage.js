import LocalForage from "localforage";
const NAME = "webqlStorage";
let store;
try {
    LocalForage.config({
        driver: LocalForage.WEBSQL,
        name: NAME,
        version: 1.0,
        size: 4980736,
        storeName: NAME,
        description: "uStore.webqlStorage",
    });
    store = LocalForage.createInstance({
        name: NAME,
    });
}
catch (error) {
    LocalForage.dropInstance({
        name: NAME,
    }).then(function () {
        console.log(`Dropped ${NAME} database`);
    });
}
export const webqlStorage = {
    get: async (key) => {
        try {
            store.getItem(key, function (err, value) {
                if (err) {
                    return "Error getting item";
                }
                return value;
            });
        }
        catch (error) {
            alert(error);
            return error;
        }
    },
    getItem: async (key) => {
        try {
            store.getItem(key, function (err, value) {
                if (err) {
                    return "Error getting item";
                }
                return value;
            });
        }
        catch (error) {
            alert(error);
            return error;
        }
    },
    set: async (key, value) => {
        try {
            store.setItem(key, value, function (err) {
                if (err) {
                    return "Error getting item";
                }
                store.getItem(key, function (err, value) {
                    if (err) {
                        return "Error getting item";
                    }
                    return value;
                });
            });
        }
        catch (error) {
            alert(error);
            return error;
        }
    },
    has: (key) => {
        try {
            return Boolean(store.getItem(key));
        }
        catch (_) {
            alert(_);
            return false;
        }
    },
    remove: async (key) => {
        try {
            store.removeItem(key).then(function () {
                console.log("Key is cleared!");
                store.getItem(key).then(function (value) {
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