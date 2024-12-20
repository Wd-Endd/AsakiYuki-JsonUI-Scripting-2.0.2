/**
 * A utility class for working with colors represented as hexadecimal strings.
 */
export declare class ColorHandler {
    /**
     * Parses a hexadecimal color string into an array of color components.
     *
     * @param data - The hexadecimal color string to parse.
     * @returns An array of color components (red, green, blue, alpha) or null if the input is invalid.
     *
     * @remarks
     * The input string can be in the following formats:
     * - RGB: "RRGGBB"
     * - RGBA: "RRGGBBAA"
     * - RGB (short form): "RGB"
     * - RGBA (short form): "RGBA"
     *
     * The color components are returned as floating-point numbers in the range [0, 1].
     */
    static parse(data: string): [number, number, number] | [number, number, number, number] | null;
}
