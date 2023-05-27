import { apiHandler, formatAPIResponse } from '@/utils/api';
import PrismaClient, { Companies } from '@inc/db';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { ParamError } from '@inc/errors';
import { companySchema } from '@/utils/api/server/zod';
import { CompanyResponseBody } from '@/utils/api/client/zod';

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
    const { name, website, comments, image } = companySchema.post.body.parse(req.body);

    if (!name || name.trim().length === 0) {
      throw new ParamError('name');
    }

    const websiteRegex =
      /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g;

    if (website && !websiteRegex.test(website)) {
      throw new ParamError('website');
    }

    const response = await PrismaClient.companies.create({
      data: {
        name,
        website,
        logo: image,
        comments,
      },
    });

    res.status(201).json(formatAPIResponse({ companyId: response.id.toString() }));
  })
  .get(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const { lastIdPointer = 0, limit = 10, name } = companySchema.get.query.parse(req.query);

    const response = await PrismaClient.companies.findMany({
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

    res.status(200).json(formatAPIResponse(formatResponse(response)));
  });
