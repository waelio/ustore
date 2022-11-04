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
exports.gunStorage = exports.db = exports.storeName = void 0;
const gun_1 = __importDefault(require("gun/gun"));
const peers = ["https://gunjs-mtl.herokuapp.com/gun"];
const options = JSON.stringify(peers);
exports.storeName = "uStoreGunDB";
exports.db = new gun_1.default(options);
exports.gunStorage = {
    get: function (key) {
        return new Promise((resolve, reject) => {
            try {
                resolve(exports.db.get(exports.storeName).get(key));
            }
            catch (error) {
                reject(error);
            }
        });
    },
    set: (key, value) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(exports.db.get(exports.storeName).get(key).put(value));
            }
            catch (error) {
                reject("error");
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
//# sourceMappingURL=gunStorage.js.map