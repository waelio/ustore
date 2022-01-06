const GUN = require('gun/gun');
// import 'gun/sea';
// import 'gun/axe';
import { UniversalStoreClass } from '../.d';
import { _To } from 'waelio-utils';
import { IGunConstructorOptions } from 'gun/types/options';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const options: IGunConstructorOptions = {
  peers: ['https://gunjs-mtl.herokuapp.com/gun']
};

// initialize gun
const storeName = 'uStoreGunDB';
export const db = GUN({ options });
export const uStoreGunDB = db.get(storeName);
// export const user = db.user().recall({ sessionStorage: true });

// gunStorage
const gunStorage: UniversalStoreClass = {
  get: function (key: string) {
    try {
      const check = uStoreGunDB.get(key);
      return check.once(function (data: any, id) {
        return data && id
          ? { id: id, key, data: data }
          : { id: key, data: null };
      });
    } catch (error: any) {
      return error && error.message ? error.message : error;
    }
  },
  set: async function (
    key: string,
    value: string | string[] | object | number | boolean | null
  ) {
    try {
      uStoreGunDB.get(key).put({ key: value });
      return true;
    } catch (error: any) {
      return error && error.message ? error.message : error;
    }
  },
  remove: async (key: string) => {
    const test = await _To(uStoreGunDB.get(key).put({ _: '#' }));
    const [reject, resolve] = test;
    return reject
      ? reject.message
      : resolve.on(
          (data: { [x: string]: any }, key: string | number) => data[key]
        );
  }
};

const k = 'someKey';
const v = { try: 'some text testing' };

const scv = gunStorage.set(k, v);
const rcv = gunStorage.get(k);

scv /*?*/;
rcv; /*?*/

export default gunStorage;
export { gunStorage };
