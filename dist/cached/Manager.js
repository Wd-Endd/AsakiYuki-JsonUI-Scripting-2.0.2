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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedManager = void 0;
const GenerateRandomName_1 = require("../jsonUI/GenerateRandomName");
const ObjectForEach_1 = require("../lib/ObjectForEach");
const ReadJsonUIProperty_1 = __importStar(require("../lib/ReadJsonUIProperty"));
const jsonUIObject = {
    json: {},
    modify: {},
    global_variables: {},
    global_variables_arr: [[], []],
    sounds: {}
};
/**
 * A class to manage cached data for JSON UI generation.
 */
class CachedManager {
    static getJsonUIObject() {
        return jsonUIObject;
    }
    static debugUI(namespace, key, isModify) {
        return JSON.stringify({ [key]: jsonUIObject[isModify ? "modify" : "json"][namespace][key] }, null, 2);
    }
    static addSound(id, path) {
        jsonUIObject.sounds[id] = path;
    }
    /**
     * Registers an initial element for a specific screen file.
     * @param init_element - The name of the initial element.
     * @param screen_file - The name of the screen file.
     */
    static screenInitRegister(init_element, screen_file) {
        jsonUIObject.modify[screen_file] = {
            ...jsonUIObject.modify[screen_file],
            [init_element]: {}
        };
    }
    /**
     * Reads the initial element for a specific screen file.
     * @param init_element - The name of the initial element.
     * @param screen_file - The name of the screen file.
     * @returns The initial element data.
     */
    static readInitElement(init_element, screen_file) {
        return jsonUIObject.modify[screen_file][init_element] || {};
    }
    /**
     * Writes the initial element for a specific screen file.
     * @param init_element - The name of the initial element.
     * @param screen_file - The name of the screen file.
     * @param value - The value to be written.
     */
    static writeInitElement(init_element, screen_file, value) {
        jsonUIObject.modify[screen_file][init_element] = {
            ...jsonUIObject.modify[screen_file][init_element],
            ...value
        };
    }
    static removeInitElement(init_element, screen_file) {
        delete jsonUIObject.modify[screen_file][init_element];
    }
    /**
     * Registers a key-value pair in the JSON UI object.
     * @param key - The key to be registered.
     * @param namespace - The namespace for the key.
     * @param value - The value to be registered.
     */
    static register(key, namespace, value) {
        jsonUIObject.json[namespace] = {
            ...jsonUIObject.json[namespace],
            [key]: value
        };
    }
    /**
     * Creates an element in the JSON UI object.
     * @param data - The data for the element.
     * @param namespace - The namespace for the element.
     * @param property - The property of the element.
     */
    static createElement(data, namespace, property) {
        CachedManager.register(data.getElementJsonUIKey(true), namespace, property);
    }
    /**
     * Sets the property of an element in the JSON UI object.
     * @param data - The data for the element.
     * @param namespace - The namespace for the element.
     * @param property - The property of the element.
     */
    static setElementProperty(data, namespace, property) {
        jsonUIObject.json[namespace][data.getElementJsonUIKey()] = {
            type: jsonUIObject.json[namespace][data.getElementJsonUIKey()].type,
            ...(0, ReadJsonUIProperty_1.default)(property)
        };
    }
    /**
     * Creates global variables in the JSON UI object.
     * @param data - The data for the global variables.
     */
    static createGlobalVariables(data) {
        (0, ObjectForEach_1.objectForEach)(data, (v, k) => {
            data[`$${k}`] = v;
            delete data[k];
        });
        jsonUIObject.global_variables = (0, ReadJsonUIProperty_1.default)({
            ...jsonUIObject.global_variables,
            ...data
        });
    }
    /**
     * Obfuscates a global variable in the JSON UI object.
     * @param value - The value of the global variable.
     * @returns The obfuscated name of the global variable.
     */
    static obfuscatorGlobalVariable(value) {
        value = (0, ReadJsonUIProperty_1.ReadProperty)(value);
        const valueStringify = JSON.stringify(value), isObject = typeof value === 'object';
        const index = jsonUIObject.global_variables_arr[1].findIndex((v) => isObject ? JSON.stringify(v) === valueStringify : v === value);
        if (index === -1) {
            const name = (0, GenerateRandomName_1.generateRandomName)();
            jsonUIObject.global_variables_arr[1].push(value);
            jsonUIObject.global_variables_arr[0].push(name);
            return name;
        }
        else
            return jsonUIObject.global_variables_arr[0][index];
    }
    /**
     * Inserts an item into an array in the JSON UI object.
     * @param arrayName - The name of the array.
     * @param data - The data for the item.
     * @param namespace - The namespace for the item.
     * @param value - The value of the item.
     */
    static insertArray(arrayName, data, namespace, value) {
        jsonUIObject.json[namespace][data.getElementJsonUIKey()][arrayName] = [
            ...jsonUIObject.json[namespace][data.getElementJsonUIKey()][arrayName] || [],
            value
        ];
    }
    static getSpecialProperty(data, namespace) {
        const v = jsonUIObject.json[namespace][data.getElementJsonUIKey()];
        return {
            controls: v.controls,
            variables: v.variables,
            bindings: v.bindings,
            button_mappings: v.button_mappings,
            anims: v.anims
        };
    }
    static insertProperty(propertyName, data, namespace, value) {
        const json = jsonUIObject.json[namespace][data.getElementJsonUIKey()];
        json[propertyName] = {
            ...json[propertyName],
            ...value
        };
    }
    /**
     * Retrieves the JSON UI code from the cached object.
     * @returns The JSON UI code.
     */
    static getJsonUICode() {
        return jsonUIObject;
    }
}
exports.CachedManager = CachedManager;
;
