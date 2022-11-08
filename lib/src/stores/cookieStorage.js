const isReady = Boolean(typeof window !== "undefined");
export let memoryStore = {};
export const cookieStorage = {
    get: (key) => {
        try {
            return !isReady
                ? memoryStore[key]
                : window.document.cookie
                    .split(";")
                    .find((item) => item.split("=")[0] === key);
        }
        catch (error) {
            return error || null;
        }
    },
    set: (key, value) => {
        try {
            const payload = {};
            payload[key] = value;
            return !isReady
                ? (memoryStore = payload)
                : (window.document.cookie = `${key}=${value}`);
        }
        catch (error) {
            return error || null;
        }
    },
    remove: (key) => {
        try {
            return !isReady
                ? (memoryStore = { ...{ key: null } })
                : (window.document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`);
        }
        catch (error) {
            return error || null;
        }
    },
};
export default cookieStorage;
//# sourceMappingURL=cookieStorage.js.map