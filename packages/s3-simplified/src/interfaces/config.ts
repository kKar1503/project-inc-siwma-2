import { Regions } from '../types';
import { DeepPartial } from '../utils/deepPartial';
import { IHashFunction } from './IHashFunction';

/**
 * The keys for the AWS account and settings for multipart upload, signed urls
 */
export interface AccessKey {
  id: string;
  secret: string;
}

export interface MultiPartUploadConfig {
  maxPartSize: number;
  enabledThreshold: number;
}

export interface SignedUrlConfig {
  expiration: number;
}

/**
 * The required and optional configurations for the S3 library
 */
export interface AuthConfig {
  region: Regions;
  accessKey: AccessKey;
}

export interface HashFunctionConfig {
  function: IHashFunction;
  requireBuffer: boolean;
  requireMetadata: boolean;
}

export interface ObjectCreationConfig {
  appendFileTypeToKey: boolean;
  multiPartUpload: MultiPartUploadConfig;

  hash: HashFunctionConfig;
}

export interface PartialObjectCreationConfig {
  appendFileTypeToKey: boolean;
  multiPartUpload: MultiPartUploadConfig;
}
export interface OptionalConfig {
  signedUrl: SignedUrlConfig;
  objectCreation: PartialObjectCreationConfig;
}

/**
 * The configuration for the S3 library
 */
export interface Config extends AuthConfig {
  signedUrl: SignedUrlConfig;
  objectCreation: ObjectCreationConfig;
}

export interface RequiredConfig extends DeepPartial<OptionalConfig> {
  objectCreation: DeepPartial<PartialObjectCreationConfig> & {
    hash: HashFunctionConfig;
  };
}

export interface UserConfig extends AuthConfig, RequiredConfig {}
