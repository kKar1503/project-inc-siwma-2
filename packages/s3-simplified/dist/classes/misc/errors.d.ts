declare abstract class InvalidError extends Error {
}
export declare class MissingBucket extends InvalidError {
    constructor(bucketName: string);
}
export declare class InvalidBucketName extends InvalidError {
    constructor(bucketName: string, message?: string);
}
export declare class MissingObject extends InvalidError {
    constructor(key: string, bucketName: string);
}
export declare class ExistingObject extends InvalidError {
    constructor(key: string, bucketName: string);
}
export {};
