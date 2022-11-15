var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "waelio-utils", "gun/gun"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gunStorage = exports.db = exports.storeName = void 0;
    const waelio_utils_1 = require("waelio-utils");
    const gun_1 = __importDefault(require("gun/gun"));
    const peers = ["https://gunjs-mtl.herokuapp.com/gun"];
    const options = JSON.stringify(peers);
    exports.storeName = "uStoreGunDB";
    exports.db = new gun_1.default(options);
    exports.gunStorage = {
        get: function (key, callBack) {
            return new Promise(async (resolve, reject) => {
                try {
                    const test = await exports.db.get(exports.storeName).get(key).once();
                    const [error, success] = await (0, waelio_utils_1._to)(test);
                    reject(await error);
                    if (callBack) {
                        callBack(success);
                    }
                    resolve(await success);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
        set: (newKey, newValue) => {
            return new Promise((resolve, reject) => {
                try {
                    exports.db.get(exports.storeName).put({ [newKey]: newValue });
                    resolve(true);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
        remove: (key) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = exports.db
                        .get(exports.storeName)
                        .get(key)
                        .set(null);
                    resolve(res);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
    };
    exports.default = exports.gunStorage;
    exports.gunStorage.set("test", "waelio");
    exports.gunStorage.get("test");
});
//# sourceMappingURL=gunStorage.js.map