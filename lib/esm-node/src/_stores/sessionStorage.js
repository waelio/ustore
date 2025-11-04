import store from "store2";
const session = store.session.namespace("uStore");
export const sessionStorage = {
    get: (key) => session.get(key),
    getItem: (key) => session.get(key),
    has: (key) => !!session.get(key),
    hasItem: (key) => !!session.get(key),
    set: (key, value) => session.set(key, value),
    setItem: (key, value) => session.set(key, value),
    remove: (key) => session.remove(key),
    removeItem: (key) => session.remove(key),
};
export default sessionStorage;
//# sourceMappingURL=sessionStorage.js.map