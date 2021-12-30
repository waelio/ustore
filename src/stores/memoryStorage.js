let memoryStore = {};
export const memoryStorage = {
    get: (key) => memoryStore[key],
    set: (key, value) => {
        memoryStore[key] = value;
        return true;
    },
    remove: (key) => {
        delete memoryStore[key];
        return true;
    }
};
//# sourceMappingURL=memoryStorage.js.map