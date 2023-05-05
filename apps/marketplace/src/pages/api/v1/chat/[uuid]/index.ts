import { apiHandler } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError } from '@inc/errors';
import { formatChatResponse, chatRequestBody } from '..';

function parseChatId($uuid: string) {
  // Validate the provided UUID
  if (
    !$uuid.match(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
    )
  ) {
    throw new NotFoundError('Chat');
  }

  return $uuid;
}

async function checkChatExists(chatId: string) {
  // Check if the chat exists
  const chat = await PrismaClient.rooms.findUnique({
    where: {
      id: chatId,
    },
  });

  // Check if the chat exists
  if (!chat) {
    throw new NotFoundError('Chat');
  }

  return chat;
}

export default apiHandler().get(async (req, res) => {
  // Retrieve chatroom details for a specific chat
  // Parse and validate chat id provided
  const id = parseChatId(req.query.id as string);

  // Check if the chat exists
  const chat = await checkChatExists(id);

  // Return the result
  res.status(200).json({
    id: chat.id,
    seller: chat.seller,
    buyer: chat.buyer,
  });
});
