import { apiHandler, zodParseToInteger } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { APIRequestType } from '@/types/api-types';
import { z } from 'zod';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import s3Connection from '@/utils/s3Connection';
import { ForbiddenError, NotFoundError } from '@inc/errors';

const ListingBucketName = process.env.LISTING_BUCKET_NAME as string;

const ParamSchema = z.object({
  id: z.string().transform(zodParseToInteger),
});


const POST = async (req: NextApiRequest & APIRequestType, res: NextApiResponse) => {
  // Validate query params
  const { id } = ParamSchema.parse(req.query);
  // find listing
  const listing = await PrismaClient.listing.findFirst({
    where: {
      id,
    },
    include: {
      listingImages: true,
    },
  });

  if (!listing) {
    throw new NotFoundError(`Listing with id '${id}`);
  }
  // Check if the user is the owner of the listing or an admin
  if (listing.owner !== req.token?.user.id && req.token?.user.permissions !== 1) {
    throw new ForbiddenError();
  }

  const files = await getFilesFromRequest(req, { multiples: true });
  const bucket = await s3Connection.getBucket(ListingBucketName);
  const objects = await Promise.all(
    files.map((file) => bucket.createObject(fileToS3Object(file))),
  );
  await PrismaClient.listing.update({
    where: {
      id,
    },
    data: {
      listingImages: {
        create: objects.map((object) => ({
            image: object.Id,
          }),
        ),
      },
    },
    include: {
      listingsParametersValues: true,
    },
  });

  res.status(204).end();
};


export default apiHandler()
  .post(POST);
