import apiClient from '@/utils/api/client/apiClient';
import chat from '@/utils/api/client/zod/chat';

const fetchRoomMessages = async (roomUuid: string) => {
  const response = await apiClient.get(`v1/chat/${roomUuid}/messages`);
  // parse data through zod to ensure data is correct
  const messages = chat.message.get.parse(response.data.data);
  return messages;
};

export default fetchRoomMessages;
