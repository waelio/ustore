import { localStorage } from './src/stores/localStorage';
import { sessionStorage } from './src/stores/sessionStorage';
import { cookieStorage } from './src/stores/cookieStorage';
import { memoryStorage } from './src/stores/memoryStorage';
import { vuexStorage } from './src/stores/vuexStorage';
import { piniaStorage } from './src/stores/piniaStorage';
import { gunStorage } from './src/stores/gunStorage';
import { secureStorage } from './src/stores/secureStorage';
import { configStorage } from './src/stores/configStorage';

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


if (typeof window !== 'undefined') {
  window['uStore'] = uStore;
} else {
  globalThis['uStore'] = uStore;
}