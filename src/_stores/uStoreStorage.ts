import { createApp } from "vue";

import { memoryStorage } from "./memoryStorage";
import { secureStorage } from "./secureStorage";
import { sessionStorage } from "./sessionStorage";
import { configStorage } from "./configStorage";
import { cookieStorage } from "./cookieStorage";
import { gunStorage } from "./gunStorage";
import { idbStorage } from "./idbStorage";
import { localStorage } from "./localStorage";
import { piniaStorage } from "./piniaStorage";
import { vuexStorage } from "./vuexStorage";
import { webqlStorage } from "./webqlStorage";

export const app = createApp({});
export { createApp };

export const uStoreStorage = {
  config: configStorage,
  cookie: cookieStorage,
  gun: gunStorage,
  idb: idbStorage,
  local: localStorage,
  memory: memoryStorage,
  pinia: piniaStorage,
  secure: secureStorage,
  session: sessionStorage,
  vuex: vuexStorage,
  wql: webqlStorage,
};
export default uStoreStorage;
