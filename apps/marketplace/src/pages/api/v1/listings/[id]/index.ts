import { apiHandler } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@/errors';
import { formatListingResponse, listingsRequestBody } from '..';

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
    .put(async (req, res) => {
        // // Update an existing listing
        // // Parse and validate listing id provided
        // const id = parseListingId(req.query.id as string);

        // // Check if the listing exists
        // await checkListingExists(id);

        // // Parse and validate the request body
        // const data = listingsRequestBody.parse(req.body);

        // // Update the listing in the database
        // const updatedListing = await PrismaClient.listing.update({
        //     where: {
        //         id,
        //     },
        //     data: {
        //         name: data.name,
        //         description: data.description,
        //         price: data.price,
        //         unitPrice: data.unitPrice,
        //         negotiable: data.negotiable,
        //         categoryId: data.categoryId,
        //         type: data.type,
        //         active: data.active,
        //     },
        // });

        // // Return the result
        // res.status(200).json(formatListingResponse(updatedListing));
    })
    .delete(async (req, res) => {
        // Deletes a listing
        // Parse and validate listing id provided
        const id = parseListingId(req.query.id as string);

        // Check if the listing exists
        await checkListingExists(id);

        // Delete the listing from the database
        await PrismaClient.listing.delete({
            where: {
                id,
            },
        });

        // Return 204 no content
        res.status(204).end();
    });