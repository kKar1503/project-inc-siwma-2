import { Regions, S3Bucket, S3LibInternal, S3BucketInternal } from '@inc/s3-simplified';
import hashFn from '@/utils/timeBasedHash';

class CustomS3 extends S3LibInternal {
  constructor() {
    super({
      accessKey: {
        id: process.env.AWS_ACCESS_KEY_ID as string,
        secret: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
      region: process.env.AWS_REGION as Regions,

      objectCreation: {
        appendFileTypeToKey: false,
        hash: {
          function: hashFn,
          requireBuffer: false,
          requireMetadata: false,
        },
      },
    });
  }

  public getBucketSync(bucketName: string): S3Bucket {
    const internal = new S3BucketInternal(this.s3, this.config.region, bucketName);
    return new S3Bucket(internal, this.config);
  }
}

const s3Connection = new CustomS3();
const bucket = s3Connection.getBucketSync(process.env.AWS_BUCKET as string);

export default bucket;
