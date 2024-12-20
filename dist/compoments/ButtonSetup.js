"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonKeybindSetup = void 0;
const FromKeyBind_1 = require("../jsonUITypes/FromKeyBind");
const MappingTypes_1 = require("../jsonUITypes/MappingTypes");
class ButtonKeybindSetup {
    static pressed(onClickKey) {
        return [
            {
                from_button_id: FromKeyBind_1.FromKeybind.MenuOk,
                to_button_id: onClickKey,
                mapping_type: MappingTypes_1.MappingType.Pressed
            },
            {
                from_button_id: FromKeyBind_1.FromKeybind.MenuSelect,
                to_button_id: onClickKey,
                mapping_type: MappingTypes_1.MappingType.Pressed
            }
        ];
    }
    static doublePressed(onClickKey) {
        return [
            {
                from_button_id: FromKeyBind_1.FromKeybind.MenuOk,
                to_button_id: onClickKey,
                mapping_type: MappingTypes_1.MappingType.DoublePressed
            },
            {
                from_button_id: FromKeyBind_1.FromKeybind.MenuSelect,
                to_button_id: onClickKey,
                mapping_type: MappingTypes_1.MappingType.DoublePressed
            }
        ];
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
exports.ButtonKeybindSetup = ButtonKeybindSetup;
