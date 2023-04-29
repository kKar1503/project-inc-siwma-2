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
exports.S3Object = void 0;
var S3Object = /** @class */ (function () {
    function S3Object(metadata, bucketSource, config, body) {
        this.metadata = metadata;
        this.bucketSource = bucketSource;
        this.config = config;
        this.body = body;
        var editableMetadata = this.metadata.asRecord();
        var type = this.Type;
        if (this.Extension !== undefined)
            return;
        if (type !== undefined) {
            editableMetadata["file-type"] = type.split("/")[1];
            return;
        }
        //guess from filename
        var filename = this.key;
        var extension = filename.split(".")[1];
        if (extension !== undefined)
            editableMetadata["file-type"] = extension;
    }
    Object.defineProperty(S3Object.prototype, "Body", {
        get: function () {
            return this.body;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(S3Object.prototype, "key", {
        get: function () {
            return this.Id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(S3Object.prototype, "Metadata", {
        get: function () {
            return this.metadata;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(S3Object.prototype, "DataSize", {
        get: function () {
            var sizeStr = this.metadata.get("Content-Length");
            if (sizeStr === undefined)
                return undefined;
            return parseInt(sizeStr);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(S3Object.prototype, "Type", {
        get: function () {
            return this.metadata.get("content-type");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(S3Object.prototype, "Extension", {
        get: function () {
            return this.metadata.get("file-type");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(S3Object.prototype, "UUID", {
        get: function () {
            var uuid = this.metadata.get("content-disposition");
            if (uuid)
                return uuid;
            throw new Error("UUID not found");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(S3Object.prototype, "Id", {
        get: function () {
            var id = this.metadata.get("identifier");
            if (id)
                return id;
            return this.UUID;
        },
        enumerable: false,
        configurable: true
    });
    S3Object.prototype.generateLink = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.bucketSource.isPublic()];
                    case 1:
                        if (!(_b.sent())) return [3 /*break*/, 2];
                        _a = this.bucketSource.generatePublicUrl(this.key);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.bucketSource.generateSignedUrl(this.key, this.config.signedUrl)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                }
            });
        });
    };
    S3Object.prototype.toJSON = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, this.generateLink()];
                    case 1: return [2 /*return*/, (_a.FileLink = _b.sent(),
                            _a.Metadata = this.Metadata.Pairs,
                            _a)];
                }
            });
        });
    };
    return S3Object;
}());
exports.S3Object = S3Object;
