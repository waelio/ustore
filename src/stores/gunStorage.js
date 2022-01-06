const GUN = require('gun/gun');
import { _To } from 'waelio-utils';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const options = {
    peers: ['https://gunjs-mtl.herokuapp.com/gun']
};
// initialize gun
const storeName = 'uStoreGunDB';
export const db = GUN({ options });
export const uStoreGunDB = db.get(storeName);
// export const user = db.user().recall({ sessionStorage: true });
// gunStorage
const gunStorage = {
    get: function (key) {
        try {
            const check = uStoreGunDB.get(key);
            return check.once(function (data, id) {
                return data && id
                    ? { id: id, key, data: data }
                    : { id: key, data: null };
            });
        }
        catch (error) {
            return error && error.message ? error.message : error;
        }
    },
    set: async function (key, value) {
        try {
            uStoreGunDB.get(key).put({ key: value });
            return true;
        }
        catch (error) {
            return error && error.message ? error.message : error;
        }
    },
    remove: async (key) => {
        const test = await _To(uStoreGunDB.get(key).put({ _: '#' }));
        const [reject, resolve] = test;
        return reject
            ? reject.message
            : resolve.on((data, key) => data[key]);
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
//# sourceMappingURL=gunStorage.js.map