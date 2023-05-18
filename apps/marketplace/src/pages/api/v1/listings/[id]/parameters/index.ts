import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse, zodParseToInteger, zodParseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import { ForbiddenError, NotFoundError, ParamError } from '@inc/errors';
import * as z from 'zod';
import { APIRequestType } from '@/types/api-types';
import { parseListingId } from '../../index';
import { checkListingExists } from '../index';
import parameters from '../../../parameters';

// -- Functions --//
function formatParametersResponse(parameters: { parameterId: number; value: string }[]): any[] {
  return parameters.map(({ parameterId, value }) => ({
    paramId: parameterId,
    value,
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
  res.status(200).json(formatAPIResponse(formattedParameters));
};

/**
 * Fetches valid parameters for a category
 * @param categoryId The category id
 * @returns An array of valid parameter ids for the category
 */
async function getValidParametersForCategory(categoryId: number): Promise<string[]> {
  // Fetch valid parameters for the category
  const validParameters = await PrismaClient.category.findUnique({
    where: { id: categoryId },
    include: { categoriesParameters: true },
  });

  if (!validParameters) {
    throw new NotFoundError(`Category with id '${categoryId}'`);
  }

  // Return an array of valid parameter ids
  return validParameters.categoriesParameters.map((param) => param.parameterId.toString());
}

const parameterSchema = z.object({
  paramId: z.string().transform(zodParseToInteger),
  value: z.string().transform(zodParseToNumber),
});

type RequestBodyParameter = {
  paramId: number;
  value: number;
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

  // Get valid parameters for the listing's category
  const validParameters = await getValidParametersForCategory(listing.categoryId);

  // Check that the paramId is a valid parameter for the category
  if (!validParameters.includes(paramId.toString())) {
    throw new ParamError('paramId');
  }

  const createdParameter = await PrismaClient.listingsParametersValue.create({
    data: {
      value: value.toString(),
      listing: {
        connect: {
          id,
        },
      },
      parameter: {
        connect: {
          id: paramId,
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

  // Update the parameters in the database and format the response
  const updatePromises = parameters.map((param: RequestBodyParameter) => {
    const parameterId = param.paramId;

    // Update the parameter value
    return PrismaClient.listingsParametersValue.update({
      where: {
        listingId_parameterId: {
          listingId: id,
          parameterId,
        },
      },
      data: {
        value: param.value.toString(),
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
