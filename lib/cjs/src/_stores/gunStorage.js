"use strict";
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
exports.gunStorage = ({
    get: async (key) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(exports.db.get(exports.storeName).get(key));
            }
            catch (error) {
                reject(error);
            }
        });
    },
    getItem: async (key) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(exports.db.get(exports.storeName).get(key));
            }
            catch (error) {
                reject(error);
            }
        });
    },
    has: async (key) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(exports.db.get(exports.storeName).get(key) !== null);
            }
            catch (error) {
                reject(error);
            }
        });
    },
    hasItem: async (key) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(exports.db.get(exports.storeName).get(key) !== null);
            }
            catch (error) {
                reject(error);
            }
        });
    },
    set: async (key, value) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(exports.db.get(exports.storeName).get(key).put(value));
            }
            catch (error) {
                reject("error");
            }
        });
    },
    setItem: async (key, value) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(exports.db.get(exports.storeName).get(key).put(value));
            }
            catch (error) {
                reject("error");
            }
        });
    },
    remove: async (key) => {
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
    removeItem: async (key) => {
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
});
//# sourceMappingURL=gunStorage.js.map