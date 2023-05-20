import { DataType, ParameterType } from '@prisma/client';
import { z } from 'zod';

// -- Define properties -- //
const id= z.string().transform((val) => Number(val));
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
export const createParameter = z.object({ parameterId: id });

// GET /parameters
export const getParameters = z.array(parameter);

// GET /parameters/types
export const getParameterTypes = z.array(type);

// GET /parameters/data-types
export const getParameterDataTypes = z.array(dataType);

// PUT /parameters/:id
export const updateParameter = parameter;

// PATCH /parameters/:id
export const toggleParameter = z.object({ active });

// DELETE /parameters/:id
export const deleteParameter = z.object({});
