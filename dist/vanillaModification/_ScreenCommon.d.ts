import { Animation } from "..";
import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { BindingInterface } from "../jsonUITypes/BindingInterface";
import { ButtonMapping } from "../jsonUITypes/ButtonMapping";
import { FactoryInterface } from "../jsonUITypes/Factory";
import { GetJsonUIInitGenerateName } from "../jsonUITypes/GetJsonUIGenerateName";
import { ElementInterface, InsertElementInterface } from "../jsonUITypes/InsertElementInterface";
import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
import { Variables } from "../jsonUITypes/Variables";
interface ModifyControls {
    swap: (where: object, target: object) => ModifyControls;
    replace: (where: object | string, value: object) => ModifyControls;
    remove: (where: object | string) => ModifyControls;
    insertBack: (value: InsertElementInterface | JsonUIElement | (InsertElementInterface | JsonUIElement)[], callback?: GetJsonUIInitGenerateName) => ModifyControls;
    insertFront: (value: InsertElementInterface | JsonUIElement | (InsertElementInterface | JsonUIElement)[], callback?: GetJsonUIInitGenerateName) => ModifyControls;
    insertBefore: (from: string, value: InsertElementInterface | JsonUIElement | (InsertElementInterface | JsonUIElement)[], callback?: GetJsonUIInitGenerateName) => ModifyControls;
    insertAfter: (from: string, value: InsertElementInterface | JsonUIElement | (InsertElementInterface | JsonUIElement)[], callback?: GetJsonUIInitGenerateName) => ModifyControls;
}
interface ModifyBindings {
    swap: (where: BindingInterface, target: BindingInterface) => ModifyBindings;
    replace: (where: BindingInterface, value: BindingInterface) => ModifyBindings;
    remove: (where: BindingInterface) => ModifyBindings;
    insertBack: (value: (BindingInterface | string)[]) => ModifyBindings;
    insertFront: (value: (BindingInterface | string)[]) => ModifyBindings;
    insertBefore: (from: BindingInterface, value: (BindingInterface | string)[]) => ModifyBindings;
    insertAfter: (from: BindingInterface, value: (BindingInterface | string)[]) => ModifyBindings;
}
interface ModifyButtonMapping {
    swap: (where: ButtonMapping, target: ButtonMapping) => ModifyButtonMapping;
    replace: (where: ButtonMapping, value: ButtonMapping) => ModifyButtonMapping;
    remove: (where: ButtonMapping) => ModifyButtonMapping;
    insertBack: (value: ButtonMapping) => ModifyButtonMapping;
    insertFront: (value: ButtonMapping) => ModifyButtonMapping;
    insertBefore: (from: ButtonMapping, value: ButtonMapping) => ModifyButtonMapping;
    insertAfter: (from: ButtonMapping, value: ButtonMapping) => ModifyButtonMapping;
}
interface ModifyVariables {
    swap: (where: Variables, target: Variables) => ModifyVariables;
    replace: (where: Variables, value: Variables) => ModifyVariables;
    remove: (where: Variables) => ModifyVariables;
    insertBack: (value: Variables) => ModifyVariables;
    insertFront: (value: Variables) => ModifyVariables;
    insertBefore: (from: Variables, value: Variables) => ModifyVariables;
    insertAfter: (from: Variables, value: Variables) => ModifyVariables;
}
interface ModificationInterface {
    controls: ModifyControls;
    bindings: ModifyBindings;
    buttonMappings: ModifyButtonMapping;
    variables: ModifyVariables;
}
/**
 * Class representing a JsonUIObject.
 * This class is used to manage and manipulate screen initialization data.
 */
export declare class JsonUIObject {
    private screenFile;
    private screenInitKey;
    private elementModifyKey;
    modifications: ModificationInterface;
    /**
    * Create a new JsonUIObject instance.
    * @param screenInitKey - The unique key for the screen initialization.
    * @param screenFile - The file path of the screen initialization.
    * @param extend - Optional parameter to extend the screen initialization with another element or path.
    */
    constructor(screenInitKey: string, screenFile: string, extend?: string | JsonUIElement, property?: JsonUIProperty);
    static register(screenInitKey: string, screenFile: string, extend?: string | JsonUIElement, property?: JsonUIProperty): JsonUIObject;
    /**
     * Set a property in the screen initialization data.
     * @param property - The property to set.
     * @returns The instance of JsonUIObject for method chaining.
     */
    setProperty(properties: JsonUIProperty): this;
    private getProperty;
    private swap;
    private replace;
    private _remove;
    /**
     * Inserts an element at the end of the specified array in the screen initialization data.
     * @param arrayName - The name of the array to insert into.
     * @param value - The value to insert.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    private insertBack;
    /**
     * Inserts an element at the beginning of the specified array in the screen initialization data.
     * @param arrayName - The name of the array to insert into.
     * @param value - The value to insert.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    private insertFront;
    /**
    * Insert an element into a specific array in the screen initialization data.
    * @param type - The type of insertion ('back' or 'front').
    * @param arrayName - The name of the array to insert into.
    * @param value - The value to insert.
    * @param callback - Optional callback function to be executed after insertion.
    * @returns The instance of JsonUIObject for method chaining.
    */
    private insert;
    /**
     * Inserts an element before a specific element in the specified array in the screen initialization data.
     * @param arrayName - The name of the array to insert into.
     * @param from - The element to insert before. Can be a string, BindingInterface, ButtonMapping, or Variables.
     * @param value - The value to insert. Can be InsertElementInterface, JsonUIElement, array of BindingInterface or string, ButtonMapping, or Variables.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    private insertBefore;
    /**
     * Inserts an element after a specific element in the specified array in the screen initialization data.
     * @param arrayName - The name of the array to insert into.
     * @param from - The element to insert after. Can be a string, BindingInterface, ButtonMapping, or Variables.
     * @param value - The value to insert. Can be InsertElementInterface, JsonUIElement, array of BindingInterface or string, ButtonMapping, or Variables.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    private insertAfter;
    /**
     * Private method to handle insert operations in the screen initialization data.
     * @param type - The type of insertion ('before' or 'after').
     * @param arrayName - The name of the array to insert into.
     * @param from - The element to insert before or after. Can be a string, BindingInterface, ButtonMapping, or Variables.
     * @param value - The value to insert. Can be InsertElementInterface, JsonUIElement, array of BindingInterface or string, ButtonMapping, or Variables.
     * @param callback - Optional callback function to be executed after insertion.
     * @returns The instance of JsonUIObject for method chaining.
     */
    private _insert;
    /**
     * Add bindings to the screen initialization data.
     * @param data - The bindings to add.
     */
    addBindings(data: (BindingInterface | string | string[])[] | BindingInterface | string): this;
    /**
     * Add keybinds to the screen initialization data.
     * @param data - The keybinds to add.
     */
    addKeybind(data: ButtonMapping | ButtonMapping[]): this;
    /**
     * Add variables to the screen initialization data.
     * @param data - The variables to add.
     */
    addVariables(data: Variables): this;
    /**
     *
     */
    addAnimation(data: Animation): this;
    /**
    * Add an element to the screen initialization data.
    * @param value - The element to add.
    * @param callback - Optional callback function to be executed after addition.
    * @returns The name of the added element if callback is not provided, otherwise the instance of JsonUIObject for method chaining.
    */
    addElement(value: InsertElementInterface | JsonUIElement | string, callback?: (name: string) => void | null): this;
    setFactory(factory_data: string | FactoryInterface, control_name: ElementInterface | JsonUIElement | string, callback?: (name: string) => void): this;
    addPropertyBag(propertyBag: object): this;
    remove(): void;
    private debug;
}
export {};
