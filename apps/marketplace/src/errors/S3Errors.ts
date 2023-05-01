import { ApiError } from '@/errors/BaseError';

/*
Code implementation:
Everything in this file   : 3xxx

S3Connection related      : 30xx

Bucket related            : 31xx
                          : 32xx

Object fetching related   : 33xx
Object creation related   : 34xx
 */

export class S3ConnectionFailError extends ApiError {
  public static readonly status = 500;
  public static readonly code = 3000;

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
