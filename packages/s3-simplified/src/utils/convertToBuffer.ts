import {Readable} from "stream";
import {InvalidDatatype} from "../classes";

type AcceptedDataTypes = Readable | ReadableStream | Blob | string | Uint8Array | Buffer

function blobToBuffer(blob: Blob): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const buffer = Buffer.from(reader.result as ArrayBuffer);
            resolve(buffer);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
    });
}

function readableToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

function readableStreamToBuffer(stream: ReadableStream): Promise<Buffer> {
    return new Promise(() => {
        const reader = stream.getReader();
        const chunks: Uint8Array[] = [];

        return new Promise(async (resolve, reject) => {
            try {
                while (true) {
                    const {done, value} = await reader.read();
                    if (done) {
                        resolve(Buffer.concat(chunks));
                        break;
                    }
                    if (value) {
                        chunks.push(value);
                    }
                }
            } catch (error) {
                reject(error);
            }
        });
    });
}

export async function ConvertToBuffer(data: AcceptedDataTypes): Promise<Buffer> {
    if (Buffer.isBuffer(data)) return data;
    if (data instanceof Uint8Array) return Buffer.from(data.buffer);
    if (typeof data === 'string') return Buffer.from(data);
    if (data instanceof Blob) return await blobToBuffer(data);
    if (data instanceof Readable) return await readableToBuffer(data);
    if (data instanceof ReadableStream) return await readableStreamToBuffer(data);
    throw new InvalidDatatype("Invalid datatype")
}
