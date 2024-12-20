"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonUIObject = void 0;
const Bindings_1 = require("../builder/Bindings");
const Manager_1 = require("../cached/Manager");
const GenerateRandomName_1 = require("../jsonUI/GenerateRandomName");
const JsonUIElement_1 = require("../jsonUI/JsonUIElement");
const ObjectForEach_1 = require("../lib/ObjectForEach");
const ReadJsonUIProperty_1 = __importDefault(require("../lib/ReadJsonUIProperty"));
const jsonUIScreen = {};
;
/**
 * Class representing a JsonUIObject.
 * This class is used to manage and manipulate screen initialization data.
 */
class JsonUIObject {
    screenFile;
    screenInitKey;
    elementModifyKey = [];
    modifications = {
        controls: {
            swap: (where, target) => {
                this.swap('controls', where, target);
                return this.modifications.controls;
            },
            replace: (where, value) => {
                this.replace('controls', where, value);
                return this.modifications.controls;
            },
            remove: (where) => {
                this._remove('controls', where);
                return this.modifications.controls;
            },
            insertBack: (value, callback) => {
                if (Array.isArray(value))
                    value.forEach(v => this.insertBack('controls', v));
                else
                    this.insertBack('controls', value, callback);
                return this.modifications.controls;
            },
            insertFront: (value, callback) => {
                if (Array.isArray(value))
                    value.forEach(v => this.insertFront('controls', v));
                else
                    this.insertFront('controls', value, callback);
                return this.modifications.controls;
            },
            insertBefore: (child_name, value, callback) => {
                if (Array.isArray(value))
                    value.forEach(v => this.insertBefore('controls', child_name, v));
                else
                    this.insertBefore('controls', child_name, value, callback);
                return this.modifications.controls;
            },
            insertAfter: (child_name, value, callback) => {
                if (Array.isArray(value))
                    value.forEach(v => this.insertAfter('controls', child_name, v));
                else
                    this.insertAfter('controls', child_name, value, callback);
                return this.modifications.controls;
            }
        },
        bindings: {
            swap: (where, target) => {
                this.swap('bindings', where, target);
                return this.modifications.bindings;
            },
            replace: (where, value) => {
                this.replace('bindings', where, value);
                return this.modifications.bindings;
            },
            remove: (where) => {
                this._remove('bindings', where);
                return this.modifications.bindings;
            },
            insertBack: (value) => {
                this.insertBack('bindings', value);
                return this.modifications.bindings;
            },
            insertFront: (value) => {
                this.insertFront('bindings', value);
                return this.modifications.bindings;
            },
            insertBefore: (from, value) => {
                this.insertBefore('bindings', from, value);
                return this.modifications.bindings;
            },
            insertAfter: (from, value) => {
                this.insertAfter('bindings', from, value);
                return this.modifications.bindings;
            }
        },
        buttonMappings: {
            swap: (where, target) => {
                this.swap('button_mappings', where, target);
                return this.modifications.buttonMappings;
            },
            replace: (where, value) => {
                this.replace('button_mappings', where, value);
                return this.modifications.buttonMappings;
            },
            remove: (where) => {
                this._remove('button_mappings', where);
                return this.modifications.buttonMappings;
            },
            insertAfter: (from, value) => {
                this.insertAfter('button_mappings', from, value);
                return this.modifications.buttonMappings;
            },
            insertBefore: (from, value) => {
                this.insertBefore('button_mappings', from, value);
                return this.modifications.buttonMappings;
            },
            insertBack: (value) => {
                this.insertBack('button_mappings', value);
                return this.modifications.buttonMappings;
            },
            insertFront: (value) => {
                this.insertFront('button_mappings', value);
                return this.modifications.buttonMappings;
            },
        },
        variables: {
            swap: (where, target) => {
                this.swap('variables', where, target);
                return this.modifications.variables;
            },
            replace: (where, value) => {
                this.replace('variables', where, value);
                return this.modifications.variables;
            },
            remove: (where) => {
                this._remove('variables', where);
                return this.modifications.variables;
            },
            insertAfter: (from, value) => {
                this.insertAfter('variables', from, value);
                return this.modifications.variables;
            },
            insertBefore: (from, value) => {
                this.insertBefore('variables', from, value);
                return this.modifications.variables;
            },
            insertBack: (value) => {
                this.insertBack('variables', value);
                return this.modifications.variables;
            },
            insertFront: (value) => {
                this.insertFront('variables', value);
                return this.modifications.variables;
            },
        },
    };
    /**
    * Create a new JsonUIObject instance.
    * @param screenInitKey - The unique key for the screen initialization.
    * @param screenFile - The file path of the screen initialization.
    * @param extend - Optional parameter to extend the screen initialization with another element or path.
    */
    constructor(screenInitKey, screenFile, extend, property) {
        this.screenFile = screenFile;
        this.screenInitKey = extend ? `${screenInitKey}@${(extend instanceof JsonUIElement_1.JsonUIElement) ? extend.getPath().slice(1) : extend}` : screenInitKey;
        Manager_1.CachedManager.screenInitRegister(this.screenInitKey, screenFile);
        if (property)
            this.setProperty(property);
    }
    static register(screenInitKey, screenFile, extend, property) {
        return (((jsonUIScreen[screenFile] ??= {})[screenInitKey] ??= new this(screenInitKey, screenFile, extend, property)));
    }
    /**
     * Set a property in the screen initialization data.
     * @param property - The property to set.
     * @returns The instance of JsonUIObject for method chaining.
     */
    setProperty(properties) {
        Manager_1.CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ...Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            ...(0, ReadJsonUIProperty_1.default)(properties),
        });
        return this;
    }
    getProperty(propertyName) {
        return Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile)[propertyName];
    }
    swap(arrayName, where, target) {
        const modifications = Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile).modifications || [];
        if (arrayName === 'variables') {
            const vK = Object.keys(target)[0];
            const wK = Object.keys(where)[0];
            target = {
                requires: vK,
                ...(0, ObjectForEach_1.objectMap)(target[vK], (v, k) => {
                    return {
                        [k.startsWith('$') ? k : `$${k}`]: v
                    };
                })
            };
            where = {
                requires: wK,
                ...(0, ObjectForEach_1.objectMap)(where[wK], (v, k) => {
                    return {
                        [k.startsWith('$') ? k : `$${k}`]: v
                    };
                })
            };
        }
        modifications.push({
            array_name: arrayName,
            operation: 'swap',
            where,
            target
        });
        Manager_1.CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ...Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            modifications
        });
        return this;
    }
    ;
    replace(arrayName, where, value) {
        const modifications = Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile).modifications || [];
        if (arrayName === 'variables') {
            const vK = Object.keys(value)[0];
            const wK = Object.keys(where)[0];
            value = {
                requires: vK,
                ...(0, ObjectForEach_1.objectMap)(value[vK], (v, k) => {
                    return {
                        [k.startsWith('$') ? k : `$${k}`]: v
                    };
                })
            };
            where = {
                requires: wK,
                ...(0, ObjectForEach_1.objectMap)(where[wK], (v, k) => {
                    return {
                        [k.startsWith('$') ? k : `$${k}`]: v
                    };
                })
            };
        }
        if (arrayName === 'controls' && typeof where === 'string')
            modifications.push({
                array_name: arrayName,
                operation: 'replace',
                control_name: where,
                value
            });
        else
            modifications.push({
                array_name: arrayName,
                operation: 'replace',
                where,
                value
            });
        Manager_1.CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ...Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            modifications
        });
        return this;
    }
    ;
    _remove(arrayName, where) {
        const modifications = Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile).modifications || [];
        if (arrayName === 'variables') {
            const wK = Object.keys(where)[0];
            where = {
                requires: wK,
                ...(0, ObjectForEach_1.objectMap)(where[wK], (v, k) => {
                    return {
                        [k.startsWith('$') ? k : `$${k}`]: v
                    };
                })
            };
        }
        if (arrayName === 'controls' && typeof where === 'string')
            modifications.push({
                array_name: arrayName,
                operation: 'remove',
                control_name: where
            });
        else
            modifications.push({
                array_name: arrayName,
                operation: 'remove',
                where
            });
        Manager_1.CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ...Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            modifications
        });
        return this;
    }
    ;
    /**
     * Inserts an element at the end of the specified array in the screen initialization data.
     * @param arrayName - The name of the array to insert into.
     * @param value - The value to insert.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    insertBack(arrayName, value, callback) {
        return this.insert('back', arrayName, value, callback);
    }
    ;
    /**
     * Inserts an element at the beginning of the specified array in the screen initialization data.
     * @param arrayName - The name of the array to insert into.
     * @param value - The value to insert.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    insertFront(arrayName, value, callback) {
        return this.insert('front', arrayName, value, callback);
    }
    ;
    /**
    * Insert an element into a specific array in the screen initialization data.
    * @param type - The type of insertion ('back' or 'front').
    * @param arrayName - The name of the array to insert into.
    * @param value - The value to insert.
    * @param callback - Optional callback function to be executed after insertion.
    * @returns The instance of JsonUIObject for method chaining.
    */
    insert(type, arrayName, value, callback) {
        const modifications = Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile).modifications || [];
        let arrayValue;
        switch (arrayName) {
            case "controls":
                {
                    const _v = value, isElement = value instanceof JsonUIElement_1.JsonUIElement, name = isElement ? (0, GenerateRandomName_1.generateRandomName)() : _v?.name || (0, GenerateRandomName_1.generateRandomName)(), extend = isElement ? _v.getPath().slice(1) :
                        (() => {
                            const extend = _v.extend;
                            return (typeof extend === 'string') ? `@${extend}` : extend.getPath();
                        })();
                    arrayValue = [
                        {
                            [`${name}${isElement ? _v.getPath() : extend}`]: {
                                ...(0, ReadJsonUIProperty_1.default)((_v instanceof JsonUIElement_1.JsonUIElement) ? {} : _v?.properties || {}),
                            }
                        }
                    ];
                    callback?.(this, name);
                }
                ;
                break;
            case "button_mappings":
                {
                    const _v = value;
                    arrayValue = _v;
                }
                ;
                break;
            case "bindings":
                {
                    const _v = value;
                    arrayValue = _v.map(v => {
                        if (typeof v === 'string') {
                            const binding = v.split(':');
                            return v = {
                                binding_name: binding[0],
                                binding_name_override: binding[1]
                            };
                        }
                        else
                            return v;
                    });
                }
                ;
                break;
            case "variables":
                {
                    const _v = value;
                    const k = Object.keys(_v)[0];
                    const v = _v[k];
                    arrayValue = [
                        {
                            requires: k,
                            ...(0, ObjectForEach_1.objectMap)(v, (v, k) => {
                                return {
                                    [k.startsWith('$') ? k : `$${k}`]: v
                                };
                            })
                        }
                    ];
                }
                ;
                break;
        }
        if (this.elementModifyKey.includes(`${type}:${arrayName}`))
            modifications[this.elementModifyKey.indexOf(`${type}:${arrayName}`)].value.push(...arrayValue);
        else {
            this.elementModifyKey.push(`${type}:${arrayName}`);
            modifications.push({
                array_name: arrayName,
                operation: `insert_${type}`,
                value: arrayValue
            });
        }
        Manager_1.CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ...Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            modifications
        });
        return this;
    }
    ;
    /**
     * Inserts an element before a specific element in the specified array in the screen initialization data.
     * @param arrayName - The name of the array to insert into.
     * @param from - The element to insert before. Can be a string, BindingInterface, ButtonMapping, or Variables.
     * @param value - The value to insert. Can be InsertElementInterface, JsonUIElement, array of BindingInterface or string, ButtonMapping, or Variables.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    insertBefore(arrayName, from, value, callback) {
        return this._insert('before', arrayName, from, value, callback);
    }
    /**
     * Inserts an element after a specific element in the specified array in the screen initialization data.
     * @param arrayName - The name of the array to insert into.
     * @param from - The element to insert after. Can be a string, BindingInterface, ButtonMapping, or Variables.
     * @param value - The value to insert. Can be InsertElementInterface, JsonUIElement, array of BindingInterface or string, ButtonMapping, or Variables.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    insertAfter(arrayName, from, value, callback) {
        return this._insert('after', arrayName, from, value, callback);
    }
    /**
     * Private method to handle insert operations in the screen initialization data.
     * @param type - The type of insertion ('before' or 'after').
     * @param arrayName - The name of the array to insert into.
     * @param from - The element to insert before or after. Can be a string, BindingInterface, ButtonMapping, or Variables.
     * @param value - The value to insert. Can be InsertElementInterface, JsonUIElement, array of BindingInterface or string, ButtonMapping, or Variables.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    _insert(type, arrayName, from, value, callback) {
        if (!this.elementModifyKey.includes(`${type}:${arrayName}:${JSON.stringify(from)}`))
            this.elementModifyKey.push(`${type}:${arrayName}:${JSON.stringify(from)}`);
        const modifyIndex = this.elementModifyKey.indexOf(`${type}:${arrayName}:${JSON.stringify(from)}`), modifications = Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile).modifications || [];
        const modifyObject = {
            value: [],
            array_name: arrayName,
            operation: `insert_${type}`,
            control_name: typeof from === 'string' ? from : undefined,
            ...modifications[modifyIndex],
        };
        let arrValue;
        switch (arrayName) {
            case "controls":
                {
                    const _v = value, isElement = _v instanceof JsonUIElement_1.JsonUIElement, name = isElement ? (0, GenerateRandomName_1.generateRandomName)() : _v?.name || (0, GenerateRandomName_1.generateRandomName)(), extend = isElement ? _v.getPath().slice(1) : (() => {
                        const extend = _v.extend;
                        return (typeof extend === 'string') ? `@${extend}` : extend.getPath();
                    })();
                    callback?.(this, name);
                    arrValue = [
                        {
                            [`${name}${isElement ? _v.getPath() : extend}`]: {
                                ...(0, ReadJsonUIProperty_1.default)((_v instanceof JsonUIElement_1.JsonUIElement) ? {} : _v?.properties || {}),
                            }
                        }
                    ];
                }
                ;
                break;
            case "button_mappings":
                {
                    const _v = value;
                    arrValue = [_v];
                    modifyObject['where'] = from;
                }
                break;
            case "bindings":
                {
                    const _v = value;
                    arrValue = _v.map(v => {
                        if (typeof v === 'string') {
                            const binding = v.split(':');
                            return v = {
                                binding_name: binding[0],
                                binding_name_override: binding[1]
                            };
                        }
                        else
                            return v;
                    });
                    modifyObject['where'] = from;
                }
                ;
                break;
            case "variables":
                {
                    const _v = value;
                    const k = Object.keys(_v)[0];
                    const v = _v[k];
                    arrValue = [
                        {
                            requires: k,
                            ...(0, ObjectForEach_1.objectMap)(v, (v, k) => {
                                return {
                                    [k.startsWith('$') ? k : `$${k}`]: v
                                };
                            })
                        }
                    ];
                    modifyObject['where'] = from;
                }
                ;
                break;
        }
        modifyObject.value.push(...arrValue);
        modifications[modifyIndex] = modifyObject;
        Manager_1.CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ...Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile),
            modifications
        });
        return this;
    }
    /**
     * Add bindings to the screen initialization data.
     * @param data - The bindings to add.
     */
    addBindings(data) {
        const _data = Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile), bindings = _data.bindings || [];
        bindings.push((0, Bindings_1.BindingsHandle)(Array.isArray(data) ? data : [data]));
        Manager_1.CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ..._data,
            bindings
        });
        return this;
    }
    /**
     * Add keybinds to the screen initialization data.
     * @param data - The keybinds to add.
     */
    addKeybind(data) {
        const _data = Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile), button_mappings = _data.button_mappings || [];
        if (Array.isArray(data))
            button_mappings.push(...data);
        else
            button_mappings.push(data);
        Manager_1.CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ..._data,
            button_mappings
        });
        return this;
    }
    /**
     * Add variables to the screen initialization data.
     * @param data - The variables to add.
     */
    addVariables(data) {
        const _data = Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile), variables = _data.variables || [];
        (0, ObjectForEach_1.objectForEach)(data, (v, k) => {
            variables.push({
                requires: k,
                ...(0, ObjectForEach_1.objectMap)(v, (v, k) => {
                    return {
                        [k.startsWith('$') ? k : `$${k}`]: v
                    };
                })
            });
        });
        Manager_1.CachedManager.writeInitElement(this.screenInitKey, this.screenFile, { variables });
        return this;
    }
    /**
     *
     */
    addAnimation(data) {
        const _data = Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile), anims = _data.anims || [];
        anims.push(data.getPath());
        Manager_1.CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ..._data,
            anims
        });
        return this;
    }
    /**
    * Add an element to the screen initialization data.
    * @param value - The element to add.
    * @param callback - Optional callback function to be executed after addition.
    * @returns The name of the added element if callback is not provided, otherwise the instance of JsonUIObject for method chaining.
    */
    addElement(value, callback) {
        const _data = Manager_1.CachedManager.readInitElement(this.screenInitKey, this.screenFile), controls = _data.controls || [];
        const isElement = value instanceof JsonUIElement_1.JsonUIElement, name = (isElement || typeof value === 'string') ? (0, GenerateRandomName_1.generateRandomName)() : value?.name || (0, GenerateRandomName_1.generateRandomName)();
        if (isElement)
            controls.push({ [`${name}${value.getPath()}`]: {} });
        else if (typeof value === 'string') {
            this.addElement({ extend: value, name });
            return this;
        }
        else {
            if (value?.extend instanceof JsonUIElement_1.JsonUIElement)
                value.extend = value.extend.getPath().slice(1);
            controls.push({
                [`${name}@${value.extend}`]: {
                    ...(0, ReadJsonUIProperty_1.default)((value instanceof JsonUIElement_1.JsonUIElement) ? {} : value.properties || {})
                }
            });
        }
        Manager_1.CachedManager.writeInitElement(this.screenInitKey, this.screenFile, {
            ..._data,
            controls
        });
        callback?.(name);
        return this;
    }
    ;
    setFactory(factory_data, control_name, callback) {
        const rndName = control_name?.name || (0, GenerateRandomName_1.generateRandomName)();
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
                control_name: (() => (control_name instanceof JsonUIElement_1.JsonUIElement)
                    ? `${rndName}${control_name.getPath()}` : (typeof control_name === 'string') ? `${rndName}@${control_name}` : `${rndName}${(() => (control_name.extend instanceof JsonUIElement_1.JsonUIElement) ? control_name.extend.getPath() : `@${control_name.extend}`)()}`)()
            }
        });
        callback?.(rndName);
        return this;
    }
    addPropertyBag(propertyBag) {
        return this.setProperty({
            property_bag: {
                ...this.getProperty('property_bag'),
                ...propertyBag
            }
        });
    }
    remove() {
        Manager_1.CachedManager.removeInitElement(this.screenInitKey, this.screenFile);
        delete jsonUIScreen[this.screenFile][this.screenInitKey];
        const initKeys = this.screenInitKey.split('/');
        if (initKeys.length === 1)
            this.setProperty({ ignored: true });
        else {
            const k = initKeys.pop();
            JsonUIObject.register(initKeys.join('/'), this.screenFile).modifications.controls.remove(k || "");
        }
    }
    debug() {
        return Manager_1.CachedManager.debugUI(this.screenFile, this.screenInitKey, true);
    }
}
exports.JsonUIObject = JsonUIObject;
