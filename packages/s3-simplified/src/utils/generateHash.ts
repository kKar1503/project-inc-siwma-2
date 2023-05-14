import crypto from 'crypto';


export const generateHash = (buffer:Buffer): string => {
    // const hash = crypto.createHash('sha512');
    // hash.update(buffer);
    // return hash.digest('hex');

    // generate uuid instead
    return crypto.randomUUID();
}
