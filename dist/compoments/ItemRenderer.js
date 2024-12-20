"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRenderer = void 0;
const JsonUIElement_1 = require("../jsonUI/JsonUIElement");
const BindingName_1 = require("../jsonUITypes/BindingName");
const Renderer_1 = require("../jsonUITypes/Renderer");
let itemRenderer;
function ItemRenderer({ properties, value = 0, id }) {
    if (!itemRenderer)
        itemRenderer = JsonUIElement_1.JsonUIElement.custom(Renderer_1.Renderer.InventoryItem, {});
    return new JsonUIElement_1.JsonUIElement({
        extend: itemRenderer,
        properties: {
            ...(properties),
            property_bag: {
                [BindingName_1.BindingName.ItemIdAux]: (id < 0) ? (id * 65536 - value) : (id * 65536 + value),
                ...(properties?.property_bag || {})
            },
        }
    });
}
exports.ItemRenderer = ItemRenderer;
