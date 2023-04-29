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
exports.S3Bucket = void 0;
var errors_1 = require("../misc/errors");
var s3BucketInternal_1 = require("./s3BucketInternal");
var S3Bucket = /** @class */ (function () {
    /**
     * @internal
     * @param lib
     * @param bucketName
     */
    function S3Bucket(lib, bucketName) {
        this.config = lib.config;
        this.internal = new s3BucketInternal_1.S3BucketInternal(lib.s3, this.config, bucketName);
    }
    S3Bucket.prototype.createObject = function (s3Object) {
        return __awaiter(this, void 0, void 0, function () {
            var s3ObjectId, size;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        s3ObjectId = this.internal.getS3ObjectId(s3Object, this.config.objectCreation);
                        return [4 /*yield*/, this.assertNoConflicts(s3ObjectId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, s3Object.DataSize];
                    case 2:
                        size = _a.sent();
                        if (size === undefined)
                            throw new Error("Data size is undefined");
                        return [2 /*return*/, size <= this.config.objectCreation.multiPartUpload.enabledThreshold ?
                                this.internal.createObject_Single(s3Object, this.config) :
                                this.internal.createObject_Multipart(s3Object, this.config)];
                }
            });
        });
    };
    S3Bucket.prototype.getObject = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.assertExists(key)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.internal.getObject(key, this.config)];
                }
            });
        });
    };
    S3Bucket.prototype.getObjects = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(keys.map(function (key) { return _this.getObject(key); }))];
            });
        });
    };
    S3Bucket.prototype.deleteObject = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.assertExists(key)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.internal.deleteObject(key)];
                }
            });
        });
    };
    S3Bucket.prototype.deleteObjects = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(keys.map(function (key) { return _this.deleteObject(key); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    S3Bucket.prototype.renameObject = function (oldKey, newKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([this.assertNoConflicts(newKey), this.assertExists(oldKey),])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.internal.renameObject(oldKey, newKey)];
                }
            });
        });
    };
    S3Bucket.prototype.getAllObjects = function () {
        return __awaiter(this, void 0, void 0, function () {
            var objectKeys, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internal.listContents()];
                    case 1:
                        objectKeys = _a.sent();
                        promises = objectKeys.map(function (key) { return _this.internal.getObject(key, _this.config); });
                        return [2 /*return*/, Promise.all(promises)];
                }
            });
        });
    };
    S3Bucket.prototype.contains = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.internal.containsObject(key)];
            });
        });
    };
    S3Bucket.prototype.listContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.internal.listContents()];
            });
        });
    };
    S3Bucket.prototype.assertExists = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internal.containsObject(key)];
                    case 1:
                        if (!(_a.sent()))
                            throw new errors_1.MissingObject(key, this.internal.bucketName);
                        return [2 /*return*/];
                }
            });
        });
    };
    S3Bucket.prototype.assertNoConflicts = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internal.containsObject(key)];
                    case 1:
                        if (_a.sent())
                            throw new errors_1.ExistingObject(key, this.internal.bucketName);
                        return [2 /*return*/];
                }
            });
        });
    };
    return S3Bucket;
}());
exports.S3Bucket = S3Bucket;
