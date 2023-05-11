import {Regions} from "../types";

/**
 * The keys for the aws account
 */
export interface AccessKey {
    id: string,
    secret: string,
}

/**
 * The settings for multipart upload
 */
export interface MultiPartUploadConfig {

    /**
     * The maximum size of each part in bytes
     */
    maxPartSize: number,

    /**
     * The threshold for multipart upload to be used instead of the regular upload
     */
    enabledThreshold: number,
}

/**
 * The settings for signed urls
 */

export interface SignedUrlConfig {

    /**
     * The expiration time of the signed url in seconds
     */
    expiration: number,
}

/**
 * The required configuration for the s3 library
 */
export interface RequiredConfig {
    /**
     * The region of the aws to fetch the bucket from
     * @see {@link Regions}
     */
    region: Regions,
}

/**
 * The required configuration for the s3 library
 */
export interface CredentialsConfig {

    /**
     * The access key and secret access key of the aws account
     */
    accessKey: AccessKey,
}

/**
 * The required configuration for the s3 library
 */
export interface ObjectCreationConfig {

    /**
     * Whether to append the file type to the key
     * e.g. if the key is "test" and the file type is "png", the key will be "test.png"
     * The reason why you might want this is that it allows you to set the content type of the file in AWS directly without having to look at the metadata
     * @note This would only affect new uploads, not existing ones
     */
    appendFileTypeToKey: boolean,



    /**
     * The settings for multipart upload
     */
    multiPartUpload: MultiPartUploadConfig
}

/**
 * The optional configuration for the s3 library
 */
export interface OptionalConfig {

    /**
     * The settings for signed urls
     */
    signedUrl: SignedUrlConfig

    /**
     * Whether to append the file type to the key
     * e.g. if the key is "test" and the file type is "png", the key will be "test.png"
     * The reason why you might want this is that it allows you to set the content type of the file in AWS directly without having to look at the metadata
     * @note This would only affect new uploads, not existing ones
     */
    objectCreation: ObjectCreationConfig,
}

/**
 * The configuration for the s3 library
 */
export interface Config extends RequiredConfig, OptionalConfig {
}

/**
 * The configuration for the s3 library
 */
export interface UserConfig extends RequiredConfig, CredentialsConfig, Partial<OptionalConfig> {
}
