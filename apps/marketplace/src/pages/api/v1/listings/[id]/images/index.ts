import { apiHandler, formatAPIResponse, parseToNumber, zodParseToInteger } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { APIRequestType } from '@/types/api-types';
import { z } from 'zod';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import s3Connection from '@/utils/s3Connection';
import { ForbiddenError, NotFoundError, ParamError } from '@inc/errors';
import { IS3Object } from '@inc/s3-simplified';


const awsBucket = process.env.AWS_BUCKET as string;
const acceptedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];


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
      listingImages: {
        orderBy: {
          order: 'asc'
        }
      },
    },
  });
  if (!listing) throw new NotFoundError(`Listing with id '${id}`);
  return listing;
};
const append = async (listing: { listingImages: { image: string,order:number }[] }, objects: IS3Object[]) => {
  const previousImages = listing.listingImages;
  const offset = previousImages[previousImages.length - 1].order;

  return objects.map((object, i) => {
    const sortOrder = i * 10000 + offset;
    return {
      image: object.Id,
      order: sortOrder,
    };
  });
};

const prepend = async (listing: { listingImages: { image: string,order:number }[] }, objects: IS3Object[]) => {

  const firstImage = listing.listingImages[0].order;
  const offset = (-10000 * objects.length) + firstImage;

  return objects.map((object, i) => {
    const sortOrder = i * 10000 + offset;
    return {
      image: object.Id,
      order: sortOrder,
    };
  });
};
const insert = async (listing: { listingImages: { image: string,order:number }[] }, objects: IS3Object[], insertIndex: number) => {
  if (insertIndex < 0) return prepend(listing, objects);
  if (insertIndex >= listing.listingImages.length) return append(listing, objects);


  const [before, after] = [listing.listingImages[insertIndex - 1].order, listing.listingImages[insertIndex].order];
  const sortOffset = (after - before) / (objects.length + 1);

  return objects.map((object, i) => {
    const sortOrder = before + sortOffset * (i + 1);
    return {
      image: object.Id,
      order: sortOrder,
    };
  });
};

const PUT = async (req: NextApiRequest & APIRequestType, res: NextApiResponse) => {
  // Validate query params
  const { id } = ParamSchema.parse(req.query);
  // find listing
  const listing = await validateListing(id);

  // Check if the user is the owner of the listing or an admin
  const user = req.token?.user;
  if (!isAdmin(user) && !(await validateUser(user, listing.owner))) throw new ForbiddenError();


  const files = (await getFilesFromRequest(req, { multiples: true }))
    .filter((file) => file.mimetype ? acceptedMimeTypes.includes(file.mimetype) : false);
  if (files.length === 0) throw new ParamError();

  const bucket = await s3Connection.getBucket(awsBucket);
  const objects = await Promise.all(
    files.map((file) => {
      const object = fileToS3Object(file);
      return bucket.createObject(object);
    }));

  const index = req.query.insertIndex ? parseToNumber(req.query.insertIndex as string, 'insertIndex') : undefined;

  const newImages = typeof index === 'number' ? await insert(listing, objects, index) : await append(listing, objects);

  await PrismaClient.listingImages.createMany({
    data: newImages.map((image) => ({
      listingId: id,
      image: image.image,
      order: image.order,
    })),
  });


  // refetch listing
  const updatedListing = await validateListing(id);
  const response = {
    images: updatedListing.listingImages,
    coverImage: updatedListing.listingImages[0],
  };
  res.status(204).json(formatAPIResponse(response));
};


export default apiHandler()
  .put(PUT);


export const config = {
  api: {
    bodyParser: false,
  },
};
