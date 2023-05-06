import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, formatAPIResponse, parseListingId } from '@/utils/api';
import PrismaClient, { Parameter, ListingsParametersValue } from '@inc/db';
import { ForbiddenError } from '@/errors/AuthError';
import * as z from 'zod';
import { checkListingExists } from '../index';

// -- Functions --//

function formatParametersResponse(parameters: Parameter[]): any[] {
  return parameters.map((parameter) => ({
    id: parameter.id,
    name: parameter.name,
    type: parameter.type,
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

const parameterSchema = z.object({
  parameterId: z.string(),
  value: z.string(),
});

// Define the schema for the entire request body
const requestSchema = z.object({
  parameters: z.array(parameterSchema),
});

// Custom request type with 'token' property
interface CustomApiRequest extends NextApiRequest {
  token?: {
    user: {
      id: string;
      role: number;
      company: string;
    };
  };
}

type RequestBodyParameter = {
  parameterId: string;
  value: string;
};

const createListingParameter = async (req: CustomApiRequest, res: NextApiResponse) => {
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

  const { paramId, value } = req.body;

  // Make sure to check if paramId is a valid number
  const paramIdInt = parseInt(paramId, 10);
  if (isNaN(paramIdInt)) {
    return res
      .status(400)
      .json(formatAPIResponse({ success: false, error: 'Invalid parameter ID' }));
  }

  await PrismaClient.listingsParametersValue.create({
    data: {
      value: value,
      listing: {
        connect: {
          id: id,
        },
      },
      parameter: {
        connect: {
          id: paramIdInt,
        },
      },
    },
  });

  res
    .status(201)
    .json(formatAPIResponse({ success: true, data: 'Listing parameter created successfully' }));
};

const updateListingParameters = async (req: CustomApiRequest, res: NextApiResponse) => {
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
    const paramIdInt = parseInt(param.parameterId, 10);
    if (isNaN(paramIdInt)) {
      return res.status(422).json(formatAPIResponse({ success: false, error: 'Invalid paramId' }));
    }
  }

  // Update the parameters in the database and format the response
  const updatedParameters = await Promise.all(
    parameters.map(async (param: RequestBodyParameter) => {
      const parameterId = parseInt(param.parameterId, 10);

      // Update the parameter value
      const updatedParameter = await PrismaClient.listingsParametersValue.update({
        where: {
          listingId_parameterId: {
            listingId: id,
            parameterId: parameterId,
          },
        },
        data: {
          value: param.value,
        },
      });

      // Format the response
      return {
        paramId: updatedParameter.parameterId,
        value: updatedParameter.value,
      };
    })
  );

  res.status(200).json(formatAPIResponse({ success: true, data: updatedParameters }));
};

export default apiHandler()
  .get(getListingParameters)
  .post(createListingParameter)
  .put(updateListingParameters);
