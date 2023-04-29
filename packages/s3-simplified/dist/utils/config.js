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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
var configTemplate_1 = require("./configTemplate");
var ConfigWrapper = /** @class */ (function () {
    function ConfigWrapper(userConfig) {
        this.config = __assign(__assign({}, configTemplate_1.defaultConfig), userConfig);
    }
    Object.defineProperty(ConfigWrapper.prototype, "accessKey", {
        get: function () {
            if (!this.config.accessKey) {
                var e = new Error("Access key is required but is missing. Was it set in the config file?");
                e.stack = undefined;
                throw e;
            }
            return this.config.accessKey;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigWrapper.prototype, "appendFileTypeToKey", {
        get: function () {
            return this.config.appendFileTypeToKey;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigWrapper.prototype, "multiPartUpload", {
        get: function () {
            return this.config.multiPartUpload;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigWrapper.prototype, "region", {
        get: function () {
            if (!this.config.region) {
                var e = new Error("Region is required but is missing. Was it set in the config file?");
                e.stack = undefined;
                throw e;
            }
            return this.config.region;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigWrapper.prototype, "signedUrl", {
        get: function () {
            return this.config.signedUrl;
        },
        enumerable: false,
        configurable: true
    });
    return ConfigWrapper;
}());
var cachedConfig;
var rootDir = require('path').resolve('./');
try {
    // noinspection ES6ConvertVarToLetConst
    var userConfig = require(rootDir + "/s3.config"); //purposely used var here, its intentional
    //check if userConfig is a configTemplate or a {config: configTemplate}
    var config = userConfig;
    cachedConfig = new ConfigWrapper(config.config ? config.config : userConfig);
}
catch (e) {
    //check if the error is because the file is missing or because the file is invalid
    var fs = require('fs');
    if (fs.existsSync(rootDir + "/s3.config"))
        throw e;
    console.warn('\x1b[33m%s\x1b[0m', "s3.config.ts/s3.config.js is missing, some functionality will not work.\nFor all features, please create one and add it to the root directory (" + rootDir + ")");
    cachedConfig = new ConfigWrapper({});
}
var getConfig = function () {
    return cachedConfig;
};
exports.getConfig = getConfig;
