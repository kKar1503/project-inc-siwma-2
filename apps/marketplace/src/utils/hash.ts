import {createHash} from "crypto";

async function hashS3(buffer: Buffer, metadata: Record<string, string>): Promise<string> {
    console.log("using hash function");
    const metaDataStr = JSON.stringify(metadata, Object.keys(metadata).sort());
    const hash = createHash('sha256').update(buffer).update(metaDataStr).digest('hex');
    console.log(hash);
    return hash;
}
export {hashS3};
