import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { parseListingId } from '../../../listings/index';
import PrismaClient from '@inc/db';
import { ForbiddenError, NotFoundError } from '@inc/errors';
import * as z from 'zod';
import { checkListingExists } from '../index';
import { APIRequestType } from '@/types/api-types';

// -- Functions --//
function formatParametersResponse(parameters: { parameterId: number; value: string }[]): any[] {
  return parameters.map((parameter) => ({
    paramId: parameter.parameterId,
    value: parameter.value,
  }));
}

/**
 * Checks if a listing exists
 * @param id The listing id
 * @returns The listing if it exists
 */
const getListingParameters = async (req: APIRequestType, res: NextApiResponse) => {
  const id = parseListingId(req.query.id as string);
  const listing = await checkListingExists(id);

  if (!listing) {
    throw new NotFoundError(`Listing with id '${id}'`);
  }

  const parameters = await PrismaClient.listingsParametersValue.findMany({
    where: {
      listingId: id,
    },
    include: {
      parameter: true,
    },
  });

  const formattedParameters = formatParametersResponse(parameters);
  res.status(200).json(formatAPIResponse({ formattedParameters }));
};

const parameterSchema = z.object({
  paramId: z.string().refine((paramId) => !isNaN(parseToNumber(paramId, 'paramId')), {
    message: 'paramId must be a string that can be converted to a number.',
  }),
  value: z.string(),
});

type RequestBodyParameter = {
  paramId: string;
  value: string;
};

const createListingParameter = async (req: APIRequestType, res: NextApiResponse) => {
  const id = parseListingId(req.query.id as string);
  const userId = req.token?.user?.id;
  const userRole = req.token?.user?.role;

  const listing = await checkListingExists(id);

  const isOwner = listing.owner === userId;
  const isAdmin = userRole && userRole >= 1;
  const sameCompany = req.token?.user?.company === listing.users.companyId.toString();

  if (!isOwner && !isAdmin && !sameCompany) {
    throw new ForbiddenError();
  }

  const { paramId, value } = parameterSchema.parse(req.body);

  const createdParameter = await PrismaClient.listingsParametersValue.create({
    data: {
      value: value,
      listing: {
        connect: {
          id: id,
        },
      },
      parameter: {
        connect: {
          id: parseToNumber(paramId, 'paramId'),
        },
      },
    },
    select: {
      parameterId: true,
      value: true,
    },
  });

  res
    .status(201)
    .json(
      formatAPIResponse(
        formatParametersResponse([
          { parameterId: createdParameter.parameterId, value: createdParameter.value },
        ])
      )
    );
};

const updateListingParameters = async (req: APIRequestType, res: NextApiResponse) => {
  const id = parseListingId(req.query.id as string);
  const userId = req.token?.user?.id;
  const userRole = req.token?.user?.role;

  const listing = await checkListingExists(id);

  const isOwner = listing.owner === userId;
  const isAdmin = userRole && userRole >= 1;
  const sameCompany = req.token?.user?.company === listing.users.companyId.toString();

  if (!isOwner && !isAdmin && !sameCompany) {
    throw new ForbiddenError();
  }

  const parameters = z.array(parameterSchema).parse(req.body);

  // Check for invalid paramIds and values
  for (const param of parameters) {
    const paramIdInt = parseToNumber(param.paramId, 'paramId');
    if (isNaN(paramIdInt)) {
      return res.status(422).json(formatAPIResponse({ success: false, error: 'Invalid paramId' }));
    }
  }

  // Update the parameters in the database and format the response
  const updatePromises = parameters.map((param: RequestBodyParameter) => {
    const parameterId = parseToNumber(param.paramId, 'paramId');

    // Update the parameter value
    return PrismaClient.listingsParametersValue.update({
      where: {
        listingId_parameterId: {
          listingId: id,
          parameterId: parameterId,
        },
      },
      data: {
        value: param.value,
      },
      select: {
        parameterId: true,
        value: true,
      },
    });
  });

  const updatedParametersResults = await PrismaClient.$transaction(updatePromises);
  
  const updatedParameters = updatedParametersResults.map((result) => ({
    paramId: result.parameterId,
    value: result.value,
  }));

  res.status(200).json(formatAPIResponse({ updatedParameters }));
};

export default apiHandler()
  .get(getListingParameters)
  .post(createListingParameter)
  .put(updateListingParameters);
