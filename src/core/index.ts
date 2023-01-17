import { ref, unref, computed, Ref } from 'vue'

export class UCORE {
  _STORE: Ref<any> = ref(null);
  constructor(initial = {}) {
    if (initial) {
      this._STORE.value = JSON.stringify(initial[0] === '{') ? JSON.stringify(initial) : initial
    }
  }
  get(key: string = 'undefined') {
    const ls = this._STORE.value
    if(typeof key !== 'undefined') return ls 
    try {
      return ls[key]
    } catch (error) {
      return undefined
    }
  }
  getItem(key: string) {
    if (key.match(/:/)) {
      const keys = key.split(":");
      const storeKey = this._buildNestedKey(keys[0]);
      
      return storeKey[keys[0]][keys[1]]
    }
    return this._STORE.value[key];
  }
  setItem(k: string, v: string | number | object | any[] | boolean) {
    var self = this;
    let ls = self._STORE.value;
    if (k.match(/:/)) {
      const keys = k.split(":");
      if (keys.length > 2) throw new Error("cannot nest more that one layer");

      keys.length /*?*/

      if (keys.length = 2) {
        try {
          ls[keys[0]] = { [keys[0]]: { [keys[1]]: v } }
          self._STORE.value = { ...ls }                 
          return ls[keys[0]]
          
        } catch (error) {
          return 'undefined'          
        }
      }
    }
    // @ts-ignore
    ls = {[k]: v}
    self._STORE.value = {...ls}                 

    return this.getItem(k)
  }
  public set value(v: string) {
    this._STORE.value = JSON.stringify(v[0] === '{') ? JSON.stringify(v) : v;
  }

  public get value(): string {
    return unref(this._STORE.value)
  }
  has(key: string) {
    return Boolean(this.getItem(key));
  }

  _buildNestedKey(nestedKey: string) {
    const keys = nestedKey.split(":");
    let storeKey = this._STORE.value;

    keys.forEach(function (k: string) {
      try {
        storeKey = storeKey[k];
      } catch (e) {
        return undefined;
      }
    });

    return storeKey;
  }
}


export {
  ref,
  computed,
}
