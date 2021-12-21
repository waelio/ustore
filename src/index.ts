enum StoreTypes {
  localStorage = 'localStorage',
  sessionStorage = 'sessionStorage',
  memory = 'memory',
  vuex = 'vuex',
  pinia = 'pinia',
  gun = 'gun'
}
interface StoreOptions {
  type: string;
}
interface GetItem {
  (key: string): string | object | string[] | object[] | null;
}
interface SetItem {
  (key: string, value: string | object | string[] | object[]): void;
}
interface IStoreClass {
  StoreType: string;
  get: GetItem;
  set: SetItem;
}

class IStore implements IStoreClass {
  StoreType: string = 'localStorage';
  constructor(options: StoreOptions) {
    this.getAssociatedStoreTypeFromAny(options);
  }

  getAssociatedStoreTypeFromString(store_type: string): StoreTypes {
    switch (true) {
      case store_type === StoreTypes.localStorage:
        return StoreTypes.localStorage;
      case store_type === StoreTypes.sessionStorage:
        return StoreTypes.sessionStorage;
      case store_type === StoreTypes.memory:
        return StoreTypes.memory;
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
export class Store extends IStore { }
