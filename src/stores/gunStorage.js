import { default as Gun } from 'gun/gun';
import { _To } from 'waelio-utils';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const options = {
    peers: ['localhost:8765/gun']
};
// initialize gun
const gun = Gun({ options });
// gunStorage
const gunStorage = {
    get: (key) => {
        try {
            gun.get(key)
                .once((node) => {
                if (node === undefined) {
                    gun.get(key).put({ key: "Write the text here" });
                    return gun.get(key).on((node) => node.key);
                }
                else {
                    console.log("Found Node");
                    return node[key];
                }
            });
        }
        catch (error) {
            const { message } = error;
            return message ? message : error;
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
export default gunStorage;
export { gunStorage, gun };
//# sourceMappingURL=gunStorage.js.map