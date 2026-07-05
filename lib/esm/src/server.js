import Keyv from "keyv";
import KeyvMongo from "@keyv/mongo";
const createKeyvInstance = (options = {}) => {
    if (options.keyv) {
        return options.keyv;
    }
    return new Keyv({
        store: options.store ?? new Map(),
        namespace: options.namespace,
        ttl: options.ttl,
    });
};
export const createServerStorage = (options = {}) => {
    const keyv = createKeyvInstance(options);
    const fallbackTTL = options.ttl;
    const getValue = async (key) => {
        const value = await keyv.get(key);
        return value === undefined ? undefined : value;
    };
    const setValue = async (key, value, setOptions) => {
        await keyv.set(key, value, setOptions?.ttl ?? fallbackTTL);
        return { [key]: value };
    };
    return {
        type: "serverStorage",
        keyv,
        get: async (key) => getValue(key),
        getItem: async (key) => getValue(key),
        set: async (key, value, setOptions) => setValue(key, value, setOptions),
        setItem: async (key, value, setOptions) => setValue(key, value, setOptions),
        remove: async (key) => keyv.delete(key),
        removeItem: async (key) => keyv.delete(key),
        has: async (key) => (await keyv.get(key)) !== undefined,
        hasItem: async (key) => (await keyv.get(key)) !== undefined,
        clear: async () => {
            await keyv.clear();
        },
    };
};
export const createMongoServerStorage = (connectionUri, options = {}) => {
    return createServerStorage({
        ...options,
        store: new KeyvMongo(connectionUri),
    });
};
export const serverStorage = createServerStorage({ namespace: "ustore" });
export default serverStorage;
//# sourceMappingURL=server.js.map