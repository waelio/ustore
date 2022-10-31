"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configStorage = exports.Config = exports.isProcess = void 0;
var path_1 = __importDefault(require("path"));
var waelio_utils_1 = require("waelio-utils");
var __dirname = path_1.default.resolve();
var isProcess = function () {
    try {
        return process["browser"];
    }
    catch (error) {
        return false;
    }
};
exports.isProcess = isProcess;
var Config = (function () {
    function Config() {
        var ConfigPath = path_1.default.join(path_1.default.dirname(__dirname), "/ustore/lib/config");
        this.configPath = ConfigPath;
        this.setEnvironment();
        var _ = this;
        this._server = _.getServerVars();
        this._client = _.getClientVars();
        this._dev = _.getUrgentOverrides();
        this._store = Object.assign({}, __assign({}, _._client), __assign({}, _._server), __assign({}, _._dev), { client: _._client }, { server: _._server }, { dev: _._dev });
    }
    Config.prototype.set = function (key, value) {
        if (key.match(/:/)) {
            var keys_1 = key.split(":");
            var storeKey_1 = this._store;
            keys_1.forEach(function (k, i) {
                if (keys_1.length === i + 1) {
                    storeKey_1[k] = value;
                }
                if (storeKey_1[k] === undefined) {
                    storeKey_1[k] = {};
                }
                storeKey_1 = storeKey_1[k];
            });
        }
        else {
            this._store[key] = value;
        }
    };
    Config.prototype.getAll = function () {
        return this._store;
    };
    Config.prototype.getItem = function (key) {
        return this._store[key];
    };
    Config.prototype.get = function (key) {
        if (key.match(/:/)) {
            var storeKey = this.buildNestedKey(key);
            return storeKey;
        }
        return this._store[key];
    };
    Config.prototype.client = function () {
        return this.getItem("client");
    };
    Config.prototype.dev = function () {
        return this.getItem("dev");
    };
    Config.prototype.server = function () {
        return this.getItem("server");
    };
    Config.prototype.store = function () {
        return this._store;
    };
    Config.prototype.has = function (key) {
        return Boolean(this.get(key));
    };
    Config.prototype.setEnvironment = function () {
        if (process && process["browser"]) {
            this._env = "client";
        }
        else {
            this._env = "server";
        }
    };
    Config.prototype.getServerVars = function () {
        return __awaiter(this, void 0, void 0, function () {
            var serverPath, serverVars, _a, error, success, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this._env === "server")) return [3, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        serverPath = this.configPath + "/server.js";
                        return [4, Promise.resolve().then(function () { return __importStar(require(serverPath)); })];
                    case 2:
                        serverVars = _b.sent();
                        return [4, (0, waelio_utils_1._to)(serverVars)];
                    case 3:
                        _a = _b.sent(), error = _a[0], success = _a[1];
                        if (error) {
                            throw error;
                        }
                        return [2, success];
                    case 4:
                        e_1 = _b.sent();
                        if (process.env.NODE_ENV === "development") {
                            console.warn("Could not find a server.js config in `./config`.");
                        }
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    Config.prototype.getClientVars = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newPathName, myClient, _a, error, success, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        newPathName = this.configPath + "/client.js";
                        return [4, Promise.resolve().then(function () { return __importStar(require(newPathName)); })];
                    case 1:
                        myClient = _b.sent();
                        return [4, (0, waelio_utils_1._to)(myClient)];
                    case 2:
                        _a = _b.sent(), error = _a[0], success = _a[1];
                        if (error) {
                            throw error;
                        }
                        return [2, success];
                    case 3:
                        e_2 = _b.sent();
                        if (process.env.NODE_ENV === "development") {
                            console.warn("Didn't find a client config in `./config`.");
                        }
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    Config.prototype.getUrgentOverrides = function () {
        var SV = this;
        var overrides;
        function fixName(name) {
            var res = SV.configPath + "/" + name + ".js";
            return res;
        }
        var filename = process.env.NODE_ENV === "production" ? "prod" : "dev";
        try {
            overrides = Promise.resolve().then(function () { return __importStar(require(fixName(filename))); });
        }
        catch (e) {
            overrides = {};
        }
        return overrides;
    };
    Config.prototype.buildNestedKey = function (nestedKey) {
        var keys = nestedKey.split(":");
        var storeKey = this._store;
        keys.forEach(function (k) {
            try {
                storeKey = storeKey[k];
            }
            catch (e) {
                return undefined;
            }
        });
        return storeKey;
    };
    return Config;
}());
exports.Config = Config;
exports.configStorage = new Config();
exports.default = exports.configStorage;
//# sourceMappingURL=configStorage.js.map