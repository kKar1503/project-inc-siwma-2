import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@/errors';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';

// -- Functions --//
function parseId(idString: string): number {
  const id = parseInt(idString, 10);
  if (Number.isNaN(id)) {
    throw new NotFoundError(`Invalid id '${idString}'`);
  }
  return id;
}

async function checkListingExists(listingId: number) {
  const listing = await PrismaClient.listing.findUnique({
    where: {
      id: listingId,
    },
  });

  if (!listing) {
    throw new NotFoundError(`Listing with id '${listingId}' not found`);
  }

  return listing;
}

async function getParameter(listingId: number, parameterId: number) {
  const parameter = await PrismaClient.listingsParametersValue.findFirst({
    where: {
      listingId,
      parameterId,
    },
    include: {
      parameter: true,
    },
  });

  if (!parameter) {
    throw new NotFoundError(`Parameter with id '${parameterId}' not found`);
  }

  return {
    paramId: parameter.parameterId,
    value: parameter.value,
  };
}

export default apiHandler()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    await apiGuardMiddleware()(req, res, async () => {
      try {
        const listingId = parseId(req.query.id as string);
        const parameterId = parseId(req.query.parameterId as string);
        await checkListingExists(listingId);

        const parameter = await getParameter(listingId, parameterId);
        res.status(200).json(formatAPIResponse({ success: true, data: parameter }));
      } catch (error) {
        if (error instanceof NotFoundError) {
          res.status(404).json(formatAPIResponse({ success: false, data: error.message }));
        } else {
          res.status(500).json(formatAPIResponse({ success: false, data: 'Internal server error' }));
        }
      }
    });
  })
  .all((req, res) => {
    res.status(405).json({ success: false, data: 'Method not allowed' });
  });
