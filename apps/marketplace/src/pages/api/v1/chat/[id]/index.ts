import { apiHandler } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, AuthError } from '@inc/errors';
import { formatChatResponse } from '..';

function parseChatId($uuid: string) {
  // Check if $uuid is defined
  if (!$uuid) {
    throw new NotFoundError('chat room');
  }

  // Validate the provided UUID
  if (
    !$uuid.match(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
    )
  ) {
    throw new NotFoundError('chat room');
  }

  return $uuid;
}

export async function checkChatExists(chatId: string) {
  // Check if the chat exists
  const chat = await PrismaClient.rooms.findUnique({
    where: {
      id: chatId,
    },
  });

  // Check if the chat exists
  if (!chat) {
    throw new NotFoundError('chat room');
  }

  return chat;
}

export default apiHandler().get(async (req, res) => {
  // Retrieve chatroom details for a specific chat
  // Parse and validate chat id provided
  const id = parseChatId(req.query.id as string);

  // Check if the chat exists
  const chat = await checkChatExists(id);

  // Check if the user is logged in
  if (!req.token || !req.token.user) {
    throw new AuthError();
  }

  // Verify if the user is a participant of the chat room
  if (req.token.user.id !== chat.buyer && req.token.user.id !== chat.seller) {
    throw new NotFoundError('chat room');
  }

  // Return the result
  res.status(200).json(formatChatResponse(chat));
});
