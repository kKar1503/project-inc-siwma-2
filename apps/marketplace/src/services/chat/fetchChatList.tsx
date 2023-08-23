import apiClient from '@/utils/api/client/apiClient';
import chat from '@/utils/api/client/zod/chat';

const fetchChatList = async () => {
  const response = await apiClient.get('/v1/chat');

  const userChatList = chat.getByUser.parse(response.data.data);

  // convert price to number
  const formattedUserChatList = userChatList.map((chat) => {
    const { listing } = chat;
    const price = parseInt(listing.price, 10);
    return {
      ...chat,
      listing: {
        ...listing,
        price,
      },
    };
  });

  return formattedUserChatList;
};

export default fetchChatList;