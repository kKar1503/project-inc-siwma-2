/* eslint-disable max-classes-per-file */
import { ZodParsedType } from 'zod';
import { arrayToString } from '@/utils/stringUtils';
import { ApiError } from './BaseError';

export class QueryError extends ApiError {
  public static readonly status: number = 400;
  public static readonly code: number = 2000;

  constructor() {
    super();
    this.message = 'Invalid query';
    this.status = QueryError.status;
    this.code = QueryError.code;
  }
}

/**
 * [...] not found
 */
export class NotFoundError extends QueryError {
  public static readonly status = 404;
  public static readonly code = 2001;

  constructor(item: string) {
    super();
    this.message = `${item} not found`;
    this.status = NotFoundError.status;
    this.code = NotFoundError.code;
  }
}

/**
 * Invalid query/body parameter
 * @param parameter The parameter name
 */
export class ParamError extends QueryError {
  public static readonly status = 422;
  public static readonly code: number = 2002;

  constructor(parameter?: string) {
    super();
    this.message = `Invalid ${parameter || 'parameter'} supplied`;
    this.status = ParamError.status;
    this.code = ParamError.code;
  }
}

/**
 * Missing query/body parameter
 * @param parameter The parameter name
 */
export class ParamRequiredError extends ParamError {
  public static readonly status = 422;
  public static readonly code = 2003;

  constructor(parameter: string) {
    super();
    this.message = `Parameter '${parameter}' is required'`;
    this.status = ParamRequiredError.status;
    this.code = ParamRequiredError.code;
  }
}

/**
 * Invalid query/body parameter type
 * @param parameter The parameter name
 * @param expectedType The expected type of the parameter
 * @param actualType The actual type of the parameter
 */
export class ParamTypeError extends ParamError {
  public static readonly status = 422;
  public static readonly code = 2004;

  constructor(parameter: string, expectedType: ZodParsedType, actualType: ZodParsedType) {
    super();
    this.message = `Expected '${parameter}' to be of type '${expectedType}, but got type '${actualType}'`;
    this.status = ParamTypeError.status;
    this.code = ParamTypeError.code;
  }
}

/**
 * Invalid query/body parameter provided
 * @example "Parameter 'id' of value 'abc' is invalid"
 * @param parameter The parameter name
 * @param paramValue The value of the parameter
 * @param allowedValues The allowed values of the parameter
 */
export class ParamInvalidError extends ParamError {
  public static readonly status = 422;
  public static readonly code = 2005;

  constructor(parameter: string, paramValue: any, allowedValues?: (string | number)[]) {
    // Construct message
    const message = `'${parameter}' of value '${paramValue}' is invalid${
      allowedValues ? `, only values: '${arrayToString(allowedValues, 'or')}' are allowed` : ''
    }`;

    super();
    this.message = message;
    this.status = ParamInvalidError.status;
    this.code = ParamInvalidError.code;
  }
}
