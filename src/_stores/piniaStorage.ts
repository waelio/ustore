// import type { IuStore } from "../.d";
import { createPinia, defineStore } from "pinia";
import { createApp } from "vue";
import { _reParseString } from "waelio-utils";

export const app = createApp({});
const pinia = createPinia();
app.use(pinia);
export type _State = {
  raw: any;
};

// type Getters = {
//   get: (state?: _State) => string;
// };

// type Actions = {
//   add: (k: string) => void;
//   remove: () => undefined;
// };
const useStore = defineStore("piniaStorage", {
  state: () => ({
    raw: "",
  }),
  getters: {
    get: (state) => _reParseString(state.raw),
  },
  actions: {
    add(k: any): void {
      this.raw = k;
    },
    remove(state: any) {
      state.raw = undefined;
    },
  },
});
const pn_storage = useStore();

export const piniaStorage = {
  get: () => pn_storage.get,
  getItem: (key: string) => pn_storage.get[key],
  set: (value: any) => {
    pn_storage.add(value);
  },
  setItem: (key: string, value: any) => {
    pn_storage.add({ [key]: value });
  },
  remove: () => pn_storage.remove,
};
export default piniaStorage;