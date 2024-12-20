"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const jsonc_parser_1 = require("jsonc-parser");
const fs_extra_1 = __importDefault(require("fs-extra"));
const GenerateUUID_1 = require("../jsonUI/GenerateUUID");
/**
 * A class to manage the configuration settings of the application.
 */
class Config {
    /**
     * The static data property to hold the configuration data.
     */
    static data = {};
    /**
     * Reads the configuration from a file and returns it.
     * If the configuration file does not exist, it creates a default configuration.
     *
     * @returns {ConfigInterface} The configuration data.
     */
    static read() {
        // Read or generate a unique identifier (UUID) for the application
        const uuid = fs_extra_1.default.existsSync('uuid') ? fs_extra_1.default.readFileSync('uuid', 'utf-8') : (() => {
            const uuid = (0, GenerateUUID_1.GenerateUUID)();
            fs_extra_1.default.writeFileSync('uuid', uuid, 'utf-8');
            return uuid;
        })();
        // Read the configuration from the file if it exists, otherwise create a default configuration
        return fs_extra_1.default.existsSync('config.json') ?
            (() => {
                // Parse the configuration file and apply default values
                const config = (0, jsonc_parser_1.parse)(fs_extra_1.default.readFileSync('config.json', 'utf-8'));
                config.folder_name ??= "debugger";
                config.development ??= true;
                config.debug_screen_content ??= false;
                config.obfuscate_element_names ??= false;
                config.manifest = {
                    name: 'pack_name',
                    description: 'pack_description',
                    version: [0, 0, 0],
                    uuid,
                    ...config.manifest
                };
                return config;
            })() :
            ({
                folder_name: "debugger",
                development: true,
                preview: false,
                obfuscate_element_names: false,
                debug_screen_content: false,
                manifest: {
                    name: 'pack_name',
                    description: 'pack_description',
                    version: [0, 0, 0],
                    uuid
                }
            });
    }
}
exports.Config = Config;
// Assign the read configuration to the static data property
Config.data = Config.read();
