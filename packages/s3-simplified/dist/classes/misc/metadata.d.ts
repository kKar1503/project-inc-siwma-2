import { IMetadata } from "../../interfaces";
export declare class Metadata implements IMetadata {
    private metadata;
    constructor(metadata?: Record<string, string>, identifier?: string);
    get Keys(): string[];
    get Values(): string[];
    get Pairs(): [string, string][];
    get(key: string): string | undefined;
    set(key: string, value: string): void;
    Length(): number;
    isEmpty(): boolean;
    containsKey(key: string): boolean;
    containsValue(value: string): boolean;
    contains(entry: [string, string]): boolean;
    delete(key: string): void;
    clear(): void;
    toRecord(): Record<string, string>;
    asRecord(): Record<string, string>;
}
