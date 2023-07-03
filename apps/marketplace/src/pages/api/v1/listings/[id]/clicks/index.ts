import { apiHandler, zodParseToInteger } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { APIRequestType } from '@/types/api-types';
import { z } from 'zod';
import { parseListingId } from '../..';

const ParamSchema = z.object({
  id: z.string().transform(zodParseToInteger),
});

const BodySchema = z.object({
  user: z.object({
    id: z.string(),
  }),
});

const POST = async (req: NextApiRequest & APIRequestType, res: NextApiResponse) => {
  // Validate query params
  const listing = parseListingId(req.query.id as string);
  const user = BodySchema.parse(req.token).user.id;

  PrismaClient.listingClicks.create({
    data: {
      listing,
      user,
    },
  });

  res.status(204).end();
};

export default apiHandler().post(POST);
