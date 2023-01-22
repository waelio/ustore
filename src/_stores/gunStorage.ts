import { IuStore } from "../.d";
import { _to } from "waelio-utils";
import Gun from "gun/gun";

const peers: string[] = ["https://gunjs-mtl.herokuapp.com/gun"];
const options = JSON.stringify(peers);

export const storeName = "uStoreGunDB";

type p = string | any;

// initialize gun
export const db = new Gun(options);
export const gunStorage = ({
  get: function (key: string, callBack?: Function) {
    return new Promise(async (resolve, reject) => {
      try {
        const test = await db.get(storeName).get(key).once();
        // @ts-ignore
        const [error, success] = await _to(test);
        reject(await error);
        if (callBack) {
          callBack(success);
        }
        resolve(await success);
      } catch (error: any) {
        reject(error);
      }
    });
  },
  set: (newKey: string, newValue: p) => {
    return new Promise((resolve, reject) => {
      try {
        db.get(storeName).put({ [newKey]: newValue });
        resolve(true);
      } catch (error: any) {
        reject(error);
      }
    });
  },
  remove: (key: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = db
          .get(storeName)
          .get(key)
          .set(null as any);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  },
});

export default gunStorage;
