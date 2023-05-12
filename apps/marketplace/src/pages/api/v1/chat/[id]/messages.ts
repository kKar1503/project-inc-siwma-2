import { apiHandler } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, AuthError } from '@inc/errors';
import { checkChatExists } from '.';

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
  // Retrieve chatroom details for a specific chat
  // Parse and validate chat id provided
  const id = req.query.id as string;

  if (!id) {
    throw new Error('The id is not provided.');
  }

  // Parse and validate lastIdPointer and limit provided
  const lastIdPointer = Number(req.query.lastIdPointer) || 0;
  const limit = Math.min(Number(req.query.limit) || 10, 10);

  // Check if the user is logged in
  if (!req.token || !req.token.user) {
    throw new AuthError();
  }

  // Fetch the chat room details
  const chat = await checkChatExists(id);

  // Check if the chat exists
  if (!chat) {
    throw new NotFoundError('chat room');
  }

  // Verify if the user is a participant of the chat room
  if (req.token.user.id !== chat.buyer && req.token.user.id !== chat.seller) {
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
  res.status(200).json(formattedMessages);
});