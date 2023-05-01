import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@/errors';
import { formatListingResponse, listingsRequestBody, formatSingleListingResponse } from '..';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';

// -- Functions --//
function parseListingId($id: string | string[] | undefined): number {
    if (Array.isArray($id)) {
        $id = $id[0];
    }

    if (!$id) {
        throw new NotFoundError(`Listing id not provided`);
    }

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
        where: { id: id },
        include: {
            users: {
                select: {
                    company_id: true,
                },
            },
            listings_parameters_value: true, // add this line
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
        const id = parseListingId(req.query.id);
        const listing = await checkListingExists(id);

        // Return the result
        res.status(200).json(formatAPIResponse(formatSingleListingResponse(listing)));
    })
    .delete(apiGuardMiddleware(), async (req, res) => {
        const id = parseListingId(req.query.id);
        const userId = req.token?.user?.id;
        const userRole = req.token?.user?.role;

        try {
            const listing = await checkListingExists(id);

            const isOwner = listing.owner === userId;
            const isAdmin = userRole && userRole >= 1;
            const sameCompany = req.token?.user?.company === listing.users.company_id;

            if (!isOwner && !isAdmin && !sameCompany) {
                return res.status(403).json({
                    errors: [{ status: 403, detail: 'Forbidden' }],
                });
            }

            await PrismaClient.listing.delete({
                where: { id },
            });

            res.status(204).end();
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({
                    errors: [{ status: 404, detail: error.message }],
                });
            } else {
                console.error('Error deleting listing:', error);
                res.status(500).json({
                    errors: [{ status: 500, detail: 'Internal server error' }],
                });
            }
        }
    });
