var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "localforage", "./memoryStorage"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.idbStorage = void 0;
    const localforage = __importStar(require("localforage"));
    const memoryStorage_1 = __importDefault(require("./memoryStorage"));
    const NAME = "idbStorage";
    let store;
    exports.idbStorage = store;
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
        exports.idbStorage = store = localforage.createInstance({
            name: NAME,
        });
        exports.idbStorage = store = localforage;
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
        exports.idbStorage = store = memoryStorage_1.default;
    }
    exports.default = idbStorage = store;
});
//# sourceMappingURL=idbStorage.js.map