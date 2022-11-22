import LocalForage from "localforage";
const NAME = "idbStorage";

let store: LocalForage;

try {
  LocalForage.config({
    driver: LocalForage.INDEXEDDB,
    name: NAME,
    version: 1.0,
    size: 4980736,
    storeName: NAME,
    description: "uStore.idbStorage",
  });
  store = LocalForage.createInstance({
    name: NAME,
  });
} catch (error) {
  LocalForage.dropInstance({
    name: NAME,
  }).then(function () {
    console.log(`Dropped ${NAME} database`);
  });
}

export const idbStorage = {
  get: async (key: string) => {
    try {
      store.getItem(key, function (err: any, value) {
        if (err) {
          return "Error getting item";
        }
        return value;
      });
    } catch (error: unknown) {
      alert(error);
      return error;
    }
  },
  getItem: async (key: string) => {
    try {
      store.getItem(key, function (err: any, value) {
        if (err) {
          return "Error getting item";
        }
        return value;
      });
    } catch (error: unknown) {
      alert(error);
      return error;
    }
  },
  set: async (key: any, value: any): Promise<any> => {
    try {
      store.setItem(key, value, function (err: unknown) {
        if (err) {
          return "Error getting item";
        }
        store.getItem(key, function (err: any, value) {
          if (err) {
            return "Error getting item";
          }
          return value;
        });
      });
    } catch (error: unknown) {
      alert(error);
      return error;
    }
  },
  //@ts-ignore
  has: function (key: string): boolean {
    try {
      return Boolean(store.getItem(key));
    } catch (_) {
      alert(_);
      return false;
    }
  },
  remove: async (key: string) => {
    try {
      store.removeItem(key).then(function () {
        console.log("Key is cleared!");
        store.getItem(key).then(function (value) {
          return value;
        });
      });
    } catch (error) {
      return error;
    }
  },
};

export default idbStorage;
