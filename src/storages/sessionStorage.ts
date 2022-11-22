import store from "store2";
import { IUStoreClass } from "./uStoreStorage";

const session = store.session.namespace("uStore:sessionStorage");
const options = {
  client: true,
  server: true,
  dev: true,
  prod: true,
  plugin: true,
}


export const sessionStorage: IUStoreClass = new IUStoreClass(session?.session, options);

export default sessionStorage;

