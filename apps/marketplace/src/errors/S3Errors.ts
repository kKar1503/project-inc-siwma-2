import { ApiError } from '@/errors/BaseError';

/*
Code implementation:
Everything in this file   : 3xxx

S3Connection related      : 30xx

Bucket related            : 31xx
                          : 32xx

Object fetching related   : 33xx
Object creation related   : 34xx

Specific error codes:
UNKNOWN S3 ERROR          : 3999
 */

export class S3ApiError extends ApiError {

  public static readonly baseCode = 3000; // let's say we change S3 codes to 4xxx, we can just change this to 4000 and all the codes will be updated

  constructor() {
    super();
    this.message = 'Something went wrong';
    this.status = 500;
    this.code = S3ApiError.baseCode;
  }
}

export class UnknownS3Error extends S3ApiError {
  public static readonly status = 500;
  public static readonly code = S3ApiError.baseCode + 999; // 3999

  constructor() {
    super();
    this.message = 'Something went wrong';
    this.status = UnknownS3Error.status;
    this.code = UnknownS3Error.code;
  }
}

export class S3ConnectionFailError extends S3ApiError {
  public static readonly status = 500;
  public static readonly code = S3ApiError.baseCode + 1; // 3001

  constructor() {
    super();
    this.message = 'Something went wrong';
    this.status = S3ConnectionFailError.status;
    this.code = S3ConnectionFailError.code;
  }
}

export class BucketConnectionFailure extends S3ApiError {
  public static readonly status = 500;
  public static readonly code = S3ApiError.baseCode + 100; // 3100

  constructor() {
    super();
    this.message = 'Something went wrong';
    this.status = BucketConnectionFailure.status;
    this.code = BucketConnectionFailure.code;
  }
}

export class InvalidBucketName extends S3ApiError {
  public static readonly status = 500;
  public static readonly code = S3ApiError.baseCode + 101; // 3101

  constructor() {
    super();
    this.message = 'Something went wrong';
    this.status = InvalidBucketName.status;
    this.code = InvalidBucketName.code;
  }
}

export class ObjectNotFound extends S3ApiError {
  public static readonly status = 404;
  public static readonly code = S3ApiError.baseCode + 300; // 3400

  constructor() {
    super();
    this.message = `Something went missing`;
    this.status = ObjectNotFound.status;
    this.code = ObjectNotFound.code;
  }
}

export class ObjectCollision extends S3ApiError {
  public static readonly status = 500;
  public static readonly code = S3ApiError.baseCode + 400; // 3400

  constructor() {
    super();
    this.message = `Something went wrong`;
    this.status = BucketConnectionFailure.status;
    this.code = BucketConnectionFailure.code;
  }
}
