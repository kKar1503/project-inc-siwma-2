import { ApiError } from './BaseError';

export class EmailError extends ApiError {
  public static readonly status: number = 500;
  public static readonly code: number = 6000;

  constructor() {
    super();
    this.message = 'Email error';
    this.status = EmailError.status;
    this.code = EmailError.code;
  }
}

export class EmailSendError extends EmailError {
  public static readonly status: number = 500;
  public static readonly code: number = 6001;

  constructor() {
    super();
    this.message = 'Error sending email';
    this.status = EmailSendError.status;
    this.code = EmailSendError.code;
  }
}

export class InvalidApiKeyError extends EmailError {
  public static readonly status: number = 400;
  public static readonly code: number = 6002;

  constructor() {
    super();
    this.message = 'Missing API key';
    this.status = InvalidApiKeyError.status;
    this.code = InvalidApiKeyError.code;
  }
}

export class InvalidSenderEmailError extends EmailError {
  public static readonly status: number = 400;
  public static readonly code: number = 6003;

  constructor() {
    super();
    this.message = 'Missing sender email';
    this.status = InvalidSenderEmailError.status;
    this.code = InvalidSenderEmailError.code;
  }
}