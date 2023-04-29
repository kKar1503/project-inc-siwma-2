import { S3 } from "@aws-sdk/client-s3";
import { IS3Object } from "../../interfaces";
import { S3ObjectBuilder } from "../objects/s3ObjectBuilder";
import { Config, ObjectCreationConfig, SignedUrlConfig } from "../../interfaces/config";
/**
 * An unsafe version of S3 bucket with no validation.
 */
export declare class S3BucketInternal {
    private readonly s3;
    readonly bucketName: string;
    readonly bucketUrl: string;
    private isPublic_cache?;
    /**
     * @internal
     * @param s3 The s3 client to use
     * @param config
     * @param bucketName
     */
    constructor(s3: S3, config: Config, bucketName: string);
    /**
     * Fetches the bucket ACL and bucket policy to determine if the bucket is public.
     * @param bucket The bucket to check
     * @see {@link isPublic} for a cached version of this function
     */
    protected static fetchPublicStatus(bucket: S3BucketInternal): Promise<boolean>;
    isPublic(): Promise<boolean>;
    generateSignedUrl(key: string, signedUrlConfig: SignedUrlConfig): Promise<string>;
    generatePublicUrl(key: string): string;
    getS3ObjectId(s3ObjectBuilder: S3ObjectBuilder, objectConfig: ObjectCreationConfig): string;
    createObject_Single(s3ObjectBuilder: S3ObjectBuilder, config: Config): Promise<IS3Object>;
    createObject_Multipart(s3ObjectBuilder: S3ObjectBuilder, config: Config): Promise<IS3Object>;
    getBucketACL(): Promise<import("@aws-sdk/client-s3").GetBucketAclCommandOutput>;
    getBucketPolicies(): Promise<import("@aws-sdk/client-s3").GetBucketPolicyCommandOutput>;
    getObject(key: string, config: Config, requireBody?: boolean): Promise<IS3Object>;
    deleteObject(key: string): Promise<void>;
    renameObject(oldKey: string, newKey: string): Promise<void>;
    listContents(): Promise<Array<string>>;
    containsObject(key: string): Promise<boolean>;
}
