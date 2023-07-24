// ** Utils Imports
import { apiHandler, formatAPIResponse } from '@/utils/api';

// ** Zod Imports
import { userSchema } from '@/utils/api/server/zod';

// ** Error Imports
import { NotFoundError } from '@inc/errors/src';

// ** Prisma Imports
import PrismaClient from '@inc/db';

export function compressInt(value: number, base = 64) {
  const BASE64_CHARS_FOR_NUMBER =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+-$';

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

export default apiHandler().post(async (req, res) => {
  const data = req.body;

  // validation on ownerid
  const { ownerId, listings } = userSchema.share.post.body.parse(data);

  // validation on listingid
  const results = listings.map((id: number) => checkListingsExists(id));
  await Promise.all(results).catch((err) => {
    throw err;
  });

  console.log('listingsId', data.listings);

  // creates random hash
  const value = compressInt(Math.random() * 64 ** 12);
  console.log('value', value);

  // if hash collision occurs, try again
  // if (value in db) {
  //   value = compressInt(Math.random() * 64 ** 12);
  // }

  // store hash in db
  // db[value] = url;

  res.status(200).json(formatAPIResponse({ 'post test': 'test' }));
});
