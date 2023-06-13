import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@inc/errors/src';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import bucket from '@/utils/s3Bucket';
import { select, where } from '@api/v1/advertisements';
import { APIRequestType } from '@/types/api-types';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import { advertisementSchema } from '@/utils/api/server/zod';

const updateImage = async (
  OldImage: string,
  req: NextApiRequest & APIRequestType,
): Promise<string> => {
  const files = await getFilesFromRequest(req);
  if (files.length > 0) {
    const s3ObjectBuilder = fileToS3Object(files[0]);

    // create new image and delete old image as aws doesn't support update
    // also do these in parallel for faster response
    const awaitedPromise = await Promise.all([
      bucket.createObject(s3ObjectBuilder),
      bucket.deleteObject(OldImage),
    ]);
    const [newS3Object] = awaitedPromise;
    return newS3Object.Id;
  }
  return OldImage;
};

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate payload
  const id = parseToNumber(req.query.id as string, 'id');

  // Check if user is admin
  const isAdmin = true; // this endpoint is admin only

  // Get advertisement
  const advertisement = await PrismaClient.advertisements.findUnique({
    where: {
      id,
    },
  });

  // Throw error if advertisement not found
  if (!advertisement) throw new NotFoundError(`advertisement`);

  // update advertisement
  const updated = await PrismaClient.advertisements.update({
    select: select(isAdmin),
    data: {
      image: await updateImage(advertisement.image, req),
    },
    where: {
      id,
    },
  });

  // Return advertisement
  res.status(201).json(formatAPIResponse(updated));
};

export default apiHandler()
  .put(apiGuardMiddleware({ allowAdminsOnly: true }), PUT)


export const config = {
  api: {
    bodyParser: false,
  }
}
