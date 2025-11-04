import { localStorage } from "./_stores/localStorage";
import { sessionStorage } from "./_stores/sessionStorage";
import { cookieStorage } from "./_stores/cookieStorage";
import { memoryStorage } from "./_stores/memoryStorage";
import { vuexStorage } from "./_stores/vuexStorage";
import { piniaStorage } from "./_stores/piniaStorage";
import { gunStorage } from "./_stores/gunStorage"; // avoid eager import for node ESM
import { secureStorage } from "./_stores/secureStorage";
import { configStorage } from "./_stores/configStorage";
import { signalStorage } from "./_stores/signalStorage";

export type Tconfig = typeof configStorage;
export type Tcookie = typeof cookieStorage;
export type Tlocal = typeof localStorage;
export type Tmemory = typeof memoryStorage;
export type Tpinia = typeof piniaStorage;
export type Tsecure = typeof secureStorage;
export type Tsession = typeof sessionStorage;
export type Tvuex = typeof vuexStorage;
export type Tsignal = typeof signalStorage;

export type TypeUstoreNode = {
  config: Tconfig;
  cookie: Tcookie;
  gun?: any; // intentionally omitted in native Node ESM entry
  local: Tlocal;
  memory: Tmemory;
  pinia: Tpinia;
  secure: Tsecure;
  session: Tsession;
  vuex: Tvuex;
  signal: Tsignal;
};

// Provide a safe placeholder for gun to avoid import-time failures in Node ESM
const gunPlaceholder: any = new Proxy(
  {},
  {
    get() {
      throw new Error(
        "uStore.gun is unavailable in native Node ESM entry. Use CommonJS require() or a bundler to access Gun storage."
      );
    },
    apply() {
      throw new Error(
        "uStore.gun is unavailable in native Node ESM entry. Use CommonJS require() or a bundler to access Gun storage."
      );
    },
  }
);

export const uStore: TypeUstoreNode & { gun: any } = {
  config: configStorage,
  cookie: cookieStorage,
  // expose placeholder to keep shape
  gun: gunPlaceholder,
  local: localStorage,
  memory: memoryStorage,
  pinia: piniaStorage,
  secure: secureStorage,
  session: sessionStorage,
  vuex: vuexStorage,
  signal: signalStorage,
};

export default uStore;

export { localStorage };
export { sessionStorage };
export { cookieStorage };
export { memoryStorage };
export { vuexStorage };
export { gunStorage };
export { secureStorage };
export { configStorage };
export { signalStorage };

if (typeof window !== "undefined") {
  (window as any)["uStore"] = uStore;
} else {
  (globalThis as any)["uStore"] = uStore;
}
