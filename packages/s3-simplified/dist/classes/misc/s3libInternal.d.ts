import { S3 } from "@aws-sdk/client-s3";
import { S3BucketService } from "../../interfaces";
import { Config, UserConfig } from "../../interfaces/config";
import { bucketStatus } from "../../types";
export declare class S3libInternal {
    readonly s3: S3;
    readonly config: Config;
    constructor(config: UserConfig);
    createBucket(bucketName: string): Promise<S3BucketService>;
    deleteBucket(bucketName: string): Promise<void>;
    listBuckets(): Promise<Array<string>>;
    getBucket(bucketName: string): Promise<S3BucketService>;
    getBucketStatus(bucketName: string): Promise<bucketStatus>;
}
