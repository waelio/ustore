/* eslint-disable @typescript-eslint/no-explicit-any */
// import { uStore, UStoreClass } from '../.d';
import { createApp } from "vue";
import { createStore } from "vuex";
export const app = createApp({});

//  interface _possibleStateValues {
//   [key: string]: string;
// }
// interface _state {
//   [key: string]: string;
// }
// interface _actions {
//   set: (contetx?: unknown, value?: unknown) => void;
// }
// export interface _getters {
//   getMyValue: (state: _possibleStateValues) => _possibleStateValues;
// }
// type VuexStore = {
//   [x: string]: unknown;
//   state: _state;
//   actions?: _actions;
//   getters: _getters;
// };
const vuexStore = createStore({
  state: () => ({
    myValue: "",
  }),
  mutations: {
    setMyValue(state: any, value: string | { [key: string]: string }): void {
      if (typeof value === "string") {
        state.myValue = value;
      } else if (typeof value === "object") {
        Object.keys(value).forEach((key: string) => {
          state.myValue = value[key];
        });
      }
    },
  },
  actions: {
    set(context, value) {
      context.commit("setMyValue", value);
    },
  },
  getters: {
    getMyValue: (state: any) => state.myValue,
  },
  strict: true,
});

export const vuexStorage = {
  get: () => vuexStore.getters.getMyValue,
  add: (key: string, value: any) => {
    const payload = new Object();
    payload[key] = value;
    return vuexStore.commit("setMyValue", payload);
  },
  set: (key: string, value: any) => {
    const payload = new Object();
    payload[key] = value;
    return vuexStore.commit("setMyValue", payload);
  },
};

export default vuexStorage;
