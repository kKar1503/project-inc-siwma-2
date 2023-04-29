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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3libInternal = void 0;
var client_s3_1 = require("@aws-sdk/client-s3");
var s3Bucket_1 = require("../buckets/s3Bucket");
var utils_1 = require("../../utils");
var S3libInternal = /** @class */ (function () {
    function S3libInternal(config) {
        var region = config.region, accessKey = config.accessKey, others = __rest(config, ["region", "accessKey"]);
        var credentials = { accessKeyId: accessKey.id, secretAccessKey: accessKey.secret };
        //strip off the accessKey from the config to prevent it from being logged
        this.config = __assign(__assign(__assign({}, utils_1.defaultConfig), others), { region: region });
        this.s3 = new client_s3_1.S3({ region: region, credentials: credentials });
    }
    S3libInternal.prototype.createBucket = function (bucketName) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Creating bucket: " + bucketName);
                        command = new client_s3_1.CreateBucketCommand({ Bucket: bucketName });
                        return [4 /*yield*/, this.s3.send(command)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new s3Bucket_1.S3Bucket(this, bucketName)];
                }
            });
        });
    };
    S3libInternal.prototype.deleteBucket = function (bucketName) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = new client_s3_1.DeleteBucketCommand({ Bucket: bucketName });
                        return [4 /*yield*/, this.s3.send(command)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    S3libInternal.prototype.listBuckets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = new client_s3_1.ListBucketsCommand({});
                        return [4 /*yield*/, this.s3.send(command)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.Buckets ?
                                response.Buckets.map(function (bucket) { return bucket.Name || '[unknown]'; })
                                : []];
                }
            });
        });
    };
    S3libInternal.prototype.getBucket = function (bucketName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new s3Bucket_1.S3Bucket(this, bucketName)];
            });
        });
    };
    S3libInternal.prototype.getBucketStatus = function (bucketName) {
        return __awaiter(this, void 0, void 0, function () {
            var command, error_1, name_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        command = new client_s3_1.HeadBucketCommand({ Bucket: bucketName });
                        return [4 /*yield*/, this.s3.send(command)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, 'owned'];
                    case 2:
                        error_1 = _a.sent();
                        name_1 = error_1.name;
                        if (name_1 === "NotFound") {
                            // The bucket does not exist.
                            return [2 /*return*/, "not found"];
                        }
                        else if (name_1 === "Forbidden") {
                            // You don't have access to the bucket.
                            return [2 /*return*/, "not owned"];
                        }
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return S3libInternal;
}());
exports.S3libInternal = S3libInternal;
