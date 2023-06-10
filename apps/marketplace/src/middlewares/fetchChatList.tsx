import apiClient from '@/utils/api/client/apiClient';
import chat from '@/utils/api/client/zod/chat';

const fetchChatList = async (loggedUserUuid: string) => {
  const response = await apiClient.get(`v1/user/${loggedUserUuid}/chats`);
  const userChatList = chat.getByUser.parse(response.data.data);
  console.log(userChatList)
  return userChatList;
};

export default fetchChatList;
