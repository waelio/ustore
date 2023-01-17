import storeTwo from "store2";
;
const store = storeTwo.namespace("uStore:localStorage");
export const localStorage = {
    get: (key) => {
        try {
            return store.get(key);
        }
        catch (error) {
            return error || null;
        }
    },
    set: (key, value) => {
        try {
            return store.set(key, value);
        }
        catch (error) {
            return error || null;
        }
    },
    has: (key) => {
        try {
            return Boolean(store.has(key));
        }
        catch (error) {
            return false;
        }
    },
    remove: (key) => {
        try {
            return store.remove(key);
        }
        catch (error) {
            return error || null;
        }
    },
};
export default localStorage;
//# sourceMappingURL=localStorage.js.map