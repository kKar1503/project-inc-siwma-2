import { apiHandler, formatAPIResponse } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@/errors';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import s3Connection from '@/utils/s3Connection';
import { IS3Object, S3BucketService, S3ObjectBuilder } from 's3-simplified';
import { AdvertisementBucket, AdvertisementPayload } from '@api/v1/advertisments/index';

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqId = req.query.id as string;
  const id = parseInt(reqId, 10);

  if (Number.isNaN(id)) {
    throw new NotFoundError(`advertisement not found`);
  }

  const advertisement = await PrismaClient.advertisements.findUnique({
    where: {
      id,
    },
  });

  if (!advertisement) {
    throw new NotFoundError(`advertisement not found`);
  }

  res.status(200).json(formatAPIResponse(advertisement));
};

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqId = req.query.id as string;
  const id = parseInt(reqId, 10);

  if (Number.isNaN(id)) {
    throw new NotFoundError(`advertisement not found`);
  }

  const payload = req.body as AdvertisementPayload;

  const advertisement = await PrismaClient.advertisements.findUnique({
    where: {
      id,
    },
  });

  if (!advertisement) {
    throw new NotFoundError(`advertisement not found`);
  }

  // if image has changed
  let url = advertisement.image;
  if (payload.image) {
    let bucket: S3BucketService;
    try {
      bucket = await s3Connection.getBucket(AdvertisementBucket);
    } catch (e) {
      // access key don't have access to bucket or bucket doesn't exist
      return res.status(500).json(formatAPIResponse({
        details: 'failed to connect to bucket',
      }));
    }

    const s3ObjectBuilder = new S3ObjectBuilder(payload.image);

    let s3Object: IS3Object;

    try {
      // create new image and delete old image as aws doesn't support update
      const promise = await Promise.all(
        [
          await bucket.createObject(s3ObjectBuilder),
          await bucket.deleteObject(advertisement.image),
        ]);
      const [newS3Object] = promise;
      s3Object = newS3Object;

    } catch (e: any | { name: string }) {
      return res.status(500).json(formatAPIResponse({
        details: 'image already exists',
      }));
    }
    url = await s3Object.generateLink();
  }


  const advertisement = await PrismaClient.advertisements.update({
    data: {
      companyId: payload.companyId || advertisement.companyId,
      image: url,
      endDate: (payload.endDate && new Date(payload.endDate)) || advertisement.endDate,
      description: payload.description,
      link: payload.link,
    },
    where: {
      id,
    },
  });

  const advertisementId = advertisement.id;

  res.status(201).json(formatAPIResponse({
    advertisementId,
  }));

};

const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqId = req.query.id as string;
  const id = parseInt(reqId, 10);

  if (Number.isNaN(id)) {
    throw new NotFoundError(`advertisement not found`);
  }

  const advertisement = await PrismaClient.advertisements.findUnique({
    where: {
      id,
    },
  });

  if (!advertisement) {
    throw new NotFoundError(`advertisement not found`);
  }

  await PrismaClient.advertisements.delete({
    where: {
      id,
    },
  });

  let bucket: S3BucketService;
  try {
    bucket = await s3Connection.getBucket(AdvertisementBucket);
  } catch (e) {
    // access key don't have access to bucket or bucket doesn't exist
    return res.status(500).json(formatAPIResponse({
      details: 'failed to connect to bucket',
    }));
  }

  await bucket.deleteObject(advertisement.image);

  res.status(204).end();
};

export default apiHandler({
  allowAdminsOnly: true,
})
  .get(apiGuardMiddleware({
    allowNonAuthenticated: true,
  }), GET)                   // no need admin    no need auth
  .put(PUT)           // needs admin      needs auth
  .delete(DELETE);    // needs admin      needs auth

