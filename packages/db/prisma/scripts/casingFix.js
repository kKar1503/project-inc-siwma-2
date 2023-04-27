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
var fs = require("fs");
var path = require("path");
var pluralize = require("pluralize");
var PRISMA_FILE_PATH = path.join(__dirname, '../schema.prisma');
console.log('editing the file at :' + PRISMA_FILE_PATH);
function snakeToCamel(str) {
    return str.replace(/([-_]\w)/g, function (g) { return g[1].toUpperCase(); });
}
function snakeToPascal(str) {
    return snakeToCamel(str).replace(/^\w/, function (c) { return c.toUpperCase(); });
}
var PRISMA_PRIMITIVES = ['String', 'Boolean', 'Int', 'Float', 'DateTime'];
var KNEX_INTERNAL_MODELS = [
    'knex_migrations',
    'knex_migrations_lock',
    'pgmigrations',
];
function isKnexInternalModel(typeName) {
    return KNEX_INTERNAL_MODELS.includes(typeName);
}
function isPrimitiveType(typeName) {
    return PRISMA_PRIMITIVES.includes(typeName);
}
function fixFieldsArrayString(fields) {
    return fields
        .split(', ')
        .map(function (field) { return snakeToCamel(field); })
        .join(', ');
}
function parseLine(line, persistentData, fixedText) {
    // Are we at the start of a model definition
    var modelMatch = line.match(/^model\s+(\S+)\s*\{/);
    if (modelMatch) {
        persistentData.currentModelName = modelMatch[1];
        if (isKnexInternalModel(persistentData.currentModelName)) {
            return;
        }
        persistentData.hasAddedModelMap = false;
        var pascalModelName = snakeToPascal(persistentData.currentModelName);
        fixedText.push("model ".concat(pascalModelName, " {"));
        return;
    }
    if (persistentData.currentModelName && isKnexInternalModel(persistentData.currentModelName)) {
        return;
    }
    // We don't need to change anything if we aren't in a model body
    if (!persistentData.currentModelName) {
        fixedText.push(line);
        return;
    }
    // scan to see if @@map was already added
    if (line.match(/\s+@@map\(/)) {
        if (persistentData.hasAddedModelMap) {
            // @@map already added, dont add again
            return;
        }
        else {
            persistentData.hasAddedModelMap = true;
        }
    }
    // Add the @@map to the table name for the model
    else if (!persistentData.hasAddedModelMap) {
        if (line.match(/\s+@@/)) {
            fixedText.push("  @@map(\"".concat(persistentData.currentModelName, "\")"));
            persistentData.hasAddedModelMap = true;
        }
        if (line === '}' || line === '}\r') {
            fixedText.push("\n  @@map(\"".concat(persistentData.currentModelName, "\")"));
            fixedText.push("}");
            persistentData.hasAddedModelMap = true;
            return;
        }
    }
    // Renames field and applies a @map to the field name if it is snake case
    // Adds an s to the field name if the type is an array relation
    var fieldMatch = line.match(/\s\s(\w+)\s+(\w+)(\[\])?/);
    var fixedLine = line;
    if (fieldMatch) {
        var currentFieldName = fieldMatch[1], currentFieldType = fieldMatch[2], isArrayType = fieldMatch[3];
        var fixedFieldName = snakeToCamel(currentFieldName);
        if (isArrayType && !pluralize.isPlural(fixedFieldName)) {
            fixedFieldName = pluralize.plural(fixedFieldName);
        }
        fixedLine = fixedLine.replace(currentFieldName, fixedFieldName);
        // Add map if we needed to convert the field name and the field is not a relational type
        // If it's relational, the field type will be a non-primitive, hence the isPrimitiveType check
        if (currentFieldName.includes('_') && isPrimitiveType(currentFieldType)) {
            //check if fixedLine contains /r
            if (fixedLine.includes('\r')) {
                //remove /r
                fixedLine = fixedLine.replace('\r', '');
            }
            //add @map
            fixedLine += "  @map(\"".concat(currentFieldName, "\")");
        }
    }
    // Capitalizes model names in field types
    var fieldTypeMatch = fixedLine.match(/\s\s\w+\s+(\w+)/);
    if (fieldTypeMatch) {
        var currentFieldType = fieldTypeMatch[1];
        var fieldTypeIndex = fieldTypeMatch[0].lastIndexOf(currentFieldType);
        var fixedFieldType = snakeToPascal(currentFieldType);
        var startOfLine = fixedLine.slice(0, fieldTypeIndex);
        var restOfLine = fixedLine.slice(fieldTypeIndex + currentFieldType.length);
        fixedLine = "".concat(startOfLine).concat(fixedFieldType).concat(restOfLine);
    }
    // Changes `fields: [relation_id]` in @relation to camel case
    var relationFieldsMatch = fixedLine.match(/fields:\s\[([\w,\s]+)\]/);
    if (relationFieldsMatch) {
        var fields = relationFieldsMatch[1];
        fixedLine = fixedLine.replace(fields, fixFieldsArrayString(fields));
    }
    // Changes fields listed in @@index or @@unique to camel case
    var indexUniqueFieldsMatch = fixedLine.match(/@@\w+\(\[([\w,\s]+)\]/);
    if (indexUniqueFieldsMatch) {
        var fields = indexUniqueFieldsMatch[1];
        fixedLine = fixedLine.replace(fields, fixFieldsArrayString(fields));
    }
    fixedText.push(fixedLine);
}
function fixPrismaFile() {
    return __awaiter(this, void 0, void 0, function () {
        var text, textAsArray, fixedText, persistentData, _i, textAsArray_1, line;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.promises.readFile(PRISMA_FILE_PATH, 'utf8')];
                case 1:
                    text = _a.sent();
                    textAsArray = text.split('\n');
                    fixedText = [];
                    persistentData = {
                        currentModelName: null,
                        hasAddedModelMap: false,
                    };
                    for (_i = 0, textAsArray_1 = textAsArray; _i < textAsArray_1.length; _i++) {
                        line = textAsArray_1[_i];
                        parseLine(line, persistentData, fixedText);
                    }
                    return [4 /*yield*/, fs.promises.writeFile(PRISMA_FILE_PATH, fixedText.join('\n'))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
fixPrismaFile()
    .then(function (_) { return console.log('prisma file fixed'); });
