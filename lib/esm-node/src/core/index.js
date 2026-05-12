export class UCORE {
    constructor(initial = {}) {
        this._STORE = null;
        if (initial && typeof initial === "object") {
            this._STORE = initial;
        }
        else {
            throw new Error("Initial value must be an object");
        }
    }
    get(key) {
        const ls = this._STORE;
        if (!key)
            return ls;
        try {
            return ls[key];
        }
        catch (error) {
            return undefined;
        }
    }
    getItem(key) {
        if (key.includes(":")) {
            const keys = key.split(":");
            const storeKey = this._buildNestedKey(keys[0]);
            return storeKey ? storeKey[keys[1]] : undefined;
        }
        return this._STORE[key];
    }
    setItem(k, val) {
        let ls = this._STORE;
        if (k.includes(":")) {
            const keys = k.split(":");
            if (keys.length !== 2)
                throw new Error("Cannot nest more than one layer");
            if (!ls[keys[0]]) {
                ls[keys[0]] = {};
            }
            ls[keys[0]][keys[1]] = val;
        }
        else {
            ls[k] = val;
        }
        this._STORE = { ...ls };
        return this.getItem(k);
    }
    removeItem(k) {
        if (!k)
            throw new Error("Key is needed");
        let ls = this._STORE;
        if (k.includes(":")) {
            const keys = k.split(":");
            if (keys.length !== 2)
                throw new Error("Cannot nest more than one layer");
            if (ls[keys[0]]) {
                delete ls[keys[0]][keys[1]];
                if (Object.keys(ls[keys[0]]).length === 0) {
                    delete ls[keys[0]];
                }
            }
        }
        else {
            delete ls[k];
        }
        this._STORE = { ...ls };
        return !this.getItem(k);
    }
    set value(v) {
        if (typeof v === "object") {
            this._STORE = v;
        }
        else {
            throw new Error("Value must be an object");
        }
    }
    get value() {
        return this._STORE;
    }
    has(key) {
        return this.getItem(key) !== undefined;
    }
    _buildNestedKey(nestedKey) {
        const keys = nestedKey.split(":");
        let storeKey = this._STORE;
        for (const k of keys) {
            if (storeKey && storeKey[k] !== undefined) {
                storeKey = storeKey[k];
            }
            else {
                return undefined;
            }
        }
        return storeKey;
    }
}
//# sourceMappingURL=index.js.map