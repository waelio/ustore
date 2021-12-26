import { UniversalStoreClass } from '../types';
import Gun from 'gun/gun';
import { _To } from 'waelio-utils';
const options: IGunConstructorOptions = {
  peers: ['localhost:8765/gun']
};
const gun = Gun(options);

export const gunStorage: UniversalStoreClass = {
  get: async (key: string) => {
    try {
      gun.get(key).on((data, key) => {
        console.log('data', data.key, data.value);
        console.log('key', key);
        return data;
      });
    } catch (error) {
      return error.message ? error.message : error;
    }
  },
  set: async (key: string, value: any) => {
    const test = await _To(gun.get(key).put({ key: value }));
    const [reject, resolve] = test;
    return reject ? reject.message : resolve.on((data, key) => data);
  }
};
