import apiClient from '@/utils/api/client/apiClient';
import chat from '@/utils/api/client/zod/chat';

const fetchMesssages = async (roomId: string) => {
  const response = await apiClient.get(`v1/chat/${roomId}/messages`);

  const result = chat.message.get.parse(response.data.data);

  const messages = result.map((message) => ({
    ...message,
    createdAt: new Date(message.createdAt),
  }));

  return messages;
};

export default fetchMesssages;
