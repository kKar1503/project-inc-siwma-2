import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, ParamError } from '@inc/errors';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import bucket from '@/utils/s3Bucket';

export default apiHandler({ allowAdminsOnly: true })
  .put(async (req, res) => {
    const { id } = req.query;
    if (!id) {
      throw new ParamError('id');
    }
    const categoryId = parseToNumber(id as string, 'id');
    const category = await PrismaClient.category.findFirst({
      select: {
        image: true,
      },
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw new NotFoundError('Category');
    }

    const files = await getFilesFromRequest(req);
    if (files.length === 0) {
      throw new ParamError('cross section image');
    }

    const [s3Object] = await Promise.all([
      bucket.createObject(fileToS3Object(files[0])),
      category.image !== '' ? bucket.deleteObject(category.image) : null,
    ]);


    const response = await PrismaClient.category.update({
      data: {
        image: s3Object.Id,
      },
      where: {
        id: categoryId,
      },
    });

    res.status(201).json(formatAPIResponse({ categoryId: response.id.toString() }));
  });

export const config = {
  api: {
    bodyParser: false,
  },
};
