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

export default apiHandler()
  .get(async (req, res) => {
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
    const messages = await PrismaClient.messages.findMany({
      where: {
        room: id,
        id: {
          gt: lastIdPointer,
        },
      },
      orderBy: {
        id: 'asc',
      },
      take: limit,
    });

    // Format messages
    const formattedMessages = messages.map(formatMessageResponse);

    // Return the result
    res.status(200).json(formatAPIResponse(formattedMessages));
  })
  .post(async (req, res) => {
    const { id } = chatSchema.messages.post.query.parse(req.query);
    const { message } = chatSchema.messages.post.body.parse(req.body);

    if (!message) {
      throw new ParamError('message');
    }

    // Verify that chatId exists and that sender is part of the chat
    const chat = await PrismaClient.rooms.findFirst({
      where: {
        id,
      },
    });

    if (!chat) {
      throw new MessageError(); // TODO: Add a more specific error
    }

    const response = await pusher.trigger(id, 'message_sent', {
      id,
      message,
      sender: req.token?.user?.id,
    });

    if (response.status === 200) {
      await PrismaClient.messages.create({
        data: {
          author: req.token?.user?.id,
          createdAt: new Date(),
          contentType: 'text',
          content: message,
          room: id,
        },
      });

      return res.status(200).end();
    }

    throw new MessageError();
  });
