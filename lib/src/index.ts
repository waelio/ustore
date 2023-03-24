import { localStorage } from "./_stores/localStorage";
import { sessionStorage } from "./_stores/sessionStorage";
import { cookieStorage } from "./_stores/cookieStorage";
import { memoryStorage } from "./_stores/memoryStorage";
import { vuexStorage } from "./_stores/vuexStorage";
import { piniaStorage } from "./_stores/piniaStorage";
import { gunStorage } from "./_stores/gunStorage";
import { secureStorage } from "./_stores/secureStorage";
import { configStorage } from "./_stores/configStorage";
import { idbStorage } from "./_stores/idbStorage";
import { webqlStorage } from "./_stores/webqlStorage";
import { signalStorage } from "./_stores/signalStorage";

export type Tconfig = typeof configStorage;
export type Tcookie = typeof cookieStorage;
export type Tgun = typeof gunStorage;
export type Tlocal = typeof localStorage;
export type Tmemory = typeof memoryStorage;
export type Tpinia = typeof piniaStorage;
export type Tsecure = typeof secureStorage;
export type Tsession = typeof sessionStorage;
export type Tvuex = typeof vuexStorage;
export type Tidb = typeof idbStorage;
export type Twebql = typeof webqlStorage;
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
  idb: Tidb;
  webql: Twebql;
  signal: Tsignal;
};

export const uStore: TypeUstore = {
  config: configStorage,
  cookie: cookieStorage,
  gun: gunStorage,
  local: localStorage,
  memory: memoryStorage,
  pinia: piniaStorage,
  secure: secureStorage,
  session: sessionStorage,
  vuex: vuexStorage,
  idb: idbStorage,
  webql: webqlStorage,
  signal: signalStorage,
};

export default uStore;

export { localStorage };
export { sessionStorage };
export { cookieStorage };
export { memoryStorage };
export { vuexStorage };
// export { piniaStorage };
export { gunStorage };
export { secureStorage };
export { configStorage };
export { idbStorage };
export { webqlStorage };
export { signalStorage };

if (typeof window !== "undefined") {
  window["uStore"] = uStore;
} else {
  globalThis["uStore"] = uStore;
}
