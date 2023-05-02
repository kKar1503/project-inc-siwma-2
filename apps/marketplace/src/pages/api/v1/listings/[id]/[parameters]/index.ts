import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient, { ListingsParametersValue } from '@inc/db';
import { NotFoundError } from '@/errors';
import * as z from 'zod';

import { parseListingId } from '@/utils/api';
import { checkListingExists } from '../index';

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


};




export default apiHandler()
    .get(getListingParameters)
    .put(updateListingParameters);

