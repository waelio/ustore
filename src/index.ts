import { localStorage } from "./vendors/localStorage";
import { memoryStorage } from "./vendors/memoryStorage";
import { sessionStorage } from "./vendors/sessionStorage";

class IStore implements IStoreClass {
  public StoreType: string = 'localStorage';
  constructor(options: StoreOptions) {
    console.log(this.getAssociatedStoreTypeFromAny(options)); /*?*/
  }

  getAssociatedStoreTypeFromString(store_type: string): StoreTypes {
    switch (true) {
      case store_type === StoreTypes.localStorage:
        return localStorage
      case store_type === StoreTypes.sessionStorage:
        return sessionStorage
      case store_type === StoreTypes.memory:
        return memoryStorage
      case store_type === StoreTypes.vuex:
        return StoreTypes.vuex;
      case store_type === StoreTypes.pinia:
        return StoreTypes.pinia;
      case store_type === StoreTypes.gun:
        return StoreTypes.gun;
      default:
        return StoreTypes.localStorage;
    }
  }

  getAssociatedStoreTypeFromAny(storeType: any): StoreTypes {
    switch (typeof storeType) {
      case 'string':
        return this.getAssociatedStoreTypeFromString(storeType);
      case 'object':
        return storeType.type
          ? this.getAssociatedStoreTypeFromString(storeType.type)
          : StoreTypes.localStorage;
      default:
        if (Array.isArray(storeType)) {
          const testType: string | null = storeType[0] && storeType[0].type;
          return testType
            ? this.getAssociatedStoreTypeFromString(testType)
            : StoreTypes.localStorage;
        }
        return StoreTypes.localStorage;
    }
  }
  get(key: string): string | object | string[] | object[] | null {
    return 'null';
  }
  set(key: string, value: string | object | string[] | object[]): void {
    return;
  }
}
var test = new IStore({ type: 'localStorage' });
test; /*?*/
export class Store extends IStore {}
