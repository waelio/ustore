declare const CONFIG: () => {
    server: {};
    client: {
        init: boolean;
        app: {
            businessName: string;
            businessDomain: string;
            businessAddress: string;
            businessEmail: string;
            businessImage: string;
            businessDescription: string;
        };
        settings: {
            locale: string;
            darkMode: boolean;
        };
        theming: {
            $primary: string;
            $primaryLightColor: string;
            $primaryTextColor: string;
            $secondary: string;
            $secondaryLightColor: string;
            $secondaryDarkColor: string;
            $secondaryTextColor: string;
            $accent: string;
            $dark: string;
        };
        Credentials: {
            google: {
                clientId: string;
                clientPassword: string;
            };
            facebook: {
                clientId: string;
                clientPassword: string;
            };
            apple: {
                clientId: string;
                clientPassword: string;
            };
            amazon: {
                clientId: string;
                clientPassword: string;
            };
        };
    };
    dev: {
        debug: boolean;
        localeName: string;
        modeName: string;
    };
    prod: {};
};
export { CONFIG };
export default CONFIG;
//# sourceMappingURL=index.d.ts.map