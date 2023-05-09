import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { S3ObjectBuilder } from '@inc/s3-simplified';
import s3Connection from '@/utils/s3Connection';
import { Readable } from 'stream';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { APIRequestType } from '@/types/api-types';
import * as process from 'process';
import { z } from 'zod';

const zod = z.object({
  companyId: z.string(),
  image: z.union([
    z.instanceof(Readable),
    z.instanceof(ReadableStream),
    z.instanceof(Blob),
    z.string(),
    z.instanceof(Uint8Array),
    z.instanceof(Buffer),
  ]),
  endDate: z.string(),
  startDate: z.string(),
  active: z.boolean(),
  description: z.string(),
  link: z.string(),
});

export interface AdvertisementPayload {
  companyId: string,
  image: Readable | ReadableStream | Blob | string | Uint8Array | Buffer,
  endDate: string,
  startDate: string,
  active: boolean,
  description: string,
  link: string
}

export const select = (isAdmin: boolean) => ({
  companyId: true,
  image: true,
  endDate: isAdmin,
  startDate: isAdmin,
  active: isAdmin,
  description: true,
  link: true,
});

export const where = (isAdmin: boolean, other: {} = {}) => isAdmin ? other : {
  endDate: {
    gte: new Date(),
  },
  startDate: {
    lte: new Date(),
  },
  active: true,
  ...other,
};

export const AdvertisementBucket = process.env.AWS_ADVERTISEMENT_BUCKET_NAME as string;

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate payload
  const payload = zod.parse(req.body);
  const companyId = parseToNumber(payload.companyId);

  // Create S3 object
  const bucket = await s3Connection.getBucket(AdvertisementBucket);
  const s3Object = await bucket.createObject(new S3ObjectBuilder(payload.image));

  // Create advertisement
  const advertisementId = (await PrismaClient.advertisements.create({
    select: {
      id: true,
    },
    data: {
      companyId,
      image: await s3Object.generateLink(),
      endDate: new Date(payload.endDate),
      startDate: new Date(payload.startDate),
      active: payload.active,
      description: payload.description,
      link: payload.link,
    },
  })).id;

  // Return advertisement id
  res.status(201).json(formatAPIResponse({ advertisementId }));
};

const GET = async (req: NextApiRequest & APIRequestType, res: NextApiResponse) => {
  // Validate admin
  const isAdmin = (req.token?.user.permissions === true);

  // Get advertisements
  const advertisements = await PrismaClient.advertisements.findMany({
    select: select(isAdmin),
    where: where(isAdmin),
  });

  // Return advertisements
  res.status(200).json(formatAPIResponse(advertisements));
};

export default apiHandler()
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), POST)
  .get(GET);
