const state = {};
export const signalStorage = {
    get: (key) => {
        if (!key)
            return null;
        return state[key] ?? null;
    },
    getItem: (key) => {
        if (!key)
            return null;
        return state[key] ?? null;
    },
    set: (key, value) => {
        if (!key)
            return undefined;
        state[key] = value;
        return value?.[key];
    },
    setItem: (key, value) => {
        if (!key)
            return undefined;
        state[key] = value;
        return value?.[key];
    },
    has: (key) => {
        if (!key)
            return false;
        return Object.prototype.hasOwnProperty.call(state, key);
    },
    hasItem: (key) => {
        if (!key)
            return false;
        return Object.prototype.hasOwnProperty.call(state, key);
    },
    remove: (key) => {
        if (!key)
            return false;
        const exists = Object.prototype.hasOwnProperty.call(state, key);
        if (exists)
            delete state[key];
        return !Object.prototype.hasOwnProperty.call(state, key);
    },
    removeItem: (key) => {
        if (!key)
            return false;
        const exists = Object.prototype.hasOwnProperty.call(state, key);
        if (exists)
            delete state[key];
        return !Object.prototype.hasOwnProperty.call(state, key);
    },
};
export default signalStorage;
//# sourceMappingURL=signalStorage.js.map