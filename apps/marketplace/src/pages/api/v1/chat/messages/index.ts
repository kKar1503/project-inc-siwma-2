import { apiHandler } from '@/utils/api';
import Pusher from 'pusher';
import { chatSchema } from '@/utils/api/server/zod';
import { MessageError } from '@inc/errors/src';

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
  .get(async (req, res) => {
    // test EP, just creates a new channel with the name "yes"
    const response = await pusher.trigger('chat', 'chat-event', {
      message: 'yes',
      sender: 'yes',
    });

    console.log(response);
  })
  .post(async (req, res) => {
    const parseResult = chatSchema.messages.post.body.parse(req.body);
    const { message, sender, receiver } = parseResult;

    const response = await pusher.trigger('chat', 'chat-event', { // TODO: chat is the channel name, change it to the chat id
      message,
      sender,
      receiver,
    });

    if (response.status === 200) {
      return res.status(200).end();
    }

    throw new MessageError();
  });
