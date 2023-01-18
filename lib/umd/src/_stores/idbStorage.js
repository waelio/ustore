var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
        define(["require", "exports", "localforage"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.idbStorage = void 0;
    const localforage_1 = __importDefault(require("localforage"));
    const NAME = "idbStorage";
    let store;
    try {
        localforage_1.default.config({
            driver: localforage_1.default.INDEXEDDB,
            name: NAME,
            version: 1.0,
            size: 4980736,
            storeName: NAME,
            description: "uStore.idbStorage",
        });
        store = localforage_1.default.createInstance({
            name: NAME,
        });
    }
    catch (error) {
        localforage_1.default.dropInstance({
            name: NAME,
        }).then(function () {
            console.log(`Dropped ${NAME} database`);
        });
    }
    exports.idbStorage = {
        get: (key) => __awaiter(void 0, void 0, void 0, function* () {
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
        }),
        getItem: (key) => __awaiter(void 0, void 0, void 0, function* () {
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
        }),
        set: (key, value) => __awaiter(void 0, void 0, void 0, function* () {
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
        }),
        has: function (key) {
            try {
                return Boolean(store.getItem(key));
            }
            catch (_) {
                alert(_);
                return false;
            }
        },
        remove: (key) => __awaiter(void 0, void 0, void 0, function* () {
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
        }),
    };
    exports.default = exports.idbStorage;
});
//# sourceMappingURL=idbStorage.js.map