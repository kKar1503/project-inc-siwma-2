import { Regions, S3Lib } from '@inc/s3-simplified';
import hashFn from '@/utils/timeBasedHash';

const s3Connection = new S3Lib({
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
export default s3Connection;
