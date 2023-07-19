import { NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { ForbiddenError, NotFoundError, ParamError, ParamInvalidError } from '@inc/errors';
import { APIRequestType } from '@/types/api-types';
import { listingSchema } from '@/utils/api/server/zod';
import type { ListingParameter as ListingParameterDB } from '@inc/types';
import { ListingParameter } from '@/utils/api/client/zod';
import { parseListingId } from '../../index';
import { checkListingExists } from '../index';

// -- Functions --//
function formatParametersResponse(parameters: ListingParameterDB[]): ListingParameter[] {
  if (!parameters) {
    return [];
  }

  return parameters.map(({ parameterId, value }) => ({
    paramId: parameterId.toString(),
    value,
  }));
}

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

  const parameters = await PrismaClient.listingsParametersValue.findUnique({
    where: {
      listingId: id,
    },
  });

  const formattedParameters = formatParametersResponse(
    parameters?.parameters as ListingParameterDB[]
  );
  res.status(200).json(formatAPIResponse(formattedParameters));
};

const createListingParameter = async (req: APIRequestType, res: NextApiResponse) => {
  const id = parseListingId(req.query.id as string);
  const userId = req.token?.user?.id;
  const userRole = req.token?.user?.role;

  const listing = await checkListingExists(id);

  const isOwner = listing.owner === userId;
  const isAdmin = userRole && userRole >= 1;
  const sameCompany = req.token?.user?.companyId === listing.users.companyId.toString();

  if (!isOwner && !isAdmin && !sameCompany) {
    throw new ForbiddenError();
  }

  const { paramId, value } = listingSchema.parameters.post.body.parse(req.body);

  // Get valid parameters for the listing's category
  const validParameters = await getValidParametersForCategory(listing.listingItemId);

  // Check that each paramId is a valid parameter for the category
  if (!validParameters.includes(paramId.toString())) {
    throw new ParamInvalidError('paramId', paramId);
  }

  // Construct the new parameter value object
  const oldParams = listing.listingsParametersValue?.parameters as ListingParameterDB[];
  const parameterValues = oldParams.map((parameter) => {
    const result =
      paramId === parameter.parameterId
        ? { parameterId: paramId, value: value.toString() }
        : parameter;
    return result;
  });

  // Update the listing's parameters
  await PrismaClient.listingsParametersValue.upsert({
    where: {
      listingId: id,
    },
    update: {
      parameters: parameterValues,
    },
    create: {
      listingId: id,
      parameters: parameterValues,
    },
  });

  res
    .status(201)
    .json(
      formatAPIResponse(
        formatParametersResponse([{ parameterId: paramId, value: value.toString() }])
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
  const sameCompany = req.token?.user?.companyId === listing.users.companyId.toString();

  if (!isOwner && !isAdmin && !sameCompany) {
    throw new ForbiddenError();
  }

  const data = listingSchema.parameters.put.body.parse(req.body);

  // Get valid parameters for the listing's category
  const validParameters = await getValidParametersForCategory(listing.listingItemId);

  // Check that each paramId is a valid parameter for the category
  if (data.length > 0) {
    data.forEach((parameter) => {
      if (!validParameters.includes(parameter.paramId.toString())) {
        throw new ParamInvalidError('paramId', parameter.paramId);
      }
    });
  }

  // Construct the new parameter value object
  const oldParams = listing.listingsParametersValue?.parameters as ListingParameterDB[];
  const parameterValues = oldParams.map((parameter) => {
    const newParam = data.find((param) => param.paramId === parameter.parameterId);
    const result = newParam
      ? { parameterId: newParam.paramId, value: newParam.value.toString() }
      : parameter;
    return result;
  });

  // Update the listing's parameters
  const updatedParametersResults = await PrismaClient.listingsParametersValue.upsert({
    where: {
      listingId: id,
    },
    update: {
      parameters: parameterValues,
    },
    create: {
      listingId: id,
      parameters: parameterValues,
    },
  });

  const updatedParameters = (updatedParametersResults.parameters as ListingParameterDB[]).map(
    (result) => ({
      paramId: result.parameterId,
      value: result.value,
    })
  );

  res.status(200).json(formatAPIResponse({ updatedParameters }));
};

export default apiHandler()
  .get(getListingParameters)
  .post(createListingParameter)
  .put(updateListingParameters);
