import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NotFoundError } from '@inc/errors';
import { shortenUrl } from '@inc/utils';
import PrismaClient from '@inc/db';
import { parseListingId } from '../../index';
import { checkListingExists } from '../index';

const postShareURL = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const id = parseListingId(req.query.id as string);
    const listing = await checkListingExists(id);

    if (!listing) {
      throw new NotFoundError(`Listing with id '${id}`);
    }

    if (listing.hashedUrl === null) {
      // If hashed URL is not present, generate a shortened URL the shortenUrl function
      const hashedUrl = shortenUrl(10); // Generate a 10-character long URL safe string

      // Update the listing with the new hashed URL
      await PrismaClient.listing.update({
        where: {
          id,
        },
        data: {
          hashedUrl,
        },
      });

      // Construct the complete URL with the hashed URL appended to the base URL
      const shortUrl = `${process.env.FRONTEND_URL}/share/${hashedUrl}`;
      // Return the shortened URL value in the response
      res.status(200).json(formatAPIResponse({ hash: hashedUrl, shortUrl }));
      return;
    }

    // If hashed URL is already present, construct the complete URL with the hashed URL appended to the base URL
    const shortUrl = `${process.env.FRONTEND_URL}/share/${listing.hashedUrl}`;
    // Return the hash and the shortened URL in the response
    res.status(200).json(formatAPIResponse({ hash: listing.hashedUrl, shortUrl }));
    return;
  } catch (error) {
    res.status(500).json(formatAPIResponse({ error }));
  }
};

export default apiHandler().post(postShareURL);
