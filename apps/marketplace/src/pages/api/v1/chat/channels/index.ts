import { apiHandler } from '@/utils/api';
import PrismaClient from '@inc/db';

const appId = process.env.app_id;
const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;
const { secret } = process.env;

if (!appId || !key || !secret || !cluster) {
  throw new Error('Missing pusher env variables');
}

// TODO: Remove allowNonAuthenticated
export default apiHandler({ allowNonAuthenticated: true }).get(async (req, res) => {
  // Can't just fetch channels from Pusher because Pusher only returns channels that are currently in use
  // Not very useful for us because we want to show all channels, even if they're not in use
  // Get channels from our own DB instead
 
  const userId = req.token?.user?.id;
  
  const channels = await PrismaClient.rooms.findMany({
    where: {
      OR: [
        { buyer: userId },
        { seller: userId },
      ],
    },
  });

  res.status(200).json(channels);
});
