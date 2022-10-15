import { UStoreClass } from "../.d";
import { createPinia, defineStore } from "pinia";
import { createApp } from "vue";
export const app = createApp({});
const pinia = createPinia();
app.use(pinia);
const useStore = defineStore("piniaStorage", {
  state: () => ({
    raw: undefined,
  }),
  getters: {
    get: (state): string => state.raw ?? "undefined",
  },
  actions: {
    add(k: any) {
      return (this.raw = k);
    },
    remove() {
      return (this.raw = undefined);
    },
  },
});
const pn_storage = useStore();
export const piniaStorage: UStoreClass = ({
  get: () => pn_storage.get ?? "undefined",
  set: (value: any) => pn_storage.add(value),
  remove: () => pn_storage.remove,
});
export default piniaStorage;
