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
exports.S3ObjectBuilder = void 0;
var metadata_1 = require("../misc/metadata");
var generateHash_1 = require("../../utils/generateHash");
var fileTypeParser_1 = require("../../utils/fileTypeParser");
var convertToBuffer_1 = require("../../utils/convertToBuffer");
var S3ObjectBuilder = /** @class */ (function () {
    function S3ObjectBuilder(data, metadata) {
        if (metadata === void 0) { metadata = new metadata_1.Metadata(); }
        this.metadata = metadata;
        this.data = new BufferManager(data);
    }
    Object.defineProperty(S3ObjectBuilder.prototype, "Body", {
        get: function () {
            return this.data.getBuffer();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(S3ObjectBuilder.prototype, "Metadata", {
        get: function () {
            return this.metadata;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(S3ObjectBuilder.prototype, "DataSize", {
        get: function () {
            var _this = this;
            var sizeStr = this.metadata.get("Content-Length");
            if (sizeStr !== undefined)
                return new Promise(function (resolve) { return resolve(parseInt(sizeStr)); });
            return this.data.getBuffer().then(function (buffer) {
                var size = buffer.length;
                _this.metadata.set("Content-Length", size.toString());
                return size;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(S3ObjectBuilder.prototype, "Type", {
        get: function () {
            return this.metadata.get("Content-Type");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(S3ObjectBuilder.prototype, "Extension", {
        get: function () {
            var ext = this.metadata.get("File-Type");
            if (ext)
                return ext;
            return this.generateExtension();
        },
        enumerable: false,
        configurable: true
    });
    S3ObjectBuilder.prototype.generateExtension = function () {
        var type = this.Type;
        if (type === undefined)
            return undefined;
        var fileType = (0, fileTypeParser_1.FileTypeParser)(type);
        this.metadata.set("File-Type", fileType);
        return fileType;
    };
    Object.defineProperty(S3ObjectBuilder.prototype, "UUID", {
        get: function () {
            var _this = this;
            var uuid = this.metadata.get("content-disposition");
            if (uuid)
                return new Promise(function (resolve) { return resolve(uuid); });
            return this.data.getBuffer().then(function (buffer) {
                var uuid = (0, generateHash_1.generateHash)(buffer);
                _this.metadata.set("content-disposition", uuid);
                return uuid;
            });
        },
        enumerable: false,
        configurable: true
    });
    S3ObjectBuilder.prototype.AsBuffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.data.getBuffer()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return S3ObjectBuilder;
}());
exports.S3ObjectBuilder = S3ObjectBuilder;
var BufferManager = /** @class */ (function () {
    function BufferManager(data) {
        this.promise = (0, convertToBuffer_1.ConvertToBuffer)(data);
    }
    BufferManager.prototype.getBuffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.buffer)
                            return [2 /*return*/, this.buffer];
                        _a = this;
                        return [4 /*yield*/, this.promise];
                    case 1:
                        _a.buffer = _b.sent();
                        return [2 /*return*/, this.buffer];
                }
            });
        });
    };
    return BufferManager;
}());
