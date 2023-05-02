import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@/errors';
import { parseToNumber } from '@/utils/api';

// -- Functions --//
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
        throw new NotFoundError("Parameter");
    }

    return {
        paramId: parameter.parameter.id,
        value: parameter.value,
    };
}

export default apiHandler()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {

        const listingId = parseToNumber(req.query.id as string);
        const parameterId = parseToNumber(req.query.parameterId as string);
        await checkListingExists(listingId);

        const parameter = await getParameter(listingId, parameterId);
        res.status(200).json(formatAPIResponse({ parameter }));

    })

