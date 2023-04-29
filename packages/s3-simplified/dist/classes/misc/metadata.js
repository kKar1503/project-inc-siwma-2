"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = void 0;
var Metadata = /** @class */ (function () {
    function Metadata(metadata, identifier) {
        if (metadata === void 0) { metadata = {}; }
        this.metadata = metadata;
        if (identifier)
            this.metadata["identifier"] = identifier;
    }
    Object.defineProperty(Metadata.prototype, "Keys", {
        get: function () {
            return Object.keys(this.metadata);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Metadata.prototype, "Values", {
        get: function () {
            return Object.values(this.metadata);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Metadata.prototype, "Pairs", {
        get: function () {
            return Object.entries(this.metadata);
        },
        enumerable: false,
        configurable: true
    });
    Metadata.prototype.get = function (key) {
        return this.metadata[key.toLowerCase()];
    };
    Metadata.prototype.set = function (key, value) {
        this.metadata[key.toLowerCase()] = value;
    };
    Metadata.prototype.Length = function () {
        return this.Keys.length;
    };
    Metadata.prototype.isEmpty = function () {
        return this.Length() === 0;
    };
    Metadata.prototype.containsKey = function (key) {
        return this.Keys.includes(key);
    };
    Metadata.prototype.containsValue = function (value) {
        return this.Values.includes(value);
    };
    Metadata.prototype.contains = function (entry) {
        return this.Pairs.includes(entry);
    };
    Metadata.prototype.delete = function (key) {
        delete this.metadata[key.toLowerCase()];
    };
    Metadata.prototype.clear = function () {
        this.metadata = {};
    };
    Metadata.prototype.toRecord = function () {
        var record = {};
        for (var key in this.metadata) {
            if (!Object.prototype.hasOwnProperty.call(this.metadata, key))
                continue;
            record[key.toLowerCase()] = String(this.metadata[key]);
        }
        return record;
    };
    Metadata.prototype.asRecord = function () {
        return this.metadata;
    };
    return Metadata;
}());
exports.Metadata = Metadata;
