import apiClient from '@/utils/api/client/apiClient';
import chat from '@/utils/api/client/zod/chat';

const createRoom = async (sellerId: string, buyerId: string, listingId: string) => {
  const response = await apiClient.post(`v1/chat/`, {
    sellerId,
    buyerId,
    listingId
  });
  const newRoom = chat.room.create.parse(response.data.data);

  return newRoom;
};

export default createRoom;
