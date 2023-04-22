import { apiHandler } from "@/utils/api";
import { formatAPIResponse } from "@/utils/stringUtils";
import { datatype } from "@prisma/client";

export default apiHandler({
  allowNonAuthenticated: true,
}).get(async (req, res) => {
  // Retrieve all parameter data types from the database
  const dataTypes = await Object.keys(datatype);

  // Return the result
  res.status(200).json(formatAPIResponse(dataTypes));
});
