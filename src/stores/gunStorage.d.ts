import { UniversalStoreClass } from '../.d';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
declare const gun: import("gun/types/chain").IGunChainReference<any, any, "pre_root">;
declare const gunStorage: UniversalStoreClass;
export default gunStorage;
export { gunStorage, gun };
