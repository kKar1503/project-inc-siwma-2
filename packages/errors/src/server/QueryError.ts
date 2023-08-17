import { ZodParsedType } from 'zod';
import { arrayToString } from '@inc/utils';
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

  constructor(parameter: string, expectedType: string | string[], actualType?: string) {
    super();
    const isMultiple = Array.isArray(expectedType) && expectedType.length > 1;

    this.message =
      `Expected '${parameter}' to be of type${isMultiple ? 's' : ''} '${
        isMultiple ? arrayToString(expectedType, 'or') : expectedType
      }'` + (actualType ? `, but got type '${actualType}'` : '');
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

/**
 * Duplicate query/body parameter
 * @example "A record with the same email already exists"
 * @param item The item name
 */
export class DuplicateError extends QueryError {
  public static readonly status = 422;
  public static readonly code = 2006;

  constructor(parameter: string) {
    super();
    this.message = `A record with the same ${parameter} already exists`;
    this.status = DuplicateError.status;
    this.code = DuplicateError.code;
    this.meta = { key: parameter };
  }
}

/**
 * Invalid range for query/body parameter
 * @example "Invalid range for 'expiry', expected values up to '25', but got '30'"
 * @param parameter The parameter name
 * @param maximum The maximum value of the parameter (optional)
 * @param minimum The minimum value of the parameter (optional)
 * @param actual The actual value of the parameter
 */

export class InvalidRangeError extends ParamError {
  public static readonly status = 422;
  public static readonly code = 2007;

  constructor(parameter: string, maximum?: string, minimum?: string, actual?: string) {
    // Construct message
    const message = `Invalid range for '${parameter}'${
      maximum ? `, expected values up to '${maximum}'` : ''
    }${minimum ? `, expected values from '${minimum}'` : ''}${
      actual ? `, but got '${actual}'` : ''
    }`;

    super();
    this.message = message;
    this.status = InvalidRangeError.status;
    this.code = InvalidRangeError.code;
  }
}

/**
 * Value of query/body parameter is too short
 * @example "Parameter 'name' must be at least 2 characters long"
 * @param parameter The parameter name
 * @param minimum The minimum value of the parameter (optional)
 */

export class ParamTooShortError extends ParamError {
  public static readonly status = 422;
  public static readonly code = 2008;

  constructor(parameter: string, minimum?: number) {
    // Construct message
    const message = `Parameter '${parameter}' must be at least ${minimum} ${
      minimum && minimum > 1 ? 'characters' : 'character'
    } long`;

    super();
    this.message = message;
    this.status = InvalidRangeError.status;
    this.code = InvalidRangeError.code;
  }
}

/**
 * Size of query/body parameter is too small/large
 * @example "Parameter 'options' must contain at least 2 elements"
 * @example "Parameter 'options' cannot contain more than 4 elements"
 * @example "Parameter 'options' can only contain between 2 - 4 elements"
 * @param parameter The parameter name
 * @param min The minimum size of the parameter (optional)
 * @param max The maximum size of the parameter (optional)
 */

export class ParamSizeError extends ParamError {
  public static readonly status = 422;
  public static readonly code = 2008;

  constructor(parameter: string, options: { min?: number; max?: number; exact?: number }) {
    // Deconstruct options
    const { min, max, exact } = options;

    // Construct message
    const tooShortMessage = `Parameter '${parameter}' must contain at least ${min} ${
      min && min > 1 ? 'elements' : 'element'
    }`;
    const exactMessage = `Parameter '${parameter}' must contain exactly ${exact} elements`;
    const betweenMessage = `Parameter '${parameter}' can only contain between ${min} - ${max} elements`;
    const tooLongMessage = `Parameter '${parameter}' cannot contain more than ${max}`;
    const defaultMessage = `Parameter '${parameter}' has an invalid size`;

    super();

    // Set the message
    if (min && max) this.message = betweenMessage;
    else if (min) this.message = tooShortMessage;
    else if (max) this.message = tooLongMessage;
    else if (exact) this.message = exactMessage;
    else this.message = defaultMessage;

    this.status = InvalidRangeError.status;
    this.code = InvalidRangeError.code;
  }
}

/**
 * Expired parameter
 * @param parameter The parameter name
 */
export class ExpiredError extends ParamError {
  public static readonly status = 422;
  public static readonly code = 2009;

  constructor(parameter: string) {
    super();
    this.status = ExpiredError.status;
    this.code = ExpiredError.code;
    this.message = `${parameter} has expired`;
  }
}
/**
 * Error when bookmarking self
 */
export class BookmarkSelfError extends ParamError {
  public static readonly status = 422;
  public static readonly code = 2010;

  constructor() {
    super();
    this.status = BookmarkSelfError.status;
    this.code = BookmarkSelfError.code;
    this.message = `Cannot bookmark self`;
  }
}

/**
 * Number range error
 */
export class NumberRangeError extends ParamError {
  public static readonly status = 422;
  public static readonly code = 2011;

  constructor(parameter: string, min?: number, max?: number) {
    super();
    this.status = NumberRangeError.status;
    this.code = NumberRangeError.code;
    this.message =
      `Parameter '${parameter}' ` +
      (min != null
        ? `must be greater than ${min}`
        : max != null
        ? `must be less than ${max}`
        : (min != null && max != null) ?? `must be between ${min} and ${max}`);
  }
}
