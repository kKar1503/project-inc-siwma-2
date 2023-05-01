import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@/errors';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import s3Connection from '@/utils/s3Connection';
import { S3ObjectBuilder } from 's3-simplified';
import { AdvertisementBucket, select, where } from '@api/v1/advertisments/index';
import { APIRequestType } from '@/types/api-types';
import { Readable } from 'stream';
import { z } from 'zod';


const zod = z.object({
  companyId: z.string().optional(),
  image: z.union([
    z.instanceof(Readable),
    z.instanceof(ReadableStream),
    z.instanceof(Blob),
    z.string(),
    z.instanceof(Uint8Array),
    z.instanceof(Buffer),
  ]).optional(),
  endDate: z.string().optional(),
  startDate: z.string().optional(),
  active: z.boolean().optional(),
  description: z.string().optional(),
  link: z.string().optional(),
});


const GET = async (req: NextApiRequest & APIRequestType, res: NextApiResponse) => {
  const isAdmin = (req.token?.user.permissions === true);


  const id = parseToNumber(req.query.id as string);

  const advertisement = await PrismaClient.advertisements.findUnique({
    select: select(isAdmin),
    where: where(isAdmin, {
      id,
    }),
  });

  if (!advertisement) {
    throw new NotFoundError(`advertisement not found`);
  }

  res.status(200).json(formatAPIResponse(advertisement));
};

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAdmin = true; // this endpoint is admin only
  const id = parseToNumber(req.query.id as string);
  const validatedPayload = zod.parse(req.body);

  const advertisement = await PrismaClient.advertisements.findUnique({
    where: {
      id,
    },
  });

  if (!advertisement) {
    throw new NotFoundError(`advertisement not found`);
  }

  // if image has changed
  let url = advertisement.image;
  if (validatedPayload.image) {
    const bucket = await s3Connection.getBucket(AdvertisementBucket);
    const s3ObjectBuilder = new S3ObjectBuilder(validatedPayload.image);


    // create new image and delete old image as aws doesn't support update
    const promise = await Promise.all(
      [
        await bucket.createObject(s3ObjectBuilder),
        await bucket.deleteObject(advertisement.image),
      ]);
    const [newS3Object] = promise;
    url = await newS3Object.generateLink();
  }
  const companyId = validatedPayload.companyId || advertisement.companyId;
  const endDate = (validatedPayload.endDate && new Date(validatedPayload.endDate)) || advertisement.endDate;
  const startDate = (validatedPayload.startDate && new Date(validatedPayload.startDate)) || advertisement.startDate;
  const active = validatedPayload.active === undefined ? advertisement.active : validatedPayload.active;
  const description = validatedPayload.description || advertisement.description;
  const link = validatedPayload.link || advertisement.link;

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

  res.status(201).json(formatAPIResponse(updated));

};

const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseToNumber(req.query.id as string);

  const advertisement = await PrismaClient.advertisements.findUnique({
    where: {
      id,
    },
  });

  if (!advertisement) {
    throw new NotFoundError(`advertisement not found`);
  }

  await PrismaClient.advertisements.delete({
    where: {
      id,
    },
  });


  const bucket = await s3Connection.getBucket(AdvertisementBucket);


  await bucket.deleteObject(advertisement.image);

  res.status(204).end();
};

export default apiHandler()
  .get(GET)
  .put(apiGuardMiddleware({
    allowAdminsOnly: true,
  }), PUT)
  .delete(apiGuardMiddleware({
    allowAdminsOnly: true,
  }), DELETE);

