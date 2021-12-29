export const vuexStorage = {
    get: (key) => state.storage[key],
    set: (key, value) => {
        store.commit('setStorage', { key, value });
        return true;
    }
};
//# sourceMappingURL=vuexStorage.js.map