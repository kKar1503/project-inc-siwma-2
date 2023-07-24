import { apiHandler } from '@/utils/api';
import Pusher from 'pusher';
import { chatSchema } from '@/utils/api/server/zod';
import { MessageError } from '@inc/errors/src';

const appId = process.env.app_id;
const { key, secret, cluster } = process.env;

if (!appId || !key || !secret || !cluster) {
  throw new Error('Missing pusher env variables');
}

export const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
  useTLS: true,
});

export default apiHandler({ allowNonAuthenticated: true }).post(async (req, res) => {
  const parseResult = chatSchema.messages.post.body.parse(req.body);
  const { message, sender } = parseResult;

  const response = await pusher.trigger('chat', 'chat-event', {
    message,
    sender,
  });

  if (response.status === 200) {
    return res.status(200).end();
  }

  throw new MessageError();
});
