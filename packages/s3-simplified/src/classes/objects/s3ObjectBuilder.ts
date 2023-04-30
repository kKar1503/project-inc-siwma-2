import {Readable} from "stream";
import {Metadata} from "../misc/metadata";
import {generateHash} from "../../utils/generateHash";
import {IMetadata} from "../../interfaces";
import {FileTypeParser} from "../../utils/fileTypeParser";
import {ConvertToBuffer} from "../../utils/convertToBuffer";

type AcceptedDataTypes = Readable | ReadableStream | Blob | string | Uint8Array | Buffer

export class S3ObjectBuilder {
    private data: BufferManager

    constructor(data: AcceptedDataTypes, private metadata: Metadata = new Metadata()) {
        this.data = new BufferManager(data);
    }

    public get Body(): Promise<Buffer> {
        return this.data.getBuffer();
    }

    public get Metadata(): IMetadata {
        return this.metadata;
    }

    public get DataSize(): Promise<number> {
        const sizeStr = this.metadata.get("Content-Length");
        if (sizeStr !== undefined) return new Promise<number>(resolve => resolve(parseInt(sizeStr)));
        return this.data.getBuffer().then(buffer => {
            const size = buffer.length;
            this.metadata.set("Content-Length", size.toString());
            return size;
        });

    }

    public get Type(): string | undefined {
        return this.metadata.get("Content-Type");
    }

    public get Extension(): string | undefined {
        const ext = this.metadata.get("File-Type");
        if (ext) return ext;
        return this.generateExtension();
    }

    private generateExtension(): string | undefined {
        const type = this.Type;
        if (type === undefined) return undefined;
        const fileType = FileTypeParser(type);
        this.metadata.set("File-Type", fileType);
        return fileType;
    }

    public get UUID(): Promise<string> {
        const uuid = this.metadata.get("content-disposition");
        if (uuid) return new Promise<string>(resolve => resolve(uuid));
        return this.data.getBuffer().then(buffer => {
            const uuid = generateHash(buffer);
            this.metadata.set("content-disposition", uuid);
            return uuid;
        });
    }


    public async AsBuffer(): Promise<Buffer> {
        return await this.data.getBuffer();
    }


}

class BufferManager {
    private buffer?: Buffer
    private readonly promise: Promise<Buffer>

    constructor(data: AcceptedDataTypes) {
        this.promise = ConvertToBuffer(data)
    }

    public async getBuffer(): Promise<Buffer> {
        if (this.buffer) return this.buffer;
        this.buffer = await this.promise;
        return this.buffer;
    }
}
