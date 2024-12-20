"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalVariables = void 0;
const Manager_1 = require("../cached/Manager");
const ReadJsonUIProperty_1 = require("../lib/ReadJsonUIProperty");
/**
 * A class to manage global variables.
 */
class GlobalVariables {
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
    /**
     * Registers a global variable object.
     *
     * @param variableObject - The object containing global variables.
     * @remarks This method caches the global variables for later use.
     * @example
     * ```typescript
     * GlobalVariables.register({
     *     test: "Hello World"
     * }); // Output: { "$test": "Hello World!" }
     * ```
     */
    static register(variableObject) {
        Manager_1.CachedManager.createGlobalVariables(variableObject);
    }
    /**
     * Creates a global variable reference string from a value.
     *
     * @param value - The value to create a global variable reference from.
     * @returns A string representing the global variable reference.
     * @remarks The returned string is in the format `$${variableName}`, where `variableName` is the obfuscated name of the global variable.
     * @example
     * ```typescript
     * GlobalVariables.from("Hello World"); // Output: "$a1b2c3d4e5f6g7h8i9j0k1l2"
     * GlobalVariables.from("Hello World"); // Output: "$a1b2c3d4e5f6g7h8i9j0k1l2"
     * ```
     */
    static from(value) {
        return `$${Manager_1.CachedManager.obfuscatorGlobalVariable((0, ReadJsonUIProperty_1.ReadProperty)(value, true))}`;
    }
}
exports.GlobalVariables = GlobalVariables;
