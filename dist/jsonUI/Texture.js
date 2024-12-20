"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texture = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const GenerateRandomName_1 = require("./GenerateRandomName");
if (fs_extra_1.default.pathExistsSync('.textures')) {
    fs_extra_1.default.removeSync('.textures/.cached');
    fs_extra_1.default.mkdirSync('.textures/.cached');
}
const existPath = {};
class Texture {
    static from(path) {
        if (existPath[path]) {
            return existPath[path];
        }
        else {
            const rnd = (0, GenerateRandomName_1.generateRandomName)();
            const $ = path.match(/\.[A-Z]+$/i);
            fs_extra_1.default.copyFileSync(`.textures/${$ ? path : `${path}.png`}`, `.textures/.cached/${rnd}`);
            return existPath[path] = `build/${rnd}`;
        }
    }
    static apply() { }
    ;
    static arguments = '';
    static bind() { }
    ;
    static call() { }
    ;
    static caller = '';
    static length = '';
    static name = '';
    static toString() { }
    ;
}
exports.Texture = Texture;
