"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTypeParser = void 0;
// noinspection SpellCheckingInspection
var Dictionary = {
    "x-msdownload": "exe",
    "x-shockwave-flash": "swf",
    "x-tar": "tar",
    "x-zip-compressed": "zip",
    "x-rar-compressed": "rar",
    "x-7z-compressed": "7z",
    "x-bzip": "bz",
    "x-bzip2": "bz2",
    "x-gzip": "gz",
};
var FileTypeParser = function (mimeType) {
    var data = mimeType.split("/")[1];
    if (data === undefined)
        return "unknown";
    var ext = Dictionary[data];
    return ext !== undefined ? ext : data;
};
exports.FileTypeParser = FileTypeParser;
