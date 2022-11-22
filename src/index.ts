import configStorage, { Config } from "./storages/configStorage";
import cookieStorage from "./storages/cookieStorage";
import gunStorage from "./storages/gunStorage";
import idbStorage from "./storages/idbStorage";
import memoryStorage from "./storages/memoryStorage";
import piniaStorage, {
  createPinia,
  defineStore,
} from "./storages/piniaStorage";
import secureStorage from "./storages/secureStorage";
import { vuexStorage } from "./storages/index";
import webqlStorage from "./storages/webqlStorage";
import { localStorage } from "./storages/localStorage";
import { sessionStorage } from "./storages/sessionStorage";

import { app, createApp } from "./storages/uStoreStorage";
export { Config };
export { app };
export { localStorage };
export { sessionStorage };
export { cookieStorage };
export { memoryStorage };
export { vuexStorage };
export { piniaStorage };
export { gunStorage };
export { secureStorage };
export { configStorage };
export { idbStorage };
export { webqlStorage };
export { createPinia, defineStore };
export { createApp };

export type TuStore = {
  local: typeof localStorage;
  session: typeof sessionStorage;
  cookie: typeof cookieStorage;
  memory: typeof memoryStorage;
  vuex: typeof vuexStorage;
  pinia: typeof piniaStorage;
  gun: typeof gunStorage;
  secure: typeof secureStorage;
  config: typeof configStorage;
  idb: typeof idbStorage;
  wsbl: typeof webqlStorage;
};

export const uStore: TuStore = {
  local: localStorage,
  session: sessionStorage,
  cookie: cookieStorage,
  memory: memoryStorage,
  vuex: vuexStorage,
  pinia: piniaStorage,
  gun: gunStorage,
  secure: secureStorage,
  config: configStorage,
  idb: idbStorage,
  wsbl: webqlStorage,
};

export default uStore;

if (typeof window !== "undefined") {
  window["uStore"] = uStore;
} else {
  globalThis["uStore"] = uStore;
}
