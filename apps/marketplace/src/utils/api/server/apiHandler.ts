import {
  BaseError,
  BucketConnectionFailure,
  ErrorJSON,
  InvalidBucketName,
  InvalidDataProvided,
  MissingUUID,
  MultipartUploadError,
  ObjectCollision,
  ObjectNotFound,
  ParamError,
  ParamInvalidError,
  ParamRequiredError,
  ParamTooShortError,
  ParamTypeError,
  QueryError,
  UnknownError,
  UnknownS3Error,
} from '@inc/errors';

import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { APIHandlerOptions, APIRequestType } from '@/types/api-types';
import { S3Error } from '@inc/s3-simplified';
import { apiGuardMiddleware } from './middlewares/apiGuardMiddleware';
import jwtMiddleware from './middlewares/jwtMiddleware';

/**
 * Zod path to string
 */
function zodPathToString(path: (string | number)[]) {
  // Initialise result
  let result = '';

  // Iterate through each path
  for (let i = 0; i < path.length; i++) {
    // Check if it is a number
    if (typeof path[i] === 'number') {
      // It is a number, add it to the result
      result += `[${path[i]}]`;
    } else {
      // It is a string, add it to the result
      result += `${i > 0 ? '.' : ''}${path[i]}`;
    }
  }

  return result;
}

/**
 * Zod error handler
 */
function handleZodError(error: ZodError) {
  // Iterate through each Zod Issue
  const result = error.issues.map((err) => {
    // Check if it was a type error
    if (err.code === 'invalid_type') {
      // Yes it was
      // Check if it is due to a missing param
      if (err.received === 'undefined') {
        // Yes it was, return a param error
        return new ParamRequiredError(zodPathToString(err.path)).toJSON();
      }

      // Check if it was due to a invalid request body
      if (err.path.length === 0) {
        // Yes it was, return a query error
        return new QueryError().toJSON();
      }

      // Return a param type error
      return new ParamTypeError(zodPathToString(err.path), err.expected, err.received).toJSON();
    }

    // Check if it was a invalid_enum_value error
    if (err.code === 'invalid_enum_value') {
      // Yes it was, return a param error
      return new ParamInvalidError(zodPathToString(err.path), err.received, err.options).toJSON();
    }

    // Check if it was because the string was too short
    if (err.code === 'too_small') {
      // Yes it was, return a param error
      return new ParamTooShortError(zodPathToString(err.path), Number(err.minimum)).toJSON();
    }

    // Check if it was a invalid_union error
    if (err.code === 'invalid_union') {
      // Yes it was, iterate through each union error to get an array of accepted types
      const acceptedTypes = err.unionErrors
        .map((unionError) => {
          // Check if the type is a native zod type
          if (unionError.errors[0].code === 'invalid_type') {
            // Return the expected type
            return unionError.errors[0].expected;
          }

          // It is a custom type, return the type
          const split = unionError.errors[0].message.split(' ').at(-1);
          return split;
        })
        .filter((type): type is string => type !== undefined);

      // Return a param error
      return new ParamTypeError(
        zodPathToString(err.path),
        acceptedTypes.length > 0 ? acceptedTypes : 'unknown',
      ).toJSON();
    }

    // Unrecognised zod error
    return new ParamError().toJSON();
  });

  return result;
}

/**
 * Prisma error handler
 */
function handlePrismaError(error: Prisma.PrismaClientKnownRequestError) {
  // Check if it was a foreign key constraint error
  if (error.code === 'P2003') {
    // Yes it was, return a param error
  }

  // Unrecognised prisma error
  return new ParamError();
}

/**
 * Prisma error handler
 */
function handleS3Error(error: S3Error) {
  switch (error.name) {
    case 'InvalidBucket':
      return new BucketConnectionFailure();
    case 'InvalidBucketName':
      return new InvalidBucketName();
    case 'InvalidObject':
      return new ObjectNotFound();
    case 'ObjectConflict':
      return new ObjectCollision();
    case 'MultipartUploadError':
      return new MultipartUploadError();
    case 'InvalidDatatype':
      return new InvalidDataProvided();
    case 'MissingUUID':
      return new MissingUUID();
    default:
      return new UnknownS3Error();
  }
}

/**
 * Error handler
 * @param $error The error
 * @returns An error object
 */
function handleError($error: Error): ErrorJSON[] {
  // An error occurred
  let error = $error;

  console.log({ error });

  // Check if it was a zod error
  if (error instanceof ZodError) {
    // We got a zod error
    return handleZodError(error);
  }

  // Check if it was a prisma error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // We got a prisma error
    error = handlePrismaError(error);
  }

  // Check if it was a custom error
  if (error instanceof S3Error) {
    // Return the error message
    error = handleS3Error(error);
  }

  // Check if it was a custom error
  if (error instanceof BaseError) {
    // Return the error message
    return [error.toJSON()];
  }

  // An unknown error was received
  console.error(error);
  return [new UnknownError().toJSON()];
}

/**
 * Obtains the status code to be returned
 * @param errors An array of errors
 * @returns The status code
 */
function getStatusCode(errors: ErrorJSON[]) {
  // Check if the status code of all errors in the array are the same
  const { status } = errors[0];

  // Iterate through the errors
  for (let i = 1; i < errors.length; i++) {
    // Check if the status code is the same
    if (errors[i].status !== status) {
      // The status codes are not the same
      return 400;
    }
  }

  // The status codes are the same
  return status;
}

export default (options?: APIHandlerOptions) =>
  // Return the next-connect handler
  nextConnect<APIRequestType, NextApiResponse>({
    // -- API error handling --//
    onError(error: Error | Error[], req, res) {
      // An error was thrown, initialise the response object
      const response = { errors: <ErrorJSON[]>[] };

      // Check if it was an array of errors
      if (Array.isArray(error)) {
        // Handle the errors
        error.forEach((err) => {
          response.errors.push(...handleError(err));
        });
      } else {
        // Handle the error
        response.errors.push(...handleError(error));
      }

      // Determine the status code to be returned
      const status = getStatusCode(response.errors);

      // Return the response
      res.status(status).json(response);
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method ${req.method} not allowed` });
    },
    // -- Middlewares --//
  })
    .use(jwtMiddleware)
    .use(apiGuardMiddleware(options));
