import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient, { Companies } from '@inc/db';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { ParamError } from '@inc/errors';
import { companySchema } from '@/utils/api/server/zod';
import { CompanyResponseBody } from '@/utils/api/client/zod';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import s3Connection from '@/utils/s3Connection';
import * as process from 'process';

export const BucketName = process.env.AWS_BUCKET as string;

function formatResponse(response: Companies[]): CompanyResponseBody[] {
  const temp: CompanyResponseBody[] = [];
  response.forEach((r) => {
    temp.push({
      id: r.id.toString(),
      name: r.name,
      website: r.website,
      bio: r.bio,
      image: r.logo,
      visible: r.visibility,
      comments: r.comments,
      createdAt: r.createdAt.toISOString(),
    });
  });
  return temp;
}

export default apiHandler()
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { name, website, comments } = companySchema.post.body.parse(req.body);

    if (!name || name.trim().length === 0) {
      throw new ParamError('name');
    }

    const websiteRegex =
      /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g;

    if (website && !websiteRegex.test(website)) {
      throw new ParamError('website');
    }

    const files = await getFilesFromRequest(req);
    if (files.length === 0) {
      throw new ParamError('company logo');
    }

    const bucket = await s3Connection.getBucket(BucketName);
    const s3Object = await bucket.createObject(fileToS3Object(files[0]));

    const response = await PrismaClient.companies.create({
      data: {
        name,
        website,
        logo: s3Object.Id,
        comments,
      },
    });

    res.status(201).json(formatAPIResponse({ companyId: response.id.toString() }));
  })
  .get(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const { lastIdPointer = 0, limit = 10, name } = companySchema.get.query.parse(req.query);

    const responseNoLogo = await PrismaClient.companies.findMany({
      select: {
        id: true,
        name: true,
        bio: true,
        website: true,
        logo: true,
        visibility: true,
        createdAt: isAdmin,
        comments: isAdmin,
      },
      where: {
        id: {
          gt: lastIdPointer,
        },
        name: {
          contains: name,
        },
      },
      take: limit,
    });

    const bucket = await s3Connection.getBucket(BucketName);
    const response = await Promise.all(
      responseNoLogo.map(async (r) => {
        const logoId = r.logo;
        if (!logoId) return r;
        const logo = await bucket.getObjectUrl(logoId);
        return {
          ...r,
          logo,
        };
      })
    );

    res.status(200).json(formatAPIResponse(formatResponse(response)));
  });
