import { localStorage } from './src/index';
import { sessionStorage } from './src/index';
import { cookieStorage } from './src/index';
import { memoryStorage } from './src/index';
import { vuexStorage } from './src/index';
import { piniaStorage } from './src/index';
import { gunStorage } from './src/index';
import { secureStorage } from './src/index';
import { configStorage } from './src/index';
import { idbStorage } from './src/index';
import { webqlStorage } from './src/index';
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