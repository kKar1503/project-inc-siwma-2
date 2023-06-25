import { ApiError } from './BaseError';

export class InputError extends ApiError {
  public static readonly status: number = 400;
  public static readonly code: number = 4000;

  constructor() {
    super();
    this.message = 'Invalid query';
    this.status = InputError.status;
    this.code = InputError.code;
  }
}

/**
 * Invalid/Missing password
 */
export class InvalidPasswordError extends InputError {
  public static readonly status = 422;
  public static readonly code = 4001;

  constructor() {
    super();
    this.message = `Password must be 8 characters or longer`;
    this.status = InvalidPasswordError.status;
    this.code = InvalidPasswordError.code;
  }
}

/**
 * Invalid/Missing Email address
 */
export class InvalidEmailError extends InputError {
  public static readonly status = 422;
  public static readonly code = 4002;

  constructor() {
    super();
    this.message = `Invalid email address`;
    this.status = InvalidEmailError.status;
    this.code = InvalidEmailError.code;
  }
}

/**
 * Invalid/Missing phone number
 */
export class InvalidPhoneNumberError extends InputError {
  public static readonly status = 422;
  public static readonly code = 4003;

  constructor() {
    super();
    this.message = `Please enter a valid Singapore phone number`;
    this.status = InvalidPhoneNumberError.status;
    this.code = InvalidPhoneNumberError.code;
  }
}

/**
 * Invalid/Missing name
 */
export class InvalidNameError extends InputError {
  public static readonly status = 422;
  public static readonly code = 4004;

  constructor() {
    super();
    this.message = `Please enter a valid name`;
    this.status = InvalidNameError.status;
    this.code = InvalidNameError.code;
  }
}

/**
 * Invalid/Missing company name
 */
export class InvalidCompanyNameError extends InputError {
  public static readonly status = 422;
  public static readonly code = 4005;

  constructor() {
    super();
    this.message = `Please enter a valid company name`;
    this.status = InvalidCompanyNameError.status;
    this.code = InvalidCompanyNameError.code;
  }
}
/**
 * Same password
 */
export class WrongPasswordError extends InputError {
  public static readonly status = 422;
  public static readonly code = 4006;

  constructor() {
    super();
    this.message = `Incorrect password`;
    this.status = WrongPasswordError.status;
    this.code = WrongPasswordError.code;
  }
}
