import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@/errors';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { parseToNumber } from '@/utils/api';

// -- Functions --//


function parseId(idString: string): number {
    const id = parseToNumber(idString);
    return id;
}


async function checkListingExists(listingId: number) {
    const listing = await PrismaClient.listing.findUnique({
        where: {
            id: listingId,
        },
    });

    if (!listing) {
        throw new NotFoundError("Listing")
    }

    return listing;
}

async function getParameter(listingId: number, parameterId: number) {
    const parameter = await PrismaClient.listings_parameters_value.findFirst({
        where: {
            listing_id: listingId,
            parameter_id: parameterId,
        },
        include: {
            parameter: true,
        },
    });

    if (!parameter) {
        throw new NotFoundError("Parameter");
    }

    return {
        paramId: parameter.parameter.id,
        value: parameter.value,
    };
}

export default apiHandler()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const listingId = parseToNumber(req.query.id as string);
            const parameterId = parseToNumber(req.query.parameterId as string);
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
    })
    .all((req, res) => {
        res.status(405).json({ success: false, data: 'Method not allowed' });
    });
