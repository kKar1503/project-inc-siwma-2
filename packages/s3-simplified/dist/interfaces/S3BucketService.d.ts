import { IS3Object } from "./IS3Object";
import { S3ObjectBuilder } from "../classes";
/**
 * Provides methods for interacting with an AWS S3 bucket.
 */
export interface S3BucketService {
    /**
     * Creates an S3 object from an S3ObjectBuilder.
     * @param {S3ObjectBuilder} s3ObjectBuilder - The object to be created.
     * @returns {Promise<IS3Object>} - A promise that resolves with the created object.
     */
    createObject(s3ObjectBuilder: S3ObjectBuilder): Promise<IS3Object>;
    /**
     * Retrieves an S3 object with the specified key.
     * @param {string} key - The key of the object to retrieve.
     * @returns {Promise<IS3Object>} - A promise that resolves with the retrieved object.
     */
    getObject(key: string): Promise<IS3Object>;
    /**
     * Retrieves an array of S3 objects with the specified keys.
     * @param {string[]} keys - The keys of the objects to retrieve.
     * @returns {Promise<IS3Object[]>} - A promise that resolves with the retrieved objects.
     */
    getObjects(keys: string[]): Promise<IS3Object[]>;
    /**
     * Deletes the S3 object with the specified key.
     * @param {string} key - The key of the object to delete.
     * @returns {Promise<void>} - A promise that resolves when the object is deleted.
     */
    deleteObject(key: string): Promise<void>;
    /**
     * Deletes the S3 objects with the specified keys.
     * @param {string[]} keys - The keys of the objects to delete.
     * @returns {Promise<void>} - A promise that resolves when all objects are deleted.
     */
    deleteObjects(keys: string[]): Promise<void>;
    /**
     * Retrieves a list of all object keys in the bucket.
     * @returns {Promise<string[]>} - A promise that resolves with an array of object keys.
     */
    listContent(): Promise<string[]>;
    /**
     * Determines if an S3 object with the specified key exists.
     * @param {string} key - The key of the object to check.
     * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating if the object exists.
     */
    contains(key: string): Promise<boolean>;
    /**
     * Renames an S3 object with the specified key to a new key.
     * @param {string} oldKey - The key of the object to rename.
     * @param {string} newKey - The new key for the object.
     * @returns {Promise<void>} - A promise that resolves when the object is renamed.
     */
    renameObject(oldKey: string, newKey: string): Promise<void>;
    /**
     * Retrieves all S3 objects in the bucket.
     * @returns {Promise<IS3Object[]>} - A promise that resolves with an array of all objects.
     */
    getAllObjects(): Promise<IS3Object[]>;
}
