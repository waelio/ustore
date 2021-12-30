import { UniversalStoreClass } from '../.d';
import { default as Gun } from 'gun/gun';
import { _To } from 'waelio-utils';
import { IGunConstructorOptions } from 'gun/types/options';
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const options: IGunConstructorOptions = {
  peers: ['localhost:8765/gun']
};

// initialize gun
const gun = Gun({ options });

// gunStorage
const gunStorage: UniversalStoreClass = {
  get: (key: string) => {
    try {
      gun.get(key)
        .once(async(node) => {
          if (node === undefined) {
            gun.get(key).put({ key: "Write the text here" })
            return gun.get(key).on((node) => node.key)
          } else {
            console.log("Found Node")
            return await node[key]
          }
        })
    } catch (error: any) {
      const { message } = error;
      return message ? message : error;
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
