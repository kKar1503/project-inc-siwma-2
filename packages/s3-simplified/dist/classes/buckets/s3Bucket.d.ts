import { IS3Object, S3BucketService } from "../../interfaces";
import { S3ObjectBuilder } from "../objects/s3ObjectBuilder";
import { S3libInternal } from "../misc/s3libInternal";
export declare class S3Bucket implements S3BucketService {
    private internal;
    private readonly config;
    /**
     * @internal
     * @param lib
     * @param bucketName
     */
    constructor(lib: S3libInternal, bucketName: string);
    createObject(s3Object: S3ObjectBuilder): Promise<IS3Object>;
    getObject(key: string): Promise<IS3Object>;
    getObjects(keys: string[]): Promise<IS3Object[]>;
    deleteObject(key: string): Promise<void>;
    deleteObjects(keys: string[]): Promise<void>;
    renameObject(oldKey: string, newKey: string): Promise<void>;
    getAllObjects(): Promise<IS3Object[]>;
    contains(key: string): Promise<boolean>;
    listContent(): Promise<Array<string>>;
    protected assertExists(key: string): Promise<void>;
    protected assertNoConflicts(key: string): Promise<void>;
}
