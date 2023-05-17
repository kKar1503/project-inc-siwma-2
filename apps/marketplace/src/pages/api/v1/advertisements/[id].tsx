import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@inc/errors/src';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import s3Connection from '@/utils/s3Connection';
import { Metadata, S3ObjectBuilder } from '@inc/s3-simplified';
import { AdvertisementBucket, select, where } from '@api/v1/advertisements/index';
import { APIRequestType } from '@/types/api-types';
import { z } from 'zod';
import { getFilesFromRequest } from '@/utils/parseFormData';
import fs from 'fs';


const companyOptionalInputValidation = z.object({
  companyId: z.string().optional(),
  endDate: z.string().datetime().optional(),
  startDate: z.string().datetime().optional(),
  active: z.boolean().optional(),
  description: z.string().optional(),
  link: z.string().optional(),
});

const GET = async (req: NextApiRequest & APIRequestType, res: NextApiResponse) => {
  // Validate query params
  const id = parseToNumber(req.query.id as string);

  // Check if user is admin
  const isAdmin = (req.token?.user.permissions === true);

  // Get advertisement
  const advertisement = await PrismaClient.advertisements.findUnique({
    select: select(isAdmin),
    where: where(isAdmin, {
      id,
    }),
  });

  // Throw error if advertisement not found
  if (!advertisement) throw new NotFoundError(`advertisement`);

  // Return advertisement
  res.status(200).json(formatAPIResponse(advertisement));
};

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate payload
  const id = parseToNumber(req.query.id as string);
  const validatedPayload = companyOptionalInputValidation.parse(req.body);

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
  const companyId = validatedPayload.companyId ? parseToNumber(validatedPayload.companyId) : advertisement.companyId;
  const endDate = (validatedPayload.endDate && new Date(validatedPayload.endDate)) || advertisement.endDate;
  const startDate = (validatedPayload.startDate && new Date(validatedPayload.startDate)) || advertisement.startDate;
  const active = validatedPayload.active === undefined ? advertisement.active : validatedPayload.active;
  const description = validatedPayload.description || advertisement.description;
  const link = validatedPayload.link || advertisement.link;

  // if image has changed
  let url = advertisement.image;
  const data = await getFilesFromRequest(req);
  if (data.length > 0) {
    const file = data[0];

    const bucket = await s3Connection.getBucket(AdvertisementBucket);
    const metadata = new Metadata({
      'content-type': file.mimetype || 'image/jpeg',
      'original-name': file.originalFilename || 'untitled-advertisement-image',
      // "content-disposition": file.newFilename,
    });
    const buffer = fs.readFileSync(file.filepath);
    const s3ObjectBuilder = new S3ObjectBuilder(buffer, metadata);


    // create new image and delete old image as aws doesn't support update
    // also do these in parallel for faster response
    const awaitedPromise = await Promise.all(
      [
        bucket.createObject(s3ObjectBuilder),
        bucket.deleteObject(advertisement.image),
      ]);
    const [newS3Object] = awaitedPromise;
    url = await newS3Object.generateLink();
  }


  // update advertisement
  const updated = await PrismaClient.advertisements.update({
    select: select(isAdmin),
    data: {
      companyId,
      image: url,
      endDate,
      startDate,
      active,
      description,
      link,
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
  const id = parseToNumber(req.query.id as string);

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
  const s3Promise = new Promise((resolve) => {
    s3Connection.getBucket(AdvertisementBucket).then((bucket) => {
      bucket.deleteObject(advertisement.image).then(resolve);
    });
  });

  // Wait for both promises to resolve
  await Promise.all([prismaPromise, s3Promise]);

  // Return advertisement
  res.status(204).end();
};

export default apiHandler()
  .get(GET)
  .put(apiGuardMiddleware({ allowAdminsOnly: true }), PUT)
  .delete(apiGuardMiddleware({ allowAdminsOnly: true }), DELETE);

