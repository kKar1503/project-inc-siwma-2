export abstract class S3Error extends Error {
}

export class MissingBucket extends S3Error {
    constructor(bucketName: string) {
        super();
        this.message = `Bucket ${bucketName} does not exist`;
        this.name = "InvalidBucket";
    }
}

export class InvalidBucketName extends S3Error {
    constructor(bucketName: string, message: string = `Bucket name "${bucketName}" is invalid`) {
        super();
        this.message = message;
        this.name = "InvalidBucketName";
    }
}

export class MissingObject extends S3Error {
    constructor(key: string, bucketName: string) {
        super();
        this.message = `Object ${key} does not exist in bucket ${bucketName}`;
        this.name = "InvalidObject";
    }
}

export class ExistingObject extends S3Error {
    constructor(key: string, bucketName: string) {
        super();
        this.message = `Object ${key} already exist in bucket ${bucketName}`;
        this.name = "ObjectConflict";
    }
}
