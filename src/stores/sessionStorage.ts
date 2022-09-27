import { UStoreClass } from "../.d";

export const sessionStorage: UStoreClass = ({
  get: (key: string) => window.sessionStorage.getItem(key),
  set: (key: string, value: any) => window.sessionStorage.setItem(key, value),
  remove: (key: string) => window.sessionStorage.removeItem(key),
});
export default sessionStorage