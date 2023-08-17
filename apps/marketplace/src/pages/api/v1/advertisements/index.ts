import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { APIRequestType } from '@/types/api-types';
import { advertisementSchema } from '@/utils/api/server/zod';
import { Advertisment } from '@/utils/api/client/zod/advertisements';

export const select = (isAdmin: boolean) => ({
  companyId: true,
  image: true,
  id: isAdmin,
  createdAt: isAdmin,
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
        image: '',
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
  const advertisements = await PrismaClient.advertisements.findMany({
    select: select(isAdmin),
    where: where(isAdmin, {
      id: {
        gt: lastIdPointer,
      },
    }),
    take: limit,
  });

  const mappedAdvertisements = advertisements.map((advertisement) => {
    const { companyId, id, startDate, endDate, createdAt, ...advertisementContent } = advertisement;
    const ad: Partial<Advertisment> = {
      ...advertisementContent,
      companyId: companyId.toString(),
    };

    if (id !== undefined) {
      ad.id = id.toString();
    }

    if (startDate !== undefined) {
      ad.startDate = startDate.toString();
    }

    if (endDate !== undefined) {
      ad.endDate = endDate.toString();
    }

    if (createdAt !== undefined) {
      ad.createdAt = createdAt.toString();
    }

    return ad;
  });

  // Return advertisements
  res.status(200).json(formatAPIResponse(mappedAdvertisements));
};

export default apiHandler()
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), POST)
  .get(GET);
