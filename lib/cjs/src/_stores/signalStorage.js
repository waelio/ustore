"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signalStorage = exports.getSignal = void 0;
const solid_js_1 = require("solid-js");
const waelio_utils_1 = require("waelio-utils");
function getSignal(T) {
    if (T && (0, waelio_utils_1.isObject)(T)) {
        const [payload, setPayload] = (0, solid_js_1.createSignal)(T, { equals: false });
        return {
            payload: payload,
            setPayload: setPayload,
        };
    }
    const [payload, setPayload] = (0, solid_js_1.createSignal)(T, { equals: false });
    return {
        payload: payload,
        setPayload: setPayload,
    };
}
exports.getSignal = getSignal;
exports.signalStorage = {
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
                if (current && (0, waelio_utils_1.isObject)(current)) {
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
                if (current && (0, waelio_utils_1.isObject)(current)) {
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
                if (current && (0, waelio_utils_1.isObject)(current)) {
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
                if (current && (0, waelio_utils_1.isObject)(current)) {
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
exports.default = exports.signalStorage;
//# sourceMappingURL=signalStorage.js.map