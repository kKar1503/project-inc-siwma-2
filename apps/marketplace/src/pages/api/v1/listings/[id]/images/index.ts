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

const isAdmin = (user: { permissions: number } & APIRequestType) => user.permissions === 1;
const userCompany = async (user: { id: string }, owner: string) => {
  const userId = user.id;
  const companyPromise = PrismaClient.companies.findFirst({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });
  const otherCompanyPromise = PrismaClient.companies.findFirst({
    where: {
      users: {
        some: {
          id: owner,
        },
      },
    },
  });

  const [company, otherCompany] = await Promise.all([companyPromise, otherCompanyPromise]);


  return (company && otherCompany && company.id === otherCompany.id);
};


const PUT = async (req: NextApiRequest & APIRequestType, res: NextApiResponse) => {
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
  const user = req.token?.user;
  if (!isAdmin(user) && !(await userCompany(user, listing.owner))) {
    throw new ForbiddenError();
  }

  const files = await getFilesFromRequest(req, { multiples: true });
  const bucket = await s3Connection.getBucket(ListingBucketName);
  const previousImages = listing.listingImages;

  const objects = await Promise.all(
    files.map((file) => bucket.createObject(fileToS3Object(file))),
  );
  const images = objects.map((object) => ({ image: object.Id }));

  await PrismaClient.listing.update({
    where: {
      id,
    },
    data: {
      listingImages: {
        create: [...previousImages, ...images],
      },
    },
    include: {
      listingsParametersValues: true,
    },
  });

  res.status(204).end();
};


export default apiHandler()
  .put(PUT);
