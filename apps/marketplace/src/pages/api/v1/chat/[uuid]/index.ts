import { apiHandler } from "@/utils/api";
import PrismaClient from "@inc/db";
import { NotFoundError } from "@/errors";

//-- Functions --//
function parseChatId(chatId: string) {
  // Parse and validate chat id provided
  const id = parseInt(chatId);

  // Check if the chat id is valid
  if (isNaN(id)) {
    throw new NotFoundError(`Chat with id '${id}'`);
  }

  return id;
}

/**
 * Checks if a chat exists
 * @param id The chat id
 * @returns The chat if it exists
 */
async function checkChatExists(chatId: string | number) {
  // Parse and validate chat id provided
  const id = typeof chatId === "number" ? chatId : parseChatId(chatId);

  // Check if the chat exists
  const chat = await PrismaClient.chat.findUnique({
    where: {
      id,
    },
  });

  // Check if the chat exists
  if (!chat) {
    throw new NotFoundError(`Chat with id '${id}'`);
  }

  return chat;
}

//-- Helper functions --//
export function formatMessageResponse(messageData: any) {
  // Modify this function to format the response as required

  return messageData;
}

export default apiHandler()
  .get(async (req, res) => {
    // Retrieve messages for a specific chat
    // Parse and validate chat id provided
    const id = parseChatId(req.query.id as string);

    // Check if the chat exists
    await checkChatExists(id);

    // Retrieve the messages related to the chat from the database
    const messages = await PrismaClient.message.findMany({
      where: {
        chatId: id,
      },
    });

    // Return the result
    res.status(200).json(formatMessageResponse(messages));
  });