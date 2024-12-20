"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonUIElement = void 0;
const Bindings_1 = require("../builder/Bindings");
const Config_1 = require("../cached/Config");
const Manager_1 = require("../cached/Manager");
const CurrentLine_1 = require("../lib/CurrentLine");
const ElementTypes_1 = require("../jsonUITypes/ElementTypes");
const ObjectForEach_1 = require("../lib/ObjectForEach");
const ReadJsonUIProperty_1 = __importDefault(require("../lib/ReadJsonUIProperty"));
const Animation_1 = require("./Animation");
const GenerateRandomName_1 = require("./GenerateRandomName");
const cnt = {};
/**
 * Class representing a JSON UI element.
 */
class JsonUIElement {
    data;
    elementJsonUIKey;
    elementType;
    properties = {};
    /**
     * Create a new instance of JsonUIElement.
     * @param data - The initial data for the JSON UI element.
     * @example
     * ```typescript
     * const element = new JsonUIElement({ type: ElementTypes.Panel });
     * ```
     */
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
    constructor(data = { type: ElementTypes_1.ElementTypes.Panel }) {
        this.data = data;
        if (data.extend)
            delete data.type;
        else
            this.elementType = data.type;
        if (Config_1.Config.data.obfuscate_element_names) {
            data.name = (0, GenerateRandomName_1.generateRandomName)();
            data.namespace = (0, GenerateRandomName_1.getRandomNamespace)();
        }
        else {
            data.name = data.name || (0, CurrentLine_1.CurrentLine)();
            data.namespace = data.namespace || (0, CurrentLine_1.CurrentFile)();
        }
        if (data.extend instanceof JsonUIElement)
            this.elementJsonUIKey = `${data.name}${data.extend.getPath()}`;
        else if (typeof data.extend === 'string')
            this.elementJsonUIKey = `${data.name}@${data.extend}`;
        else
            this.elementJsonUIKey = `${data.name}${data.extend ? `@${data.extend?.namespace}.${data.extend?.name}` : ''}`;
        Manager_1.CachedManager.createElement(this, data.namespace, { type: data.type });
        this.setProperty(data.properties || {});
    }
    /**
     * A element container, like ```div``` in HTML.
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static panel(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.Panel,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * 	Similar to ```panel``` but stacks its children depending on ```orientation``` property value
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static stackPanel(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.StackPanel,
            ...jsonUIElement,
            properties
        });
    }
    ;
    /**
     * Similar to ```stack_panel```, but does not have the ```orientation``` property
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static collectionPanel(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.CollectionPanel,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * A button and it can have 4 states (default, hover, pressed and locked)
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static button(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.Button,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * A toggle and it has 2 states (checked or unchecked). Each state has a hover and locked variant
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static toggle(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.Toggle,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * A input panel
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static inputPanel(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.InputPanel,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * 	Range input element
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static slider(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.Slider,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * Text element
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static label(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.Label,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * Sprite element. Draws a texture.
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static image(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.Image,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * Text field element. By default it's single-lined
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static editBox(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.EditBox,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * Grid of elements
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static grid(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.Grid,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * A toggle for dropdown purposes
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static dropdown(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.Dropdown,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * The slider button that you use to change the slider value	Slider Box
Input
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static sliderBox(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.SliderBox,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * Creates a scrolling panel element
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static scrollView(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.ScrollView,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * The scrollbar track
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static scrollbarTrack(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.ScrollbarTrack,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * The scrollbar "thumb"/button. The draggable scrolling handle. By default is oriented vertically
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static scrollbarBox(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.ScrollbarBox,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * A element generator
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static factory(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.Factory,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * Screen element
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static screen(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.Screen,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * Special renderer element that is created in the code because it's too complex for JSON UI
     * @param renderer
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static custom(renderer, property_bag, properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.Custom,
            ...jsonUIElement,
            properties: {
                ...properties,
                property_bag,
                renderer
            }
        });
    }
    static selectionWheel(properties = {}, jsonUIElement = {}) {
        return new JsonUIElement({
            type: ElementTypes_1.ElementTypes.SelectionWheel,
            ...jsonUIElement,
            properties
        });
    }
    /**
     * Create a copy of an element
     * @param jsonUIElement
     * @param data
     * @param properties
     * @returns
     */
    static extendOf(jsonUIElement, properties = {}, data = {}) {
        return new JsonUIElement({
            extend: jsonUIElement,
            ...data,
            properties
        });
    }
    /**
     * Get the unique key for the JSON UI element.
     * @returns The unique key for the JSON UI element.
     */
    getElementJsonUIKey() {
        if (arguments[0]) {
            ((cnt[this.data.namespace || ''] ??= {})[this.elementJsonUIKey] ??= -1);
            const count = (cnt[this.data.namespace || ''][this.elementJsonUIKey] += 1);
            const cuccut = this.elementJsonUIKey.split('@');
            cuccut[0] += `[${count}]`;
            return this.elementJsonUIKey = count ? cuccut.join('@') : this.elementJsonUIKey;
        }
        else
            return this.elementJsonUIKey;
    }
    /**
     * Get the path of the JSON UI element.
     * @returns The path of the JSON UI element.
     */
    getPath() {
        return `@${this.data.namespace}.${this.elementJsonUIKey.split('@')[0]}`;
    }
    /**
     * Register global variables for the JSON UI element.
     * @param variableObject - The object containing the global variables.
     * @returns The instance of JsonUIElement for method chaining.
     */
    registerGlobalVariable(variableObject) {
        Manager_1.CachedManager.createGlobalVariables(variableObject);
        return this;
    }
    clone(properties) {
        return this.elementType
            ? new JsonUIElement({
                type: this.elementType,
                properties: {
                    ...this.properties,
                    ...properties,
                    ...Manager_1.CachedManager.getSpecialProperty(this, this.data.namespace || '')
                }
            }) : JsonUIElement.extendOf(this.getElementJsonUIKey().split('@')[1], {
            ...this.properties,
            ...properties,
            ...Manager_1.CachedManager.getSpecialProperty(this, this.data.namespace || '')
        });
    }
    extend(properties) {
        return JsonUIElement.extendOf(this, properties);
    }
    /**
     * Add a child element to the JSON UI element.
     * @param value - The value of the child element.
     * @param callback - The callback function to be called after adding the child element.
     * @returns The instance of JsonUIElement for method chaining or the name of the child element.
     * @example
     * ```typescript
     * const childrenElement = new JsonUIElement({ type: ElementTypes.Panel });
     * const parentElement = new JsonUIElement({ type: ElementTypes.Panel });
     * parentElement.addElement(childrenElement);
     * ```
     */
    addElement(value, callback) {
        const isElement = value instanceof JsonUIElement;
        const name = (isElement || typeof value === 'string') ? (0, GenerateRandomName_1.generateRandomName)() : value?.name || (0, GenerateRandomName_1.generateRandomName)();
        if (isElement) {
            Manager_1.CachedManager.insertArray('controls', this, this.data.namespace || "", { [`${name}${value.getPath()}`]: {} });
        }
        else if (typeof value === 'string') {
            this.addElement({
                extend: value,
                name
            });
            return this;
        }
        else {
            if (value?.extend instanceof JsonUIElement)
                value.extend = value.extend.getPath().slice(1);
            Manager_1.CachedManager.insertArray('controls', this, this.data.namespace, {
                [`${name}@${value?.extend}`]: {
                    ...(0, ReadJsonUIProperty_1.default)(value?.properties || {})
                }
            });
        }
        callback?.(this, name);
        return this;
    }
    /**
     * Add an array of child elements to the JSON UI element.
     * @param data - The array of child elements.
     * @param callback - The callback function to be called after adding the child elements.
     * @returns The instance of JsonUIElement for method chaining.
     */
    addElementArray(data, callback) {
        const name = [];
        data.forEach(_ => this.addElement(_, (arg, $) => name.push($)));
        callback?.(this, name);
        return this;
    }
    /**
     * Add variables to the JSON UI element.
     * @param data - The variables to be added.
     * @returns The instance of JsonUIElement for method chaining.
     */
    addVariables(data) {
        (0, ObjectForEach_1.objectForEach)(data, (v, k) => {
            Manager_1.CachedManager.insertArray('variables', this, this.data.namespace || "", {
                requires: ['$', '('].includes(k[0]) ? k : `$${k}`,
                ...(0, ObjectForEach_1.objectMap)(v, (v, k) => {
                    return {
                        [k.startsWith('$') ? k : `$${k}`]: v
                    };
                })
            });
        });
        return this;
    }
    /**
     * Add keybinds to the JSON UI element.
     * @param data - The keybinds to be added.
     * @returns The instance of JsonUIElement for method chaining.
     */
    addKeybind(data) {
        if (Array.isArray(data))
            data.forEach(_ => Manager_1.CachedManager.insertArray('button_mappings', this, this.data.namespace || "", _));
        else
            Manager_1.CachedManager.insertArray('button_mappings', this, this.data.namespace || "", data);
        return this;
    }
    /**
     * Add bindings to the JSON UI element.
     * @param data - The bindings to be added.
     * @returns The instance of JsonUIElement for method chaining.
     */
    addBindings(data) {
        if (Array.isArray(data))
            (0, Bindings_1.BindingsHandle)(data).forEach(v => Manager_1.CachedManager.insertArray('bindings', this, this.data.namespace || "", v));
        else
            Manager_1.CachedManager.insertArray('bindings', this, this.data.namespace || "", (0, Bindings_1.BindingsHandle)([data])[0]);
        return this;
    }
    /**
     * Add an animation to the JSON UI element.
     * @param data - The animation to be added.
     * @returns The instance of JsonUIElement for method chaining.
     */
    addAnimation(data, startAtState) {
        if (Array.isArray(data)) {
            data.forEach(v => Manager_1.CachedManager.insertArray('anims', this, this.data.namespace || "", (v instanceof Animation_1.Animation) ? v.getPath(startAtState) : v));
        }
        else
            Manager_1.CachedManager.insertArray('anims', this, this.data.namespace || "", (data instanceof Animation_1.Animation) ? data.getPath(startAtState) : data);
        return this;
    }
    /**
     * Add a variable to the JSON UI element.
     * @param propertyKey - The key of the property to be updated.
     * @param default_value - The default value of the variable.
     * @param callback - The callback function to be called after adding the variable.
     * @returns The instance of JsonUIElement for method chaining or the name of the variable.
     */
    addVariable(propertyKey, default_value, callback) {
        const name = (0, GenerateRandomName_1.generateRandomName)();
        this.setProperty({
            [propertyKey]: `$${name}`,
            [`$${name}|default`]: default_value
        });
        callback?.(this, `$${name}`);
        return this;
    }
    /**
     * Set properties of the JSON UI element.
     * @param data - The properties to be set.
     * @returns The instance of JsonUIElement for method chaining.
     */
    setProperty(data) {
        delete this.properties.controls;
        delete this.properties.button_mappings;
        delete this.properties.factory;
        delete this.properties.variables;
        delete this.properties.anims;
        Manager_1.CachedManager.setElementProperty(this, this.data.namespace || "", {
            ...Object.assign(this.properties, data),
        });
        return this;
    }
    setFactory(factory_data, control, callback) {
        const isControlName = (typeof control === 'string') || (control instanceof JsonUIElement) || (control?.extend);
        this.setProperty({
            factory: {
                ...(() => (typeof factory_data === 'string')
                    ? {
                        name: factory_data
                    }
                    : {
                        name: factory_data.name,
                        max_children_size: factory_data.maxChild
                    })(),
                control_name: (() => {
                    if (isControlName) {
                        const rndName = control?.name || (0, GenerateRandomName_1.generateRandomName)();
                        callback?.(this, rndName);
                        return (control instanceof JsonUIElement)
                            ? `${rndName}${control.getPath()}`
                            : (typeof control === 'string')
                                ? `${rndName}@${JsonUIElement}`
                                : `${rndName}@${control?.extend}`;
                    }
                })(),
                control_ids: (() => {
                    if (!isControlName) {
                        return (0, ObjectForEach_1.objectMap)(control, (v, k) => {
                            if (control) {
                                const rndName = v?.name || (0, GenerateRandomName_1.generateRandomName)();
                                callback?.(this, rndName);
                                return {
                                    [k]: (v instanceof JsonUIElement)
                                        ? `${rndName}${v.getPath()}`
                                        : (typeof v === 'string')
                                            ? `${rndName}@${JsonUIElement}`
                                            : `${rndName}@${v?.extend}`
                                };
                            }
                        });
                    }
                })()
            }
        });
        return this;
    }
    addPropertyBag(propertyBag) {
        Manager_1.CachedManager.insertProperty('property_bag', this, this.data.namespace || '', propertyBag);
        return this;
    }
    /**
     *
     */
    debug() {
        return Manager_1.CachedManager.debugUI(this.data.namespace || "", this.getElementJsonUIKey());
    }
}
exports.JsonUIElement = JsonUIElement;
;
