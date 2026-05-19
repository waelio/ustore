import { UCORE } from "../core/index";
let memoryStore = new UCORE();
export const piniaStorage = {
    get: (key) => {
        return memoryStore.value[key] ? memoryStore.value[key] : key;
    },
    getItem: (key) => {
        return memoryStore.value[key] ? memoryStore.value[key] : key;
    },
    has: (key) => {
        return memoryStore.value[key] ? true : false;
    },
    hasItem: (key) => {
        return memoryStore.value[key] ? true : false;
    },
    set: (key, value) => {
        try {
            return memoryStore.setItem(key, value);
        }
        catch (error) {
            return error;
        }
    },
    setItem: (key, value) => {
        try {
            return memoryStore.setItem(key, value);
        }
        catch (error) {
            return error;
        }
    },
    remove: (key) => {
        return memoryStore.removeItem(key);
    },
    removeItem: (key) => {
        return memoryStore.removeItem(key);
    },
};
export default piniaStorage;
//# sourceMappingURL=piniaStorage.js.map