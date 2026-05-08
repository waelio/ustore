import { localStorage } from "./localStorage";
import { sessionStorage } from "./sessionStorage";
import { cookieStorage } from "./cookieStorage";
import { memoryStorage } from "./memoryStorage";
import { secureStorage } from "./secureStorage";
import { vuexStorage } from "./vuexStorage";
import { piniaStorage } from "./piniaStorage";
import { gunStorage } from "./gunStorage";
import { configStorage } from "./configStorage";
// import { idbStorage } from "./idbStorage";
// import { webqlStorage } from "./webqlStorage";
import { signalStorage } from "./signalStorage";

export type Tlocal = typeof localStorage;
export type Tsession = typeof sessionStorage;
export type Tcookie = typeof cookieStorage;
export type Tmemory = typeof memoryStorage;
export type Tconfig = typeof configStorage;
export type Tgun = typeof gunStorage;
export type Tpinia = typeof piniaStorage;
export type Tsecure = typeof secureStorage;
export type Tvuex = typeof vuexStorage;
// export type Tidb = typeof idbStorage;
// export type Twebql = typeof webqlStorage;
export type Tsignal = typeof signalStorage;

export type TypeUstore = {
  config: Tconfig;
  cookie: Tcookie;
  gun: Tgun;
  local: Tlocal;
  memory: Tmemory;
  pinia: Tpinia;
  secure: Tsecure;
  session: Tsession;
  vuex: Tvuex;
  // idb?: Tidb;
  // webql?: Twebql;
  signal: Tsignal;
};

export const uStore = {
  config: configStorage,
  cookie: cookieStorage,
  gun: gunStorage,
  local: localStorage,
  memory: memoryStorage,
  pinia: piniaStorage,
  secure: secureStorage,
  session: sessionStorage,
  vuex: vuexStorage,
  // idb: idbStorage,
  // webql: webqlStorage,
  signal: signalStorage,
};

export { localStorage };
export { sessionStorage };
export { cookieStorage };
export { memoryStorage };
export { vuexStorage };
export { piniaStorage };
export { gunStorage };
export { secureStorage };
export { configStorage };
// export { idbStorage };
// export { webqlStorage };
export { signalStorage };
