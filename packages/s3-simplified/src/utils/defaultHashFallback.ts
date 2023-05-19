import {randomUUID} from 'crypto';


export const defaultHashFallback = async (buffer: Buffer | undefined, metadata: Record<string, string>|undefined): Promise<string> => {
    return randomUUID();
}
