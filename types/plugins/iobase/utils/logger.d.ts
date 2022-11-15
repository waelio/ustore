declare let logger: {
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
export default logger;
//# sourceMappingURL=logger.d.ts.map