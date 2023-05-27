import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@inc/errors/src';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import s3Connection from '@/utils/s3Connection';
import { AdvertisementBucketName, select, where } from '@api/v1/advertisements/index';
import { APIRequestType } from '@/types/api-types';
import { fileToS3Object, getFilesFromRequest, loadImage } from '@/utils/imageUtils';
import { advertisementSchema } from '@/utils/api/server/zod';

const updateImage = async (
  OldImage: string,
  req: NextApiRequest & APIRequestType,
): Promise<string> => {
  const files = await getFilesFromRequest(req);
  if (files.length > 0) {
    const s3ObjectBuilder = fileToS3Object(files[0]);

    const bucket = await s3Connection.getBucket(AdvertisementBucketName);

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

const GET = async (req: NextApiRequest & APIRequestType, res: NextApiResponse) => {
  // Validate query params
  const id = parseToNumber(req.query.id as string, 'id');

  // Check if user is admin
  const isAdmin = req.token?.user.permissions === 1;

  // Get advertisement
  const advertisement = await PrismaClient.advertisements.findUnique({
    select: select(isAdmin),
    where: where(isAdmin, {
      id,
    }),
  });

  // Throw error if advertisement not found
  if (!advertisement) throw new NotFoundError(`advertisement`);
  const { companyId, ...advertisementContent } = advertisement;

  const AdvertisementBucket = await s3Connection.getBucket(AdvertisementBucketName);

  // Return advertisement
  res
    .status(200)
    .json(formatAPIResponse(await loadImage({
      ...advertisementContent,
      companyId: companyId.toString(),
    }, AdvertisementBucket, 'image')));
};

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate payload
  const id = parseToNumber(req.query.id as string, 'id');
  const validatedPayload = advertisementSchema.put.body.parse(req.body);

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

  // get new values or use old values if not provided
  const endDate = (validatedPayload.endDate && new Date(validatedPayload.endDate)) || undefined;
  const startDate =
    (validatedPayload.startDate && new Date(validatedPayload.startDate)) || undefined;

  // update advertisement
  const updated = await PrismaClient.advertisements.update({
    select: select(isAdmin),
    data: {
      ...validatedPayload,
      image: await updateImage(advertisement.image, req),
      endDate,
      startDate,
    },
    where: {
      id,
    },
  });

  // Return advertisement
  res.status(201).json(formatAPIResponse(updated));
};

const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate query params
  const id = parseToNumber(req.query.id as string, 'id');

  // Check if advertisement exists, if yes get the image url
  const advertisement = await PrismaClient.advertisements.findUnique({
    select: {
      image: true,
    },
    where: {
      id,
    },
  });

  // Throw error if advertisement not found
  if (!advertisement) throw new NotFoundError(`advertisement`);

  // Delete advertisement
  const prismaPromise = PrismaClient.advertisements.delete({
    where: {
      id,
    },
  });

  // Delete image from s3
  const deleteImage = async () => {
    const bucket = await s3Connection.getBucket(AdvertisementBucketName);
    await bucket.deleteObject(advertisement.image);
  };

  // Wait for both promises to resolve
  await Promise.all([prismaPromise, deleteImage]);

  // Return advertisement
  res.status(204).end();
};

export default apiHandler()
  .get(GET)
  .put(apiGuardMiddleware({ allowAdminsOnly: true }), PUT)
  .delete(apiGuardMiddleware({ allowAdminsOnly: true }), DELETE);
