import { NextApiRequest } from 'next';
import { Fields, File, Files, IncomingForm } from 'formidable';

export const parseFormData = (req: NextApiRequest): Promise<{ fields?: Fields, files?: Files }> =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) =>
      err ? reject(err) : resolve({ fields, files }));
  });

/**
 * Converts value to an array if it is not already an array
 * @param value
 */
const toArrayIfNot = <T>(value: T | T[]): T[] => Array.isArray(value) ? value : [value];

export const getFilesFromRequest = async (req: NextApiRequest, fileName = 'file'): Promise<File[]> => {
  const { files } = await parseFormData(req);
  if (files === undefined) return [];
  const file = files[fileName];
  if (file === undefined) return [];
  return toArrayIfNot(file);
};

export const getAllFilesFromRequest = async (req: NextApiRequest): Promise<File[]> => {
  const { files } = await parseFormData(req);
  if (files === undefined) return [];
  return Object.values(files).map(toArrayIfNot).reduce((acc, val) => acc.concat(val), []);
};
