import { DataType, ParameterType, UnitType } from '@inc/db-enums';
import { z } from 'zod';

/**
 * Zod schema for the POST / PUT request body
 */
const paramsRequestBody = z.object({
  // Define the request body schema
  name: z.string().min(1),
  displayName: z.string().min(1),
  type: z.nativeEnum(ParameterType),
  dataType: z.nativeEnum(DataType),
  unit: z.nativeEnum(UnitType),
  options: z.string().array().optional(),
});

export type ParamsRequestBody = z.infer<typeof paramsRequestBody>;

export default {
  post: {
    body: paramsRequestBody,
  },
};
