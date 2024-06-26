import { OptionalConfig, RequiredConfig } from '../interfaces/config';

/**
 *
 * remove all properties with undefined or null values from nested objects
 * @param defaultValue
 * @param customValue
 */
// TODO: fix this type any thingy
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pruneAndMerge(defaultValue: OptionalConfig, customValue: RequiredConfig): any {
  return {
    signedUrl: customValue.signedUrl
      ? {
          expiration: customValue.signedUrl.expiration || defaultValue.signedUrl.expiration,
        }
      : defaultValue.signedUrl,

    objectCreation: customValue.objectCreation
      ? {
          multiPartUpload: customValue.objectCreation.multiPartUpload
            ? {
                maxPartSize:
                  customValue.objectCreation.multiPartUpload.maxPartSize ||
                  defaultValue.objectCreation.multiPartUpload.maxPartSize,
                enabledThreshold:
                  customValue.objectCreation.multiPartUpload.enabledThreshold ||
                  defaultValue.objectCreation.multiPartUpload.enabledThreshold,
              }
            : defaultValue.objectCreation.multiPartUpload,

          appendFileTypeToKey:
            customValue.objectCreation.appendFileTypeToKey ||
            defaultValue.objectCreation.appendFileTypeToKey,

          hash: customValue.objectCreation.hash,
        }
      : defaultValue.objectCreation,
  };
}
