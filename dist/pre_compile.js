"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonUIElement_1 = require("./jsonUI/JsonUIElement");
const Modify_1 = require("./vanillaModification/Modify");
const Config_1 = require("./cached/Config");
const Anchor_1 = require("./jsonUITypes/Anchor");
if (Config_1.Config.data.debug_screen_content) {
    const bg = JsonUIElement_1.JsonUIElement.image({
        texture: 'textures/ui/Black',
        size: "100%cm + 4px",
        layer: 100,
        anchor: Anchor_1.Anchor.BottomLeft,
        alpha: 0.75,
        ignored: "(($screen_content = 'toast_screen.toast_screen_content') or ($screen_content = 'debug_screen.content_panel'))"
    }, { namespace: 'debugTools', name: 'debugger:screen_content' });
    const label = JsonUIElement_1.JsonUIElement.label({
        text: "$screen_content"
    }, { namespace: 'debugTools', name: 'debugger:screen_content_label' });
    bg.addElement(label);
    Modify_1.Modify.UiCommon('base_screen').modifications.controls.insertFront(bg);
}
