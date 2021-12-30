import { createStore } from 'vuex';
const vuexStore = createStore({
    state() {
        return {
            myValue: '',
        };
    },
    mutations: {
        setMyValue(state, value) {
            if (typeof value === 'string') {
                state.myValue = value;
            }
            else if (typeof value === 'object') {
                Object.keys(value).forEach((key) => {
                    state.myValue = value[key];
                });
            }
        }
    },
    getters: {
        getMyValue(state) {
            return state.myValue;
        }
    },
    strict: true
});
export const vuexStorage = {
    get: (key) => vuexStore.getters.getMyValue,
    set: (key, value) => {
        return vuexStore.commit('setMyValue', { key: value });
    }
};
//# sourceMappingURL=vuexStorage.js.map