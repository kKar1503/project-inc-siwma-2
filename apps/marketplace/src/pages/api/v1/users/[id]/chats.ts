import { apiHandler } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, AuthError } from '@inc/errors';

async function getUserChats(userId: string, lastIdPointer: number, limit: number) {
  // Fetch chats for the user
  const chats = await PrismaClient.rooms.findMany({
    where: {
      OR: [{ seller: userId }, { buyer: userId }],
    //   id: {
    //     gt: lastIdPointer,
    //   },
    },
    orderBy: {
      id: 'asc',
    },
    take: limit,
  });

  return chats;
}

export default apiHandler().get(async (req, res) => {
  // Parse and validate user id provided
  const userId = req.query.id as string;

  if (!userId) {
    throw new NotFoundError('User not found');
  }

  // Parse and validate lastIdPointer and limit provided
  const lastIdPointer = Number(req.query.lastIdPointer) || 0;
  const limit = Math.min(Number(req.query.limit) || 10, 10);

  // Check if the user is logged in
  if (!req.token || !req.token.user) {
    throw new AuthError();
  }

  // Verify if the user is the one requesting
  if (req.token.user.id !== userId) {
    throw new AuthError();
  }

  // Fetch chats
  const chats = await getUserChats(userId, lastIdPointer, limit);

  // Format chats
  const formattedChats = chats.map((chat) => ({
    id: chat.id,
    seller: chat.seller,
    buyer: chat.buyer,
    listing: chat.listing.toString(),
    created_at: chat.createdAt.toISOString(),
  }));

  // Return the result
  res.status(200).json(formattedChats);
});
