import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { NotFoundError, ParamError } from '@inc/errors/src';
import bucket from '@/utils/s3Bucket';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate payload
  const { id } = req.query;
  if (!id) {
    throw new ParamError('id');
  }

  const advertisementId = parseToNumber(id as string, 'id');
  // Get advertisement
  const advertisement = await PrismaClient.advertisements.findUnique({
    select: {
      image: true,
    },
    where: {
      id: advertisementId,
    },
  });

  // Throw error if advertisement not found
  if (!advertisement) throw new NotFoundError(`advertisement`);

  const files = await getFilesFromRequest(req);
  if (files.length === 0) {
    throw new ParamError('image');
  }

  const [s3Object] = await Promise.all([
    bucket.createObject(fileToS3Object(files[0])),
    advertisement.image !== '' ? bucket.deleteObject(advertisement.image) : null,
  ]);

  // update advertisement
  const updated = await PrismaClient.advertisements.update({
    data: {
      image: s3Object.Id,
    },
    where: {
      id: advertisementId,
    },
  });

  // Return advertisement
  res.status(201).json(formatAPIResponse(updated));
};

export default apiHandler({ allowAdminsOnly: true }).put(PUT);

export const config = {
  api: {
    bodyParser: false,
  },
};
