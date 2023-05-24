import apiClient from '@/utils/api/client/apiClient';
import chat from '@/utils/api/client/zod/chat';

const fetchChatList = async (loggedUserUuid: string) => {
  const response = await apiClient.get(`v1/users/${loggedUserUuid}/chats`);
  // parse data through zod to ensure data is correct
  const parsedChatList = chat.getByUser.parse(response.data.data);
  return parsedChatList;
};

export default fetchChatList;
