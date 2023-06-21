import { IS3, S3BucketService, UserConfig } from '../../interfaces';
import { InvalidBucketName } from './errors';
import { BucketStatus } from '../../types';
import { S3LibInternal } from './s3LibInternal';
import { S3Bucket } from '../buckets/s3Bucket';

export class S3Lib implements IS3 {
  private readonly internal: S3LibInternal;

  constructor(config: UserConfig) {
    this.internal = new S3LibInternal(config);
  }

  private static validateBucketName(bucketName: string): void {
    // Naming rules
    // https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html

    // Define Rules (rules below have more restrictions than the ones listed in the link above e.g. periods are allowed but not recommended for optimal performance, so they're simply not allowed here)
    if (!(bucketName.length >= 3 && bucketName.length <= 63))
      throw new InvalidBucketName(
        bucketName,
        `${bucketName} must be between 3 and 63 characters long`,
      );
    if (!/^[a-z0-9]/.test(bucketName))
      throw new InvalidBucketName(bucketName, `${bucketName} must start with a letter or number`);
    if (!/[a-z0-9]$/.test(bucketName))
      throw new InvalidBucketName(bucketName, `${bucketName} must end with a letter or number`);
    if (bucketName.includes('.') || bucketName.includes('_'))
      throw new InvalidBucketName(bucketName, `${bucketName} must not contain "." or "_"`);
    if (bucketName !== bucketName.toLowerCase())
      throw new InvalidBucketName(
        bucketName,
        `${bucketName} must not contain any uppercase characters`,
      );
    if (bucketName.endsWith('-s3alias') || bucketName.endsWith('--ol-s3'))
      throw new InvalidBucketName(
        bucketName,
        `${bucketName} must not end with be -s3alias or --ol-s3`,
      );
    if (bucketName.startsWith('xn--'))
      throw new InvalidBucketName(bucketName, `${bucketName} must not start with be xn--`);
  }

  public async deleteBucket(bucketName: string): Promise<void> {
    await this.assetBucketOwnership(bucketName);
    return this.internal.deleteBucket(bucketName);
  }

  public async listBuckets(): Promise<Array<string>> {
    return this.internal.listBuckets();
  }

  public async getBucket(bucketName: string): Promise<S3BucketService> {
    await this.assetBucketOwnership(bucketName);
    const bucketInternal = await this.internal.getBucket(bucketName);
    return new S3Bucket(bucketInternal, this.internal.config);
  }

  public async createBucket(bucketName: string): Promise<S3BucketService> {
    S3Lib.validateBucketName(bucketName);
    const bucketInternal = await this.internal.createBucket(bucketName);
    return new S3Bucket(bucketInternal, this.internal.config);
  }

  public async getOrCreateBucket(bucketName: string): Promise<S3BucketService> {
    const bucketStatusResult = await this.getBucketStatus(bucketName);
    if (bucketStatusResult === 'not owned')
      throw new InvalidBucketName(bucketName, `${bucketName} is owned by another user`);
    const bucketInternal =
      bucketStatusResult === 'owned'
        ? await this.internal.getBucket(bucketName)
        : await this.internal.createBucket(bucketName);
    return new S3Bucket(bucketInternal, this.internal.config);
  }

  public async getBucketStatus(bucketName: string): Promise<BucketStatus> {
    return this.internal.getBucketStatus(bucketName);
  }

  private async assetBucketOwnership(bucketName: string): Promise<void> {
    if ((await this.getBucketStatus(bucketName)) !== 'owned') {
      throw new InvalidBucketName(bucketName, `${bucketName} is not accessible by the user`);
    }
  }
}
