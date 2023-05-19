import {OptionalConfig} from "../interfaces/config";
import {defaultHashFallback} from "./defaultHashFallback";
export const defaultConfig: OptionalConfig = {

    signedUrl: {
        expiration: 5 * 60 * 60,
    },

    objectCreation: {
        multiPartUpload: {
            maxPartSize: 100 ,
            enabledThreshold: 100 * 1024 * 1024,
        },
        appendFileTypeToKey: true,
        hash: {
            function :defaultHashFallback,
            requireBuffer: false,
            requireMetadata: false,
        }
    }
}
