import { localStorage } from "./_stores/localStorage";
import { sessionStorage } from "./_stores/sessionStorage";
import { cookieStorage } from "./_stores/cookieStorage";
import { memoryStorage } from "./_stores/memoryStorage";
import { vuexStorage } from "./_stores/vuexStorage";
import { piniaStorage } from "./_stores/piniaStorage";
import { gunStorage } from "./_stores/gunStorage";
import { secureStorage } from "./_stores";
import { configStorage } from "./_stores/configStorage";

export type TypeUstore = {
  config: typeof configStorage;
  cookie: typeof cookieStorage;
  gun: typeof gunStorage;
  local: typeof localStorage;
  memory: typeof memoryStorage;
  pinia: typeof piniaStorage;
  secure: typeof secureStorage;
  session: typeof sessionStorage;
  vuex: typeof vuexStorage;
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
// export { configStorage };

if (typeof window !== "undefined") {
  window["uStore"] = uStore;
} else {
  globalThis["uStore"] = uStore;
}
