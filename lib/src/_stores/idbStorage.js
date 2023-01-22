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
const NAME = "idbStorage";
try {
    LocalForage.config({
        driver: LocalForage.INDEXEDDB,
        name: NAME,
        version: 1.0,
        size: 4980736,
        storeName: NAME,
        description: "uStore.idbStorage",
    });
}
catch (error) {
    LocalForage.dropInstance({
        name: NAME,
    }).then(function () {
        console.log(`Dropped ${NAME} database`);
    });
}
let store = LocalForage;
() => ({
    store: LocalForage.createInstance({
        name: NAME,
    }),
});
export const idbStorage = {
    get: (key) => __awaiter(void 0, void 0, void 0, function* () {
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
export default idbStorage;
//# sourceMappingURL=idbStorage.js.map