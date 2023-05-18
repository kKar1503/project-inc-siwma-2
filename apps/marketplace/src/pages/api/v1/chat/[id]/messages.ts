import { apiHandler, formatAPIResponse, zodParseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, InvalidRangeError, ForbiddenError } from '@inc/errors';
import { z } from 'zod';
import { checkChatExists } from '.';

// Zod schema for the GET request query parameters
const chatRequestQuery = z.object({
  id: z.string().uuid(),
  lastIdPointer: z.string().transform(zodParseToNumber).optional(),
  limit: z.string().transform(zodParseToNumber).optional(),
});

async function getMessages(chatId: string, lastIdPointer: number, limit: number) {
  // Fetch messages for the chat room
  const messages = await PrismaClient.messages.findMany({
    where: {
      room: chatId,
      id: {
        gt: lastIdPointer,
      },
    },
    orderBy: {
      id: 'asc',
    },
    take: limit,
  });

  return messages;
}

export default apiHandler().get(async (req, res) => {
  // Parse and validate the request query parameters
  const { id, lastIdPointer } = chatRequestQuery.parse(req.query);
  let { limit } = chatRequestQuery.parse(req.query);

  // Verify the limit
  if (limit !== undefined) {
    if (limit < 1 || limit > 10) {
      throw new InvalidRangeError('limit');
    }
  } else {
    // Default limit
    limit = 10;
  }

  // Fetch the chat room details
  const chat = await checkChatExists(id);

  // Check if the chat exists
  if (!chat) {
    throw new NotFoundError('chat room');
  }

  // Verify if the user is a participant of the chat room
  if (
    !req.token ||
    !req.token.user ||
    (req.token.user.id !== chat.buyer && req.token.user.id !== chat.seller)
  ) {
    throw new ForbiddenError();
  }

  // Fetch messages
  const messages = await getMessages(id, lastIdPointer || 0, limit);

  // Format messages
  const formattedMessages = messages.map((message) => ({
    id: message.id.toString(),
    content_type: message.contentType,
    read: message.read,
    offer: message.offer,
    author: message.author,
    created_at: message.createdAt.toISOString(),
  }));

  // Return the result
  res.status(200).json(formatAPIResponse(formattedMessages));
});
