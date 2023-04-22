import { apiHandler } from "@/utils/api";
import { formatParamResponse, paramsRequestBody } from "..";
import PrismaClient from "@/utils/prisma";
import { NotFoundError } from "@/errors";

//-- Functions --//
function parseParamid($id: string) {
  // Parse and validate param id provided
  const id = parseInt($id);

  // Check if the parameter id is valid
  if (isNaN(id)) {
    throw new NotFoundError(`Parameter with id '${id}'`);
  }

  return id;
}

/**
 * Checks if a parameter exists
 * @param id The parameter id
 * @returns The parameter if it exists
 */
async function checkParamExists($id: string | number) {
  // Parse and validate param id provided
  const id = typeof $id === "number" ? $id : parseParamid($id);

  // Check if the parameter exists
  const parameter = await PrismaClient.parameter.findUnique({
    where: {
      id,
    },
  });

  // Check if the parameter exists
  if (!parameter) {
    throw new NotFoundError(`Parameter with id '${id}'`);
  }

  return parameter;
}

export default apiHandler({
  allowAdminsOnly: true,
})
  .put(async (req, res) => {
    // Update an existing parameter
    // Parse and validate param id provided
    const id = parseParamid(req.query.id as string);

    // Check if the parameter exists
    await checkParamExists(id);

    // Parse and validate the request body
    const data = paramsRequestBody.parse(req.body);

    // Update the parameter in the database
    const updatedParams = await PrismaClient.parameter.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        display_name: data.displayName,
        type: data.type,
        datatype: data.dataType,
      },
    });

    // Return the result
    res.status(200).json(formatParamResponse(updatedParams));
  })
  .patch(async (req, res) => {
    // Toggles the active state of a parameter
    // Parse and validate param id provided
    const id = parseParamid(req.query.id as string);

    // Check if the parameter exists
    const parameter = await checkParamExists(id);

    // Update the active state of the parameter
    await PrismaClient.parameter.update({
      where: {
        id,
      },
      data: {
        active: !parameter.active,
      },
    });

    // Return 204 no content
    res.status(204).end();
  })
  .delete(async (req, res) => {
    // Deletes a parameter
    // Parse and validate param id provided
    const id = parseParamid(req.query.id as string);

    // Check if the parameter exists
    await checkParamExists(id);

    // Delete the parameter from the database
    await PrismaClient.parameter.delete({
      where: {
        id,
      },
    });

    // Return 204 no content
    res.status(204).end();
  });
