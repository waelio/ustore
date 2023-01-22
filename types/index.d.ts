import { configStorage } from "./src/_stores/configStorage";
import { cookieStorage } from "./src/_stores/cookieStorage";
import { idbStorage } from "./src/_stores/idbStorage";
import { gunStorage } from "./src/_stores/gunStorage";
import { localStorage } from "./src/_stores/localStorage";
import { memoryStorage } from "./src/_stores/memoryStorage";
import { piniaStorage } from "./src/_stores/piniaStorage";
import { secureStorage } from "./src/_stores/secureStorage";
import { sessionStorage } from "./src/_stores/sessionStorage";
import { vuexStorage } from "./src/_stores/vuexStorage";
import { webqlStorage } from "./src/_stores/webqlStorage";
import { uStoreStorage as uStore } from "./src/_stores/uStoreStorage";
import { createPinia } from "pinia";
import { defineStore } from "pinia";
import * as store from "store2";
import * as vue from "vue";
import * as vuex from "vuex";
import * as pinia from "pinia";
import * as gun from "gun";
export declare const app: vue.App<Element>;
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
//# sourceMappingURL=index.d.ts.map