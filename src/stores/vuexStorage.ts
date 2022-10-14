import { UStoreClass } from "../.d";
import { createApp } from "vue";
import { createStore } from "vuex";
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
const vuexStore = createStore({
  state: (): _state => ({
    myValue: "",
  }),
  mutations: {
    setMyValue(
      state: typeof vuexStore.state,
      value: string | { [key: string]: string }
    ): void {
      if (typeof value === "string") {
        state.myValue = value;
      } else if (typeof value === "object") {
        Object.keys(value).forEach((key: string) => {
          state.myValue = value[key];
        });
      }
    },
  },
  getters: {
    getMyValue(state: typeof vuexStore.state) {
      return state.myValue;
    },
  },
  strict: true,
});
app.use(vuexStore);

export const vuexStorage: UStoreClass = {
  get: (key: string) => vuexStore.getters.getMyValue[key],
  set: (key: string, value: any) => {
    const payload = new Object();
    payload[key] = value;
    return vuexStore.commit("setMyValue", payload);
  },
};

export default vuexStorage;
