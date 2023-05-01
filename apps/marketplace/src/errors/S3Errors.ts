import { ApiError } from '@/errors/BaseError';

/*
Code implementation:
Everything in this file   : 3xxx

Unknown s3 error          : 3000

S3Connection related      : 30xx

Bucket related            : 31xx
                          : 32xx

Object fetching related   : 33xx
Object creation related   : 34xx


 */
export class UnknownS3Error extends ApiError {
  public static readonly status = 500;
  public static readonly code = 3000;

  constructor() {
    super();
    this.message = 'an error occurred while communicating with S3';
    this.status = UnknownS3Error.status;
    this.code = UnknownS3Error.code;
  }
}
export class S3ConnectionFailError extends ApiError {
  public static readonly status = 500;
  public static readonly code = 3001;

  constructor() {
    super();
    this.message = 'failed to connect to S3';
    this.status = S3ConnectionFailError.status;
    this.code = S3ConnectionFailError.code;
  }
}

export class BucketConnectionFailure extends ApiError {
  public static readonly status = 500;
  public static readonly code = 3100;

  constructor() {
    super();
    this.message = 'failed to connect to bucket';
    this.status = BucketConnectionFailure.status;
    this.code = BucketConnectionFailure.code;
  }
}

export class InvalidBucketName extends ApiError {
  public static readonly status = 400;
  public static readonly code = 3101;

  constructor() {
    super();
    this.message = 'invalid bucket name';
    this.status = InvalidBucketName.status;
    this.code = InvalidBucketName.code;
  }
}


export class ObjectCollision extends ApiError {
  public static readonly status = 500;
  public static readonly code = 3400;

  constructor(name: string = 'object') {
    super();
    this.message = `${name} already exists`;
    this.status = BucketConnectionFailure.status;
    this.code = BucketConnectionFailure.code;
  }
}
export class ObjectNotFound extends ApiError {
  public static readonly status = 404;
  public static readonly code = 3300;

  constructor(name: string = 'object') {
    super();
    this.message = `${name} not found`;
    this.status = ObjectNotFound.status;
    this.code = ObjectNotFound.code;
  }
}
