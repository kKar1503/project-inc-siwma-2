"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistingObject = exports.MissingObject = exports.InvalidBucketName = exports.MissingBucket = void 0;
var InvalidError = /** @class */ (function (_super) {
    __extends(InvalidError, _super);
    function InvalidError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvalidError;
}(Error));
var MissingBucket = /** @class */ (function (_super) {
    __extends(MissingBucket, _super);
    function MissingBucket(bucketName) {
        var _this = _super.call(this) || this;
        _this.message = "Bucket ".concat(bucketName, " does not exist");
        _this.name = "InvalidBucket";
        return _this;
    }
    return MissingBucket;
}(InvalidError));
exports.MissingBucket = MissingBucket;
var InvalidBucketName = /** @class */ (function (_super) {
    __extends(InvalidBucketName, _super);
    function InvalidBucketName(bucketName, message) {
        if (message === void 0) { message = "Bucket name \"".concat(bucketName, "\" is invalid"); }
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.name = "InvalidBucketName";
        return _this;
    }
    return InvalidBucketName;
}(InvalidError));
exports.InvalidBucketName = InvalidBucketName;
var MissingObject = /** @class */ (function (_super) {
    __extends(MissingObject, _super);
    function MissingObject(key, bucketName) {
        var _this = _super.call(this) || this;
        _this.message = "Object ".concat(key, " does not exist in bucket ").concat(bucketName);
        _this.name = "InvalidObject";
        return _this;
    }
    return MissingObject;
}(InvalidError));
exports.MissingObject = MissingObject;
var ExistingObject = /** @class */ (function (_super) {
    __extends(ExistingObject, _super);
    function ExistingObject(key, bucketName) {
        var _this = _super.call(this) || this;
        _this.message = "Object ".concat(key, " already exist in bucket ").concat(bucketName);
        _this.name = "ObjectConflict";
        return _this;
    }
    return ExistingObject;
}(InvalidError));
exports.ExistingObject = ExistingObject;
