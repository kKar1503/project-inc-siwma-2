/// <reference types="node" />
/// <reference types="node" />
import { Readable } from "stream";
type AcceptedDataTypes = Readable | ReadableStream | Blob | string | Uint8Array | Buffer;
export declare function ConvertToBuffer(data: AcceptedDataTypes): Promise<Buffer>;
export {};
