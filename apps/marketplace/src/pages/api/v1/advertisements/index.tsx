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
  companyId: z.string(),
  endDate: z.string().datetime(),
  startDate: z.string().datetime(),
  active: z.boolean(),
  description: z.string(),
  link: z.string(),
});

const getInputValidation = z.object({
  lastIdPointer: z.string().optional(),
  limit: z.string().optional(),
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

export const AdvertisementBucket = process.env.AWS_ADVERTISEMENT_BUCKET_NAME as string;

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate payload
  const payload = companyInputValidation.parse(req.body);
  const companyId = parseToNumber(payload.companyId);

  const files = await getFilesFromRequest(req);
  if (files.length === 0) {
    throw new ParamError(`advertisement image`);
  }

  const bucket = await s3Connection.getBucket(AdvertisementBucket);
  const s3Object = await bucket.createObject(fileToS3Object( files[0]));

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
  const { limit, lastIdPointer } = getInputValidation.parse(req.query);

  let limitInt: number | undefined;

  if (limit) {
    limitInt = parseToNumber(limit, 'limit');
  }


  // Get advertisements
  const advertisements = await PrismaClient.advertisements.findMany({
    select: select(isAdmin),
    where: where(isAdmin, {
      id: {
        gt: lastIdPointer,
      },
    }),
    take: limitInt,
  });

  // Return advertisements
  res.status(200).json(formatAPIResponse(advertisements));
};

export default apiHandler()
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), POST)
  .get(GET);
