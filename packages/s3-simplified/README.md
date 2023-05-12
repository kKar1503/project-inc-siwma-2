# Overview

s3-simplified is a simple utility to upload and retrieve files from the backend to AWS, it uses
the [aws-sdk](https://github.com/aws/aws-sdk-js-v3) package to do so.

## What does it do

This utility provides an additional abstraction layer between AWS/SDK and us, the developers.
![improvedWorkflow](https://user-images.githubusercontent.com/45095604/232671230-cdb220c5-ad33-48a4-a42a-b3a89a1acca8.png)

### Why?

Why does this exist? Well, the aws-sdk is a very powerful tool, but it is also very complex and have lots of low level
details and controls that we don't need to know about. This utility abstracts away all the low level details and
provides a simple interface to upload files to AWS S3.

As an example, this is the code needed to initiate a multipart upload to AWS S3 using the aws-sdk:
![image](https://user-images.githubusercontent.com/45095604/232673219-c30f859d-b173-47ee-80f1-8eb0b30eb7f6.png)

What even is multipart upload? Why do I need to know about it? I just want to upload a file to AWS S3!

That's right, there are 2 types of uploads to AWS S3, putObject and multipart. putObject is the default upload type but
multipart is recommended for larger files.

To make things even more complicated, this is the code needed for a regular upload using the aws-sdk:
![image](https://user-images.githubusercontent.com/45095604/232674121-173f7262-c609-4a64-b01d-7368b6cb0a8d.png)
and these are the links to the documentation needed for that simple code:

- [PutObjectCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/putobjectcommand.html)
- [PutObjectCommandInput](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/putobjectcommandinput.html)
- [PutObjectCommandOutput](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/putobjectcommandoutput.html)

the examples provided in the documentation aren't much better either:
![image](https://user-images.githubusercontent.com/45095604/232674651-99557456-1841-4dc1-ac6c-af7d6ae206ca.png)
Most of the time, we don't even need to touch the low level details of the aws-sdk, we just want to upload a file to AWS
S3.

### My solution

This utility abstracts away all the low level details and provides a simple interface to upload files to AWS S3.

![image](https://user-images.githubusercontent.com/45095604/232680004-be3abeed-ff6c-4964-a8d2-7abe99be07f3.png)
Much simpler, right?
PutObject and multipart upload are handled automatically, you don't need to know about them.

Though, if you want more control, there is a config file that can be used to adjust some settings and if lower level
control is needed, there are options to do that as well via the s3BucketInternal object(validation not included), you
can even extend the s3BucketInternal object to add your own methods.

Objects are also documented, so you can easily see what each object does and how to use it.
![image](https://user-images.githubusercontent.com/45095604/232681313-5abd06ea-6f40-48cc-9cf1-0b5941d4495f.png)

# Features

## AWS features abstracted away into objects

### s3lib object

this object is used for managing buckets, CRD operations on buckets.

### s3Bucket object

this object is used for managing files(AWS objects), CRUD operations on them.

### s3Object object

this object is used for retrieving information about files(AWS objects).
this information include the file's metadata, the file's url

## Automatic multipart upload

This allows the user to upload larger files to AWS S3 without having to worry about multipart upload.

the settings related to multipart upload can be configured in the [config file](/src/utils/defaultConfig.ts).

## Automatic url generation

This allows the user to get the url of the uploaded file without having to worry about the url generation.
if the file is uploaded to a public bucket, the url will be generated automatically, if the file is uploaded to a
private bucket, the url will be generated automatically using the presigned url method.

## Highly customizable

This utility is also has a highly customizable [config file](/src/interfaces/config.ts) to suit your needs.
