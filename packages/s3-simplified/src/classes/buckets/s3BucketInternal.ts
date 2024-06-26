import {
  CompleteMultipartUploadCommand,
  CopyObjectCommand,
  CreateMultipartUploadCommand,
  DeleteObjectCommand,
  GetBucketAclCommand,
  GetBucketPolicyCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Object } from '../objects/s3Object';
import { Metadata } from '../misc/metadata';
import { IS3Object } from '../../interfaces';
import { S3ObjectBuilder } from '../objects/s3ObjectBuilder';
import { Config, ObjectCreationConfig, SignedUrlConfig } from '../../interfaces/config';
import { Regions } from '../../types';
import { MultipartUploadError } from '../misc/errors';

/**
 * An unsafe version of S3 bucket with no validation.
 */
export class S3BucketInternal {
  // bucket info
  public readonly bucketName: string;

  public readonly bucketUrl: string;

  // cached
  private isPublic_cache?: boolean;

  /**
   * @internal
   * @param s3 The s3 client to use
   * @param region
   * @param bucketName
   */
  public constructor(private readonly s3: S3, region: Regions, bucketName: string) {
    this.bucketUrl = `https://${bucketName}.s3.${region}.amazonaws.com`;
    this.bucketName = bucketName;
  }

  /**
   * Fetches the bucket ACL and bucket policy to determine if the bucket is public.
   * @param bucket The bucket to check
   * @see {@link isPublic} for a cached version of this function
   */
  protected static async fetchPublicStatus(bucket: S3BucketInternal): Promise<boolean> {
    const aclResponse = await bucket.getBucketACL();

    const grants = aclResponse.Grants || [];

    const grantsPublic = grants.reduce((previousValue, grant): boolean => {
      if (previousValue) return true;
      if (grant.Grantee === undefined) return previousValue;
      return (
        (grant.Grantee.URI === 'http://acs.amazonaws.com/groups/global/AllUsers' ||
          grant.Grantee.URI === 'http://acs.amazonaws.com/groups/global/AuthenticatedUsers') &&
        (grant.Permission === 'READ' || grant.Permission === 'FULL_CONTROL')
      );
    }, false);

    if (grantsPublic) return true;

    try {
      const policyResponse = await bucket.getBucketPolicies();
      if (policyResponse.Policy === undefined) return false;
      const policy = JSON.parse(policyResponse.Policy);

      const policyStatements = policy.Statement as Array<{
        Effect: string;
        Principal: string;
        Action: string | string[] | unknown;
      }>;

      const policyPublic = policyStatements.reduce((previousValue, statement): boolean => {
        if (previousValue) return true;
        if (!(statement.Effect === 'Allow' && statement.Principal === '*')) return false;
        if (Array.isArray(statement.Action)) {
          const statements = statement.Action as string[];
          return statements.includes('s3:GetObject') || statements.includes('s3:*');
        }
        return (
          typeof statement.Action === 'string' &&
          (statement.Action === 's3:GetObject' || statement.Action === 's3:*')
        );
      }, false);

      if (policyPublic) return true;
    } catch (e) {
      const error = e as { name: string };
      if (error.name === 'NoSuchBucketPolicy') return false;
      throw e;
    }
    return false;
  }

  public async isPublic(): Promise<boolean> {
    if (this.isPublic_cache === undefined)
      this.isPublic_cache = await S3BucketInternal.fetchPublicStatus(this);
    return this.isPublic_cache;
  }

  public async generateSignedUrl(key: string, signedUrlConfig: SignedUrlConfig): Promise<string> {
    return getSignedUrl(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.s3,
      new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      }),
      { expiresIn: signedUrlConfig.expiration }
    );
  }

  public generatePublicUrl(key: string): string {
    return `${this.bucketUrl}/${key}`;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getS3ObjectId(
    s3ObjectBuilder: S3ObjectBuilder,
    objectConfig: ObjectCreationConfig
  ): Promise<string> {
    const metadata = s3ObjectBuilder.Metadata.asRecord();
    if (metadata.identifier) return metadata.identifier;
    const uuid = await s3ObjectBuilder.getUUID(objectConfig);
    const ext = s3ObjectBuilder.Extension; // This will generate the extension if it doesn't exist, so we call it even if we don't need it.
    const id = objectConfig.appendFileTypeToKey ? `${uuid}.${ext}` : uuid;
    metadata.identifier = id;
    return id;
  }

  public async createObject_Single(
    s3ObjectBuilder: S3ObjectBuilder,
    config: Config
  ): Promise<IS3Object> {
    const objectConfig = config.objectCreation;
    const id = await this.getS3ObjectId(s3ObjectBuilder, objectConfig);

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: id,
      Body: await s3ObjectBuilder.Body,
      Metadata: s3ObjectBuilder.Metadata.toRecord(),
    });
    await this.s3.send(command);
    return new S3Object(s3ObjectBuilder.Metadata, this, config);
  }

  public async createObject_Multipart(
    s3ObjectBuilder: S3ObjectBuilder,
    config: Config
  ): Promise<IS3Object> {
    const objectConfig = config.objectCreation;
    const id = await this.getS3ObjectId(s3ObjectBuilder, objectConfig);
    const partSize = objectConfig.multiPartUpload.maxPartSize;
    // Multipart upload
    const createMultipartUploadCommand = new CreateMultipartUploadCommand({
      Bucket: this.bucketName,
      Key: id,
      Metadata: s3ObjectBuilder.Metadata.toRecord(),
    });
    const createMultipartUploadResponse = await this.s3.send(createMultipartUploadCommand);
    const uploadId = createMultipartUploadResponse.UploadId;
    if (!uploadId) throw new MultipartUploadError('UploadId was not returned from AWS');

    const partsCount = Math.ceil((await s3ObjectBuilder.DataSize) / partSize);

    // Consolidate all the promises into one array and await them all at once rather than one by one
    const promises = new Array(partsCount).map(async (_, i) => {
      const start = i * partSize;
      const end = Math.min(start + partSize, await s3ObjectBuilder.DataSize);
      const partBuffer = (await s3ObjectBuilder.AsBuffer()).slice(start, end);

      const uploadPartCommand = new UploadPartCommand({
        Bucket: this.bucketName,
        Key: id,
        UploadId: uploadId,
        PartNumber: i + 1,
        Body: partBuffer,
      });
      return this.s3.send(uploadPartCommand);
    });
    const uploadPartResponses = await Promise.all(promises);
    const completedParts = uploadPartResponses.map((response, index) => ({
      ETag: response.ETag,
      PartNumber: index + 1,
    }));
    const completeMultipartUploadCommand = new CompleteMultipartUploadCommand({
      Bucket: this.bucketName,
      Key: id,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: completedParts,
      },
    });
    await this.s3.send(completeMultipartUploadCommand);
    return new S3Object(s3ObjectBuilder.Metadata, this, config);
  }

  public async getBucketACL() {
    const aclCommand = new GetBucketAclCommand({
      Bucket: this.bucketName,
    });
    return this.s3.send(aclCommand);
  }

  public async getBucketPolicies() {
    const policyCommand = new GetBucketPolicyCommand({
      Bucket: this.bucketName,
    });

    return this.s3.send(policyCommand);
  }

  public async getObject(key: string, config: Config, requireBody = false): Promise<IS3Object> {
    const command = new GetObjectCommand({ Bucket: this.bucketName, Key: key });
    const response = await this.s3.send(command);
    const metadata = new Metadata(response.Metadata, key);
    return requireBody
      ? new S3Object(metadata, this, config, response.Body as Readable)
      : new S3Object(metadata, this, config);
  }

  public async deleteObject(key: string): Promise<void> {
    const command = new DeleteObjectCommand({ Bucket: this.bucketName, Key: key });
    await this.s3.send(command);
  }

  public async renameObject(oldKey: string, newKey: string): Promise<void> {
    const copyCommand = new CopyObjectCommand({
      Bucket: this.bucketName,
      CopySource: `${this.bucketName}/${encodeURIComponent(oldKey)}`,
      Key: newKey,
    });

    await this.s3.send(copyCommand);

    await this.deleteObject(oldKey);
  }

  public async listContents(): Promise<Array<string>> {
    const command = new ListObjectsV2Command({ Bucket: this.bucketName });
    const response = await this.s3.send(command);
    // if response.Contents is not null, then map the array to get the keys
    // else return an empty array
    return response.Contents ? response.Contents.map((content) => content.Key || '[unknown]') : [];
  }

  public async containsObject(key: string): Promise<boolean> {
    const command = new HeadObjectCommand({ Bucket: this.bucketName, Key: key });
    try {
      await this.s3.send(command);
      return true;
    } catch (e: unknown) {
      const error = e as { name: string };
      if (error.name === 'NotFound') return false;
      throw e;
    }
  }
}
