import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { JsonUIProperty } from "./JsonUIProperty";
export interface InsertElementInterface {
    properties?: JsonUIProperty;
    name?: string;
    extend?: JsonUIElement | string;
}
export interface ElementInterface {
    name?: string;
    extend?: JsonUIElement | string;
}
