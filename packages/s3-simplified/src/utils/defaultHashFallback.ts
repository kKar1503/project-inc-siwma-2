export const defaultHashFallback = async (buffer: Buffer | undefined, metadata: Record<string, string>|undefined): Promise<string> => {
    throw new Error('This should never be called, but if you did receive this error, please check if ensure that a custom hash function was provided.')
}
