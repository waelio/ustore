import { UniversalStoreClass } from '../.d';

export const cookieStorage: UniversalStoreClass = {
  get: (key: string) => {
    try {
      return (
        window.document.cookie
          .split('; ')
          .find((item) => item.split('=')[0] === key) || null
      );
    } catch (error: any) {
      return error.message ? error.message : error;
    }
  },
  set: (key: string, value: any) => {
    try {
      window.document.cookie = `${key}=${value}`;
      return true;
    } catch (error: any) {
      return error.message ? error.message : error;
    }
  },
  remove: (key: string) => {
    try {
      window.document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      return true;
    } catch (error: any) {
      return error.message ? error.message : error;
    }
  }
};
