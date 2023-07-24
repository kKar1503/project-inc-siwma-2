import { apiHandler } from '@/utils/api';
import Pusher from 'pusher';

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

export default apiHandler().post(async (req, res) => {
  const { message, sender } = req.body;
  const response = await pusher.trigger('chat', 'chat-event', {
    message,
    sender,
  });

  res.json({ message: 'completed' });
});
