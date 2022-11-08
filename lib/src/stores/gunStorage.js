import Gun from "gun/gun";
const peers = ["https://gunjs-mtl.herokuapp.com/gun"];
const options = JSON.stringify(peers);
export const storeName = "uStoreGunDB";
export const db = new Gun(options);
export const gunStorage = {
    get: function (key) {
        return new Promise((resolve, reject) => {
            try {
                resolve(db.get(storeName).get(key));
            }
            catch (error) {
                reject(error);
            }
        });
    },
    set: (key, value) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(db.get(storeName).get(key).put(value));
            }
            catch (error) {
                reject("error");
            }
        });
    },
    remove: (key) => {
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
export default gunStorage;
//# sourceMappingURL=gunStorage.js.map