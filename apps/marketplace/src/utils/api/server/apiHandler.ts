import {
  BaseError,
  ErrorJSON,
  ParamError,
  ParamInvalidError,
  ParamRequiredError,
  ParamTypeError,
  UnknownError,
} from '@inc/errors';
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { APIHandlerOptions, APIRequestType } from '@/types/api-types';
import { apiGuardMiddleware } from './middlewares/apiGuardMiddleware';
import jwtMiddleware from './middlewares/jwtMiddleware';

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
        return new ParamRequiredError(err.path[0].toString()).toJSON();
      }

      // Return a param type error
      return new ParamTypeError(err.path[0].toString(), err.expected, err.received).toJSON();
    }

    // Check if it was a invalid_enum_value error
    if (err.code === 'invalid_enum_value') {
      // Yes it was, return a param error
      return new ParamInvalidError(err.path[0].toString(), err.received, err.options).toJSON();
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
 * Error handler
 * @param $error The error
 * @returns An error object
 */
function handleError($error: Error): ErrorJSON[] {
  // An error occurred
  let error = $error;

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
