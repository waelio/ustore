"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webqlStorage = void 0;
const localforage_1 = __importDefault(require("localforage"));
const NAME = "webqlStorage";
localforage_1.default.config({
    driver: localforage_1.default.WEBSQL,
    name: NAME,
    version: 1.0,
    size: 4980736,
    storeName: NAME,
    description: "uStore.webqlStorage",
});
let store;
try {
    store = localforage_1.default.createInstance({
        name: NAME,
    });
}
catch (error) {
    alert(error);
}
const waelio_utils_1 = require("waelio-utils");
exports.webqlStorage = {
    get: async (key) => {
        try {
            const [error, success] = await (0, waelio_utils_1._to)(store.getItem(key));
            if (error) {
                throw "Error getting item";
            }
            return success;
        }
        catch (error) {
            alert(error);
            return error;
        }
    },
    getItem: async (key) => {
        try {
            const [error, success] = await (0, waelio_utils_1._to)(store.getItem(key));
            if (error) {
                return "Error getting item";
            }
            return success;
        }
        catch (error) {
            alert(error);
            return error;
        }
    },
    set: async (key, value) => {
        try {
            const [error, success] = await (0, waelio_utils_1._to)(store.setItem(key, value));
            if (error) {
                return "Error getting item";
            }
            return success;
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
            const [error, _] = await (0, waelio_utils_1._to)(store.removeItem(key));
            if (error) {
                return "Error getting item";
            }
            return (await store.getItem(key));
        }
        catch (error) {
            alert(error);
            return error;
        }
    },
};
exports.default = exports.webqlStorage;
//# sourceMappingURL=webqlStorage.js.map