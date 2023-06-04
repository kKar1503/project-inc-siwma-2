import apiClient from '@/utils/api/client/apiClient';
import chat, { ChatRoom } from '@/utils/api/client/zod/chat';

// create a type that extends from the chat type and accepts the category property
// type ChatList = typeof chat.getByUser['_output'] & { category: 'Buying' | 'Selling' };

const fetchChatList = async (loggedUserUuid: string) => {
  const response = await apiClient.get(`v1/users/${loggedUserUuid}/chats`);
  // parse data through zod to ensure data is correct
  console.log(response.data.data);
  const parsedChatList = chat.getByUser.parse(response.data.data);

  // redeclare a new variable that extends from the chat type and accepts the category property, then assign the value of the parsedChatList
  // this is to avoid mutating the original parsedChatList
  // const chatList: ChatList[] = parsedChatList;

  // remove the logged user from the chat list
  for (let i = 0; i < parsedChatList.length; i++) {
    const data = parsedChatList[i];

    if (data.buyer.id === loggedUserUuid) {
      data.category = 'Buying';
    } else if (data.seller.id === loggedUserUuid) {
      data.category = 'Selling';
    }
    console.log(data);
  }

  // return parsedChatList;
};

export default fetchChatList;
