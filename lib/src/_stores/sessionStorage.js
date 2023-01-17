import store from "store2";
const session = store.session.namespace("uStore:sessionStorage");
export const sessionStorage = {
    get: (key) => session.getAll,
    getItem: (key) => session.get(key),
    set: (key, value) => session.set(key, value),
    setItem: (key, value) => session.set(key, value),
    has: (key) => Boolean(session.get(key)),
    remove: (key) => session.remove(key),
};
export default sessionStorage;
//# sourceMappingURL=sessionStorage.js.map