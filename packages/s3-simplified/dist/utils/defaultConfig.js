"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
var constants_1 = require("./constants");
exports.defaultConfig = {
    signedUrl: {
        expiration: 5 * constants_1.Minute,
    },
    objectCreation: {
        multiPartUpload: {
            maxPartSize: 100 * constants_1.MB,
            enabledThreshold: 100 * constants_1.MB,
        },
        appendFileTypeToKey: true,
    }
};
