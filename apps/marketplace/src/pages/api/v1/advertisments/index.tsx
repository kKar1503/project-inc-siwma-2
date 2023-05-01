import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { IS3Object, S3BucketService, S3ObjectBuilder } from 's3-simplified';
import s3Connection from '@/utils/s3Connection';
import { Readable } from 'stream';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { APIRequestType } from '@/types/api-types';
import { BucketConnectionFailure, ParamError } from '@/errors';
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

export const select = (isAdmin : boolean) => ({
  companyId: true,
  image: true,
  endDate: isAdmin,
  startDate: isAdmin,
  active: isAdmin,
  description: true,
  link: true,
})

export const where = (isAdmin : boolean,other:{} = {}) => isAdmin ? other : {
  endDate: {
    gte: new Date(),
  },
  startDate: {
    lte: new Date(),
  },
  active: true,
  ...other,
}

export const AdvertisementBucket = process.env.AWS_ADVERTISEMENT_BUCKET_NAME as string;

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const payload = zod.parse(req.body)

  let companyId: number;
  try {
    companyId = parseInt(payload.companyId, 10);
  } catch (e) {
    throw new ParamError();
  }

  let bucket: S3BucketService;
  try {
    bucket = await s3Connection.getBucket(AdvertisementBucket);
  } catch (e) {
    // access key don't have access to bucket or bucket doesn't exist
    throw new BucketConnectionFailure();
  }

  const s3ObjectBuilder = new S3ObjectBuilder(payload.image);

  let s3Object: IS3Object;

  try {
    s3Object = await bucket.createObject(s3ObjectBuilder);
  } catch (e: any | { name: string }) {
    res.status(500).json(formatAPIResponse({
      details: 'image already exists',
    }));
    return;
  }
  const url = await s3Object.generateLink();
  const advertisement = await PrismaClient.advertisements.create({
    data: {
      companyId,
      image: url,
      endDate: new Date(payload.endDate),
      startDate: new Date(payload.startDate),
      active: payload.active,
      description: payload.description,
      link: payload.link,
    },
  });

  const advertisementId = advertisement.id;

  res.status(201).json(formatAPIResponse({
    advertisementId,
  }));
};

const GET = async (req: NextApiRequest & APIRequestType, res: NextApiResponse) => {
  const isAdmin = (req.token?.user.permissions === true);
  const advertisements = await PrismaClient.advertisements.findMany({
    select: select(isAdmin),
    where: where(isAdmin),
  });
  res.status(200).json(formatAPIResponse(advertisements));
};

export default apiHandler()
  .post(apiGuardMiddleware({
    allowNonAuthenticated: true,
  }), POST)
  .get(apiGuardMiddleware({
    allowNonAuthenticated: false,
  }), GET);
