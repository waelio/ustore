
import { createApp } from "vue";
import { GetAll, GetItem, HasItem, IUStoreClassInterface, RemoveItem, SetItem } from '../.d';

export const app = createApp({});
export { createApp }

export enum STATCSTORESNAMES {
  SERVER = "server",
  CLIENT = "client",
  DEV = "dev",
  PROD = "prod",
}
export type STATCSTORESTYPES = {
  SERVER: Partial<IUStoreClassInterface>
  CLIENT: Partial<IUStoreClassInterface>
  DEV: Partial<IUStoreClassInterface>
  PROD: Partial<IUStoreClassInterface>
}


export class IUStoreClass implements IUStoreClassInterface {
  [x: string]: {};
  _store: any;
  _storage?: any;

  constructor(plugin?: object, options?: any) {
    const _ = this;
    this._server = options?.server as object ? this._server = options.server : {}
    this._client = options?.client as object ? options.client : {
      init: false,
      app: {
        businessName: 'MyTest App',
        businessDomain: 'www.testapp.com',
        businessAddress: 'Test 123, Test TS 12345',
        businessEmail: 'test@test.com',
        businessImage:
          'https://pbs.twimg.com/media/B6dQuW5IIAIgHCO?format=jpg&name=medium',
        businessDescription:
          'Nostrud reprehenderit voluptate sit irure laboris sunt irure fugiat sit tempor.'
      },
      settings: {
        locale: 'en-us',
        darkMode: true
      },
      theming: {
        $primary: '#9c27b0',
        $primaryLightColor: '#d05ce3',
        $primaryTextColor: '#ffffff',
        $secondary: '#7c4dff',
        $secondaryLightColor: '#b47cff',
        $secondaryDarkColor: '#3f1dcb',
        $secondaryTextColor: '#ffffff',
        $accent: '#9C27B0',
        $dark: '#6a0080'
      },
      Credentials: {
        google: {
          clientId: '',
          clientPassword: ''
        },
        facebook: {
          clientId: '',
          clientPassword: ''
        },
        apple: {
          clientId: '',
          clientPassword: ''
        },
        amazon: {
          clientId: '',
          clientPassword: ''
        }
      }
    }
    this._dev = options?.dev as object ? options.dev : {
      debug: false,
      localeName: "locale",
      modeName: "darkMode",
    }
    this._prod = options?.prod as object ? options.prod : {}
    this._plugin = plugin || {};
    this._store = Object.assign(
      { ..._._client },
      { ..._._server },
      { ..._._dev },
      { client: _._client },
      { server: _._server },
      { dev: _._dev },
      { prod: _._prod },
      { ..._._plugin },
      {}
    );
    this._storage = options?.storage as typeof Storage ? options.storage : localStorage;
    this.type = this._store;
    this.store = this._store;    
  };

/**
 *
 * @param key
 * @param value
 */
set(key: string, value: object | string | number | boolean) {
  if (key.match(/:/)) {
    const keys = key.split(":");
    let _storeKey = this._store;

    keys.forEach(function (k, i) {
      if (keys.length === i + 1) {
        _storeKey[k] = value;
      }

      if (_storeKey[k] === undefined) {
        _storeKey[k] = {};
      }

      _storeKey = _storeKey[k];
    });
  } else {
    this._store[key] = value;
  }
  this._store[key] = value;
  return this.getItem(key);
}
setItem(key: string, value: object | string | number | boolean) {
  if (key.match(/:/)) {
    const keys = key.split(":");
    let _storeKey = this._store;

    keys.forEach(function (k, i) {
      if (keys.length === i + 1) {
        _storeKey[k] = value;
      }

      if (_storeKey[k] === undefined) {
        _storeKey[k] = {};
      }

      _storeKey = _storeKey[k];
    });
  } else {
    this._store[key] = value;
  }
  this._store[key] = value;
  return this.getItem(key);
}
/**
 * Get all store values
 */
getAll() {
  return this._store;
}
length() {
  return Object.keys(this._store).length;
}
/**
 * Gte a single value
 * @param key
 */
getItem(key: string) {
  return this._store[key];
}
/**
 * Get key from nestedKey :
 * @param key
 */
get(key: string) {
  return key && (key.match(/:/)) ? this.buildNestedKey(key) : this._store[key];
}
/**
 * get all client store
 */
remove(key: string) {
  return delete this._store[key];
}
removeItem(key: string) {
  return delete this._store[key];
}
client() {
  return this.getItem(STATCSTORESNAMES.CLIENT);
}
/**
 * get all dev store
 */
dev() {
  return this.getItem(STATCSTORESNAMES.DEV);
}
/**
 * get all server store
 */
server() {
  return this.getItem(STATCSTORESNAMES.SERVER);
}
/**
 * got all values from store
 */
store() {
  return this._store;
}
/**
 * Check if a key exists
 * @param key
 * @return Boolean
 */
has(key: string) {
  return Boolean(this.get(key));
}
clear() {
  return this._store = {};
}
hasItem(key: string) {
  return !!(this.get(key));
}
/**
 * Build nested pairs
 * @param nestedKey
 */
buildNestedKey(nestedKey: string) {
  const keys = nestedKey.split(":");
  let storeKey = this._store;

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



export const uStoreStorage = new IUStoreClass();

export default uStoreStorage; //*? */
