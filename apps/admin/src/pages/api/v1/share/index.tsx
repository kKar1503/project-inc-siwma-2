// ** Utils Imports
import { apiHandler, formatAPIResponse } from '@/utils/api';

// ** Zod Imports
import { userSchema } from '@/utils/api/server/zod';

// ** Error Imports
import { NotFoundError } from '@inc/errors';

// ** Prisma Imports
import PrismaClient from '@inc/db';

export function compressInt(value: number, base = 64) {
  const BASE64_CHARS_FOR_NUMBER =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';

  let compressedNum = '';
  let residual = Math.floor(value);

  while (true) {
    const digit = residual % base;
    compressedNum = BASE64_CHARS_FOR_NUMBER.charAt(digit) + compressedNum;
    residual = Math.floor(residual / base);

    if (residual === 0) break;
  }

  return compressedNum;
}

// -- Functions --//
function parseListingid($id: string) {
  // Parse and validate listing id provided
  const id = parseInt($id, 10);

  // Check if the listing id is valid
  if (Number.isNaN(id)) {
    throw new NotFoundError(`Listing with id '${id}'`);
  }

  return id;
}

async function checkListingsExists($id: string | number) {
  // Parse and validate listing id provided
  const id = typeof $id === 'number' ? $id : parseListingid($id);

  // Check if the listing exists
  const listing = await PrismaClient.listing.findUnique({
    where: {
      id,
    },
  });

  // Check if the listing exists
  if (!listing) {
    throw new NotFoundError(`Listing with id '${id}'`);
  }

  return listing;
}

async function checkHashExists($hash: string) {
  // Check if the listing exists
  const hash = await PrismaClient.share.findMany({
    where: {
      hash: $hash,
    },
  });
  return hash;
}

async function generateHash(): Promise<string> {
  // creates random hash
  const value = compressInt(Math.random() * 64 ** 12);

  // if hash exists, create new hash
  const hashExists = await checkHashExists(value);
  if (hashExists.length > 0) {
    return generateHash();
  }
  return value;
}

export default apiHandler().post(async (req, res) => {
  const data = req.body;

  // validation on ownerid
  const { ownerId, listings } = userSchema.share.post.body.parse(data);

  // validation on listingid
  const results = listings.map((id: number) => checkListingsExists(id));
  await Promise.all(results).catch((err) => {
    throw err;
  });

  // creates random hash
  const hash = await generateHash();

  const hashedUrl = await PrismaClient.share.create({
    data: {
      hash,
      owner: ownerId,
    },
  });

  const hashedUrlID = hashedUrl.id;

  // store listing id in db
  const listingIds = await PrismaClient.sharesListings.createMany({
    data: listings.map((id: number) => ({
      hash: hashedUrlID,
      listing: id,
    })),
  });

  res.status(200).json(formatAPIResponse({ id: hashedUrl.id.toString(), hash }));
});
