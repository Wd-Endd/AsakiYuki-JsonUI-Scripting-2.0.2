"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMP3ToOgg = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
async function convertMP3ToOgg(input) {
    await new Promise((res) => {
        (0, fluent_ffmpeg_1.default)(input)
            .save(`.sounds/${input.replace(/\.mp3/g, '')}.ogg`)
            .on('end', () => {
            console.log('Conversion done', new Date(), input);
            res;
        });
    });
}
exports.convertMP3ToOgg = convertMP3ToOgg;
;
