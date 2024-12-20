import { BindingInterface } from "../jsonUITypes/BindingInterface";
import { ButtonMapping } from "../jsonUITypes/ButtonMapping";
import { GetJsonUIGenerateName, GetJsonUIGenerateNames } from "../jsonUITypes/GetJsonUIGenerateName";
import { ElementInterface, InsertElementInterface } from "../jsonUITypes/InsertElementInterface";
import { JsonUIElementInterface, StaticJsonUIElementInterface } from "../jsonUITypes/JsonUIElementInterface";
import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
import { Renderer } from "../jsonUITypes/Renderer";
import { Variables } from "../jsonUITypes/Variables";
import { Animation } from "./Animation";
import { ExtendInterface } from "../jsonUITypes/ExtendInterface";
import { ElementButtonInterface } from "../jsonUITypes/elementTypes/Button";
import { ElementCollectionPanelInterface } from "../jsonUITypes/elementTypes/CollectionPanel";
import { ElementCustomInterface } from "../jsonUITypes/elementTypes/Custom";
import { ElementDropdownInterface } from "../jsonUITypes/elementTypes/Dropdown";
import { ElementEditBoxInterface } from "../jsonUITypes/elementTypes/EditBox";
import { ElementFactoryInterface } from "../jsonUITypes/elementTypes/Factory";
import { ElementGirdInterface } from "../jsonUITypes/elementTypes/Gird";
import { ElementImageInterface } from "../jsonUITypes/elementTypes/Image";
import { ElementLabelInterface } from "../jsonUITypes/elementTypes/Label";
import { ElementPanelInterface } from "../jsonUITypes/elementTypes/panel";
import { ElementScreenInterface } from "../jsonUITypes/elementTypes/Screen";
import { ElementScrollbarBoxInterface } from "../jsonUITypes/elementTypes/ScrollbarBox";
import { ElementScrollbarTrackInterface } from "../jsonUITypes/elementTypes/ScrollbarTrack";
import { ElementScrollViewInterface } from "../jsonUITypes/elementTypes/ScrollView";
import { ElementSelectionWheelInterface } from "../jsonUITypes/elementTypes/SelectionWheel";
import { ElementSliderInterface } from "../jsonUITypes/elementTypes/Slider";
import { ElementSliderBoxInterface } from "../jsonUITypes/elementTypes/SliderBox";
import { ElementStackPanelInterface } from "../jsonUITypes/elementTypes/StackPanel";
import { ElementToggleInterface } from "../jsonUITypes/elementTypes/Toggle";
import { ElementInputPanelInterface } from "../jsonUITypes/elementTypes/InputPanel";
import { FactoryInterface } from "../jsonUITypes/Factory";
/**
 * Class representing a JSON UI element.
 */
export declare class JsonUIElement {
    private data;
    private elementJsonUIKey;
    private elementType?;
    private properties;
    /**
     * Create a new instance of JsonUIElement.
     * @param data - The initial data for the JSON UI element.
     * @example
     * ```typescript
     * const element = new JsonUIElement({ type: ElementTypes.Panel });
     * ```
     */
    private static apply;
    private static arguments;
    private static bind;
    private static call;
    private static caller;
    private static length;
    private static name;
    private static toString;
    constructor(data?: JsonUIElementInterface);
    /**
     * A element container, like ```div``` in HTML.
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static panel(properties?: ElementPanelInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * 	Similar to ```panel``` but stacks its children depending on ```orientation``` property value
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static stackPanel(properties?: ElementStackPanelInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * Similar to ```stack_panel```, but does not have the ```orientation``` property
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static collectionPanel(properties?: ElementCollectionPanelInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * A button and it can have 4 states (default, hover, pressed and locked)
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static button(properties?: ElementButtonInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * A toggle and it has 2 states (checked or unchecked). Each state has a hover and locked variant
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static toggle(properties?: ElementToggleInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * A input panel
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static inputPanel(properties?: ElementInputPanelInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * 	Range input element
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static slider(properties?: ElementSliderInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * Text element
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static label(properties?: ElementLabelInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * Sprite element. Draws a texture.
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static image(properties?: ElementImageInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * Text field element. By default it's single-lined
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static editBox(properties?: ElementEditBoxInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * Grid of elements
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static grid(properties?: ElementGirdInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * A toggle for dropdown purposes
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static dropdown(properties?: ElementDropdownInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * The slider button that you use to change the slider value	Slider Box
Input
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static sliderBox(properties?: ElementSliderBoxInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * Creates a scrolling panel element
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static scrollView(properties?: ElementScrollViewInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * The scrollbar track
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static scrollbarTrack(properties?: ElementScrollbarTrackInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * The scrollbar "thumb"/button. The draggable scrolling handle. By default is oriented vertically
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static scrollbarBox(properties?: ElementScrollbarBoxInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * A element generator
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static factory(properties?: ElementFactoryInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * Screen element
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static screen(properties?: ElementScreenInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * Special renderer element that is created in the code because it's too complex for JSON UI
     * @param renderer
     * @param properties
     * @param jsonUIElement
     * @returns
     */
    static custom(renderer: Renderer, property_bag: object, properties?: ElementCustomInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    static selectionWheel(properties?: ElementSelectionWheelInterface, jsonUIElement?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * Create a copy of an element
     * @param jsonUIElement
     * @param data
     * @param properties
     * @returns
     */
    static extendOf(jsonUIElement: JsonUIElement | ExtendInterface | string, properties?: JsonUIProperty, data?: StaticJsonUIElementInterface): JsonUIElement;
    /**
     * Get the unique key for the JSON UI element.
     * @returns The unique key for the JSON UI element.
     */
    getElementJsonUIKey(): string;
    /**
     * Get the path of the JSON UI element.
     * @returns The path of the JSON UI element.
     */
    getPath(): string;
    /**
     * Register global variables for the JSON UI element.
     * @param variableObject - The object containing the global variables.
     * @returns The instance of JsonUIElement for method chaining.
     */
    registerGlobalVariable(variableObject: object): this;
    clone(properties?: JsonUIProperty): JsonUIElement;
    extend(properties?: JsonUIProperty): JsonUIElement;
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
    addElement(value?: InsertElementInterface | JsonUIElement | string, callback?: GetJsonUIGenerateName): this;
    /**
     * Add an array of child elements to the JSON UI element.
     * @param data - The array of child elements.
     * @param callback - The callback function to be called after adding the child elements.
     * @returns The instance of JsonUIElement for method chaining.
     */
    addElementArray(data: JsonUIElement[], callback?: GetJsonUIGenerateNames): this;
    /**
     * Add variables to the JSON UI element.
     * @param data - The variables to be added.
     * @returns The instance of JsonUIElement for method chaining.
     */
    addVariables(data: Variables): this;
    /**
     * Add keybinds to the JSON UI element.
     * @param data - The keybinds to be added.
     * @returns The instance of JsonUIElement for method chaining.
     */
    addKeybind(data: ButtonMapping | ButtonMapping[]): this;
    /**
     * Add bindings to the JSON UI element.
     * @param data - The bindings to be added.
     * @returns The instance of JsonUIElement for method chaining.
     */
    addBindings(data: (BindingInterface | string | string[])[] | BindingInterface | string): this;
    /**
     * Add an animation to the JSON UI element.
     * @param data - The animation to be added.
     * @returns The instance of JsonUIElement for method chaining.
     */
    addAnimation(data: (Animation | string)[] | (Animation | string), startAtState?: number): this;
    /**
     * Add a variable to the JSON UI element.
     * @param propertyKey - The key of the property to be updated.
     * @param default_value - The default value of the variable.
     * @param callback - The callback function to be called after adding the variable.
     * @returns The instance of JsonUIElement for method chaining or the name of the variable.
     */
    addVariable(propertyKey: string, default_value: any, callback?: ((arg: JsonUIElement, variable_name: string) => void)): this;
    /**
     * Set properties of the JSON UI element.
     * @param data - The properties to be set.
     * @returns The instance of JsonUIElement for method chaining.
     */
    setProperty(data: JsonUIProperty): this;
    setFactory(factory_data: FactoryInterface | string, control?: (ElementInterface | JsonUIElement | string) | {
        [key: string]: (ElementInterface | JsonUIElement | string);
    }, callback?: GetJsonUIGenerateName): this;
    addPropertyBag(propertyBag: object): this;
    /**
     *
     */
    private debug;
}
