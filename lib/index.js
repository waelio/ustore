import { localStorage } from './src/stores';
import { sessionStorage } from './src/stores';
import { cookieStorage } from './src/stores';
import { memoryStorage } from './src/stores';
import { vuexStorage } from './src/stores';
import { piniaStorage } from './src/stores';
import { gunStorage } from './src/stores';
import { secureStorage } from './src/stores';
import { configStorage } from './src/stores';
import { idbStorage } from './src/stores';
import { webqlStorage } from './src/stores';
import uStore from './src';
import * as store from 'store2';
import * as vue from "vue";
import * as vuex from "vuex";
import * as pinia from "pinia";
import * as gun from "gun";
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
export { idbStorage };
export { webqlStorage };
export { store };
export { vue };
export { vuex };
export { pinia };
export { gun };
export { _encrypt };
export { _decrypt };
if (typeof window !== 'undefined') {
    window['uStore'] = uStore;
}
else {
    globalThis['uStore'] = uStore;
}
//# sourceMappingURL=index.js.map