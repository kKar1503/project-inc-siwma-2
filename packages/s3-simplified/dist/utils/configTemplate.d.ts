import { Regions } from "../types";
/**
 * The configuration for the s3 library
 */
export interface ConfigTemplate {
    /**
     * The access key and secret access key of the aws account
     * This setting only affects {@link S3Lib.Default}, if the keys are needed, construct {@link S3Lib} directly
     */
    accessKey: {
        id: string;
        secret: string;
    };
    /**
     * The region of the aws to fetch the bucket from
     * This setting only affects {@link S3Lib.Default}, if the multiple regions are needed, construct {@link S3Lib} directly
     * @see {@link Regions}
     */
    region: Regions;
    /**
     * The settings for multipart upload
     */
    multiPartUpload: {
        /**
         * The maximum size of each part in bytes
         */
        maxPartSize: number;
        /**
         * The threshold for multipart upload to be used instead of the regular upload
         */
        enabledThreshold: number;
    };
    /**
     * The settings for signed urls
     */
    signedUrl: {
        /**
         * The expiration time of the signed url in seconds
         */
        expiration: number;
    };
    /**
     * Whether to append the file type to the key
     * e.g. if the key is "test" and the file type is "png", the key will be "test.png"
     * The reason why you might want this is that it allows you to set the content type of the file in AWS directly without having to look at the metadata
     * @note This would only affect new uploads, not existing ones
     */
    appendFileTypeToKey: boolean;
}
export declare const defaultConfig: Partial<ConfigTemplate>;
