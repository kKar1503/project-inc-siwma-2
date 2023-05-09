import { Regions, S3Lib } from '@inc/s3-simplified';
import hashS3 from '@/utils/hash';

const s3Connection = new S3Lib({
  accessKey: {
    id: process.env.AWS_ACCESS_KEY_ID as string,
    secret: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_REGION as Regions,

  objectCreation: {
    hash: {
      function: hashS3,
    },
  },
});
export default s3Connection;
