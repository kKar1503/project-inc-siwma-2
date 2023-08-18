import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@inc/errors/src';
import s3Connection from '@/utils/s3Connection';
import { select } from '@api/v1/advertisements';
import { updateImage } from '@/utils/imageUtils';
import process from 'process';

const AWS_BUCKET = process.env.AWS_BUCKET as string;
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

  const bucket = await s3Connection.getBucket(AWS_BUCKET);

  // update advertisement
  const updated = await PrismaClient.advertisements.update({
    select: select(isAdmin),
    data: {
      image: await updateImage(bucket, advertisement.image, req),
    },
    where: {
      id,
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
