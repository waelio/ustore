import { localStorage } from './src/_stores/localStorage';
import { sessionStorage } from './src/_stores/sessionStorage';
import { cookieStorage } from './src/_stores/cookieStorage';
import { memoryStorage } from './src/_stores/memoryStorage';
import { vuexStorage } from './src/_stores/vuexStorage';
import { piniaStorage } from './src/_stores/piniaStorage';
import { gunStorage } from './src/_stores/gunStorage';
import { secureStorage } from './src/_stores/secureStorage';
import { configStorage } from './src/_stores/configStorage';
import { idbStorage } from "./src/_stores/idbStorage";
import { webqlStorage } from "./src/_stores/webqlStorage";
import { createPinia, defineStore } from "pinia";
import { createApp } from "vue";

import uStore from './src';

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
export {idbStorage}
export {webqlStorage}

// app = createApp({})
export const app = createApp({});

// pinia = createPinia()
export const pinia = createPinia();

export { defineStore }

app.use(pinia);

if (typeof window !== 'undefined') {
  window['uStore'] = uStore;
} else {
  globalThis['uStore'] = uStore;
}