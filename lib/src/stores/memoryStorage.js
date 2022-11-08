const memoryStore = {};
export const memoryStorage = {
    get: (key) => {
        return memoryStore[key] ? memoryStore[key] : key;
    },
    set: (key, value) => {
        memoryStore[key] = value;
        return true;
    },
    remove: (key) => {
        memoryStore[key] ? delete memoryStore[key] : null;
        return true;
    },
};
export default memoryStorage;
//# sourceMappingURL=memoryStorage.js.map