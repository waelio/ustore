import store from "store2";
const session = store.session.namespace("uStore:sessionStorage");
export const sessionStorage = {
    get: (key) => session.get(key),
    set: (key, value) => session.set(key, value),
    remove: (key) => session.remove(key),
};
export default sessionStorage;
//# sourceMappingURL=sessionStorage.js.map