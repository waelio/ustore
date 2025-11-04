"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieStorage = exports.memoryStore = void 0;
const isReady = typeof window !== "undefined";
exports.memoryStore = {};
exports.cookieStorage = {
    get: (key) => {
        try {
            if (!isReady) {
                return exports.memoryStore[key] ?? false;
            }
            const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
            const cookie = cookies.find((item) => item.startsWith(`${key}=`));
            return cookie ? cookie : false;
        }
        catch (error) {
            console.error("Error in get method:", error);
            return false;
        }
    },
    getItem: (key) => {
        try {
            if (!isReady) {
                return exports.memoryStore[key] ?? false;
            }
            const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
            const cookie = cookies.find((item) => item.startsWith(`${key}=`));
            return cookie ? cookie : false;
        }
        catch (error) {
            console.error("Error in getItem method:", error);
            return false;
        }
    },
    set: (key, value) => {
        try {
            if (!isReady) {
                exports.memoryStore[key] = `${key}=${value}`;
                return;
            }
            document.cookie = `${key}=${value}; path=/;`;
        }
        catch (error) {
            console.error("Error in set method:", error);
        }
    },
    setItem: (key, value) => {
        try {
            if (!isReady) {
                exports.memoryStore[key] = `${key}=${value}`;
                return;
            }
            document.cookie = `${key}=${value}; path=/;`;
        }
        catch (error) {
            console.error("Error in setItem method:", error);
        }
    },
    remove: (key) => {
        try {
            if (!isReady) {
                delete exports.memoryStore[key];
                return;
            }
            document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
        catch (error) {
            console.error("Error in remove method:", error);
        }
    },
    removeItem: (key) => {
        try {
            if (!isReady) {
                delete exports.memoryStore[key];
                return;
            }
            document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
        catch (error) {
            console.error("Error in removeItem method:", error);
        }
    },
    has: (key) => {
        try {
            if (!isReady) {
                return key in exports.memoryStore;
            }
            const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
            return cookies.some((item) => item.startsWith(`${key}=`));
        }
        catch (error) {
            console.error("Error in has method:", error);
            return false;
        }
    },
    hasItem: (key) => {
        try {
            if (!isReady) {
                return key in exports.memoryStore;
            }
            const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
            return cookies.some((item) => item.startsWith(`${key}=`));
        }
        catch (error) {
            console.error("Error in hasItem method:", error);
            return false;
        }
    },
};
exports.default = exports.cookieStorage;
//# sourceMappingURL=cookieStorage.js.map