import {IMetadata} from "./IMetadata";

export type IHashFunction = (buffer: Buffer | undefined, metadata: Record<string, string>|undefined) => Promise<string>;
