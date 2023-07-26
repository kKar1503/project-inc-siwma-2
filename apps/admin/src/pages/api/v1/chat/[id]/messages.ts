import { apiHandler, formatAPIResponse, formatMessageResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, InvalidRangeError, ForbiddenError } from '@inc/errors';
import { chatSchema } from '@/utils/api/server/zod';
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
  // Parse and validate the request query parameters
  const { id, lastIdPointer, limit = 10 } = chatSchema.messages.get.query.parse(req.query);

  // Verify the limit
  if (limit !== undefined) {
    if (limit < 1 || limit > 10) {
      throw new InvalidRangeError('limit');
    }
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
    (req.token.user.id !== chat.usersRoomsBuyerTousers.id &&
      req.token.user.id !== chat.usersRoomsSellerTousers.id)
  ) {
    throw new ForbiddenError();
  }

  // Fetch messages
  const messages = await getMessages(id, lastIdPointer || 0, limit);

  // Format messages
  const formattedMessages = messages.map(formatMessageResponse);

  // Return the result
  res.status(200).json(formatAPIResponse(formattedMessages));
});
