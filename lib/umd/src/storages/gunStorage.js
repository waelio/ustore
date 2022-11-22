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
        define(["require", "exports", "gun/gun"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gunStorage = exports.db = exports.storeName = void 0;
    const gun_1 = __importDefault(require("gun/gun"));
    const peers = ["https://gunjs-mtl.herokuapp.com/gun"];
    const options = JSON.stringify(peers);
    exports.storeName = "uStoreGunDB";
    exports.db = new gun_1.default(options);
    exports.gunStorage = {
        get: function (key, callBack) {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const test = yield exports.db.get(exports.storeName).get(key).once();
                    const [error, success] = yield _to(test);
                    reject(yield error);
                    if (callBack) {
                        callBack(success);
                    }
                    resolve(yield success);
                }
                catch (error) {
                    reject(error);
                }
            }));
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
            return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
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
            }));
        },
    };
    exports.default = exports.gunStorage;
});
//# sourceMappingURL=gunStorage.js.map