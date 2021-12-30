export const cookieStorage = {
    get: (key) => {
        try {
            return (window.document.cookie
                .split('; ')
                .find((item) => item.split('=')[0] === key));
        }
        catch (error) {
            return error.message ? error.message : error;
        }
    },
    set: (key, value) => {
        try {
            window.document.cookie = `${key}=${value}`;
            return true;
        }
        catch (error) {
            return error.message ? error.message : error;
        }
    },
    remove: (key) => {
        try {
            window.document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
            return true;
        }
        catch (error) {
            return error.message ? error.message : error;
        }
    }
};
//# sourceMappingURL=cookieStorage.js.map