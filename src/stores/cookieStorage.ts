import { UStoreClass } from "../.d";
const isReady = Boolean(typeof window !== undefined)
export var memoryStore = {};
export const cookieStorage: UStoreClass = ({
  get: (key: string) => {
    try {
      return isReady ?
        window.document.cookie
        .split(";")
          .find((item: string) => item.split("=")[0] === key) :
        memoryStore[key]
    } catch (error: any) {
      return error || null;
    }
  },
  set: (key: string, value: any) => {
    try {
      isReady ? window.document.cookie = `${key}=${value}` : memoryStore = { ... { key: value } };
      return true;
    } catch (error: any) {
      return error || null;
    }
  },
  remove: (key: string) => {
    try {
      isReady ? window.document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`: memoryStore = { ... { key: null } };
      return true;
    } catch (error: any) {
      return error || null;
    }
  },
});
export default cookieStorage;
