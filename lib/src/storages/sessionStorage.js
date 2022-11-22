import store from "store2";
import { IUStoreClass } from "./uStoreStorage";
const session = store.session.namespace("uStore:sessionStorage");
const options = {
    client: true,
    server: true,
    dev: true,
    prod: true,
    plugin: true,
};
export const sessionStorage = new IUStoreClass(session === null || session === void 0 ? void 0 : session.session, options);
export default sessionStorage;
//# sourceMappingURL=sessionStorage.js.map