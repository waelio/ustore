import { UStoreClass } from "../.d";
import { _to } from "waelio-utils";
import Gun from "gun/gun";

const peers: string[] = ["https://gunjs-mtl.herokuapp.com/gun"];
const log = { off: true };
const options = JSON.stringify(Object.assign(peers, log));

export const storeName = "uStoreGunDB";

type p = string | any;
// @ts-ignore
Gun.log.off = false;
// initialize gun
export const db = new Gun(options);
export const gunStorage: UStoreClass = {
  get: async (key: string) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(db.get(storeName).get(key));
      } catch (error: any) {
        reject(error);
      }
    });
  },
  getItem: async (key: string) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(db.get(storeName).get(key));
      } catch (error: any) {
        reject(error);
      }
    });
  },
  has: async (key: string) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(db.get(storeName).get(key) !== null);
      } catch (error: any) {
        reject(error);
      }
    });
  },
  hasItem: async (key: string) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(db.get(storeName).get(key) !== null);
      } catch (error: any) {
        reject(error);
      }
    });
  },
  set: async (key: string, value: p) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(db.get(storeName).get(key).put(value));
      } catch (error: any) {
        reject("error");
      }
    });
  },
  setItem: async (key: string, value: p) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(db.get(storeName).get(key).put(value));
      } catch (error: any) {
        reject("error");
      }
    });
  },
  remove: async (key: string) => {
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
  removeItem: async (key: string) => {
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
};
