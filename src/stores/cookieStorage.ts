import { UStoreClass } from "../.d";

export const cookieStorage: UStoreClass = ({
  get: (key: string) => {
    try {
      return window.document.cookie
        .split(";")
        .find((item: string) => item.split("=")[0] === key);
    } catch (error: any) {
      return error || null;
    }
  },
  set: (key: string, value: any) => {
    try {
      window.document.cookie = `${key}=${value}`;
      return true;
    } catch (error: any) {
      return error || null;
    }
  },
  remove: (key: string) => {
    try {
      window.document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      return true;
    } catch (error: any) {
      return error || null;
    }
  },
});
export default cookieStorage