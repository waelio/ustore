export declare const app: import("vue").App<Element>;
export interface _possibleStateValues {
    [key: string]: any;
}
export interface _state {
    [key: string]: any;
}
export interface _actions {
    set: (contetx?: any, value?: any) => void;
}
export interface _getters {
    getMyValue: (state: _possibleStateValues) => _possibleStateValues;
}
export declare const vuexStorage: {
    get: () => (state: _possibleStateValues) => _possibleStateValues;
    add: (key: string, value: any) => any;
    set: (key: string, value: any) => any;
};
export default vuexStorage;
//# sourceMappingURL=vuexStorage.d.ts.map