import {CreateBucketCommand, DeleteBucketCommand, HeadBucketCommand, ListBucketsCommand, S3} from "@aws-sdk/client-s3";
import {S3Bucket} from "../buckets/s3Bucket";
import {S3BucketService} from "../../interfaces";
import {Config, UserConfig} from "../../interfaces/config";
import {defaultConfig} from "../../utils";
import {bucketStatus} from "../../types";

export class S3libInternal {
    public readonly s3: S3;
    public readonly config: Config

    constructor(config: UserConfig) {
        const {region, accessKey, ...others} = config;
        const credentials = {accessKeyId: accessKey.id, secretAccessKey: accessKey.secret};
        //strip off the accessKey from the config to prevent it from being logged
        this.config = {...defaultConfig, ...others, region}
        this.s3 = new S3({region, credentials});
    }

    public async createBucket(bucketName: string): Promise<S3BucketService> {
        console.log("Creating bucket: " + bucketName);
        const command = new CreateBucketCommand({Bucket: bucketName});
        await this.s3.send(command);
        return new S3Bucket(this, bucketName);
    }

    public async deleteBucket(bucketName: string): Promise<void> {
        const command = new DeleteBucketCommand({Bucket: bucketName});
        await this.s3.send(command);
    }

    public async listBuckets(): Promise<Array<string>> {
        const command = new ListBucketsCommand({});
        const response = await this.s3.send(command);
        return response.Buckets ?
            response.Buckets.map(bucket => bucket.Name || '[unknown]')
            : [];
    }

    public async getBucket(bucketName: string): Promise<S3BucketService> {
        return new S3Bucket(this, bucketName);
    }

    public async getBucketStatus(bucketName: string): Promise<bucketStatus> {
        try {
            const command = new HeadBucketCommand({Bucket: bucketName});
            await this.s3.send(command);
            return 'owned';
        } catch (error) {
            // @ts-ignore
            const {name} = error;
            if (name === "NotFound") {
                // The bucket does not exist.
                return "not found";
            } else if (name === "Forbidden") {
                // You don't have access to the bucket.
                return "not owned";
            }
            throw error;
        }
    }
}
