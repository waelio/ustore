import { UStoreClass } from "../.d";

export const piniaStorage: UStoreClass = ({
  get: (key: string) => window.localStorage.getItem(key),
  set: (key: string, value: any) => window.localStorage.setItem(key, value),
});
export default piniaStorage