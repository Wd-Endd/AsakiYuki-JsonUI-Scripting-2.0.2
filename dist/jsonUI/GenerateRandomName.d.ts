/**
 * Generates a random name of a specified length.
 *
 * @param {number} [length=32] - The length of the random name. Default is 25.
 * @returns {string} - A random name of the specified length.
 *
 * @remarks
 * This function uses the `Array.from()` method to create an array of the specified length.
 * Each element in the array is generated by calling `Math.random()` to get a random number between 0 and 1.
 * The random number is then multiplied by 16 and rounded down to the nearest integer using `Math.floor()`.
 * The integer is then converted to a hexadecimal string using `toString(16)`.
 * Finally, the array is joined into a single string using `join('')`.
 *
 * @example
 * ```typescript
 * const randomName = generateRandomName(10);
 * console.log(randomName); // Output: "a1b2c3d4e5"
 * ```
 */
export declare function generateRandomName(length?: number): string;
/**
 * Returns a random namespace from the predefined list.
 *
 * @returns {string} - A random namespace from the predefined list.
 *
 * @remarks
 * This function uses the `Math.random()` function to select a random index from the `namespace` array.
 * The selected namespace is then returned.
 *
 * @example
 * ```typescript
 * const randomNamespace = getRandomNamespace();
 * console.log(randomNamespace); // Output: "a1b2c3d4e5f6g7h8i9j0k1l2"
 * ```
 */
export declare function getRandomNamespace(): string;