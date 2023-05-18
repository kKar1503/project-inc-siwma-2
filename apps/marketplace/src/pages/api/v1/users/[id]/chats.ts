import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import { ForbiddenError } from '@inc/errors';
import { z } from 'zod';

// Zod schema for the GET request query parameters
const chatRequestQuery = z.object({
  id: z.string().uuid(),
  lastIdPointer: z.string().uuid().optional(),
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? parseToNumber(value, 'limit') : 10))
    .refine((value) => value >= 1 && value <= 10, {
      message: 'Invalid limit',
    }),
});

async function getUserChats(userId: string, lastIdPointer: string | undefined, limit: number) {
  // Fetch chats for the user
  const chats = await PrismaClient.rooms.findMany({
    where: {
      OR: [{ seller: userId }, { buyer: userId }],
      id: lastIdPointer
        ? {
            gt: lastIdPointer,
          }
        : undefined,
    },
    orderBy: {
      id: 'asc',
    },
    take: limit,
  });

  return chats;
}

export default apiHandler().get(async (req, res) => {
  // Parse and validate user id, lastIdPointer and limit
  const { id: userId, lastIdPointer, limit } = chatRequestQuery.parse(req.query);

  // Verify if the user is the one requesting
  if (!req.token || !req.token.user || req.token.user.id !== userId) {
    throw new ForbiddenError();
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
  res.status(200).json(formatAPIResponse(formattedChats));
});
