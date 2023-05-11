/**
 * A collection of key-value pairs representing metadata associated with an S3 object.
 * @interface
 */
export interface IMetadata {

    /**
     * Gets the value for the given key.
     * @param {string} key - The key.
     * @returns {string | undefined} - The value for the given key, or undefined if the key is not found.
     */
    get(key: string): string | undefined

    /**
     * Gets all keys.
     * @returns {string[]} - An array of all keys.
     */
    get Keys(): string[]

    /**
     * Gets all values.
     * @returns {string[]} - An array of all values.
     */
    get Values(): string[]

    /**
     * Gets all key-value pairs.
     * @returns {[string, string][]} - An array of all key-value pairs.
     */
    get Pairs(): [string, string][]

    /**
     * Returns the number of key-value pairs.
     * @returns {number} - The number of key-value pairs.
     */
    Length(): number

    /**
     * Checks if the metadata is empty.
     * @returns {boolean} - true if the metadata is empty, false otherwise.
     */
    isEmpty(): boolean

    /**
     * Checks if the metadata contains the given key.
     * @param {string} key - The key.
     * @returns {boolean} - true if the metadata contains the given key, false otherwise.
     */
    containsKey(key: string): boolean

    /**
     * Checks if the metadata contains the given value.
     * @param {string} value - The value.
     * @returns {boolean} - true if the metadata contains the given value, false otherwise.
     */
    containsValue(value: string): boolean

    /**
     * Checks if the metadata contains the given key-value pair.
     * @param {[string, string]} entry - The key-value pair.
     * @returns {boolean} - true if the metadata contains the given key-value pair, false otherwise.
     */
    contains(entry: [string, string]): boolean

    /**
     * Copies the metadata to a record.
     * @returns {Record<string, string>} - A record containing the metadata.
     */
    toRecord(): Record<string, string>

    /**
     * Returns the metadata as a record.
     * @returns {Record<string, string>} - A record containing the metadata.
     */
    asRecord(): Record<string, string>
}
