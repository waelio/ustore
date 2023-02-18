var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "localforage", "./index", "localforage"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.idbStorage = exports.store = void 0;
    const localforage_1 = __importDefault(require("localforage"));
    const index_1 = require("./index");
    const localforage_2 = __importDefault(require("localforage"));
    const NAME = "idbStorage";
    var store;
    exports.store = store;
    try {
        localforage_2.default.config({
            driver: localforage_1.default.INDEXEDDB,
            name: NAME,
            version: 1.0,
            size: 4980736,
            storeName: NAME,
            description: "uStore.idbStorage",
        });
        exports.store = store = localforage_2.default.createInstance({
            name: NAME,
        });
    }
    catch (error) {
        localforage_2.default
            .dropInstance({
            name: NAME,
        })
            .then(function () {
            console.log(`Dropped ${NAME} database`);
        });
        exports.store = store = index_1.secureStorage;
    }
    exports.idbStorage = {
        get: async (key) => {
            try {
                store.getItem(key, (err, value) => {
                    if (!!err) {
                        return "Error getting item";
                    }
                    return value;
                });
            }
            catch (error) {
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
                return error;
            }
        },
        has: function (key) {
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
    exports.default = exports.idbStorage;
});
//# sourceMappingURL=idbStorage.js.map