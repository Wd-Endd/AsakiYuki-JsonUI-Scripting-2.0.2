import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { JsonUIArrayName } from "../jsonUITypes/JsonUIArrayName";
import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
interface JsonUIObjectInterface {
    json: {
        [key: string]: any;
    };
    modify: {
        [key: string]: any;
    };
    global_variables: {
        [key: string]: any;
    };
    global_variables_arr: [string[], string[]];
    sounds: {
        [key: string]: string | string[];
    };
}
/**
 * A class to manage cached data for JSON UI generation.
 */
export declare class CachedManager {
    static getJsonUIObject(): JsonUIObjectInterface;
    static debugUI(namespace: string, key: string, isModify?: boolean): string;
    static addSound(id: string, path: string | string[]): void;
    /**
     * Registers an initial element for a specific screen file.
     * @param init_element - The name of the initial element.
     * @param screen_file - The name of the screen file.
     */
    static screenInitRegister(init_element: string, screen_file: string): void;
    /**
     * Reads the initial element for a specific screen file.
     * @param init_element - The name of the initial element.
     * @param screen_file - The name of the screen file.
     * @returns The initial element data.
     */
    static readInitElement(init_element: string, screen_file: string): any;
    /**
     * Writes the initial element for a specific screen file.
     * @param init_element - The name of the initial element.
     * @param screen_file - The name of the screen file.
     * @param value - The value to be written.
     */
    static writeInitElement(init_element: string, screen_file: string, value: any): void;
    static removeInitElement(init_element: string, screen_file: string): void;
    /**
     * Registers a key-value pair in the JSON UI object.
     * @param key - The key to be registered.
     * @param namespace - The namespace for the key.
     * @param value - The value to be registered.
     */
    static register(key: string, namespace: string, value: any): void;
    /**
     * Creates an element in the JSON UI object.
     * @param data - The data for the element.
     * @param namespace - The namespace for the element.
     * @param property - The property of the element.
     */
    static createElement(data: JsonUIElement, namespace: string, property: JsonUIProperty): void;
    /**
     * Sets the property of an element in the JSON UI object.
     * @param data - The data for the element.
     * @param namespace - The namespace for the element.
     * @param property - The property of the element.
     */
    static setElementProperty(data: JsonUIElement, namespace: string, property: JsonUIProperty): void;
    /**
     * Creates global variables in the JSON UI object.
     * @param data - The data for the global variables.
     */
    static createGlobalVariables(data: object): void;
    /**
     * Obfuscates a global variable in the JSON UI object.
     * @param value - The value of the global variable.
     * @returns The obfuscated name of the global variable.
     */
    static obfuscatorGlobalVariable(value: any): string;
    /**
     * Inserts an item into an array in the JSON UI object.
     * @param arrayName - The name of the array.
     * @param data - The data for the item.
     * @param namespace - The namespace for the item.
     * @param value - The value of the item.
     */
    static insertArray(arrayName: JsonUIArrayName, data: JsonUIElement, namespace: string, value: object | string): void;
    static getSpecialProperty(data: JsonUIElement, namespace: string): {
        controls: any;
        variables: any;
        bindings: any;
        button_mappings: any;
        anims: any;
    };
    static insertProperty(propertyName: string, data: JsonUIElement, namespace: string, value: object): void;
    /**
     * Retrieves the JSON UI code from the cached object.
     * @returns The JSON UI code.
     */
    static getJsonUICode(): JsonUIObjectInterface;
}
export {};
