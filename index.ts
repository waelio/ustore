import { localStorage } from './src/storages/index'
import { sessionStorage } from './src/storages/index';
import { cookieStorage } from './src/storages/index';
import { memoryStorage } from './src/storages/index';
import { vuexStorage } from './src/storages/index';
import { piniaStorage } from './src/storages/index';
import { gunStorage } from './src/storages/index';
import { secureStorage } from './src/storages/index';
import { configStorage } from './src/storages/index';
import { idbStorage } from './src/storages/index';
import { webqlStorage } from './src/storages/index';

import uStore from './src/storages/uStoreStorage';
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