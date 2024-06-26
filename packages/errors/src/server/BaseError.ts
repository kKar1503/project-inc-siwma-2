/**
 * Error code directory:
 * 1000 - 1999: Auth errors
 * 2000 - 2999: Query errors
 * 3000 - 3999: S3 errors
 * 4000 - 4999: Input errors
 * 5000 - 5999: Chat errors
 * 6000 - 6999: Email errors
 * 7000 - 7999: File errors
 */

// -- Type definitions -- //
export type ErrorJSON = {
  status: number;
  code: number;
  detail: string;
};

/**
 * Do not throw this error class directly.
 * Build on top of this error class instead.
 */
export abstract class BaseError extends Error {
  message: string; // The error message
  detail?: string; // Detailed error message (for logging)
  status: number; // The HTTP status code
  code: number; // The error code

  constructor() {
    super();
    this.message = 'An error occurred';
    this.status = 500;
    this.code = 0;
  }

  toJSON() {
    return {
      status: this.status,
      code: this.code,
      detail: this.message,
    };
  }
}

/**
 * Do not throw this error class directly.
 * Build on top of this error class instead.
 */
export abstract class ApiError extends BaseError {
  constructor() {
    super();
    this.message = 'Something went wrong';
    this.status = 500;
  }
}

/**
 * An unknown error occurred
 */
export class UnknownError extends ApiError {
  constructor() {
    super();
    this.message = 'An unknown error occurred';
  }
}
