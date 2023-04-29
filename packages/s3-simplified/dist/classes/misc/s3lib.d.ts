import { IS3, S3BucketService } from "../../interfaces";
import { UserConfig } from "../../interfaces";
import { bucketStatus } from "../../types";
export declare class S3Lib implements IS3 {
    private readonly internal;
    constructor(config: UserConfig);
    createBucket(bucketName: string): Promise<S3BucketService>;
    deleteBucket(bucketName: string): Promise<void>;
    listBuckets(): Promise<Array<string>>;
    getBucket(bucketName: string): Promise<S3BucketService>;
    getOrCreateBucket(bucketName: string): Promise<S3BucketService>;
    getBucketStatus(bucketName: string): Promise<bucketStatus>;
    private assetBucketOwnership;
    private validateBucketName;
}
