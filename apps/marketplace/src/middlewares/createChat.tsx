import apiClient from '@/utils/api/client/apiClient';
import chat from '@/utils/api/client/zod/chat';
// import fetchListing from './fetchListing';
// import { useQuery } from 'react-query';

const createRoom = async () => {
  const response = await apiClient.get(`v1/chat/`);
  const newRoom = chat.room.create.parse(response.data.data);

  return newRoom;
};

export default createRoom;
