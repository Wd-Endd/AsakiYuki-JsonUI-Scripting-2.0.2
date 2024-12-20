import { ButtonMapping } from "../jsonUITypes/ButtonMapping";
import { ToKeybind } from "../jsonUITypes/ToKeyBind";
export declare class ButtonKeybindSetup {
    static pressed(onClickKey: ToKeybind | string): ButtonMapping[];
    static doublePressed(onClickKey: ToKeybind | string): ButtonMapping[];
    private static apply;
    private static arguments;
    private static bind;
    private static call;
    private static caller;
    private static length;
    private static name;
    private static toString;
}
