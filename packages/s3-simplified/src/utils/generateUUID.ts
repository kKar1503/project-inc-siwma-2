import {randomUUID} from 'crypto';


export const generateUUID = async (buffer: Buffer | undefined, metadata: Record<string, string>|undefined): Promise<string> => {
    return randomUUID();
}
