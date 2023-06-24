import { apiHandler, formatAPIResponse } from '@/utils/api';
import client from '@inc/db';
import { ForbiddenError, NotFoundError, ParamError } from '@inc/errors';
import { userSchema } from '@/utils/api/server/zod';
import { fileToS3Object, getFilesFromRequest } from '@/utils/imageUtils';
import bucket from '@/utils/s3Bucket';

export default apiHandler()
  .put(async (req, res) => {
    const isAdmin = req.token?.user.permissions === 1;

    const { id } = userSchema.userId.parse(req.query);

    // Users can edit their own details, and admins can edit anyone's details
    // Therefore, we cannot simply block the entire endpoint for non-admin users
    if (!isAdmin && req.token?.user.id !== id) {
      throw new ForbiddenError();
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
    if (files.length === 0) throw new ParamError('profile picture');

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


    const user = await client.users.update({
      where: {
        id,
      },
      data: {
        profilePicture,
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


export const config = {
  api: {
    bodyParser: false,
  },
};
