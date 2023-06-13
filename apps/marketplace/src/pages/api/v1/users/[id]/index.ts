import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import client from '@inc/db';
import { NotFoundError, ForbiddenError, ParamRequiredError, WrongPasswordError } from '@inc/errors';
import { apiGuardMiddleware } from '@/utils/api/server/middlewares/apiGuardMiddleware';
import { validateEmail, validateName, validatePassword, validatePhone } from '@/utils/api/validate';
import bcrypt from 'bcrypt';
import { userSchema } from '@/utils/api/server/zod';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import bucket from '@/utils/s3Bucket';

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
        userBookmarksUserBookmarksUserIdTousers: req.token?.user.id === id,
        companiesBookmarks: req.token?.user.id === id,
        listingBookmarks: req.token?.user.id === id,
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
      ...(req.token?.user.id === user.id && {
        bookmarks: {
          users: user.userBookmarksUserBookmarksUserIdTousers.map((user) => user.targetUser),
          companies: user.companiesBookmarks.map((company) => company.companyId.toString()),
          listings: user.listingBookmarks.map((listing) => listing.listingId.toString()),
        },
      }),
    };

    return res.status(200).json(formatAPIResponse(mappedUser));
  })
  .put(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const { id } = userSchema.userId.parse(req.query);

    const getUserHashedPassword = await client.users.findUnique({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });

    const parsedBody = userSchema.put.body.parse(req.body);
    const {
      name,
      email,
      company,
      mobileNumber,
      contactMethod,
      bio,
      userComments,
      whatsappNumber,
      telegramUsername,
      oldPassword,
    } = parsedBody;
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
    if (password || oldPassword) {
      validatePassword(password as string);

      // Compares password from database vs password from input
      const samePassword = bcrypt.compareSync(
        parsedBody.oldPassword as string,
        getUserHashedPassword?.password as string
      );

      if (!samePassword) {
        throw new WrongPasswordError();
      }

      // Hash password with bcrrypt and genSalt(10)
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password as string, salt);
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
      const createObject = async () => {
        const s3Object = fileToS3Object(files[0]);
        return bucket.createObject(s3Object);
      };
      const deleteObject = async () => {
        if (!userExists.profilePicture) return;
        await bucket.deleteObject(userExists.profilePicture);
      };

      const [profilePictureObject] = await Promise.all([createObject(), deleteObject()]);

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
        await bucket.deleteObject(userExists.profilePicture);
      }

      await client.users.delete({
        where: {
          id,
        },
      });

      return res.status(204).end();
    }
  );

export const config = {
  api: {
    bodyParser: false,
  },
};
