import {Readable} from "stream";
import {IMetadata, IS3Object, IS3ObjectJSON} from "../../interfaces";
import {S3BucketInternal} from "../buckets/s3BucketInternal";
import {Config} from "../../interfaces/config";

export class S3Object implements IS3Object {

    constructor(private metadata: IMetadata, private bucketSource: S3BucketInternal, private config: Config, private body?: Readable) {
        const editableMetadata = this.metadata.asRecord();
        const type = this.Type;
        if (this.Extension !== undefined) return;
        if (type !== undefined) {
            editableMetadata["file-type"] = type.split("/")[1];
            return;
        }
        //guess from filename
        const filename = this.key;
        const extension = filename.split(".")[1];
        if (extension !== undefined) editableMetadata["file-type"] = extension;

    }

    public get Body(): Readable | undefined {
        return this.body;
    }

    public get key(): string {
        return this.Id
    }

    public get Metadata(): IMetadata {
        return this.metadata;
    }

    public get DataSize(): number | undefined {
        const sizeStr = this.metadata.get("Content-Length");
        if (sizeStr === undefined) return undefined;
        return parseInt(sizeStr);
    }

    public get Type(): string | undefined {
        return this.metadata.get("content-type");
    }

    public get Extension(): string | undefined {
        return this.metadata.get("file-type");
    }

    public get UUID(): string {
        const uuid = this.metadata.get("content-disposition");
        if (uuid) return uuid;
        throw new Error("UUID not found");
    }

    public get Id(): string {
        const id = this.metadata.get("identifier");
        if (id) return id;
        return this.UUID;
    }

    public async generateLink(): Promise<string> {
        return await this.bucketSource.isPublic() ?
            this.bucketSource.generatePublicUrl(this.key) :
            await this.bucketSource.generateSignedUrl(this.key, this.config.signedUrl);
    }

    public async toJSON(): Promise<IS3ObjectJSON> {
        return {
            FileLink: await this.generateLink(),
            Metadata: this.Metadata.Pairs,
        };
    }
}
