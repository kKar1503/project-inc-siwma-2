import { apiHandler, parseToNumber, zodParseToInteger } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { APIRequestType } from '@/types/api-types';
import { z } from 'zod';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import s3Connection from '@/utils/s3Connection';
import { ForbiddenError, NotFoundError, ParamError } from '@inc/errors';
import { File } from 'formidable';
import { IS3Object } from '@inc/s3-simplified';


const ListingBucketName = process.env.AWS_BUCKET as string;

const ParamSchema = z.object({
  id: z.string().transform(zodParseToInteger),
});

const isAdmin = (user: { permissions: number } & APIRequestType) => user.permissions === 1;
const validateUser = async (user: { id: string }, owner: string) => {
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

const validateListing = async (id: number) => {
  const listing = await PrismaClient.listing.findFirst({
    where: {
      id,
    },
    include: {
      listingImages: true,
    },
  });
  if (!listing) throw new NotFoundError(`Listing with id '${id}`);
  return listing;
};

const getSortOrder = (obj: IS3Object) => parseInt(obj.Metadata.get('sort-order') ?? '0', 10);
const append = async (listing: { listingImages: { image: string }[] }, files: File[]) => {
  const bucket = await s3Connection.getBucket(ListingBucketName);
  const previousImages = listing.listingImages;
  const offset = previousImages.length;
  const objects = await Promise.all(
    files.map((file, i) => {
      const sortOrder = (i + offset) * 10000;
      const object = fileToS3Object(file, { 'sort-order': sortOrder.toString() });
      return bucket.createObject(object);
    }),
  );
  return objects.map((object) => ({ image: object.Id }));
};

const prepend = async (listing: { listingImages: { image: string }[] }, files: File[]) => {
  const bucket = await s3Connection.getBucket(ListingBucketName);
  const previousImages = (await Promise
    .all(listing.listingImages.map(async (image) => bucket.getObject(image.image))))
    .sort((a, b) => getSortOrder(a) - getSortOrder(b));
  const firstImage = getSortOrder(previousImages[0] as IS3Object);
  const offset = (-10000 * files.length) + firstImage;
  const objects = await Promise.all(
    files.map((file, i) => {
      const sortOrder = i * 10000 + offset;
      const object = fileToS3Object(file, { 'sort-order': sortOrder.toString() });
      return bucket.createObject(object);
    }),
  );
  return objects.map((object) => ({ image: object.Id }));
};
const insert = async (listing: { listingImages: { image: string }[] }, files: File[], insertIndex: number) => {
  if (insertIndex < 0) return prepend(listing, files);
  if (insertIndex > listing.listingImages.length) return append(listing, files);

  const bucket = await s3Connection.getBucket(ListingBucketName);
  const previousImages = (await Promise
    .all(listing.listingImages.map(async (image) => bucket.getObject(image.image))))
    .sort((a, b) => getSortOrder(a) - getSortOrder(b));
  const [before, after] = [getSortOrder(previousImages.at(insertIndex - 1) as IS3Object), getSortOrder(previousImages.at(insertIndex) as IS3Object)];
  const sortOffset = (after - before) / (files.length + 1);
  const objects = await Promise.all(
    files.map((file, i) => {
      const sortOrder = before + sortOffset * (i + 1);
      const object = fileToS3Object(file, { 'sort-order': sortOrder.toString() });
      return bucket.createObject(object);
    }));
  return objects.map((object) => ({ image: object.Id }));
};

const PUT = async (req: NextApiRequest & APIRequestType, res: NextApiResponse) => {
  // Validate query params
  const { id } = ParamSchema.parse(req.query);
  // find listing
  const listing = await validateListing(id);

  // Check if the user is the owner of the listing or an admin
  const user = req.token?.user;
  if (!isAdmin(user) && !(await validateUser(user, listing.owner))) throw new ForbiddenError();


  const files = await getFilesFromRequest(req, { multiples: true });
  if (files.length === 0) throw new ParamError();

  const index = req.query.insertIndex ? parseToNumber(req.query.insertIndex as string, 'insertIndex') : undefined;

  const newImages = typeof index === 'number' ? await insert(listing, files, index) : await append(listing, files);

  await PrismaClient.listingImages.createMany({
    data: newImages.map((image) => ({
      listingId: id,
      image: image.image,
    })),
  });
  res.status(204).end();
};


export default apiHandler()
  .put(PUT);


export const config = {
  api: {
    bodyParser: false,
  }
}
