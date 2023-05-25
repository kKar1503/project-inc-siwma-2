import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import { z } from 'zod';
import client from '@inc/db';
import { NotFoundError, ForbiddenError, ParamRequiredError } from '@inc/errors';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { validateEmail, validateName, validatePassword, validatePhone } from '@/utils/api/validate';
import bcrypt from 'bcrypt';
import s3Connection from '@/utils/s3Connection';
import { UserBucketName } from '@api/v1/users';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import { UserContacts } from '@inc/db';
import { userSchema } from '@/utils/api/server/zod';

const userIdSchema = z.object({
  id: z.string(),
});

const updateUserDetailsSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  //   company is a number that represents the id of the company
  company: z.string().optional(),
  mobileNumber: z.string().optional(),
  whatsappNumber: z.string().optional(),
  telegramUsername: z.string().optional(),
  contactMethod: z.nativeEnum(UserContacts).optional(),
  bio: z.string().optional(),
  password: z.string().optional(),
  userComments: z.string().optional(),
});

export default apiHandler()
  .get(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const { id } = userSchema.userId.parse(req.query);

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
        comments: isAdmin, // Only admins can see comments
        phone: true,
        contact: true,
        whatsappNumber: true,
        telegramUsername: true,
        bio: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    const mappedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.companyId.toString(),
      createdAt: user.createdAt,
      enabled: user.enabled,
      profilePic: user.profilePicture,
      mobileNumber: user.phone,
      contactMethod: user.contact,
      whatsappNumber: user.whatsappNumber,
      telegramUsername: user.telegramUsername,
      bio: user.bio,
      ...(isAdmin && { comments: user.comments }),
    };

    return res.status(200).json(formatAPIResponse(mappedUser));
  })
  .put(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const { id } = userIdSchema.parse(req.query);
    const parsedBody = updateUserDetailsSchema.parse(req.body);
    const { name, email, company, mobileNumber, contactMethod, bio, userComments,whatsappNumber,telegramUsername  } =
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

    if (whatsappNumber) {
      validatePhone(whatsappNumber);
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

    // Verify that the user exists
    const userExists = await client.users.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new NotFoundError('User');
    }


    const files = await getFilesFromRequest(req);
    let { profilePicture } = userExists;
    if (files.length > 0) {
      const bucket = await s3Connection.getBucket(UserBucketName);
      const createObject = async () => {
        const s3Object = fileToS3Object(files[0]);
        return bucket.createObject(s3Object);
      };
      const deleteObject = async () => {
        if (!userExists.profilePicture) return;
        await bucket.deleteObject(userExists.profilePicture);
      };

      const [profilePictureObject] = await Promise.all([
        createObject(),
        deleteObject(),
      ]);

      profilePicture = profilePictureObject.Id;
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
        whatsappNumber,
        telegramUsername,
        bio,
        comments: userComments,
      },
    });

    const mappedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.companyId.toString(),
      createdAt: user.createdAt,
      enabled: user.enabled,
      profilePic: user.profilePicture,
      mobileNumber: user.phone,
      whatsappNumber: user.whatsappNumber,
      telegramUsername: user.telegramUsername,
      contactMethod: user.contact,
      bio: user.bio,
      ...(isAdmin && { comments: user.comments }),
    };

    return res.status(200).json(formatAPIResponse(mappedUser));
  })
  .delete(
    apiGuardMiddleware({
      allowAdminsOnly: true,
    }),
    async (req, res) => {
      const { id } = userSchema.userId.parse(req.query);

      // Verify that the user exists
      const userExists = await client.users.findUnique({
        where: {
          id,
        },
      });

      if (!userExists) {
        throw new NotFoundError('User');
      }

      if (userExists.profilePicture) {
        const bucket = await s3Connection.getBucket(UserBucketName);
        await bucket.deleteObject(userExists.profilePicture);
      }

      await client.users.delete({
        where: {
          id,
        },
      });

      return res.status(204).end();
    },
  );
