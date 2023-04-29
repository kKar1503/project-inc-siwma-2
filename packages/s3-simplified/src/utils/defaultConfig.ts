import {MB, Minute} from "./constants";
import {OptionalConfig} from "../interfaces/config";

export const defaultConfig: OptionalConfig = {

    signedUrl: {
        expiration: 5 * Minute,
    },

    objectCreation: {
        multiPartUpload: {
            maxPartSize: 5 * MB,
            enabledThreshold: 5 * MB,
        },
        appendFileTypeToKey: true,
    }
}
