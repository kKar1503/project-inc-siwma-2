"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Year = exports.Month = exports.Week = exports.Day = exports.Hour = exports.Minute = exports.Second = exports.GB = exports.MB = exports.KB = exports.B = void 0;
//File Size Constants
var SizeScalingFactor = 1024; //in case we want 1000 instead of 1024
exports.B = 1;
exports.KB = SizeScalingFactor * exports.B;
exports.MB = SizeScalingFactor * exports.KB;
exports.GB = SizeScalingFactor * exports.MB;
//Time Constants
exports.Second = 1;
exports.Minute = 60 * exports.Second;
exports.Hour = 60 * exports.Minute;
exports.Day = 24 * exports.Hour;
exports.Week = 7 * exports.Day;
exports.Month = 30 * exports.Day;
exports.Year = 365 * exports.Day;
