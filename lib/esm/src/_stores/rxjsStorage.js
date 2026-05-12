import { BehaviorSubject } from "rxjs";
export const state = new BehaviorSubject({});
export const rxjsStorage = {
    get: (key) => {
        if (!key)
            return null;
        return state.getValue()[key] ?? null;
    },
    getItem: (key) => {
        if (!key)
            return null;
        return state.getValue()[key] ?? null;
    },
    set: (key, value) => {
        if (!key)
            return undefined;
        const currentState = state.getValue();
        state.next({ ...currentState, [key]: value });
        return value?.[key] ?? value;
    },
    setItem: (key, value) => {
        if (!key)
            return undefined;
        const currentState = state.getValue();
        state.next({ ...currentState, [key]: value });
        return value?.[key] ?? value;
    },
    has: (key) => {
        if (!key)
            return false;
        return Object.prototype.hasOwnProperty.call(state.getValue(), key);
    },
    hasItem: (key) => {
        if (!key)
            return false;
        return Object.prototype.hasOwnProperty.call(state.getValue(), key);
    },
    remove: (key) => {
        if (!key)
            return false;
        const currentState = state.getValue();
        const exists = Object.prototype.hasOwnProperty.call(currentState, key);
        if (exists) {
            const newState = { ...currentState };
            delete newState[key];
            state.next(newState);
        }
        return !Object.prototype.hasOwnProperty.call(state.getValue(), key);
    },
    removeItem: (key) => {
        if (!key)
            return false;
        const currentState = state.getValue();
        const exists = Object.prototype.hasOwnProperty.call(currentState, key);
        if (exists) {
            const newState = { ...currentState };
            delete newState[key];
            state.next(newState);
        }
        return !Object.prototype.hasOwnProperty.call(state.getValue(), key);
    },
};
export default rxjsStorage;
//# sourceMappingURL=rxjsStorage.js.map