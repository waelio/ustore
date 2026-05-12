"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverStorage = exports.createMongoServerStorage = exports.createServerStorage = void 0;
const keyv_1 = __importDefault(require("keyv"));
const mongo_1 = __importDefault(require("@keyv/mongo"));
const createKeyvInstance = (options = {}) => {
    if (options.keyv) {
        return options.keyv;
    }
    return new keyv_1.default({
        store: options.store ?? new Map(),
        namespace: options.namespace,
        ttl: options.ttl,
    });
};
const createServerStorage = (options = {}) => {
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
exports.createServerStorage = createServerStorage;
const createMongoServerStorage = (connectionUri, options = {}) => {
    return (0, exports.createServerStorage)({
        ...options,
        store: new mongo_1.default(connectionUri),
    });
};
exports.createMongoServerStorage = createMongoServerStorage;
exports.serverStorage = (0, exports.createServerStorage)({ namespace: "ustore" });
exports.default = exports.serverStorage;
//# sourceMappingURL=server.js.map