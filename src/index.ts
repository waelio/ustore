import { localStorage } from "./stores/localStorage";
import { sessionStorage } from "./stores/sessionStorage";
import { cookieStorage } from "./stores/cookieStorage";
import { memoryStorage } from "./stores/memoryStorage";
import { vuexStorage } from "./stores/vuexStorage";
import { piniaStorage } from "./stores/piniaStorage";
import { gunStorage } from "./stores/gunStorage";
import { configStorage } from "./stores/configStorage";

export type uStore = {
  local: typeof localStorage;
  session: typeof sessionStorage;
  cookie: typeof cookieStorage;
  memory: typeof memoryStorage;
  vuex: typeof vuexStorage;
  pinia: typeof piniaStorage;
  gun: typeof gunStorage;
  config: typeof configStorage;
};

export const uStore = {
  local: localStorage,
  session: sessionStorage,
  cookie: cookieStorage,
  memory: memoryStorage,
  vuex: vuexStorage,
  pinia: piniaStorage,
  gun: gunStorage,
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
export { configStorage };

if (typeof window !== "undefined") {
  window["uStore"] = uStore;
} else {
  globalThis["uStore"] = uStore;
}
