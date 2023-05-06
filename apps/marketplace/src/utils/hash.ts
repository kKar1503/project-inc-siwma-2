import { createHash } from 'crypto';

async function hashS3(buffer: Buffer, metadata: Record<string, string>): Promise<string> {
  const metaDataStr = JSON.stringify(metadata, Object.keys(metadata).sort());
  return createHash('sha256').update(buffer).update(metaDataStr).digest('hex');
}

export default hashS3;
