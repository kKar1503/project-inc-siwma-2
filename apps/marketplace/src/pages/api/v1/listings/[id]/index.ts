import { apiHandler } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@/errors';
import { formatListingResponse, listingsRequestBody } from '..';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';

// -- Functions --//
function parseListingId($id: string) {
    // Parse and validate listing id provided
    const id = parseInt($id, 10);

    // Check if the listing id is valid
    if (Number.isNaN(id)) {
        throw new NotFoundError(`Listing with id '${id}'`);
    }

    return id;
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
        throw new NotFoundError(`Listing with id '${id}'`);
    }

    return listing;
}

export default apiHandler()
    .get(async (req, res) => {
        // Retrieve the listing from the database
        const id = parseListingId(req.query.id as string);
        const listing = await checkListingExists(id);

        // Return the result
        res.status(200).json(formatListingResponse(listing));
    })

    .delete(async (req, res) => {
        apiGuardMiddleware({
            allowNonAuthenticated: true,
        })

        // Deletes a listing
        // Parse and validate listing id provided
        const id = parseListingId(req.query.id as string);


        // // Check if the listing exists
        // await checkListingExists(id);

        // Delete the listing from the database
        await PrismaClient.listing.delete({
            where: {
                id,
            },
        });

        // Return 204 no content
        res.status(204).end();
    });