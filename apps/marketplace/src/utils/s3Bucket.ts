import { Regions, S3Bucket } from '@inc/s3-simplified';
import { S3libInternal } from '@inc/s3-simplified/dist/classes/misc/s3libInternal';

const s3Connection = new S3libInternal({
    accessKey:{
        id: process.env.AWS_ACCESS_KEY_ID as string,
        secret: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_REGION as Regions,
})
const bucket = new S3Bucket(s3Connection, process.env.AWS_BUCKET_NAME as string);

export default bucket;
