import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import bucket from '@/utils/s3Bucket';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { APIRequestType } from '@/types/api-types';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import { ParamError } from '@inc/errors/src';
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


const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate payload
  const payload = advertisementSchema.post.body.parse(req.body);

  const files = await getFilesFromRequest(req);
  if (files.length === 0) {
    throw new ParamError(`advertisement image`);
  }
  const s3Object = await bucket.createObject(fileToS3Object(files[0]));

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
  const advertisements = await PrismaClient.advertisements.findMany({
    select: select(isAdmin),
    where: where(isAdmin, {
      id: {
        gt: lastIdPointer,
      },
    }),
    take: limit,
  });


  // Return advertisements
  res.status(200).json(formatAPIResponse(advertisements));
};

export default apiHandler()
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), POST)
  .get(GET);
