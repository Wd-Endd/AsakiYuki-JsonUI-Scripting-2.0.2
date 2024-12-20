"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UIPaths_1 = require("./vanillaModification/UIPaths");
const fs_extra_1 = __importDefault(require("fs-extra"));
const Json = __importStar(require("jsonc-parser"));
let currentPack = '';
let filePath = '';
let currentNamespace = '';
const JsonUIData = {};
const JsonUINamespaceCount = {};
function ReadUICode(data, elementPath) {
    if (!elementPath) {
        (JsonUIData[currentPack] ??= {})[currentNamespace] ??= { filePath, elements: [] };
        for (const key in data) {
            const modifications = data[key].modifications || [];
            const eKey = key.split('@')[0];
            JsonUIData[currentPack][currentNamespace].elements.push(`"${eKey}"`);
            const controls = [];
            for (const modify of modifications) {
                if ((modify?.array_name === 'controls') && ['insert_back', 'insert_front', 'insert_after', 'insert_before'].includes(modify?.operation)) {
                    controls.push(...modify.value || []);
                }
            }
            if (Array.isArray(data[key].controls) || controls.length)
                ReadUICode([...data[key].controls || [], ...controls], eKey);
        }
    }
    else {
        for (const element of data) {
            const key = Object.keys(element)[0], eKey = `${elementPath}/${key.split('@')[0]}`;
            JsonUIData[currentPack][currentNamespace].elements.push(`"${eKey}"`);
            if (Array.isArray(element[key].controls))
                ReadUICode(element[key].controls, eKey);
        }
    }
}
function ReadPack(path) {
    for (const file of fs_extra_1.default.readdirSync(path)) {
        if (file === 'subpacks')
            continue;
        if (fs_extra_1.default.statSync(`${path}/${file}`).isDirectory()) {
            ReadPack(`${path}/${file}`);
        }
        else {
            const json = Json.parse(fs_extra_1.default.readFileSync(`${path}/${file}`, 'utf-8'));
            filePath = (`${path}/${file}`).split('/').slice(2).join('/');
            const isVanilla = UIPaths_1.VanillaPaths.includes(filePath);
            if (json?.namespace || isVanilla) {
                fs_extra_1.default.writeFileSync(`${path}/${file}`, JSON.stringify(json, null, 4), 'utf-8');
                currentNamespace = isVanilla ? filePath.match(/\w+\.json$/)?.[0]?.replace('.json', '') : (() => {
                    if ((JsonUINamespaceCount[currentPack] ??= {})[json.namespace] ??= 0)
                        return `${json.namespace}__${++JsonUINamespaceCount[currentPack][json.namespace]}`;
                    else {
                        ++JsonUINamespaceCount[currentPack][json.namespace];
                        return json.namespace;
                    }
                })();
                delete json.namespace;
                ReadUICode(json);
            }
        }
    }
}
if (fs_extra_1.default.pathExistsSync('.uipacks')) {
    if (!fs_extra_1.default.pathExistsSync('node_modules/jsonui-scripting/dist/uipackages'))
        fs_extra_1.default.mkdirSync('node_modules/jsonui-scripting/dist/uipackages');
    for (const pack of fs_extra_1.default.readdirSync('.uipacks')) {
        currentPack = pack;
        if (!fs_extra_1.default.existsSync(`.uipacks/${pack}/jsonuiscripting`) && fs_extra_1.default.statSync(`.uipacks/${pack}`).isDirectory()) {
            ReadPack(`.uipacks/${pack}`);
            fs_extra_1.default.writeFileSync(`.uipacks/${pack}/jsonuiscripting`, 'JsonUI Scripting - Is compiled.', 'utf-8');
        }
    }
    ;
    (function WriteTypes() {
        for (const pack in JsonUIData) {
            const easyType = [];
            const modify = Object.keys(JsonUIData[pack]).map(v => {
                const className = `_${v}`.replace(/(_| )\w/g, v => v.slice(1).toUpperCase());
                return `static ${className}(element, extend, properties) { return JsonUIObject.register(element, \`${JsonUIData[pack][v].filePath}\`, extend, properties); }`;
            });
            console.log(`[ ${pack} reader ] >>`, modify.length, 'namespace(s) found!');
            fs_extra_1.default.writeFileSync(`node_modules/jsonui-scripting/dist/uipackages/${pack}.js`, `"use strict"; const { JsonUIObject } = require('../vanillaModification/_ScreenCommon'); Object.defineProperty(exports, "__esModule", { value: true }); exports.${pack} = void 0; class ${pack} { ${modify.join(' ')} } exports.${pack} = ${pack};`);
            const types = Object.keys(JsonUIData[pack]).map(v => {
                const className = `_${v}`.replace(/(_| )\w/g, v => v.slice(1).toUpperCase());
                console.log(`[ ${className} ]`, JsonUIData[pack][v].elements.length, 'element(s) found!', `.uipacks/${pack}/${JsonUIData[pack][v].filePath}`);
                easyType.push(`type ${className}Types = ${JsonUIData[pack][v].elements.join(" | ")};`);
                return `static ${className}(element: ${className}Types, extend?: string | JsonUIElement, properties?: JsonUIProperty): JsonUIObject;`;
            });
            fs_extra_1.default.writeFileSync(`node_modules/jsonui-scripting/dist/uipackages/${pack}.d.ts`, `import { JsonUIElement, JsonUIObject, JsonUIProperty } from "jsonui-scripting"; ${easyType.join(' ')}; export class ${pack} { private static apply() { }; private static arguments = ''; private static bind() { }; private static call() { }; private static caller = ''; private static length = ''; private static name = ''; private static toString() { }; ${types.join(' ')}}`, 'utf-8');
        }
        const uiPack = fs_extra_1.default.readdirSync('.uipacks');
        if (uiPack.length) {
            fs_extra_1.default.writeFileSync('node_modules/jsonui-scripting/dist/uipackages/index.js', `${uiPack.map(v => `const { ${v} } = require('./${v}');`).join('\n')}
    class UIPacks {
        ${uiPack.map(v => `static ${v} = ${v};`).join('\n')}
    }
    module.exports = { UIPacks }`);
            fs_extra_1.default.writeFileSync('node_modules/jsonui-scripting/dist/uipackages/index.d.ts', `${uiPack.map(v => `import { ${v} } from "./${v}";`).join('\n    ')}
    export class UIPacks {
        ${uiPack.map(v => `static ${v} = ${v};`).join('\n   ')}
    }`);
        }
    })();
}
