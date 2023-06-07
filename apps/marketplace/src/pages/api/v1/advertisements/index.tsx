import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { APIRequestType } from '@/types/api-types';
import * as process from 'process';
import { advertisementSchema } from '@/utils/api/server/zod';

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

  // Create advertisement
  const advertisementId = (
    await PrismaClient.advertisements.create({
      select: {
        id: true,
      },
      data: {
        companyId: payload.companyId,
        image: 'null',
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

  const advertisements = advertisementsNoLink.map(advertisement => {
    const { companyId, ...advertisementContent } = advertisement;

    return {
      ...advertisementContent,
      companyId: companyId.toString(),
    };
  });


  // Return advertisements
  res.status(200).json(formatAPIResponse(advertisements));
};

export default apiHandler()
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), POST)
  .get(GET);
