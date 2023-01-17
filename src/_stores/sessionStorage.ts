import store from "store2";
import { IuStore } from "../.d";

const session = store.session.namespace("uStore:sessionStorage");
export const sessionStorage: IuStore = {
  get: (key: string) => session.getAll,
  getItem: (key: string) => session.get(key),
  set: (key: string, value: any) => session.set(key, value),
  setItem: (key: string, value: any) => session.set(key, value),
  has: (key: string) => Boolean(session.get(key)),
  remove: (key: string) => session.remove(key),
};
export default sessionStorage;
