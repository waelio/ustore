import { UniversalStoreClass } from '../.d';
import { createStore } from 'vuex'

const vuexStore = createStore({
  state() {
    return {
      myValue: '',
    }
  },
  mutations: {
    setMyValue(state: typeof vuexStore.state, value: string | { [key: string]: string }): void {
      if (typeof value === 'string') {
        state.myValue = value;

      } else if (typeof value === 'object') {

        Object.keys(value).forEach((key: string) => {
          state.myValue = value[key];

        });
      }
    }
  },
  getters: {
    getMyValue(state: typeof vuexStore.state) {
      return state.myValue
    }
  },
  strict: true
})
export const vuexStorage: UniversalStoreClass = {
  get: (key: string) => vuexStore.getters.getMyValue,
  set: (key: string, value: any) => {
    return vuexStore.commit('setMyValue', { key: value })
  }
};
