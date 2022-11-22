import { localStorage } from './src/storages';
import { sessionStorage } from './src/storages';
import { cookieStorage } from './src/storages';
import { memoryStorage } from './src/storages';
import { vuexStorage } from './src/storages';
import { piniaStorage } from './src/storages';
import { gunStorage } from './src/storages';
import { secureStorage } from './src/storages';
import { configStorage } from './src/storages';
import { idbStorage } from './src/storages';
import { webqlStorage } from './src/storages';

import uStore from './src';
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