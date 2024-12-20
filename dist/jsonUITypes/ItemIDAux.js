"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemIDAux = void 0;
const ItemID_1 = require("./ItemID");
exports.ItemIDAux = {};
Object.assign(exports.ItemIDAux, ItemID_1.ItemID);
for (const key in exports.ItemIDAux)
    exports.ItemIDAux[key] = exports.ItemIDAux[key] * 65536;
