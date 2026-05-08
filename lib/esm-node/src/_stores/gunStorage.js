import Gun from "gun/gun.js";
const peers = ["https://gunjs-mtl.herokuapp.com/gun"];
const log = { off: true };
const options = JSON.stringify(Object.assign(peers, log));
export const storeName = "uStoreGunDB";
Gun.log.off = false;
export const db = new Gun(options);
export const gunStorage = {
    get: async (key) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(db.get(storeName).get(key));
            }
            catch (error) {
                reject(error);
            }
        });
    },
    getItem: async (key) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(db.get(storeName).get(key));
            }
            catch (error) {
                reject(error);
            }
        });
    },
    has: async (key) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(db.get(storeName).get(key) !== null);
            }
            catch (error) {
                reject(error);
            }
        });
    },
    hasItem: async (key) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(db.get(storeName).get(key) !== null);
            }
            catch (error) {
                reject(error);
            }
        });
    },
    set: async (key, value) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(db.get(storeName).get(key).put(value));
            }
            catch (error) {
                reject("error");
            }
        });
    },
    setItem: async (key, value) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(db.get(storeName).get(key).put(value));
            }
            catch (error) {
                reject("error");
            }
        });
    },
    remove: async (key) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = db
                    .get(storeName)
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
                const res = db
                    .get(storeName)
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
//# sourceMappingURL=gunStorage.js.map