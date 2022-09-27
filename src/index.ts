import { localStorage } from './stores/localStorage';
import { sessionStorage } from './stores/sessionStorage';
import { cookieStorage } from './stores/cookieStorage';
import { memoryStorage } from './stores/memoryStorage';
import { vuexStorage } from './stores/vuexStorage';
import { piniaStorage } from './stores/piniaStorage';
import { gunStorage } from './stores/gunStorage';
// import { StorePlugins } from './types';

const uStore = () => ({
  local: localStorage,
  session: sessionStorage,
  cookie: cookieStorage,
  memory: memoryStorage,
  vuex: vuexStorage,
  pinia: piniaStorage,
  gun: gunStorage
});

export { uStore };
export default uStore;

try {
  if (window && !window['uStore']) {
    window['uStore'] = uStore;
  }
} catch (err) {
  console.log('Oops, `window` is not defined');
}
