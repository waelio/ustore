var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import LocalForage from "localforage";
const NAME = "webqlStorage";
LocalForage.config({
    driver: LocalForage.WEBSQL,
    name: NAME,
    version: 1.0,
    size: 4980736,
    storeName: NAME,
    description: "uStore.webqlStorage",
});
let store;
try {
    store = LocalForage.createInstance({
        name: NAME,
    });
}
catch (error) {
    alert(error);
}
import { _to } from "waelio-utils";
export const webqlStorage = {
    get: (key) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [error, success] = yield _to(store.getItem(key));
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
            const [error, success] = yield _to(store.getItem(key));
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
            const [error, success] = yield _to(store.setItem(key, value));
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
            const [error, _] = yield _to(store.removeItem(key));
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
export default webqlStorage;
//# sourceMappingURL=webqlStorage.js.map