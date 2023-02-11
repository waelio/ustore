import { createApp } from "vue";
import { createStore } from "vuex";
export const app = createApp({});
const vuexStore = createStore({
    state: () => ({
        myValue: "",
    }),
    mutations: {
        setMyValue(state, value) {
            if (typeof value === "string") {
                state.myValue = value;
            }
            else if (typeof value === "object") {
                Object.keys(value).forEach((key) => {
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
        getMyValue: (state) => state.myValue,
    },
    strict: true,
});
export const vuexStorage = ({
    get: () => vuexStore.getters.getMyValue,
    has: () => !!vuexStore.getters.getMyValue,
    add: (key, value) => {
        const payload = new Object();
        payload[key] = value;
        return vuexStore.commit("setMyValue", payload);
    },
    set: (key, value) => {
        const payload = new Object();
        payload[key] = value;
        return vuexStore.commit("setMyValue", payload);
    },
    setItem: (key, value) => {
        let payload = new Object();
        payload[key] = value;
        return vuexStore.commit("setMyValue", payload);
    },
    removeItem: (key) => {
        const payload = new Object();
        payload[key] = null;
        return vuexStore.commit("setMyValue", payload);
    },
});
export default vuexStorage;
//# sourceMappingURL=vuexStorage.js.map