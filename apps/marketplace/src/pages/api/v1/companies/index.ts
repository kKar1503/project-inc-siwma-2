import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import { z } from 'zod';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { ParamError } from '@inc/errors';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import s3Connection from '@/utils/s3Connection';
import * as process from 'process';

export const CompanyBucketName = process.env.AWS_COMPANY_BUCKET_NAME as string;

const createCompanyRequestBody = z.object({
  name: z.string(),
  website: z.string(),
  comments: z.string(),
});

const getCompaniesRequestBody = z.object({
  lastIdPointer: z.string().optional(),
  limit: z.string().optional(),
  name: z.string().optional(),
});

export type queryResult = {
  id: number;
  name: string;
  website: string | null;
  bio: string | null;
  logo: string | null;
  visibility: boolean;
  comments: string | null;
  createdAt?: Date;
};

export type getResponseBody = {
  id: string;
  name: string;
  website: string | null;
  bio: string | null;
  image: string | null;
  visible: boolean;
  comments?: string | null;
  createdAt?: Date;
};

function formatResponse(response: queryResult[]): getResponseBody[] {
  const temp: getResponseBody[] = [];
  response.forEach((r) => {
    temp.push({
      id: r.id.toString(),
      name: r.name,
      website: r.website,
      bio: r.bio,
      image: r.logo,
      visible: r.visibility,
      comments: r.comments,
      createdAt: r.createdAt,
    });
  });
  return temp;
}

export default apiHandler()
  .post(apiGuardMiddleware({ allowAdminsOnly: true }), async (req, res) => {
    const { name, website, comments } = createCompanyRequestBody.parse(req.body);

    if (!name || name.trim().length === 0) {
      throw new ParamError('name');
    }

    const websiteRegex =
      /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g;

    if (website && !websiteRegex.test(website)) {
      throw new ParamError('website');
    }

    const files = await getFilesFromRequest(req);

    const bucket = await s3Connection.getBucket(CompanyBucketName);
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

    const { lastIdPointer = '0', limit = '10', name } = getCompaniesRequestBody.parse(req.query);

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
          gt: parseToNumber(lastIdPointer),
        },
        name: {
          contains: name,
        },
      },
      take: parseToNumber(limit),
    });

    const bucket = await s3Connection.getBucket(CompanyBucketName);
    const response = await Promise.all(responseNoLogo.map(async (r) => {
      const logoId = r.logo;
      if (!logoId) return r;
      const logo = await bucket.getObject(logoId);
      return {
        ...r,
        logo: await logo.generateLink(),
      };
    }));

    res.status(200).json(formatAPIResponse(formatResponse(response)));
  });
