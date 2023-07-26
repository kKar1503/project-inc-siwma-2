import { apiHandler } from '@/utils/api';
import Pusher from 'pusher';
import { chatSchema } from '@/utils/api/server/zod';
import { MessageError } from '@inc/errors/src';
import PrismaClient from '@inc/db';
import { ParamError, ParamInvalidError } from '@inc/errors';

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

// TODO: Remove allowNonAuthenticated, and get the user from JWT instead of body
export default apiHandler({ allowNonAuthenticated: true })
  // .get(async (req, res) => {
  //   // test EP, just creates a new channel with the name "yes"
  //   // REMIND ME TO GET RID OF THIS ENTIRE EP, THANKS
  //   const response = await pusher.trigger('chat', 'chat-event', {
  //     message: 'yes',
  //     sender: 'yes',
  //     receiver: 'no',
  //   });

  //   console.log(response);
  // })
  .post(async (req, res) => {
    const parseResult = chatSchema.messages.post.body.parse(req.body);
    const { chatId, message, sender, receiver } = parseResult;

    if (!chatId) {
      throw new ParamError('chatId');
    }

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
        id: chatId,
        AND: [{ buyer: sender || receiver }, { seller: sender || receiver }],
      },
    });

    if (!chat) {
      throw new MessageError(); // TODO: Add a more specific error
    }

    const response = await pusher.trigger(chatId, 'chat-event', {
      message,
      sender,
      receiver,
    });

    if (response.status === 200) {
      return res.status(200).end();
    }

    throw new MessageError();
  });
