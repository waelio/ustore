
import { UStoreClass } from '../.d';
import { _to } from "waelio-utils";
import Gun from 'gun/gun';

const peers: string[] = ['https://gunjs-mtl.herokuapp.com/gun'];
const options = JSON.stringify(peers);

export const storeName = 'uStoreGunDB';


type p = string | any;

// initialize gun
export const db = new Gun(options);
export const gunStorage: UStoreClass = {
  getItem: async function (key: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = db.get(storeName).get(key);
        resolve(res);
      } catch (error: any) {
        reject(error);
      }
    });
  },
  get: async function (key: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = db.get(storeName).get(key);
        resolve(res);
      } catch (error: any) {
        reject(error);
      }
    });
  },
  set: (key: string, value: p) => {
    return new Promise((resolve, reject) => {
      try {
        const res = db.get(storeName).get(key).set(value);
        resolve(res);
      } catch (error: any) {
        console.log(error);

        reject('error');
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
  }
};

export default gunStorage;