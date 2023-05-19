import { OptionalConfig } from '../interfaces/config';

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

/**
 *
 * remove all properties with undefined or null values from nested objects
 * @param defaultValue
 * @param customValue
 */
export function pruneAndMerge(defaultValue: OptionalConfig, customValue: DeepPartial<OptionalConfig>): any {
  return {
    signedUrl: customValue.signedUrl ? {
      expiration: customValue.signedUrl.expiration || defaultValue.signedUrl.expiration,
    } : defaultValue.signedUrl,

    objectCreation: customValue.objectCreation ? {

      multiPartUpload: customValue.objectCreation.multiPartUpload ? {
        maxPartSize: customValue.objectCreation.multiPartUpload.maxPartSize || defaultValue.objectCreation.multiPartUpload.maxPartSize,
        enabledThreshold: customValue.objectCreation.multiPartUpload.enabledThreshold || defaultValue.objectCreation.multiPartUpload.enabledThreshold,
      } : defaultValue.objectCreation.multiPartUpload,

      appendFileTypeToKey: customValue.objectCreation.appendFileTypeToKey || defaultValue.objectCreation.appendFileTypeToKey,

      hash: customValue.objectCreation.hash ? {
        function: customValue.objectCreation.hash.function || defaultValue.objectCreation.hash.function,
        requireBuffer: customValue.objectCreation.hash.requireBuffer || defaultValue.objectCreation.hash.requireBuffer,
        requireMetadata: customValue.objectCreation.hash.requireMetadata || defaultValue.objectCreation.hash.requireMetadata,
      } : defaultValue.objectCreation.hash,

    } : defaultValue.objectCreation,
  };
}
