import { _reParseString } from "waelio-utils";
import { setMapStoreSuffix } from 'pinia';
import { createPinia, defineStore } from "pinia";
import { createApp } from "vue";
export const app = createApp({});
const pinia = createPinia();
app.use(pinia);
setMapStoreSuffix('');
const useStore = defineStore("piniaStorage", {
    state: () => ({
        raw: "",
    }),
    getters: {
        get: (state) => _reParseString(state.raw),
    },
    actions: {
        add(k) {
            this.raw = k;
        },
        remove(state) {
            state.raw = undefined;
        },
    },
});
const pn_storage = useStore();
export const piniaStorage = {
    get: () => pn_storage.get,
    set: (value) => {
        pn_storage.add(value);
    },
    remove: () => pn_storage.remove,
};
export default piniaStorage;
//# sourceMappingURL=piniaStorage.js.map