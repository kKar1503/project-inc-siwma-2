import { apiHandler, formatAPIResponse, formatMessageResponse } from '@/utils/api';
import PrismaClient from '@inc/db';
import { NotFoundError, InvalidRangeError, ForbiddenError, ParamError } from '@inc/errors';
import { chatSchema } from '@/utils/api/server/zod';
import Pusher from 'pusher';
import { MessageError } from '@inc/errors/src';
import { checkChatExists } from '.';

const appId = process.env.app_id;
const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;
const { secret } = process.env;

if (!appId || !key || !secret || !cluster) {
  throw new Error('Missing pusher env variables');
}

const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
  useTLS: true,
});

// async function getMessages(chatId: string, lastIdPointer: number, limit: number) {
//   // Fetch messages for the chat room
//   const messages = await PrismaClient.messages.findMany({
//     where: {
//       room: chatId,
//       id: {
//         gt: lastIdPointer,
//       },
//     },
//     orderBy: {
//       id: 'asc',
//     },
//     take: limit,
//   });

//   return messages;
// }

export default apiHandler()
  // .get(async (req, res) => {
  //   // Parse and validate the request query parameters
  //   const { id, lastIdPointer, limit = 10 } = chatSchema.messages.get.query.parse(req.query);

  //   // Verify the limit
  //   if (limit !== undefined) {
  //     if (limit < 1 || limit > 10) {
  //       throw new InvalidRangeError('limit');
  //     }
  //   }

  //   // Fetch the chat room details
  //   const chat = await checkChatExists(id);

  //   // Check if the chat exists
  //   if (!chat) {
  //     throw new NotFoundError('chat room');
  //   }

  //   // Verify if the user is a participant of the chat room
  //   if (
  //     !req.token ||
  //     !req.token.user ||
  //     (req.token.user.id !== chat.usersRoomsBuyerTousers.id &&
  //       req.token.user.id !== chat.usersRoomsSellerTousers.id)
  //   ) {
  //     throw new ForbiddenError();
  //   }

  //   // Fetch messages
  //   const messages = await getMessages(id, lastIdPointer || 0, limit);

  //   // Format messages
  //   const formattedMessages = messages.map(formatMessageResponse);

  //   // Return the result
  //   res.status(200).json(formatAPIResponse(formattedMessages));
  // })
  .post(async (req, res) => {
    const { id } = chatSchema.messages.post.query.parse(req.query);
    const parseResult = chatSchema.messages.post.body.parse(req.body);
    const { message, sender, receiver } = parseResult;
    
    if (!message) {
      throw new ParamError('message');  
    }

    if (!sender) {
      throw new ParamError('sender');
    }

    if (!receiver) {
      throw new ParamError('receiver');
    }

    // Verify that chatId exists and that sender and receiver are part of the chat
    const chat = await PrismaClient.rooms.findFirst({
      where: {
        id,
        AND: [{ buyer: sender || receiver }, { seller: sender || receiver }],
      },
    });

    if (!chat) {
      throw new MessageError(); // TODO: Add a more specific error
    }

    const response = await pusher.trigger(id, 'chat-event', {
      id,
      message,
    });

    if (response.status === 200) {
      return res.status(200).end();
    }

    throw new MessageError();
  });
