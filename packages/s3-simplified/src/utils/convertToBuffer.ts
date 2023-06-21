import { Readable } from 'stream';
import { InvalidDatatype } from '../classes/misc/errors';

type AcceptedDataTypes = Readable | ReadableStream | Blob | string | Uint8Array | Buffer;

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
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

async function readableStreamToBuffer(stream: ReadableStream): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let completed = false;

  while (completed) {
    // eslint-disable-next-line no-await-in-loop
    const { done, value } = await reader.read();
    if (done) completed = true;
    else if (value) chunks.push(value);
  }
  return Buffer.concat(chunks);
}

export async function ConvertToBuffer(data: AcceptedDataTypes): Promise<Buffer> {
  if (Buffer.isBuffer(data)) return data;
  if (data instanceof Uint8Array) return Buffer.from(data.buffer);
  if (typeof data === 'string') return Buffer.from(data);
  if (data instanceof Blob) return blobToBuffer(data);
  if (data instanceof Readable) return readableToBuffer(data);
  if (data instanceof ReadableStream) return readableStreamToBuffer(data);
  throw new InvalidDatatype('Invalid datatype');
}
