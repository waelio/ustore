import store from "store2";
import { UStoreClass } from "../.d";

const session = store.session.namespace("uStore");
export const sessionStorage: UStoreClass = ({
  get: (key: string) => session.get(key),
  set: (key: string, value: any) => session.set(key, value),
  remove: (key: string) => session.remove(key),
});
export default sessionStorage;
