
import { createStore } from "vuex";
import {  uStore } from "../.d";
import { StorePlugins } from "../types";
import { app } from './uStoreStorage'
// export type STATE1 = () => {
//   raw: {
//     type: StorePlugins,
//     value: {}
//   }
// }
const vuexStore = createStore({
  state: () => ({
    raw: {
      type: StorePlugins,
      value: {}
    }
  }),
  getters: {
    getMyValue: (state) => state.raw.value,
    store: (state) => state.raw.value,
    type: (state) => state.raw.type,
    getAll: (state) => state.raw.value,
    getItem: (state) => (key: string) => state.raw.value[key],
  },
  mutations: {
    addItem(state, payload) {
      const raw = state.raw.value;
      if (typeof payload === 'object') {
        raw[payload.key] = payload.value;
      } else if (typeof payload === 'string') {
        raw[payload] = payload;
      }
      state.raw.value = raw;
    },
    setItem(state, payload) {
      const raw = state.raw.value;
      if (typeof payload === 'object') {
        raw[payload.key] = payload.value;
      } else if (typeof payload === 'string') {
        raw[payload] = payload;
      }
      state.raw.value = raw;
    },
    removeItem(state, key: string) {
      delete state.raw.value[key]
    },
  },
  strict: true,
});
app.use(vuexStore);



export const vuexStorage: uStore = ({
  get: vuexStore.getters.getAll,

  getItem: (key: string) => vuexStore.getters.getItem(key),
  addItem: (key: string, value: any) => vuexStore.commit("addItem", { key, value }),
  has: (key: string) => vuexStore.getters.getItem(key),
  set: (key: string, value: any) => {
    vuexStore.commit("setItem", { key, value });
  },
  setItem: (key: string, value: any) => {    
    vuexStore.commit("setItem", { key, value });
  },
  removeItem: (key: string) => {
    vuexStore.commit("removeItem", key);
    return true;
  }
});

export default vuexStorage;

