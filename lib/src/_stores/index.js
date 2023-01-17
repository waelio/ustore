import { configStorage } from "./configStorage";
import { cookieStorage } from "./cookieStorage";
import { idbStorage } from "./idbStorage";
import { gunStorage } from "./gunStorage";
import { localStorage } from "./localStorage";
import { memoryStorage } from "./memoryStorage";
import { piniaStorage } from "./piniaStorage";
import { secureStorage } from "./secureStorage";
import { sessionStorage } from "./sessionStorage";
import { vuexStorage } from "./vuexStorage";
import { webqlStorage } from "./webqlStorage";
import { uStoreStorage as uStore } from "./uStoreStorage";
import { createPinia } from "pinia";
import { defineStore } from "pinia";
import { createApp } from "./uStoreStorage";
import * as store from "store2";
import * as vue from "vue";
import * as vuex from "vuex";
import * as pinia from "pinia";
import * as gun from "gun";
export const app = createApp({});
export { createPinia };
export { defineStore };
import { _decrypt, _encrypt } from "waelio-utils";
export { uStore };
export default uStore;
export { memoryStorage };
export { secureStorage };
export { sessionStorage };
export { configStorage };
export { cookieStorage };
export { gunStorage };
export { idbStorage };
export { localStorage };
export { piniaStorage };
export { vuexStorage };
export { webqlStorage };
export { store };
export { vue };
export { vuex };
export { pinia };
export { gun };
export { _encrypt };
export { _decrypt };
if (typeof window !== "undefined") {
    window["uStore"] = uStore;
}
else {
    globalThis["uStore"] = uStore;
}
//# sourceMappingURL=index.js.map