import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { z } from 'zod';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';

// -- Type definitions -- //

// Define the type of the image object
type Image = {
    id: string;
    fileName: string;
    url: string;
};

// Define the type of the parameter object
type Parameter = {
    id: string;
    paramId: string;
    value: number;
};

// Define the type of the listing object
type Listing = {
    id: string;
    name: string;
    description: string;
    price: number;
    unitPrice: boolean;
    negotiable: boolean;
    categoryId: string;
    listingType: string;
    open: boolean;
    visibility: boolean;
    active: boolean;
    image: Image[];
    coverImage: Image;
    parameter: Parameter[];
    owner: string;
};

// -- Helper functions -- //

export function formatListingResponse($listings: Listing | Listing[]) {
    // Initialise the listings array
    let listings = $listings;

    // Check if the listing is not an array
    if (!Array.isArray(listings)) {
        // Make it an array
        listings = [listings];
    }

    // Construct the result
    const result = listings.map((listing) => ({
        id: listing.id,
        name: listing.name,
        description: listing.description,
        price: listing.price,
        unitPrice: listing.unitPrice,
        negotiable: listing.negotiable,
        categoryId: listing.categoryId,
        listingType: listing.listingType,
        open: listing.open,
        visibility: listing.visibility,
        active: listing.active,
        image: listing.image,
        coverImage: listing.coverImage,
        parameter: listing.parameter,
        owner: listing.owner,
    }));

    return formatAPIResponse(result);
}

export const listingsRequestBody = z.object({
    // Define the request body schema
    // Add any additional fields as needed
});

export default apiHandler()
    .get(async (req, res) => {
        // Retrieve all listings from the database
        const listings = await PrismaClient.listing.findMany();

        // Return the result
        res.status(200).json(formatListingResponse(listings));
    })
    .post(
        apiGuardMiddleware({
            allowAdminsOnly: true,
        }),
        async (req, res) => {
            // Create a new listing (admins only)
            // Parse and validate the request body
            const data = listingsRequestBody.parse(req.body);

            // Insert the listing into the database
            // Add the necessary fields based on the request body schema
            const result = await PrismaClient.listing.create({
                data: {
                    // Add the necessary fields based on the request body schema
                },
            });

            // Return the result
            res.status(201).json({ listingId: result.id });
        }
    );