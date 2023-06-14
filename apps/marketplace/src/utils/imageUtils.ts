import { NextApiRequest } from 'next';
import { Fields, File, Files, IncomingForm, Options } from 'formidable';
import fs from 'fs';
import { Metadata, S3BucketService, S3ObjectBuilder } from '@inc/s3-simplified';

const DefaultOptions: Partial<Options> = {
  multiples: false,
  maxFiles: 10,
  maxFileSize: 8 * 1024 * 1024, // 8MB
};

export const imageUtils = (req: NextApiRequest, formOptions?: Partial<Options>): Promise<{
  fields?: Fields;
  files?: Files
}> =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ ...DefaultOptions, ...formOptions });
    form.parse(req, (err, fields, files) => (err ? reject(err) : resolve({ fields, files })));
  });

/**
 * Converts value to an array if it is not already an array
 * @param value
 */
const toArrayIfNot = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

export const getFilesFromRequest = async (
  req: NextApiRequest,
  config: { fieldName?: string } & Partial<Options> = {},
): Promise<File[]> => {
  const { fieldName = 'file', ...formOptions } = config;
  const { files } = await imageUtils(req, formOptions);
  if (files === undefined) return [];
  const file = files[fieldName];
  if (file === undefined) return [];
  return toArrayIfNot(file);
};

export const getAllFilesFromRequest = async (req: NextApiRequest): Promise<File[]> => {
  const { files } = await imageUtils(req);
  if (files === undefined) return [];
  return Object.values(files)
    .map(toArrayIfNot)
    .reduce((acc, val) => acc.concat(val), []);
};

export const fileToS3Object = (file: File): S3ObjectBuilder => {
  const buffer = fs.readFileSync(file.filepath);
  // Create S3 object
  const metadata = new Metadata({
    'content-type': file.mimetype || 'image/jpeg',
    'original-name': file.originalFilename || 'untitled-advertisement-image',
    // "content-disposition": file.newFilename,
  });
  return new S3ObjectBuilder(buffer, metadata);
};

export const loadImage = async <T extends Record<string, unknown>>(
  source: T,
  bucket: S3BucketService,
  imageKey: string,
): Promise<T> => {
  if (typeof source[imageKey] !== 'string') return source;
  try {
    const image = await bucket.getObject(source[imageKey] as string);
    return {
      ...source,
      [imageKey]: await image.generateLink(),
    };
  } catch (e) {
    return {
      ...source,
      [imageKey]: null,
    };
  }
};

export const loadImageBuilder =
  <T extends Record<string, unknown>>(
    bucket: S3BucketService,
    imageKey: string,
  ): ((source: T) => Promise<T>) =>
    async (source) =>
      loadImage(source, bucket, imageKey);
