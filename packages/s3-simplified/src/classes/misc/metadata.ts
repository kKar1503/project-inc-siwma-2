import {IMetadata} from "../../interfaces";

export class Metadata implements IMetadata {
    constructor(private metadata: Record<string, string> = {},identifier?:string) {
        if(identifier) this.metadata["identifier"] = identifier;
    }

    public get Keys(): string[] {
        return Object.keys(this.metadata);
    }

    public get Values(): string[] {
        return Object.values(this.metadata);
    }

    public get Pairs(): [string, string][] {
        return Object.entries(this.metadata);
    }

    public get(key: string): string | undefined {
        return this.metadata[key.toLowerCase()];
    }

    public set(key: string, value: string): void {
        this.metadata[key.toLowerCase()] = value;
    }

    public Length(): number {
        return this.Keys.length;
    }

    public isEmpty(): boolean {
        return this.Length() === 0;
    }

    public containsKey(key: string): boolean {
        return this.Keys.includes(key);
    }

    public containsValue(value: string): boolean {
        return this.Values.includes(value);
    }

    public contains(entry: [string, string]): boolean {
        return this.Pairs.includes(entry);
    }

    public delete(key: string): void {
        delete this.metadata[key.toLowerCase()];
    }

    public clear(): void {
        this.metadata = {};
    }

    public toRecord(): Record<string, string> {
        const record: Record<string, string> = {};
        for (const key in this.metadata) {
            if (!Object.prototype.hasOwnProperty.call(this.metadata, key)) continue;
            record[key.toLowerCase()] = String(this.metadata[key]);
        }
        return record;
    }

    public asRecord(): Record<string, string> {
        return this.metadata;
    }
}


