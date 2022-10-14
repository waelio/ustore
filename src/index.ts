import { localStorage } from './stores/localStorage';
import { sessionStorage } from './stores/sessionStorage';
import { cookieStorage } from './stores/cookieStorage';
import { memoryStorage } from './stores/memoryStorage';
import { vuexStorage } from './stores/vuexStorage';
import { piniaStorage } from './stores/piniaStorage';
import { gunStorage } from './stores/gunStorage';
import { configStorage } from './stores/configStorage';


const uStore = () => ({
  local: localStorage,
  session: sessionStorage,
  cookie: cookieStorage,
  memory: memoryStorage,
  vuex: vuexStorage,
  pinia: piniaStorage,
  gun: gunStorage,
  config: configStorage
});

export { uStore };
export default uStore;

export { localStorage };
export { sessionStorage };
export { cookieStorage };
export { memoryStorage };
export { vuexStorage };
export { piniaStorage };
export { gunStorage };
export { configStorage };

try {
  if (window && !window['uStore']) {
    window['uStore'] = uStore;
  }
} catch (err) {
  console.log('Oops, `window` is not defined');
}
