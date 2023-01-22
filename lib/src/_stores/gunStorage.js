var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { _to } from "waelio-utils";
import Gun from 'gun/gun';
const options = {
    localStorage: true,
    radisk: true,
    peers: ["https://gunjs-mtl.herokuapp.com/gun", 'http://localhost:8765/gun']
};
export const storeName = "uStoreGunDB";
export const db = new Gun(options);
export const gunStorage = {
    get: function (key, callBack) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const test = yield db.get(storeName).get(key).once();
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
                db.get(storeName).put({ [newKey]: newValue });
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
                const res = db
                    .get(storeName)
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
export default gunStorage;
//# sourceMappingURL=gunStorage.js.map