import { UStoreClass } from '../types';
// @ts-nocheck


// import { _encrypt, _decrypt } from "waelio-utils";
// import { NAME }               from '../../loadLocalbase.mjs'
import { STORENAME } from '../../loadLocalbase.mjs'
import { db } from '../../loadLocalbase.mjs'
const store = db.collection(STORENAME)

export const idbStorage: Partial<UStoreClass> = ({
  get: (key: string) => {
    try {
      return store.get(key);
    } catch (error: unknown) {
      return error || null;
    }
  },
  getItem: (key: string) => {
    try {
      return store.get(key);
    } catch (error: unknown) {
      return error || null;
    };
  },
  set: (key: any, value: any) => {
    try {
      return store(key).add(value) as void
    } catch (error: unknown) {
      return error
    }
  },
  //@ts-ignore
  has: function (key: string): boolean {
    try {
      return Boolean(store.get(key));
    } catch (_) {
      return false;
    }
  },
  remove: (key: string) => {
    try {
      db.collection(key).remove();
      return store.get(key) as string | boolean
    } catch (error) {
      return error;
    }
  }
});

export default idbStorage;
