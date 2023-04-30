import { apiHandler } from '@/utils/api';
import PrismaClient from '@inc/db';
import { z } from 'zod';

const POSTSchema = z.object({
  name: z.string(),
  website: z.string(),
  comments: z.string(),
  image: z.string(),
});

export default apiHandler({
  allowNonAuthenticated: true,
})
  .post(async (req, res) => {
    const { name, website, comments, image } = POSTSchema.parse(req.body);

    const data = await PrismaClient.companies.create({
      data: {
        name,
        website,
        logo: image,
        companiesComments: {
          create: {
            comments,
          },
        },
      },
    });

    if (data) {
      const companyid = data.id;
      if (comments) {
        const comment = await PrismaClient.companiesComments.create({
          data: {
            companyId: companyid,
            comments,
          },
        });
      }
    }

    res.status(201).json({ data });
  })
  .get(async (req, res) => {
    const data = await PrismaClient.companies.findMany({
      include: {
        companiesComments: true,
      },
    });

    res.status(200).json({ data });
  });
