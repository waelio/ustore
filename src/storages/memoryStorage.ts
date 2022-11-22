const memoryStore = {};
const options = {
  client: true,
  server: true,
  dev: true,
  prod: true,
  plugin: true,
}

import { IUStoreClass } from "./uStoreStorage";

export const  memoryStorage = new IUStoreClass(memoryStore, options);
  

export default memoryStorage as IUStoreClass;
