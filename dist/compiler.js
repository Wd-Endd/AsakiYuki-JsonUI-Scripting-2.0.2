"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
require("./pre_compile");
const Manager_1 = require("./cached/Manager");
const Config_1 = require("./cached/Config");
const ObjectForEach_1 = require("./lib/ObjectForEach");
const _1 = require(".");
;
const saveConsole = [];
const Console = { ...console };
for (const key in console) {
    delete console[key];
    saveConsole[key] = [];
    console[key] = function () { saveConsole.push({ type: key, data: arguments }); };
}
/**
 * An array to store file paths with their relative paths from the .build directory.
 */
const content = [];
/**
 * A function to recursively collect file paths from the .build directory.
 *
 * @param path - The relative path from the .build directory. Default is an empty string.
 *
 * @remarks
 * This function uses fs.readdirSync and fs.statSync to read the contents of the .build directory
 * and its subdirectories. It then checks if each item is a directory or a file. If it's a directory,
 * it calls itself recursively with the new path. If it's a file, it pushes the file path to the
 * `content` array.
 */
function writeContent(path = '') {
    const _ = `.build${path}`;
    for (const f of fs_extra_1.default.readdirSync(_, 'utf-8')) {
        if (fs_extra_1.default.statSync(`${_}/${f}`).isDirectory())
            writeContent(`${path}/${f}`);
        else
            content.push({ path: `${path}/${f}`.slice(1) });
    }
}
function BuildModifyJsonUI(data) {
    (0, ObjectForEach_1.objectForEach)(data, (value, dir) => {
        try {
            fs_extra_1.default.writeJSONSync(`.build/${dir}`, value, 'utf-8');
        }
        catch (error) {
            const directorys = dir.split('/');
            directorys.pop();
            let dirSave = '.build';
            for (const directory of directorys) {
                dirSave += `/${directory}`;
                if (!fs_extra_1.default.pathExistsSync(dirSave))
                    fs_extra_1.default.mkdirSync(dirSave);
            }
            fs_extra_1.default.writeJSONSync(`.build/${dir}`, value, 'utf-8');
        }
        console.log('[ Compiler ] >>', `.build/${dir}`, new Date(), Object.keys(value).length, 'elements modified!');
    });
}
/**
 * Event listener for the 'exit' event. This event is emitted when the Node.js process is about to exit.
 * It is not an asynchronous event and it will block the normal exit process.
 *
 * @remarks
 * This function is responsible for cleaning up the temporary cache directory,
 * compiling UI code, generating manifest and content files, and exporting the resource packs.
 */
process.on('exit', () => {
    for (const key in console) {
        delete console[key];
        console[key] = Console[key];
        delete Console[key];
    }
    // Log the export process
    let i = 0;
    for (const log of saveConsole) {
        if (i === 0)
            console.log('\n');
        delete saveConsole[i++];
        console[log.type](...Array.from(log.data).map(v => (v instanceof _1.JsonUIElement || v instanceof _1.JsonUIObject) ? v.debug() : v));
    }
    if (i !== 0)
        console.log('\n');
    if (!fs_extra_1.default.existsSync('.vscode')) {
        // Create the.vscode directory
        fs_extra_1.default.mkdirSync('.vscode');
        fs_extra_1.default.writeJsonSync('.vscode/settings.json', {
            "json.schemas": [
                {
                    fileMatch: ["config.json"],
                    url: "./node_modules/jsonui-scripting/config.json"
                }
            ]
        });
    }
    // Remove and recreate the .build directory
    fs_extra_1.default.removeSync('.build');
    fs_extra_1.default.mkdirSync('.build');
    // Create necessary subdirectories
    fs_extra_1.default.mkdirSync('.build/ui');
    fs_extra_1.default.mkdirSync('.build/build');
    // Retrieve UI code from the cache
    const jsonUI = Manager_1.CachedManager.getJsonUICode();
    // Array to store UI definition file paths
    const ui_defs = [];
    // Process global variables and convert them to JSON format
    for (let index = 0; index < jsonUI.global_variables_arr[0].length; index++) {
        jsonUI.global_variables = {
            ...jsonUI.global_variables,
            [`$${jsonUI.global_variables_arr[0][index]}`]: jsonUI.global_variables_arr[1][index],
        };
    }
    // Delete the original global variables array
    delete jsonUI.global_variables_arr;
    // Write global variables to a JSON file
    if (Object.keys(jsonUI.global_variables).length !== 0) {
        fs_extra_1.default.writeJSONSync('.build/ui/_global_variables.json', jsonUI.global_variables, 'utf-8');
        console.log('[ Compiler ] >>', new Date(), '.build/ui/_global_variables.json', `${Object.keys(jsonUI.global_variables).length} variable(s) generated.`);
        // Delete the global variables from the jsonUI object
        delete jsonUI.global_variables;
    }
    // Process UI elements and write them to JSON files
    for (const key of Object.keys(jsonUI.json)) {
        fs_extra_1.default.writeJSONSync(`.build/build/${key}.class`, {
            namespace: key,
            ...jsonUI.json[key]
        }, 'utf-8');
        ui_defs.push(`build/${key}.class`);
        console.log('[ Compiler ] >>', new Date(), `.build/build/${key}.class`, `${Object.keys(jsonUI.json[key]).length} element(s) generated.`);
        // Delete the processed UI elements from the jsonUI object
        delete jsonUI.json[key];
    }
    // Process modified UI elements and write them to JSON files
    BuildModifyJsonUI(jsonUI.modify);
    // Write UI definition file paths to a JSON file
    fs_extra_1.default.writeFileSync('.build/ui/_ui_defs.json', JSON.stringify({ ui_defs }), 'utf-8');
    console.log('[ Compiler ] >>', new Date(), '.build/ui/_ui_defs.json', ui_defs.length, 'file(s) generated.');
    // Write manifest information to a JSON file
    fs_extra_1.default.writeJSONSync('.build/manifest.json', {
        format_version: 2,
        header: {
            description: Config_1.Config.data.manifest?.description,
            name: Config_1.Config.data.manifest?.name,
            uuid: Config_1.Config.data.manifest?.uuid,
            version: Config_1.Config.data.manifest?.version,
            min_engine_version: [1, 13, 0]
        },
        modules: [
            {
                description: Config_1.Config.data.manifest?.description,
                type: "resources",
                uuid: "53644fac-a276-42e5-843f-a3c6f169a9ab",
                version: [0, 0, 1]
            }
        ]
    }, 'utf-8');
    // Write sound_definitions.json
    const soundsLength = Object.keys(jsonUI.sounds).length;
    if (soundsLength !== 0) {
        fs_extra_1.default.mkdirSync('.build/sounds');
        (0, ObjectForEach_1.objectForEach)(jsonUI.sounds, (sounds, e) => {
            jsonUI.sounds[e] = { category: "ui", sounds: Array.isArray(sounds) ? sounds.map(v => `sounds/${v}`) : `sounds/${sounds}` };
        });
        fs_extra_1.default.mkdir('.build/sounds');
        fs_extra_1.default.writeJSONSync('.build/sounds/sound_definitions.json', jsonUI.sounds);
        console.log('[ Compiler ] >>', new Date(), '.build/sounds/sound_definitions.json', `${soundsLength} sound(s) generated.`);
        fs_extra_1.default.readdirSync('.sounds').forEach(v => fs_extra_1.default.cpSync(`.sounds/${v}`, `.build/sounds/${v}`, { recursive: true }));
    }
    // Recursively collect file paths from the .build directory
    if (fs_extra_1.default.existsSync('.textures') && fs_extra_1.default.existsSync('.textures/.cached')) {
        for (const item of fs_extra_1.default.readdirSync('.textures/.cached'))
            fs_extra_1.default.copyFileSync(`.textures/.cached/${item}`, `.build/build/${item}`);
        fs_extra_1.default.removeSync('.textures/.cached');
    }
    if (fs_extra_1.default.existsSync('.bedrock')) {
        for (const $ of fs_extra_1.default.readdirSync('.bedrock'))
            fs_extra_1.default.cpSync(`.bedrock/${$}`, `.build/${$}`, { recursive: true });
        console.log('[ Compiler ] >>', "Clone resource packs", new Date());
    }
    writeContent();
    // Write collected file paths to a JSON file
    fs_extra_1.default.writeJSONSync('.build/contents.json', { content }, 'utf-8');
    console.log('[ Compiler ] >>', "Create content.json file", new Date(), '.build/contents.json', content.length, `file path(s) found!`);
    if (fs_extra_1.default.existsSync('config.json')) {
        // Determine the target directory for exporting resource packs
        const path = `${process.env.LOCALAPPDATA}\\Packages\\${Config_1.Config.data?.preview ? "Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe" : "Microsoft.MinecraftUWP_8wekyb3d8bbwe"}\\LocalState\\games\\com.mojang`;
        const directory = `${path}\\${Config_1.Config.data?.development ? 'development_resource_packs' : 'resource_packs'}\\${Config_1.Config.data?.folder_name}`;
        if (!fs_extra_1.default.existsSync(path))
            return;
        // Copy all files from the .build directory to the target directory
        if (fs_extra_1.default.existsSync(directory))
            fs_extra_1.default.removeSync(directory);
        if (!fs_extra_1.default.existsSync(`${path}\\minecraftpe`))
            fs_extra_1.default.mkdirSync(`${path}\\minecraftpe`);
        if (!fs_extra_1.default.existsSync(`${path}\\minecraftpe\\global_resource_packs.json`))
            fs_extra_1.default.writeFileSync(`${path}\\minecraftpe\\global_resource_packs.json`, '[]', 'utf-8');
        {
            // Install resource pack
            const readGlobalResourcePacks = fs_extra_1.default.readJsonSync(`${path}\\minecraftpe\\global_resource_packs.json`);
            const packsGlobalData = JSON.stringify({
                pack_id: Config_1.Config.data.manifest?.uuid || "",
                version: Config_1.Config.data.manifest?.version || [0, 0, 1]
            });
            const packIndex = readGlobalResourcePacks.findIndex((value) => JSON.stringify(value) === packsGlobalData);
            if (packIndex === -1) {
                readGlobalResourcePacks.push(JSON.parse(packsGlobalData));
                fs_extra_1.default.writeJsonSync(`${path}\\minecraftpe\\global_resource_packs.json`, readGlobalResourcePacks, 'utf-8');
                console.log('[ Installer ] >>', `Resource Packs ${Config_1.Config.data.manifest?.uuid} has been installed into Global Resource Packs`, new Date());
            }
            ;
        }
        fs_extra_1.default.readdirSync('.build').forEach(v => fs_extra_1.default.cpSync(`.build/${v}`, `${directory}\\${v}`, { recursive: true }));
        console.log('[ Installer ] >>', "Exporting resource packs", new Date(), directory);
    }
    console.timeEnd('Compile time');
    fs_extra_1.default.removeSync('.sounds');
});
