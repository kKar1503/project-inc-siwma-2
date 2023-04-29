/// <reference types="node" />
import { IMetadata } from "./IMetadata";
import { Readable } from "stream";
import { IS3ObjectJSON } from "./IS3ObjectJSON";
export interface IS3Object {
    /**
     * Returns a Readable stream containing the object's data.
     */
    get Body(): Readable | undefined;
    /**
     * Returns the object's metadata.
     */
    get Metadata(): IMetadata;
    /**
     * Returns the size of the object's data in bytes.
     */
    get DataSize(): number | undefined;
    /**
     * Returns the MIME type of the object's data (e.g. "image/jpeg").
     */
    get Type(): string | undefined;
    /**
     * Returns the file extension of the object's data (e.g. "jpeg").
     */
    get Extension(): string | undefined;
    /**
     * Returns the base name of the object's data file (e.g. "image").
     */
    get UUID(): string;
    /**
     * Returns the full name of the object's data file, including extension (e.g. "image.jpeg").
     * If the object has no id saved in its metadata, the UUID is used instead.
     */
    get Id(): string;
    /**
     * Generates a link to the S3 object.
     * If the bucket is public, the default public URL is returned.
     * If not, a pre-signed URL is generated and returned.
     * @returns {Promise<string>} A promise that resolves to the URL of the object.
     */
    generateLink(): Promise<string>;
    /**
     * Returns a JSON representation of the S3 object.
     * @returns {Promise<IS3ObjectJSON>} A promise that resolves to a JSON object with the S3 object's metadata.
     */
    toJSON(): Promise<IS3ObjectJSON>;
}
