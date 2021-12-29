import { default as Gun } from 'gun/gun';
import { _To } from 'waelio-utils';
const options = {
    peers: ['localhost:8765/gun']
};
// initialize gun
export const gun = Gun(options);
// gunStorage
export const gunStorage = {
    get: async (key) => {
        try {
            gun.get(key).on((data, key) => {
                console.log('data', data.key, data.value);
                console.log('key', key);
                return data;
            });
        }
        catch (error) {
            const { message } = error;
            return message && error;
        }
    },
    set: async (key, value) => {
        const test = await _To(gun.get(key).put({ key: value }));
        const [reject, resolve] = test;
        return reject
            ? reject.message
            : resolve.on((data, key) => data[key]);
    },
    remove: async (key) => {
        const test = await _To(gun.get(key).put({ key: null }));
        const [reject, resolve] = test;
        return reject
            ? reject.message
            : resolve.on((data, key) => data[key]);
    }
};
//# sourceMappingURL=gunStorage.js.map