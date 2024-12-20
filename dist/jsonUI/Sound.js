"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sound = void 0;
const Manager_1 = require("../cached/Manager");
const fs_extra_1 = __importDefault(require("fs-extra"));
if (!fs_extra_1.default.existsSync('.sounds'))
    fs_extra_1.default.removeSync('.sounds');
function generateFolderPath(path) {
    let splitPath = path.split(/\/|\\/g);
    splitPath = splitPath.slice(0, splitPath.length - 1);
    let str = '.sounds';
    for (const key of splitPath) {
        str += `/${key}`;
        if (!fs_extra_1.default.existsSync(str))
            fs_extra_1.default.mkdirSync(str);
    }
}
/**
 * Not recommened!
 */
class Sound {
    id;
    source_path;
    constructor(id, source_path) {
        this.id = id;
        this.source_path = source_path;
        Manager_1.CachedManager.addSound(id, source_path);
        fs_extra_1.default.mkdirSync('.sounds');
        if (Array.isArray(source_path))
            source_path.forEach(v => generateFolderPath(v));
        else
            generateFolderPath(source_path);
        this.converter();
    }
    converter() {
        if (Array.isArray(this.source_path))
            this.source_path.forEach(v => convertMP3ToOgg(v));
        else
            convertMP3ToOgg(this.source_path);
    }
}
exports.Sound = Sound;
