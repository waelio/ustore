import { UniversalStoreClass } from '../.d';
import { createApp } from 'vue';
import { createStore } from 'vuex';
export const app = createApp({});

export interface _possibleStateValues {
  [key: string]: () =>
    | string
    | number
    | boolean
    | object
    | []
    | null
    | undefined;
}
export interface _state {
  [key: string]:
    | _possibleStateValues
    | string
    | number
    | boolean
    | object
    | []
    | null
    | undefined;
}
export const vuexStore = createStore({
  state: (): _state => ({
    myValue: ''
  }),
  mutations: {
    setMyValue(
      state: typeof vuexStore.state,
      value: string | { [key: string]: string }
    ): void {
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
      return state.myValue;
    }
  },
  strict: true
});
export const vuexStorage: UniversalStoreClass = {
  get: (key: string) => vuexStore.getters.getMyValue,
  set: (key: string, value: any) => {
    return vuexStore.commit('setMyValue', { key: value });
  }
};
app.use(vuexStore);
