import { localStorage } from "./localStorage";
import { sessionStorage } from "./sessionStorage";
import { cookieStorage } from "./cookieStorage";
import { memoryStorage } from "./memoryStorage";
import { vuexStorage } from "./vuexStorage";
import { piniaStorage } from "./piniaStorage";
import {  createPinia} from "./piniaStorage";
import {defineStore } from "./piniaStorage";
import { createApp } from "./uStoreStorage";// Vue app
import { gunStorage } from "./gunStorage"; // gunStorage
import { secureStorage } from "./secureStorage"; // Secure storage
import { configStorage } from "./configStorage"; // configStorage
import { Config } from "./configStorage"; // Config class
import { idbStorage } from "./idbStorage";  // IndexedDB storage
import { webqlStorage } from "./webqlStorage"; // WebQL storage

export const app = createApp({});

export { localStorage }
export { sessionStorage }
export { cookieStorage }
export { memoryStorage }
export { vuexStorage }
export { piniaStorage }
export { createPinia }
export { defineStore };
export { createApp } 
export { gunStorage }
export { secureStorage }
export { configStorage }
export { Config }
export { idbStorage }
export { webqlStorage }