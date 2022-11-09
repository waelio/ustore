import { localStorage } from "./stores/localStorage";
import { sessionStorage } from "./stores/sessionStorage";
import { cookieStorage } from "./stores/cookieStorage";
import { memoryStorage } from "./stores/memoryStorage";
import { vuexStorage } from "./stores/vuexStorage";
import { piniaStorage } from "./stores/piniaStorage";
import { gunStorage } from "./stores/gunStorage";
import { secureStorage } from "./stores";
import { configStorage } from "./stores";

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
};

export default uStore;

export { localStorage };
export { sessionStorage };
export { cookieStorage };
export { memoryStorage };
export { vuexStorage };
export { piniaStorage };
export { gunStorage };
export { secureStorage };
export { configStorage };

if (typeof window !== "undefined") {
  window["uStore"] = uStore;
} else {
  globalThis["uStore"] = uStore;
}
