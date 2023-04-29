/// <reference types="node" />
import { Readable } from "stream";
import { IMetadata, IS3Object, IS3ObjectJSON } from "../../interfaces";
import { S3BucketInternal } from "../buckets/s3BucketInternal";
import { Config } from "../../interfaces/config";
export declare class S3Object implements IS3Object {
    private metadata;
    private bucketSource;
    private config;
    private body?;
    constructor(metadata: IMetadata, bucketSource: S3BucketInternal, config: Config, body?: Readable | undefined);
    get Body(): Readable | undefined;
    get key(): string;
    get Metadata(): IMetadata;
    get DataSize(): number | undefined;
    get Type(): string | undefined;
    get Extension(): string | undefined;
    get UUID(): string;
    get Id(): string;
    generateLink(): Promise<string>;
    toJSON(): Promise<IS3ObjectJSON>;
}
