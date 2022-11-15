import isSubset from "./isSubset";
import updateObject from "./updateObject";
import logger from "./logger";
export declare const utils: {
    isSubset: typeof isSubset;
    updateObject: typeof updateObject;
    logger: {
        baseStyle: string;
        colors: {
            log: string;
            error: string;
            warn: string;
        };
        log(message: string, secondary: string): void;
        error(message: any, _secondary?: any): void;
        warn(message: any, _secondary: any): void;
    };
};
export default utils;
export { isSubset };
export { updateObject };
export { logger };
//# sourceMappingURL=index.d.ts.map