"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Lib = void 0;
var errors_1 = require("./errors");
var s3libInternal_1 = require("./s3libInternal");
var S3Lib = /** @class */ (function () {
    function S3Lib(config) {
        this.internal = new s3libInternal_1.S3libInternal(config);
    }
    S3Lib.prototype.createBucket = function (bucketName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("Creating bucket: " + bucketName);
                this.validateBucketName(bucketName);
                return [2 /*return*/, this.internal.createBucket(bucketName)];
            });
        });
    };
    S3Lib.prototype.deleteBucket = function (bucketName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.assetBucketOwnership(bucketName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.internal.deleteBucket(bucketName)];
                }
            });
        });
    };
    S3Lib.prototype.listBuckets = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internal.listBuckets()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    S3Lib.prototype.getBucket = function (bucketName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.assetBucketOwnership(bucketName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.internal.getBucket(bucketName)];
                }
            });
        });
    };
    S3Lib.prototype.getOrCreateBucket = function (bucketName) {
        return __awaiter(this, void 0, void 0, function () {
            var bucketStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBucketStatus(bucketName)];
                    case 1:
                        bucketStatus = _a.sent();
                        switch (bucketStatus) {
                            case 'owned':
                                return [2 /*return*/, this.internal.getBucket(bucketName)];
                            case 'not owned':
                                throw new errors_1.InvalidBucketName(bucketName, "".concat(bucketName, " is owned by another user"));
                            case 'not found':
                                return [2 /*return*/, this.createBucket(bucketName)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    S3Lib.prototype.getBucketStatus = function (bucketName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.internal.getBucketStatus(bucketName)];
            });
        });
    };
    S3Lib.prototype.assetBucketOwnership = function (bucketName) {
        return __awaiter(this, void 0, void 0, function () {
            var bucketStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBucketStatus(bucketName)];
                    case 1:
                        bucketStatus = _a.sent();
                        if (bucketStatus !== 'owned') {
                            throw new errors_1.InvalidBucketName(bucketName, "".concat(bucketName, " is not accessible by the user"));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    S3Lib.prototype.validateBucketName = function (bucketName) {
        //Naming rules
        // https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
        //Define Rules (rules below have more restrictions than the ones listed in the link above e.g. periods are allowed but not recommended for optimal performance, so they're simply not allowed here)
        if (!(bucketName.length >= 3 && bucketName.length <= 63))
            throw new errors_1.InvalidBucketName(bucketName, "".concat(bucketName, " must be between 3 and 63 characters long"));
        if (!(/^[a-z0-9]/.test(bucketName)))
            throw new errors_1.InvalidBucketName(bucketName, "".concat(bucketName, " must start with a letter or number"));
        if (!(/[a-z0-9]$/.test(bucketName)))
            throw new errors_1.InvalidBucketName(bucketName, "".concat(bucketName, " must end with a letter or number"));
        if (bucketName.includes('.') || bucketName.includes('_'))
            throw new errors_1.InvalidBucketName(bucketName, "".concat(bucketName, " must not contain \".\" or \"_\""));
        if (bucketName !== bucketName.toLowerCase())
            throw new errors_1.InvalidBucketName(bucketName, "".concat(bucketName, " must not contain any uppercase characters"));
        if (bucketName.endsWith('-s3alias') || bucketName.endsWith('--ol-s3'))
            throw new errors_1.InvalidBucketName(bucketName, "".concat(bucketName, " must not end with be -s3alias or --ol-s3"));
        if (bucketName.startsWith('xn--'))
            throw new errors_1.InvalidBucketName(bucketName, "".concat(bucketName, " must not start with be xn--"));
    };
    return S3Lib;
}());
exports.S3Lib = S3Lib;
