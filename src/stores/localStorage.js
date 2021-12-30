export const localStorage = {
    get: (key) => {
        try {
            return window.localStorage.getItem(key);
        }
        catch (error) {
            return error.message ? error.message : error;
        }
    },
    set: (key, value) => {
        try {
            window.localStorage.setItem(key, value);
            return true;
        }
        catch (error) {
            return error.message ? error.message : error;
        }
    },
    remove: (key) => {
        try {
            window.localStorage.removeItem(key);
            return true;
        }
        catch (error) {
            return error.message ? error.message : error;
        }
    }
};
//# sourceMappingURL=localStorage.js.map