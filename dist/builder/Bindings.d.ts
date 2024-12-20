import { BindingInterface } from "../jsonUITypes/BindingInterface";
/**
 * Bindings Handle function to process and format the binding expressions.
 *
 * @param bindings - The array of binding expressions to process.
 * @returns An array of formatted binding expressions.
 */
export declare function BindingsHandle(bindings: (BindingInterface | string | string[])[]): BindingInterface[];
