declare module "rollup.config" {
    const _default: {
        input: string;
        external: string[];
        plugins: ({
            name: string;
            generateBundle(options: any, bundle: any): void;
        } | import("rollup").Plugin)[];
        onwarn: (warning: any) => void;
        output: {
            file: string;
            name: string;
            format: string;
            exports: string;
            sourcemap: boolean;
        }[];
    }[];
    export default _default;
}
declare module "src/vendors/cookieStorage" {
    import { UniversalStoreClass } from '../.d';
    export const cookieStorage: UniversalStoreClass;
}
declare module "src/vendors/localStorage" {
    import { UniversalStoreClass } from '../.d';
    export const localStorage: UniversalStoreClass;
}
declare module "src/vendors/sessionStorage" {
    import { UniversalStoreClass } from '../.d';
    export const sessionStorage: UniversalStoreClass;
}
declare module "src/vendors/memoryStorage" {
    import { UniversalStoreClass } from '../.d';
    export const memoryStorage: UniversalStoreClass;
}
declare module "src/vendors/vuexStorage" {
    import { UniversalStoreClass } from '../.d';
    export const vuexStorage: UniversalStoreClass;
}
declare module "src/vendors/piniaStorage" {
    import { UniversalStoreClass } from '../.d';
    export const piniaStorage: UniversalStoreClass;
}
declare module "src/vendors/gunStorage" {
    import { UniversalStoreClass } from '../.d';
    export const gun: import("gun/types/chain").IGunChainReference<any, any, "pre_root">;
    export const gunStorage: UniversalStoreClass;
}
declare module "src/vendors/index" {
    import { localStorage } from "src/vendors/localStorage";
    import { sessionStorage } from "src/vendors/sessionStorage";
    import { memoryStorage } from "src/vendors/memoryStorage";
    import { cookieStorage } from "src/vendors/cookieStorage";
    import { vuexStorage } from "src/vendors/vuexStorage";
    import { piniaStorage } from "src/vendors/piniaStorage";
    import { gunStorage } from "src/vendors/gunStorage";
    export { localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, piniaStorage, gunStorage };
}
declare module "src/index" {
    import { StoreTypes, UniversalStoreClass } from './.d';
    import { localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, gunStorage, piniaStorage } from "src/vendors/index";
    export { localStorage, sessionStorage, cookieStorage, memoryStorage, vuexStorage, piniaStorage, gunStorage };
    export { StoreTypes };
    export const UniversalStore: (storePluginType?: Partial<StoreTypes>) => UniversalStoreClass;
}
//# sourceMappingURL=universal-store.d.ts.map