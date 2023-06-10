import { ApiError } from './BaseError';

export class FileError extends ApiError {
  public static readonly status: number = 400;
  public static readonly code: number = 7000;

  constructor() {
    super();
    this.message = 'File error';
    this.status = FileError.status;
    this.code = FileError.code;
  }
}


export class FileInvalidExtensionError extends FileError {
  public static readonly status: number = 400;
  public static readonly code: number = 7001;

  constructor() {
    super();
    this.message = 'Invalid file extension';
    this.status = FileInvalidExtensionError.status;
    this.code = FileInvalidExtensionError.code;
  }
}
