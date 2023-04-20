/**
 * Error code directory:
 * 1000 - 1999: Auth errors
 * 2000 - 2999: Query errors
 */

//-- Type definitions --//
export type ErrorJSON = {
  status: number;
  code: number;
  detail: string;
};

/**
 * Do not throw this error class directly.
 * Build on top of this error class instead.
 */
export class BaseError extends Error {
  message: string; // The error message
  detail?: string; // Detailed error message (for logging)
  status: number; // The HTTP status code
  code: number; // The error code

  constructor() {
    super();
    this.message = "An error occurred";
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
export class ApiError extends BaseError {
  constructor() {
    super();
    this.message = "Something went wrong";
    this.status = 500;
  }
}
