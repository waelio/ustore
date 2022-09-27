import GUN from 'gun';
import 'gun/sea'
import 'gun/axe';


import { UStoreClass } from "../.d";
import { _to, _reParseString } from "waelio-utils";

const options = {
  peers: ["https://gunjs-mtl.herokuapp.com/gun"],
};
const storeName = "uStoreGunDB";
let username = '';/*?*/
type p = string | string[] | object | number | boolean | null
type ACK = {
  ok: number;
  pub: string;
  err?: string;
}
// initialize gun
const db = GUN(options);
const user = db.user();
const isLoggedIn = !!(user.is) 

user.get(storeName).once(function (ack: ACK) {
  console.log(ack);
  
  if (!ack.err) {
    username =ack.pub
  }
  else {
    user.create(storeName, storeName, (something) => {
      console.log(`Created new user ${storeName}`);
      console.log(something);
      
      
    })     
  }
})

export const gunStorage:UStoreClass = ({
  get: async function (key: string) {
    return new Promise((resolve, reject) => {
      try {           
        if (isLoggedIn) {
          db.get("pub/" + username).get(key).once(function (v:any) {
               resolve(v)
          })
        } else {
          user.auth(storeName, storeName, function () {
            console.log(`Authorized ${storeName}`)
            db.get("pub/" + username).get(key).once(function (v:any) {
               resolve(v)
             })
          })                                
        }
      } catch (error: any) {
        reject(error);
      }
    })
  
  },
  set: (key: string, value: p) => {
     return new Promise((resolve, reject) => {
       try {
        const payload = { [key]: value }
        console.log(payload);
        
         user.auth(storeName, storeName, async function (ack:any) {
           if (!ack.err) {
             console.log(`Authorized`);
              username = "pub/"+ ack.sea.pub;
             console.log('username');
             console.log(username);
             resolve(db.get(username).get(key).put(payload));            
           }
          reject(ack.err);
        })        
       } catch (error: any) {
        console.log(error);
        
        reject('error');
      }
    })
  },
  remove: (key: string) => {
    return new Promise((resolve, reject) => {
      try {
        user.auth(storeName, storeName, function () {
          console.log('Authorized')
          resolve(db.get("pub/" + username).get(key).put(null))
        })
      } catch (error) {
        reject(error);
      }
    });
  }
});

export default gunStorage;

// const key = 'test';
// const v = 'test Payload';

// const r = gunStorage.set(key, v)
// r; /*?*/
