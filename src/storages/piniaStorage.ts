import { createPinia, defineStore, setMapStoreSuffix } from "pinia";

import { IUStoreClassInterface } from "../.d";
import { StorePlugins } from "../types";
import { app, IUStoreClass } from './uStoreStorage'
const pinia = createPinia();
setMapStoreSuffix('')

app.use(pinia);

export const usePiniaStore = defineStore("data", {
  state: () => ({
    raw: {
      type: StorePlugins,
      value: {}
    }
  }),
  getters: {
    store: function () {
      return () => this.raw.value;
    },
    type: function () {
      return () => this.raw.type;
    }
  },
  actions: {
    get() {
      return this.raw.value
    },
    getIem(key: string) {
      return this.raw.value[key]
    },
    addItem(key: string, value: any): void {
      const raw = this.raw.value;
      raw[key] = value;
      this.raw.value = raw;
    },
    setIem(key: string, value: unknown) {
      this.raw.value[key] = value;
    },
    removeItem(key: string) {
      delete this.raw.value[key]
    },
  },
})
const temp_store = usePiniaStore()
const options = {
  client: true,
  server: true,
  dev: true,
  prod: true,
  plugin: true,
}

export const piniaStorage = new IUStoreClass(temp_store?.store, options);
export default piniaStorage as IUStoreClassInterface;
export { createPinia, defineStore };
