import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { ParamError } from '@inc/errors';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import bucket from '@/utils/s3Bucket';

export default apiHandler({ allowAdminsOnly: true })
  .put(async (req, res) => {

    const files = await getFilesFromRequest(req);
    if (files.length === 0) {
      throw new ParamError('company logo');
    }

    const s3Object = await bucket.createObject(fileToS3Object(files[0]));

    const response = await PrismaClient.companies.create({
      data: {
        logo: s3Object.Id,
      },
    });

    res.status(201).json(formatAPIResponse({ companyId: response.id.toString() }));
  });


export const config = {
  api: {
    bodyParser: false,
  }
}
