import { createSignal } from "solid-js";
import { isObject } from "waelio-utils";
export function getSignal(T) {
    if (T && isObject(T)) {
        const [payload, setPayload] = createSignal(T, { equals: false });
        return {
            payload: payload,
            setPayload: setPayload,
        };
    }
    const [payload, setPayload] = createSignal(T, { equals: false });
    return {
        payload: payload,
        setPayload: setPayload,
    };
}
export const signalStorage = {
    get: (key) => {
        if (!key)
            return "Please set a key";
        try {
            const { payload } = getSignal(key);
            return payload();
        }
        catch (error) {
            console.log(error);
            return error;
        }
    },
    getItem: (key) => {
        if (!key)
            return "Please set a key";
        try {
            const { payload } = getSignal(key);
            return payload();
        }
        catch (error) {
            console.log(error);
            return error;
        }
    },
    set: (key, value) => {
        if (!key)
            return "Please set a key";
        const { payload, setPayload } = getSignal({ [key]: value });
        try {
            setPayload((current) => {
                if (current && isObject(current)) {
                    current[key] = value;
                    return current;
                }
                current = value;
                return payload;
            });
        }
        catch (error) {
            console.log(error);
            return false;
        }
    },
    setItem: (key, value) => {
        if (!key)
            return "Please set a key";
        const { payload, setPayload } = getSignal({ [key]: value });
        try {
            setPayload((current) => {
                if (current && isObject(current)) {
                    current[key] = value;
                    return current;
                }
                current = value;
                return payload;
            });
        }
        catch (error) {
            console.log(error);
            return false;
        }
    },
    has: (key) => {
        const { payload } = getSignal(key);
        try {
            return !!payload();
        }
        catch (error) {
            console.log(error);
            return false;
        }
    },
    hasItem: (key) => {
        const { payload } = getSignal(key);
        try {
            return !!payload();
        }
        catch (error) {
            console.log(error);
            return false;
        }
    },
    remove: (key) => {
        const { setPayload } = getSignal(key);
        try {
            return setPayload((current) => {
                if (current && isObject(current)) {
                    current[key] = null;
                    return current;
                }
                current = null;
                return current;
            });
        }
        catch (error) {
            console.log(error);
            return false;
        }
    },
    removeItem: (key) => {
        const { setPayload } = getSignal(key);
        try {
            return setPayload((current) => {
                if (current && isObject(current)) {
                    current[key] = null;
                    return current;
                }
                current = null;
                return current;
            });
        }
        catch (error) {
            console.log(error);
            return false;
        }
    },
};
export default signalStorage;
//# sourceMappingURL=signalStorage.js.map