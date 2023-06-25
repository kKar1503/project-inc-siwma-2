import apiClient from '@/utils/api/client/apiClient';
import chat from '@/utils/api/client/zod/chat';
import { PostChatRequestBody } from '@/utils/api/server/zod';

const createRoom = async (requestBody: PostChatRequestBody) => {
  const response = await apiClient.post(`v1/chat/`, requestBody);
  console.log(response);
  const newRoom = chat.room.create.parse(response.data.data);

  return newRoom;
};

export default createRoom;
