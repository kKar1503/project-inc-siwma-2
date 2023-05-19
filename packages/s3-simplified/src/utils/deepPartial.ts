export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

/**
 *
 * remove all properties with undefined or null values from nested objects
 * @param defaultValue
 * @param customValue
 */
export function pruneAndMerge(defaultValue: any, customValue: any): any {
    if (defaultValue === undefined || defaultValue === null) return undefined;
    if (customValue === undefined ||customValue === null) return defaultValue;
    if (typeof defaultValue !== "object") return customValue;
    if (Array.isArray(defaultValue)) return defaultValue.map(pruneAndMerge);
    const result: Record<string, any> = {};
    for (const key of Object.keys(defaultValue)) {
        const value = pruneAndMerge(defaultValue[key], customValue[key]);
        if (value !== undefined) result[key] = value;
    }
    return result;
}
