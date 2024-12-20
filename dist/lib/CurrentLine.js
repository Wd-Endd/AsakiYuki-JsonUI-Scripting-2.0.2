"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentFile = exports.CurrentLine = void 0;
const GenerateRandomName_1 = require("../jsonUI/GenerateRandomName");
const dirPath = require.main?.filename.replace(/\w+.js$/, '');
function CurrentLine() {
    try {
        const $ = new Error('').stack?.match(/[A-Z]:.+\.js(:\d+)+/g);
        return $[$?.length - 1].replace(dirPath || '', '').replace(/\\/g, '/').replace('.', '-');
    }
    catch (error) {
        return (0, GenerateRandomName_1.generateRandomName)();
    }
}
exports.CurrentLine = CurrentLine;
function CurrentFile() {
    try {
        const $ = new Error('').stack?.match(/\w+.js(:\d+)+/g);
        return `${$[$?.length - 1].replace(/:\d+|.js/g, '')}`;
    }
    catch (error) {
        return (0, GenerateRandomName_1.generateRandomName)();
    }
}
exports.CurrentFile = CurrentFile;
