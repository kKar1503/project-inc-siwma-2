import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@inc/errors/src';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import s3Connection from '@/utils/s3Connection';
import { select, where } from '@api/v1/advertisements';
import { APIRequestType } from '@/types/api-types';
import { advertisementSchema } from '@/utils/api/server/zod';
import process from 'process';

const AWS_BUCKET = process.env.AWS_BUCKET as string;
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
  const { companyId,  ...advertisementContent } = advertisement;

  // Return advertisement
  res.status(200).json(
    formatAPIResponse({
      ...advertisementContent,
      id: id.toString(),
      companyId: companyId.toString(),
    })
  );
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
      endDate,
      startDate,
    },
    where: {
      id,
    },
  });

  // Return advertisement
  res.status(201).json(
    formatAPIResponse({
      ...updated,
      id: id.toString(),
      companyId: updated.companyId.toString(),
    })
  );
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
    const bucket = await s3Connection.getBucket(AWS_BUCKET);
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
