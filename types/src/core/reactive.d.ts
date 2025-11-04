export declare class Dep {
    subscripers: any[];
    constructor();
    depend(): void;
    notify(): void;
}
export declare const reactiveData: {
    [k: string]: any;
};
export declare function effect(fn: Function): void;
export declare function effectOn(key: string, fn: Function): void;
export default reactiveData;
//# sourceMappingURL=reactive.d.ts.map