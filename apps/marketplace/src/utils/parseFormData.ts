import { NextApiRequest } from 'next';
import formidable from 'formidable';

export const parseFormData = (req: NextApiRequest): Promise<{ fields?: formidable.Fields, files?: formidable.Files }> =>
  new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) =>
      err ? reject(err) : resolve({ fields, files }));
  });
