import { apiHandler, formatAPIResponse } from '@/utils/api';
import { UnitType } from '@inc/db-enums';

export default apiHandler().get(async (req, res) => {
  // Retrieve all available unit types
  const unitTypes = Object.keys(UnitType);

  // Return the result
  res.status(200).json(formatAPIResponse(unitTypes));
});
