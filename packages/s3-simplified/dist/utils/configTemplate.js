"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
var constants_1 = require("./constants");
exports.defaultConfig = {
    multiPartUpload: {
        maxPartSize: 5 * constants_1.MB,
        enabledThreshold: 5 * constants_1.MB,
    },
    signedUrl: {
        expiration: 5 * constants_1.Minute,
    },
    appendFileTypeToKey: false,
};
