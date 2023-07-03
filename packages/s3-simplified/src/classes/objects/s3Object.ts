import { Readable } from 'stream';
import { IMetadata, IS3Object, IS3ObjectJSON } from '../../interfaces';
import { Config } from '../../interfaces/config';
import { MissingUUID } from '../misc/errors';

type BucketMethods = {
  isPublic(): Promise<boolean>;
  generatePublicUrl(key: string): string;
  generateSignedUrl(key: string, signedUrlConfig: Config['signedUrl']): Promise<string>;
  bucketName: string;
};

export class S3Object implements IS3Object {
  constructor(
    private metadata: IMetadata,
    private bucketSource: BucketMethods,
    private config: Config,
    private body?: Readable
  ) {
    const editableMetadata = this.metadata.asRecord();
    const type = this.Type;
    if (this.Extension !== undefined) return;
    if (type !== undefined) {
      const [, fileType] = type.split('/');
      editableMetadata['file-type'] = fileType;
      return;
    }
    // guess from filename
    const filename = this.key;
    const extension = filename.split('.')[1];
    if (extension !== undefined) editableMetadata['file-type'] = extension;
  }

  public get Body(): Readable | undefined {
    return this.body;
  }

  public get key(): string {
    return this.Id;
  }

  public get Metadata(): IMetadata {
    return this.metadata;
  }

  public get DataSize(): number | undefined {
    const sizeStr = this.metadata.get('Content-Length');
    if (sizeStr === undefined) return undefined;
    return parseInt(sizeStr, 10);
  }

  public get Type(): string | undefined {
    return this.metadata.get('content-type');
  }

  public get Extension(): string | undefined {
    return this.metadata.get('file-type');
  }

  public get UUID(): string {
    const uuid = this.metadata.get('content-disposition');
    if (uuid) return uuid;
    throw new MissingUUID(this.key, this.bucketSource.bucketName);
  }

  public get Id(): string {
    const id = this.metadata.get('identifier');
    if (id) return id;
    return this.UUID;
  }

  public async generateLink(): Promise<string> {
    return (await this.bucketSource.isPublic())
      ? this.bucketSource.generatePublicUrl(this.key)
      : this.bucketSource.generateSignedUrl(this.key, this.config.signedUrl);
  }

  public async toJSON(): Promise<IS3ObjectJSON> {
    return {
      FileLink: await this.generateLink(),
      Metadata: this.Metadata.Pairs,
    };
  }
}
