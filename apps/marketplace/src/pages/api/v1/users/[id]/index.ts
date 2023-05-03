import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { z } from 'zod';
import client, { UserContacts } from '@inc/db';
import { NotFoundError, ForbiddenError, ParamRequiredError } from '@inc/errors';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { validateEmail, validateName, validatePhone, validatePassword } from '@/utils/api/validate';
import bcrypt from 'bcrypt';

const userIdSchema = z.object({
  id: z.string(),
});

const updateUserDetailsSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  //   company is a number that represents the id of the company
  company: z.string().optional(),
  profilePicture: z.string().optional(),
  mobileNumber: z.string().optional(),
  contactMethod: z.nativeEnum(UserContacts).optional(),
  bio: z.string().optional(),
  password: z.string().optional(),
  userComments: z.string().optional(),
});

export default apiHandler()
  .get(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const { id } = userIdSchema.parse(req.query);

    const user = await client.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        companyId: true,
        createdAt: true,
        enabled: true,
        profilePicture: true,
        usersComments: isAdmin,
        phone: true,
        contact: true,
        bio: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    return res.status(200).json(formatAPIResponse(user));
  })
  .put(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const { id } = userIdSchema.parse(req.query);
    const parsedBody = updateUserDetailsSchema.parse(req.body);
    const { name, email, company, profilePicture, mobileNumber, contactMethod, bio, userComments } =
      parsedBody;
    let { password } = parsedBody;

    if (name) {
      validateName(name);
    }
    if (email) {
      validateEmail(email);
    }
    if (mobileNumber) {
      validatePhone(mobileNumber);
    }
    if (password) {
      validatePassword(password);
      // Hash password with bcrrypt and genSalt(10)
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    // Users can edit their own details, and admins can edit anyone's details
    // Therefore, we cannot simply block the entire endpoint for non-admin users
    if (!isAdmin && req.token?.user.id !== id) {
      throw new ForbiddenError();
    }

    let companyId: number | undefined;

    // Users cannot change their company, but admins can change anyone's company (per API specs)
    if (company) {
      if (!isAdmin) {
        throw new ForbiddenError();
      }
      companyId = parseToNumber(company, 'company');
    }

    if (userComments) {
      if (!isAdmin) {
        throw new ForbiddenError();
      }

      if (userComments.trim().length === 0) {
        throw new ParamRequiredError('userComments');
      }
    }

    const user = await client.users.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        companyId,
        password,
        profilePicture,
        phone: mobileNumber,
        contact: contactMethod,
        bio,
        usersComments: {
          create: {
            comments: userComments,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    const mappedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.companyId,
      createdAt: user.createdAt,
      enabled: user.enabled,
      profilePic: user.profilePicture,
      mobileNumber: user.phone,
      contactMethod: user.contact,
      bio: user.bio,
    };

    return res.status(200).json(formatAPIResponse(mappedUser));
  })
  .delete(
    apiGuardMiddleware({
      allowAdminsOnly: true,
    }),
    async (req, res) => {
      const { id } = userIdSchema.parse(req.query);

      const user = await client.users.delete({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundError('User');
      }

      return res.status(204).end();
    }
  );
