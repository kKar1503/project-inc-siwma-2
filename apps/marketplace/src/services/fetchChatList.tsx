import apiClient from '@/utils/api/client/apiClient';
import chat from '@/utils/api/client/zod/chat';

const fetchChatList = async () => {
  const response = await apiClient.get('/v1/chat');
  const userChatList = chat.getByUser.parse(response.data.data);

  return userChatList;
};

export default fetchChatList;
