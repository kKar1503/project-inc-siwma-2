import { S3BucketService } from "./S3BucketService";
import { bucketStatus } from "../types";
/**
 * An interface for interacting with Amazon S3.
 */
export interface IS3 {
    /**
     * Creates a new bucket with the given name.
     * @param {string} bucketName - The name of the bucket to create.
     * @returns {Promise<S3BucketService>} A promise that resolves to a new S3BucketService object for the created bucket.
     */
    createBucket(bucketName: string): Promise<S3BucketService>;
    /**
     * Deletes the bucket with the given name.
     * @param {string} bucketName - The name of the bucket to delete.
     * @returns {Promise<void>} A promise that resolves when the bucket is deleted.
     */
    deleteBucket(bucketName: string): Promise<void>;
    /**
     * Lists all buckets.
     * @returns {Promise<Array<string>>} A promise that resolves to an array of all bucket names.
     */
    listBuckets(): Promise<Array<string>>;
    /**
     * Returns an S3BucketService object for the given bucket name.
     * @param {string} bucketName - The name of the bucket.
     * @returns {Promise<S3BucketService>} A promise that resolves to an S3BucketService object for the given bucket name.
     * @throws {Error} An error is thrown if the bucket does not exist.
     */
    getBucket(bucketName: string): Promise<S3BucketService>;
    /**
     * Returns an S3BucketService object for the given bucket name.
     * If the bucket does not exist, it will be created.
     * @param {string} bucketName - The name of the bucket.
     * @returns {Promise<S3BucketService>} A promise that resolves to an S3BucketService object for the given bucket name.
     */
    getOrCreateBucket(bucketName: string): Promise<S3BucketService>;
    /**
     * Returns the status of the given bucket.
     * @param bucketName - The name of the bucket.
     * @returns {Promise<bucketStatus>} A promise that resolves to the status of the bucket.
     */
    getBucketStatus(bucketName: string): Promise<bucketStatus>;
}
