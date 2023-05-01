import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient, { listing, listingtype } from '@inc/db';
import { z } from 'zod';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { Decimal } from '@prisma/client/runtime';

// -- Type definitions -- //
export type ListingResponse = {
    id: string;
    name: string;
    description: string;
    price: Decimal;
    unitPrice?: boolean;
    negotiable?: boolean;
    categoryId: string;
    type: listingtype;
    active: boolean;
    owner: string;
    parameters?: Array<{
        paramId: string;
        value: string;
    }>;
};

type ListingWithParameters = listing & {
    listings_parameters_value: Array<{
        parameter_id: number;
        value: string;
    }>;
};

// -- Helper functions -- //
export function formatListingResponse($listings: ListingWithParameters[]) {
    return $listings.map((listing) => ({
        id: listing.id.toString(),
        name: listing.name,
        description: listing.description,
        price: listing.price,
        unitPrice: listing.unit_price,
        negotiable: listing.negotiable,
        categoryId: listing.category_id.toString(),
        listingType: listing.type,
        owner: listing.owner,
        active: listing.active,
        parameters: listing.listings_parameters_value
            ? listing.listings_parameters_value.map((parameter) => ({
                paramId: parameter.parameter_id.toString(),
                value: parameter.value,
            }))
            : undefined,
    }));
}

export const listingsRequestBody = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    unitPrice: z.boolean().optional(),
    negotiable: z.boolean().optional(),
    categoryId: z.number(),
    type: z.nativeEnum(listingtype),
    parameters: z
        .array(
            z.object({
                paramId: z.string(),
                value: z.string(),
            })
        )
        .optional(),
});

export default apiHandler()
    .get(apiGuardMiddleware(), async (req, res) => {
        const listings = await PrismaClient.listing.findMany({
            include: {
                listings_parameters_value: true,
            },
        });

        res.status(200).json(formatAPIResponse(formatListingResponse(listings)));
    })
    .post(apiGuardMiddleware(), async (req, res) => {
        try {
            const data = listingsRequestBody.parse(req.body);
            console.log('Parsed request body:', data);

            // Use the user ID from the request object
            const userId = req.token?.user?.id;

            // Check if the category exists
            const categoryExists = await PrismaClient.category.findUnique({
                where: { id: data.categoryId },
            });

            if (!categoryExists) {
                return res.status(422).json({
                    errors: [{ status: 422, detail: 'Category not found' }],
                });
            }

            const listing = await PrismaClient.listing.create({
                data: {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    unit_price: data.unitPrice,
                    negotiable: data.negotiable,
                    category_id: data.categoryId,
                    type: data.type,
                    active: true,
                    owner: userId,
                    listings_parameters_value: data.parameters
                        ? {
                            create: data.parameters.map((parameter) => ({
                                value: parameter.value,
                                parameter: {
                                    connect: {
                                        id: parseInt(parameter.paramId),
                                    },
                                },
                            })),
                        }
                        : undefined,
                },
                include: {
                    listings_parameters_value: true,
                },
            });
            console.log('Created listing:', listing);

            res.status(201).json({ listingId: listing.id });
        } catch (error) {
            console.error('Error creating listing:', error);

            let detail;
            if (error instanceof z.ZodError) {
                detail = error.issues[0].path.join('/');
            } else {
                detail = 'Invalid parameter supplied';
            }

            res.status(422).json({
                errors: [{ status: 422, detail }],
            });
        }
    });