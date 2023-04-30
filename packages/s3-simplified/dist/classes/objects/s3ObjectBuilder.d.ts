/// <reference types="node" />
/// <reference types="node" />
import { Readable } from "stream";
import { Metadata } from "../misc/metadata";
import { IMetadata } from "../../interfaces";
type AcceptedDataTypes = Readable | ReadableStream | Blob | string | Uint8Array | Buffer;
export declare class S3ObjectBuilder {
    private metadata;
    private data;
    constructor(data: AcceptedDataTypes, metadata?: Metadata);
    get Body(): Promise<Buffer>;
    get Metadata(): IMetadata;
    get DataSize(): Promise<number>;
    get Type(): string | undefined;
    get Extension(): string | undefined;
    private generateExtension;
    get UUID(): Promise<string>;
    AsBuffer(): Promise<Buffer>;
}
export {};
