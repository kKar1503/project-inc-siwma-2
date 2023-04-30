import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { IS3Object, S3BucketService, S3ObjectBuilder } from 's3-simplified';
import s3Connection from '@/utils/s3Connection';
import { Readable } from 'stream';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { APIRequestType } from '@/types/api-types';
import { ParamError } from '@/errors';
import * as process from 'process';

export interface AdvertisementPayload {
  companyId: string,
  image: Readable | ReadableStream | Blob | string | Uint8Array | Buffer,
  endDate: string,
  description: string,
  link: string
}

export const AdvertisementBucket = process.env.AWS_ADVERTISEMENT_BUCKET_NAME as string;

export const validateAdvertisementPayload = (payload: AdvertisementPayload) => {
  if (!payload.companyId) {
    throw new Error(`companyId is required`);
  }

  if (!payload.image) {
    throw new Error(`image is required`);
  }

  if (!payload.endDate) {
    throw new Error(`endDate is required`);
  }

  if (!payload.description) {
    throw new Error(`description is required`);
  }

  if (!payload.link) {
    throw new Error(`link is required`);
  }
};

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const payload = req.body as AdvertisementPayload;
  try {
    validateAdvertisementPayload(payload);
  } catch (e) {
    throw new ParamError();
  }

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
     res.status(500).json(formatAPIResponse({
      details: 'failed to connect to bucket',
    }));
    return;
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
    select: {
      companyId: true,
      image: true,
      endDate: isAdmin,
      description: true,
      link: true,
    },
    where: {
      endDate: {
        gte: new Date(),
      },
    },
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
