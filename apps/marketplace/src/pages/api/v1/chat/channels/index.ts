import { apiHandler } from '@/utils/api';
import Pusher from 'pusher';

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

// TODO: Remove allowNonAuthenticated
export default apiHandler({ allowNonAuthenticated: true }).get(async (req, res) => {
  const resp = await pusher.get({ path: '/channels' });

  const body = await resp.json();
  console.log(body);
  const channelsInfo = body.channels;

  // The channels object will contain key-value pairs where the key is the channel name
  // and the value is an object with some information about the channel
  console.log(channelsInfo);
  const channelList = Object.keys(channelsInfo).map((channelName) => ({
    name: channelName,
  }));

  return res.status(200).json(channelList);
});
