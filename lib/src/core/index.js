import { ref, unref, computed } from 'vue';
export class UCORE {
    constructor(initial = {}) {
        this._STORE = ref(null);
        if (initial) {
            this._STORE.value = JSON.stringify(initial[0] === '{') ? JSON.stringify(initial) : initial;
        }
    }
    get(key = 'undefined') {
        const ls = this._STORE.value;
        if (typeof key !== 'undefined')
            return ls;
        try {
            return ls[key];
        }
        catch (error) {
            return undefined;
        }
    }
    getItem(key) {
        if (key.match(/:/)) {
            const keys = key.split(":");
            const storeKey = this._buildNestedKey(keys[0]);
            return storeKey[keys[0]][keys[1]];
        }
        return this._STORE.value[key];
    }
    setItem(k, v) {
        var self = this;
        let ls = self._STORE.value;
        if (k.match(/:/)) {
            const keys = k.split(":");
            if (keys.length > 2)
                throw new Error("cannot nest more that one layer");
            keys.length;
            if (keys.length = 2) {
                try {
                    ls[keys[0]] = { [keys[0]]: { [keys[1]]: v } };
                    self._STORE.value = Object.assign({}, ls);
                    return ls[keys[0]];
                }
                catch (error) {
                    return 'undefined';
                }
            }
        }
        ls = { [k]: v };
        self._STORE.value = Object.assign({}, ls);
        return this.getItem(k);
    }
    set value(v) {
        this._STORE.value = JSON.stringify(v[0] === '{') ? JSON.stringify(v) : v;
    }
    get value() {
        return unref(this._STORE.value);
    }
    has(key) {
        return Boolean(this.getItem(key));
    }
    _buildNestedKey(nestedKey) {
        const keys = nestedKey.split(":");
        let storeKey = this._STORE.value;
        keys.forEach(function (k) {
            try {
                storeKey = storeKey[k];
            }
            catch (e) {
                return undefined;
            }
        });
        return storeKey;
    }
}
export { ref, computed, };
//# sourceMappingURL=index.js.map