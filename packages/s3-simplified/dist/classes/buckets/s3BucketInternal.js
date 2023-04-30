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
exports.S3BucketInternal = void 0;
var client_s3_1 = require("@aws-sdk/client-s3");
var s3Object_1 = require("../objects/s3Object");
var metadata_1 = require("../misc/metadata");
var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
/**
 * An unsafe version of S3 bucket with no validation.
 */
var S3BucketInternal = /** @class */ (function () {
    /**
     * @internal
     * @param s3 The s3 client to use
     * @param config
     * @param bucketName
     */
    function S3BucketInternal(s3, config, bucketName) {
        this.s3 = s3;
        this.bucketUrl = "https://".concat(bucketName, ".s3.").concat(config.region, ".amazonaws.com");
        this.bucketName = bucketName;
    }
    /**
     * Fetches the bucket ACL and bucket policy to determine if the bucket is public.
     * @param bucket The bucket to check
     * @see {@link isPublic} for a cached version of this function
     */
    S3BucketInternal.fetchPublicStatus = function (bucket) {
        return __awaiter(this, void 0, void 0, function () {
            var aclResponse, _i, _a, grant, policyResponse, policy, _b, _c, statement, _d, _e, action, error_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, bucket.getBucketACL()];
                    case 1:
                        aclResponse = _f.sent();
                        for (_i = 0, _a = aclResponse.Grants || []; _i < _a.length; _i++) {
                            grant = _a[_i];
                            if (grant.Grantee === undefined)
                                continue;
                            if ((grant.Grantee.URI === "http://acs.amazonaws.com/groups/global/AllUsers" || grant.Grantee.URI === "http://acs.amazonaws.com/groups/global/AuthenticatedUsers")
                                && (grant.Permission === "READ" || grant.Permission === "FULL_CONTROL")) {
                                return [2 /*return*/, true];
                            }
                        }
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, bucket.getBucketPolicies()];
                    case 3:
                        policyResponse = _f.sent();
                        if (policyResponse.Policy === undefined)
                            return [2 /*return*/, false];
                        policy = JSON.parse(policyResponse.Policy);
                        for (_b = 0, _c = policy.Statement; _b < _c.length; _b++) {
                            statement = _c[_b];
                            if (statement.Effect === "Allow" && statement.Principal === "*") {
                                if (Array.isArray(statement.Action)) {
                                    for (_d = 0, _e = statement.Action; _d < _e.length; _d++) {
                                        action = _e[_d];
                                        if (action === "s3:GetObject" || action === "s3:*") {
                                            return [2 /*return*/, true];
                                        }
                                    }
                                }
                                else if (typeof statement.Action === "string" && (statement.Action === "s3:GetObject" || statement.Action === "s3:*")) {
                                    return [2 /*return*/, true];
                                }
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _f.sent();
                        // @ts-ignore
                        if (error_1.name !== "NoSuchBucketPolicy") {
                            throw error_1;
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, false];
                }
            });
        });
    };
    S3BucketInternal.prototype.isPublic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.isPublic_cache === undefined)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, S3BucketInternal.fetchPublicStatus(this)];
                    case 1:
                        _a.isPublic_cache = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.isPublic_cache];
                }
            });
        });
    };
    S3BucketInternal.prototype.generateSignedUrl = function (key, signedUrlConfig) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("generating Signed Url");
                return [2 /*return*/, (0, s3_request_presigner_1.getSignedUrl)(this.s3, new client_s3_1.GetObjectCommand({
                        Bucket: this.bucketName,
                        Key: key
                    }), { expiresIn: signedUrlConfig.expiration })];
            });
        });
    };
    S3BucketInternal.prototype.generatePublicUrl = function (key) {
        return "".concat(this.bucketUrl, "/").concat(key);
    };
    S3BucketInternal.prototype.getS3ObjectId = function (s3ObjectBuilder, objectConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata, uuid, ext, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadata = s3ObjectBuilder.Metadata.asRecord();
                        if (metadata["identifier"])
                            return [2 /*return*/, metadata["identifier"]];
                        return [4 /*yield*/, s3ObjectBuilder.UUID];
                    case 1:
                        uuid = _a.sent();
                        ext = s3ObjectBuilder.Extension;
                        id = (objectConfig.appendFileTypeToKey) ? uuid + "." + ext : uuid;
                        metadata["identifier"] = id;
                        return [2 /*return*/, id];
                }
            });
        });
    };
    S3BucketInternal.prototype.createObject_Single = function (s3ObjectBuilder, config) {
        return __awaiter(this, void 0, void 0, function () {
            var objectConfig, id, command, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        objectConfig = config.objectCreation;
                        return [4 /*yield*/, this.getS3ObjectId(s3ObjectBuilder, objectConfig)];
                    case 1:
                        id = _c.sent();
                        _a = client_s3_1.PutObjectCommand.bind;
                        _b = {
                            Bucket: this.bucketName,
                            Key: id
                        };
                        return [4 /*yield*/, s3ObjectBuilder.Body];
                    case 2:
                        command = new (_a.apply(client_s3_1.PutObjectCommand, [void 0, (_b.Body = _c.sent(),
                                _b.Metadata = s3ObjectBuilder.Metadata.toRecord(),
                                _b)]))();
                        return [4 /*yield*/, this.s3.send(command)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, new s3Object_1.S3Object(s3ObjectBuilder.Metadata, this, config)];
                }
            });
        });
    };
    S3BucketInternal.prototype.createObject_Multipart = function (s3ObjectBuilder, config) {
        return __awaiter(this, void 0, void 0, function () {
            var objectConfig, id, partSize, createMultipartUploadCommand, createMultipartUploadResponse, uploadId, partsCount, _a, _b, promises, i, start, end, _c, _d, _e, partBuffer, uploadPartCommand, uploadPartResponses, completedParts, completeMultipartUploadCommand;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        objectConfig = config.objectCreation;
                        return [4 /*yield*/, this.getS3ObjectId(s3ObjectBuilder, objectConfig)];
                    case 1:
                        id = _f.sent();
                        partSize = objectConfig.multiPartUpload.maxPartSize;
                        // Multipart upload
                        console.log("Using multipart upload");
                        console.log(id);
                        createMultipartUploadCommand = new client_s3_1.CreateMultipartUploadCommand({
                            Bucket: this.bucketName,
                            Key: id,
                            Metadata: s3ObjectBuilder.Metadata.toRecord()
                        });
                        return [4 /*yield*/, this.s3.send(createMultipartUploadCommand)];
                    case 2:
                        createMultipartUploadResponse = _f.sent();
                        uploadId = createMultipartUploadResponse.UploadId;
                        if (!uploadId)
                            throw new Error("Failed to initialize multipart upload");
                        _b = (_a = Math).ceil;
                        return [4 /*yield*/, s3ObjectBuilder.DataSize];
                    case 3:
                        partsCount = _b.apply(_a, [(_f.sent()) / partSize]);
                        console.log("Uploading ".concat(partsCount, " parts..."));
                        promises = new Array(partsCount);
                        i = 0;
                        _f.label = 4;
                    case 4:
                        if (!(i < partsCount)) return [3 /*break*/, 8];
                        console.log("Uploading part ".concat(i + 1, " of ").concat(partsCount));
                        start = i * partSize;
                        _d = (_c = Math).min;
                        _e = [start + partSize];
                        return [4 /*yield*/, s3ObjectBuilder.DataSize];
                    case 5:
                        end = _d.apply(_c, _e.concat([_f.sent()]));
                        return [4 /*yield*/, s3ObjectBuilder.AsBuffer()];
                    case 6:
                        partBuffer = (_f.sent()).slice(start, end);
                        uploadPartCommand = new client_s3_1.UploadPartCommand({
                            Bucket: this.bucketName,
                            Key: id,
                            UploadId: uploadId,
                            PartNumber: i + 1,
                            Body: partBuffer
                        });
                        promises[i] = this.s3.send(uploadPartCommand);
                        _f.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 4];
                    case 8: return [4 /*yield*/, Promise.all(promises)];
                    case 9:
                        uploadPartResponses = _f.sent();
                        completedParts = uploadPartResponses.map(function (response, index) {
                            return {
                                ETag: response.ETag,
                                PartNumber: index + 1
                            };
                        });
                        console.log("Completing multipart upload...");
                        console.log(id);
                        completeMultipartUploadCommand = new client_s3_1.CompleteMultipartUploadCommand({
                            Bucket: this.bucketName,
                            Key: id,
                            UploadId: uploadId,
                            MultipartUpload: {
                                Parts: completedParts
                            }
                        });
                        return [4 /*yield*/, this.s3.send(completeMultipartUploadCommand)];
                    case 10:
                        _f.sent();
                        console.log("Multipart upload complete");
                        return [2 /*return*/, new s3Object_1.S3Object(s3ObjectBuilder.Metadata, this, config)];
                }
            });
        });
    };
    S3BucketInternal.prototype.getBucketACL = function () {
        return __awaiter(this, void 0, void 0, function () {
            var aclCommand;
            return __generator(this, function (_a) {
                aclCommand = new client_s3_1.GetBucketAclCommand({
                    Bucket: this.bucketName,
                });
                return [2 /*return*/, this.s3.send(aclCommand)];
            });
        });
    };
    S3BucketInternal.prototype.getBucketPolicies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var policyCommand;
            return __generator(this, function (_a) {
                policyCommand = new client_s3_1.GetBucketPolicyCommand({
                    Bucket: this.bucketName
                });
                return [2 /*return*/, this.s3.send(policyCommand)];
            });
        });
    };
    S3BucketInternal.prototype.getObject = function (key, config, requireBody) {
        if (requireBody === void 0) { requireBody = false; }
        return __awaiter(this, void 0, void 0, function () {
            var command, response, metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = new client_s3_1.GetObjectCommand({ Bucket: this.bucketName, Key: key });
                        return [4 /*yield*/, this.s3.send(command)];
                    case 1:
                        response = _a.sent();
                        metadata = new metadata_1.Metadata(response.Metadata, key);
                        return [2 /*return*/, requireBody ?
                                new s3Object_1.S3Object(metadata, this, config, response.Body) :
                                new s3Object_1.S3Object(metadata, this, config)];
                }
            });
        });
    };
    S3BucketInternal.prototype.deleteObject = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = new client_s3_1.DeleteObjectCommand({ Bucket: this.bucketName, Key: key });
                        return [4 /*yield*/, this.s3.send(command)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    S3BucketInternal.prototype.renameObject = function (oldKey, newKey) {
        return __awaiter(this, void 0, void 0, function () {
            var copyCommand;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        copyCommand = new client_s3_1.CopyObjectCommand({
                            Bucket: this.bucketName,
                            CopySource: "".concat(this.bucketName, "/").concat(encodeURIComponent(oldKey)),
                            Key: newKey
                        });
                        return [4 /*yield*/, this.s3.send(copyCommand)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.deleteObject(oldKey)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    S3BucketInternal.prototype.listContents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = new client_s3_1.ListObjectsV2Command({ Bucket: this.bucketName });
                        return [4 /*yield*/, this.s3.send(command)];
                    case 1:
                        response = _a.sent();
                        // if response.Contents is not null, then map the array to get the keys
                        // else return an empty array
                        return [2 /*return*/, response.Contents ? response.Contents.map(function (content) { return content.Key || "[unknown]"; }) : []];
                }
            });
        });
    };
    S3BucketInternal.prototype.containsObject = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = new client_s3_1.HeadObjectCommand({ Bucket: this.bucketName, Key: key });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.s3.send(command)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        error_2 = _a.sent();
                        // @ts-ignore
                        if (error_2.name === "NotFound")
                            return [2 /*return*/, false];
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return S3BucketInternal;
}());
exports.S3BucketInternal = S3BucketInternal;
