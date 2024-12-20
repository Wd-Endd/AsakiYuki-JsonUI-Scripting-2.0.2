import { JsonUIProperty } from "../jsonUITypes/JsonUIProperty";
/**
 * Modifies and reads a JsonUIProperty object.
 *
 * @param property - The JsonUIProperty object to be modified and read.
 * @returns The modified JsonUIProperty object.
 */
export default function ModifyReadJsonUIProperty(properties: JsonUIProperty): JsonUIProperty;
/**
 * Reads a property value and performs specific operations based on its type.
 *
 * @param value - The value to be read.
 * @param isVariable - A flag indicating whether the value is a variable.
 * @returns The modified or original value.
 */
export declare function ReadProperty(value: any, isVariable?: boolean): any;
