import storeTwo from "store2";
const local = storeTwo.namespace("uStore");
export const localStorage = {
    get: (key) => {
        try {
            return local.get(key);
        }
        catch (error) {
            return error || null;
        }
    },
    getItem: (key) => {
        try {
            return local.get(key);
        }
        catch (error) {
            return error || null;
        }
    },
    has: (key) => {
        try {
            return Boolean(local.get(key));
        }
        catch (error) {
            return error || null;
        }
    },
    hasItem: (key) => {
        try {
            return Boolean(local.get(key));
        }
        catch (error) {
            return error || null;
        }
    },
    set: (key, value) => {
        try {
            return local.set(key, value);
        }
        catch (error) {
            return error || null;
        }
    },
    setItem: (key, value) => {
        try {
            return local.set(key, value);
        }
        catch (error) {
            return error || null;
        }
    },
    remove: (key) => {
        try {
            return local.remove(key);
        }
        catch (error) {
            return error || null;
        }
    },
    removeItem: (key) => {
        try {
            return local.remove(key);
        }
        catch (error) {
            return error || null;
        }
    },
};
export default localStorage;
//# sourceMappingURL=localStorage.js.map