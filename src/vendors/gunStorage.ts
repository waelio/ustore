import { UniversalStoreClass } from '../.d';
import { default as Gun } from 'gun/gun';
import { _To } from 'waelio-utils';
import { IGunConstructorOptions } from 'gun/types/options';


const options: IGunConstructorOptions = {
  peers: ['localhost:8765/gun']
};

// initialize gun
const gun = Gun(options);

// gunStorage
const gunStorage: UniversalStoreClass = {
  get: (key: string) => {
    try {
      return gun.get(key).on((data, key) => {
        console.log('data', data.key, data.value);
        console.log('key', key);
        return data;
      });
    } catch (error: any) {
      const { message } = error;
      return message && error;
    }
  },
  set: async (key: string, value: any) => {
    const test = await _To(gun.get(key).put({ key: value }));
    const [reject, resolve] = test;
    return reject
      ? reject.message
      : resolve.on(
        (data: { [x: string]: any }, key: string | number) => data[key]
      );
  },
  remove: async (key: string) => {
    const test = await _To(gun.get(key).put({ key: null }));
    const [reject, resolve] = test;
    return reject
      ? reject.message
      : resolve.on(
        (data: { [x: string]: any }, key: string | number) => data[key]
      );
  }
};

export default gunStorage;
export { gunStorage, gun };
