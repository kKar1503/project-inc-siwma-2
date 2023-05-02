import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient, { ListingsParametersValue } from '@inc/db';
import { NotFoundError } from '@/errors';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { parseListingId } from '@/utils/api';

// -- Functions --//

function formatParametersResponse(parameters: any[]): any[] {
    return parameters.map((param) => ({
        id: param.parameter_id,
        paramId: param.parameter.id,
        value: param.value,
    }));
}

/**
 * Checks if a listing exists
 * @param id The listing id
 * @returns The listing if it exists
 */
async function checkListingExists($id: string | number) {
    // Parse and validate listing id provided
    const id = typeof $id === 'number' ? $id : parseListingId($id);

    // Check if the listing exists
    const listing = await PrismaClient.listing.findUnique({
        where: {
            id,
        },
    });

    // Check if the listing exists
    if (!listing) {
        throw new NotFoundError('Listing');
    }

    return listing;
}

const getListingParameters = async (req: NextApiRequest, res: NextApiResponse) => {


    const id = parseListingId(req.query.id as string);
    const listing = await checkListingExists(id);

    const parameters = await PrismaClient.listingsParametersValue.findMany({
        where: {
            listingId: id,
        },
        include: {
            parameter: true,
        },
    });

    const formattedParameters = formatParametersResponse(parameters);
    res.status(200).json(formatAPIResponse({ success: true, data: formattedParameters }));


};

const updateListingParameters = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        try {
            const id = parseListingId(req.query.id as string);
            const listing = await checkListingExists(id);

            // Assuming that the request body contains the new parameters
            const { parameters } = req.body;

            // Delete all the existing parameters for this listing
            await PrismaClient.listingsParametersValue.deleteMany({
                where: {
                    listingId: id,
                },
            });

            // Add the new parameters to the database
            await Promise.all(parameters.map(async (param: ListingsParametersValue) => {
                await PrismaClient.listingsParametersValue.create({
                    data: {
                        listingId: id,
                        parameterId: param.parameterId,
                        value: param.value,
                    },
                });
            }));

            res.status(200).json(formatAPIResponse({ success: true, data: 'Listing parameters updated successfully' }));
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json(formatAPIResponse({ success: false, data: error.message }));
            } else {
                res.status(500).json(formatAPIResponse({ success: false, data: 'Internal server error' }));
            }
        }
    } else {
        res.status(405).json(formatAPIResponse({ success: false, data: 'Method not allowed' }));
    }
};




export default apiHandler()
    .get(async (req, res) => {
        await apiGuardMiddleware()(req, res, async () => {
            await getListingParameters(req, res);
        });
    })
    .put(async (req, res) => {
        await apiGuardMiddleware()(req, res, async () => {
            await updateListingParameters(req, res);
        });
    })
    .all((req, res) => {
        res.status(405).json({ success: false, data: 'Method not allowed' });
    });
