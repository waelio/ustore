import { localStorage } from "./localStorage";
import { sessionStorage } from "./sessionStorage";
import { cookieStorage } from "./cookieStorage";
import { memoryStorage } from "./memoryStorage";
import { vuexStorage } from "./vuexStorage";
import { piniaStorage } from "./piniaStorage";
import { createPinia } from "./piniaStorage";
import { defineStore } from "./piniaStorage";
import { createApp } from "./uStoreStorage"; // Vue app
import { gunStorage } from "./gunStorage"; // gunStorage
import { secureStorage } from "./secureStorage"; // Secure storage
import { configStorage } from "./configStorage"; // configStorage
import { Config } from "./configStorage"; // Config class
import { idbStorage } from "./idbStorage"; // IndexedDB storage
import { webqlStorage } from "./webqlStorage"; // WebQL storage

export const app = createApp({});


export { createPinia };
export { defineStore };
export { createApp };
export { Config };



import uStore from './uStoreStorage';
import * as store from 'store2';
import * as vue from "vue"
import * as vuex from "vuex"
import * as pinia from "pinia"
import * as gun from "gun"
import { _decrypt, _encrypt } from 'waelio-utils';

export { uStore };
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
export { idbStorage }
export { webqlStorage }
// Externals
export { store }
export { vue }
export { vuex }
export { pinia }
export { gun }
export { _encrypt }
export { _decrypt }




if (typeof window !== 'undefined') {
  window['uStore'] = uStore;
} else {
  globalThis['uStore'] = uStore;
}