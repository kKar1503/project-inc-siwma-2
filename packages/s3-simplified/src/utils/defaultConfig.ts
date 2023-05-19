import {MB, Minute} from "./constants";
import {OptionalConfig} from "../interfaces/config";
import {defaultHashFallback} from "./defaultHashFallback";

export const defaultConfig: OptionalConfig = {

    signedUrl: {
        expiration: 5 * Minute,
    },

    objectCreation: {
        multiPartUpload: {
            maxPartSize: 100 * MB,
            enabledThreshold: 100 * MB,
        },
        appendFileTypeToKey: true,
        hash: {
            function :defaultHashFallback,
            requireBuffer: false,
            requireMetadata: false,
        }
    }
}
