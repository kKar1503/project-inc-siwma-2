import apiClient from '@/utils/api/client/apiClient';
import chat from '@/utils/api/client/zod/chat';
// import fetchListing from './fetchListing';
// import { useQuery } from 'react-query';

const createRoom = async () => {
  const response = await apiClient.get(`v1/chat/`);
  const newRoom = chat.room.create.parse(response.data.data);

  return newRoom;
};

// const checkForRoom = async (loggedUserUuid: string) => {
//   const response = await apiClient.get(`v1/users/${loggedUserUuid}/chats`);
//   // parse data through zod to ensure data is correct
//   console.log(response.data.data);
//   const parsedChatList = chat.getByUser.parse(response.data.data);

//   for (let i = 0; i < parsedChatList.length; i++) {
//     const data = parsedChatList[i];

//     if (data.buyer.id === loggedUserUuid && data.seller.id === loggedUserUuid &&  &&) {
//       ;
//     } else {
//       ;
//     }
//     console.log(data);
//   }
// };

export default createRoom;
