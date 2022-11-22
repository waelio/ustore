"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.webqlStorage = void 0;
const localforage_1 = __importDefault(require("localforage"));
const NAME = "webqlStorage";
let store;
try {
    localforage_1.default.config({
        driver: localforage_1.default.WEBSQL,
        name: NAME,
        version: 1.0,
        size: 4980736,
        storeName: NAME,
        description: "uStore.webqlStorage",
    });
    store = localforage_1.default.createInstance({
        name: NAME,
    });
}
catch (error) {
    localforage_1.default.dropInstance({
        name: NAME
    }).then(function () {
        console.log(`Dropped ${NAME} database`);
    });
}
exports.webqlStorage = {
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
            alert(error);
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
            alert(error);
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
            alert(error);
            return error;
        }
    }),
    has: (key) => {
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
                console.log('Key is cleared!');
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
exports.default = exports.webqlStorage;
//# sourceMappingURL=webqlStorage.js.map