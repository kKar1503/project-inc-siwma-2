import { apiHandler, formatAPIResponse, parseToNumber } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, AuthError } from '@inc/errors';
import { z } from 'zod';
import { checkChatExists } from '.';

// Zod schema for the GET request query parameters
const chatRequestQuery = z.object({
  id: z.string().uuid(),
  lastIdPointer: z
    .string()
    .optional()
    .transform((value) => (value ? parseToNumber(value) : 0))
    .refine((value) => !isNaN(value), {
      message: 'Invalid lastIdPointer',
    }),
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? parseToNumber(value) : 10))
    .refine((value) => value >= 1 && value <= 10, {
      message: 'Invalid limit',
    }),
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
  const parseResult = chatRequestQuery.safeParse(req.query);

  if (!parseResult.success) {
    throw new NotFoundError(parseResult.error.issues[0]?.path[0]?.toString() || 'Unknown');
  }

  const { id, lastIdPointer, limit } = parseResult.data;

  // Fetch the chat room details
  const chat = await checkChatExists(id);

  // Check if the chat exists
  if (!chat) {
    throw new NotFoundError('chat room');
  }

  // Verify if the user is a participant of the chat room
if (!req.token || !req.token.user || (req.token.user.id !== chat.buyer && req.token.user.id !== chat.seller)) {
  throw new AuthError();
}

  // Fetch messages
  const messages = await getMessages(id, lastIdPointer, limit);

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
