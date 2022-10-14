import GUN from 'gun';
import 'gun/sea'
import 'gun/axe';


import { UStoreClass } from "../.d";
import { _to, _reParseString } from "waelio-utils";

const options = {
  peers: ["https://gunjs-mtl.herokuapp.com/gun"],
};
const storeName = "uStoreGunDB";
type p = string | any

// initialize gun
const db = GUN(options);
export const gunStorage:UStoreClass = ({
  get: async function (key: string) {
    return new Promise(async(resolve, reject) => {
      try {
        const res = db.get(storeName).get(key)          
        resolve(res)
      } catch (error: any) {
        reject(error);
      }
    })
  
  },
  set: (key: string, value: p) => {
     return new Promise((resolve, reject) => {
       try {
        
         resolve(
           db.get(storeName).get(key).set(value))
        
        
       } catch (error: any) {
        console.log(error);
        
        reject('error');
      }
    })
  },
  remove: (key: string) => {
    return new Promise(async(resolve, reject) => {
      try {
        const res = db.get(storeName).get(key).set(null as any)
        resolve(res)
      } catch (error) {
        reject(error);
      }
    });
  }
});

export default gunStorage;