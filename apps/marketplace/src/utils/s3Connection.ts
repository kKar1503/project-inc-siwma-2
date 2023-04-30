import { Regions, S3Lib } from 's3-simplified';

const s3Connection = new S3Lib({
    accessKey:{
        id: process.env.AWS_ACCESS_KEY_ID as string,
        secret: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_REGION as Regions,
})
export default s3Connection;
