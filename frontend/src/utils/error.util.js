"use strict";
exports.__esModule = true;
exports.validString = void 0;
var validString = function (string) {
    if (!string)
        return false;
    if (string.length === 0)
        return false;
    if (!string.trim().length)
        return false;
    return true;
};
exports.validString = validString;
