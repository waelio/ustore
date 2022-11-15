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
        define(["require", "exports", "localforage", "waelio-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
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
        get: (key) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [error, success] = yield (0, waelio_utils_1._to)(store.getItem(key));
                if (error) {
                    throw "Error getting item";
                }
                return success;
            }
            catch (error) {
                alert(error);
                return error;
            }
        }),
        getItem: (key) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [error, success] = yield (0, waelio_utils_1._to)(store.getItem(key));
                if (error) {
                    return "Error getting item";
                }
                return success;
            }
            catch (error) {
                alert(error);
                return error;
            }
        }),
        set: (key, value) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [error, success] = yield (0, waelio_utils_1._to)(store.setItem(key, value));
                if (error) {
                    return "Error getting item";
                }
                return success;
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
                const [error, _] = yield (0, waelio_utils_1._to)(store.removeItem(key));
                if (error) {
                    return "Error getting item";
                }
                return (yield store.getItem(key));
            }
            catch (error) {
                alert(error);
                return error;
            }
        }),
    };
    exports.default = exports.webqlStorage;
});
//# sourceMappingURL=webqlStorage.js.map