import { DataType, ParameterType } from '@prisma/client';
import { z } from 'zod';

// -- Define properties -- //
const id = z.string();
const name = z.string();
const displayName = z.string();
const type = z.nativeEnum(ParameterType);
const dataType = z.nativeEnum(DataType);
const active = z.boolean();
const options = z.string().array();

// -- Define schema -- //
const parameter = z.object({
  id,
  name,
  displayName,
  type,
  dataType,
  active,
  options: options.optional(),
});

// POST /parameters
const createParameter = z.object({ parameterId: id });

// GET /parameters
const getParameters = z.array(parameter);

// GET /parameters/types
const getParameterTypes = z.array(type);

// GET /parameters/data-types
const getParameterDataTypes = z.array(dataType);

// PUT /parameters/:id
const updateParameter = parameter;

// PATCH /parameters/:id
const toggleParameter = z.object({ active });

// DELETE /parameters/:id
const deleteParameter = z.object({});

export type ParameterResponseBody = z.infer<typeof parameter>;
export type Parameter = z.infer<typeof parameter>;

export default {
  create: createParameter,
  getAll: getParameters,
  getTypes: getParameterTypes,
  getDataTypes: getParameterDataTypes,
  update: updateParameter,
  toggle: toggleParameter,
  delete: deleteParameter,
};
