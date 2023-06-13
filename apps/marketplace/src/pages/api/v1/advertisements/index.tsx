import { apiHandler, formatAPIResponse } from '@inc/api/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import s3Connection from '@inc/api/s3Connection';
import { apiGuardMiddleware } from '@inc/api/api/server/middlewares/apiGuardMiddleware';
import * as process from 'process';
import { fileToS3Object, getFilesFromRequest, loadImageBuilder } from '@inc/api/imageUtils';
import { ParamError } from '@inc/errors/src';
import { advertisementSchema } from '@inc/api/api/server/zod';
import { APIRequestType } from '@/types/api-types';

export const select = (isAdmin: boolean) => ({
  companyId: true,
  image: true,
  endDate: isAdmin,
  startDate: isAdmin,
  active: isAdmin,
  description: true,
  link: true,
});

export const where = (isAdmin: boolean, other = {}) =>
  isAdmin
    ? other
    : {
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
  const payload = advertisementSchema.post.body.parse(req.body);

  const files = await getFilesFromRequest(req);
  if (files.length === 0) {
    throw new ParamError(`advertisement image`);
  }

  const AdvertisementBucket = await s3Connection.getBucket(AdvertisementBucketName);
  const s3Object = await AdvertisementBucket.createObject(fileToS3Object(files[0]));

  // Create advertisement
  const advertisementId = (
    await PrismaClient.advertisements.create({
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
    })
  ).id;

  // Return advertisement id
  res.status(201).json(formatAPIResponse({ advertisementId }));
};

const GET = async (req: NextApiRequest & APIRequestType, res: NextApiResponse) => {
  // Validate admin
  const isAdmin = req.token?.user.permissions === 1;
  const { limit, lastIdPointer } = advertisementSchema.get.query.parse(req.query);

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
  const loadImage = loadImageBuilder(AdvertisementBucket, 'image');
  const advertisements = await Promise.all(
    advertisementsNoLink.map((advertisement) => {
      const { companyId, ...advertisementContent } = advertisement;

      return loadImage({
        ...advertisementContent,
        companyId: companyId.toString(),
      });
    })
  );

  // Return advertisements
  res.status(200).json(formatAPIResponse(advertisements));
};

export default apiHandler()
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), POST)
  .get(GET);
