import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { APIRequestType } from '@/types/api-types';
import { z } from 'zod';

const ParamSchema = z.object({
  id: z.string(),
});

const BodySchema = z.object({
  listing: z.number(),
});

const POST = async (req: NextApiRequest & APIRequestType, res: NextApiResponse) => {
  // Validate query params
  const user = ParamSchema.parse(req.query).id;
  const { listing } = BodySchema.parse(req.body);

  PrismaClient.listingClicks.create({
    data: {
      listing,
      user,
    },
  });

  // Return advertisement;
  res
    .status(200)
    .json(formatAPIResponse({}));
};


export default apiHandler()
  .post(POST);
