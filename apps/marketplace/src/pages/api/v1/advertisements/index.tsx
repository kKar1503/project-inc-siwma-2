import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import s3Connection from '@/utils/s3Connection';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { APIRequestType } from '@/types/api-types';
import * as process from 'process';
import { z } from 'zod';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import { ParamError } from '@inc/errors/src';

const companyInputValidation = z.object({
  companyId: z.string().transform((val) => parseToNumber(val, 'companyId')),
  endDate: z.string().datetime(),
  startDate: z.string().datetime(),
  active: z.boolean(),
  description: z.string(),
  link: z.string(),
});

const getInputValidation = z.object({
  lastIdPointer: z.string().optional().transform((val) => val ? parseToNumber(val, 'lastIdPointer') : undefined),
  limit: z.string().optional().transform((val) => val ? parseToNumber(val, 'limit') : undefined),
});

export const select = (isAdmin: boolean) => ({
  companyId: true,
  image: true,
  endDate: isAdmin,
  startDate: isAdmin,
  active: isAdmin,
  description: true,
  link: true,
});

export const where = (isAdmin: boolean, other = {}) => isAdmin ? other : {
  endDate: {
    gte: new Date(),
  },
  startDate: {
    lte: new Date(),
  },
  active: true,
  ...other,
};

export const AdvertisementBucketName = process.env.AWS_ADVERTISEMENT_BUCKET_NAME as string;


const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate payload
  const payload = companyInputValidation.parse(req.body);

  const files = await getFilesFromRequest(req);
  if (files.length === 0) {
    throw new ParamError(`advertisement image`);
  }

  const AdvertisementBucket = await s3Connection.getBucket(AdvertisementBucketName);
  const s3Object = await AdvertisementBucket.createObject(fileToS3Object(files[0]));

  // Create advertisement
  const advertisementId = (await PrismaClient.advertisements.create({
    select: {
      id: true,
    },
    data: {
      companyId: payload.companyId,
      image: s3Object.Id,
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
  const { limit, lastIdPointer } = getInputValidation.parse(req.query);

  // Get advertisements
  const advertisementsNoLink = await PrismaClient.advertisements.findMany({
    select: select(isAdmin),
    where: where(isAdmin, {
      id: {
        gt: lastIdPointer,
      },
    }),
    take: limit,
  });

  const AdvertisementBucket = await s3Connection.getBucket(AdvertisementBucketName);
  const advertisements = await Promise.all(advertisementsNoLink.map(async (advertisement) => {
    const image = await AdvertisementBucket.getObject(advertisement.image);
    return {
      ...advertisement,
      link: await image.generateLink(),
    };
  }));

  // Return advertisements
  res.status(200).json(formatAPIResponse(advertisements));
};

export default apiHandler()
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), POST)
  .get(GET);
