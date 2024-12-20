"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectMap = exports.objectForEach = void 0;
/**
 * Iterates over the properties of an object and invokes a callback function for each property.
 *
 * @param data - The object to iterate over.
 * @param callback - A function to execute for each property. The function receives the property value and key as arguments.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 };
 * objectForEach(obj, (value, key) => {
 *   console.log(`Key: ${key}, Value: ${value}`);
 * });
 * // Output:
 * // Key: a, Value: 1
 * // Key: b, Value: 2
 * // Key: c, Value: 3
 * ```
 */
function objectForEach(data, callback) {
    for (const key in data)
        callback(data[key], key);
}
exports.objectForEach = objectForEach;
function objectMap(data, callback) {
    objectForEach(data, (v, k) => {
        delete data[k];
        data = {
            ...data,
            ...callback(v, k)
        };
    });
    return data;
}
exports.objectMap = objectMap;
