import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChatHeader from '@/components/rtc/ChatHeader';
import ChatSubHeader from '@/components/rtc/ChatSubHeader';
import ChatBox, { ChatBoxProps } from '@/components/rtc/ChatBox';
import ChatTextBox from '@/components/rtc/ChatTextBox';
import { useSession } from 'next-auth/react';
import fetchUser from '@/middlewares/fetchUser';
import chat from '@/utils/api/client/zod/chat';
import { useQuery } from 'react-query';
import axios from 'axios';

function useChatListQuery(loggedUserUuid: string) {
  fetchUser(loggedUserUuid);
  const { data } = useQuery(
    'chatList',
    async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${loggedUserUuid}/chats`
      );
      console.log(response.data.data);
      const chatList = chat.getByUser.parse(response.data.data);
      console.log(chatList);
      return response.data;
    },
    {
      enabled: loggedUserUuid !== undefined,
    }
  );
  console.log(data);
}

const ChatRoom = () => {
  const [makeOffer, setMakeOffer] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [onSend, setOnSend] = useState<boolean>(false);

  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;

  useEffect(() => {
    // useSession();
  }, []);

  useChatListQuery(loggedUserUuid);

  const messages: ChatBoxProps['roomData'] = [
    {
      id: '21',
      content: 'Hi, how are you?',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '22',
      content: 'Hi, I am interested in the item. Could we negotiate on the cost of the items?',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '23',
      content:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_EC6uxEAq3Q5aEvC5gcyZ1RdcAU74WY-GA&usqp=CAU',
      content_type: 'image',
      author: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    },
    {
      id: '24',
      content: 'Not much, just working on some projects. How about you?',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '25',
      content: 'Same here, just trying to stay busy.',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '26',
      content: 'Not much, just working on some projects. How about you?',
      content_type: 'text',
      author: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    },
    {
      id: '27',
      content: 'Same here, just trying to stay busy.',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '28',
      content: 'Hi, how are you?',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '29',
      content: 'Hi, how are you?',
      content_type: 'text',
      author: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    },
    {
      id: '30',
      content: 'Hi, how are you?',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '31',
      content: 'Hi, how are you?',
      content_type: 'text',
      author: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    },
  ];

  return (
    <Box display="flex">
      <Box
        sx={({ shadows, palette }) => ({
          boxShadow: shadows[3],
          bgcolor: palette.grey[400],
          width: 1 / 3,
          height: 1000,
          justifyContent: 'flex-end',
        })}
      >
        <Typography>hi</Typography>
      </Box>
      <Box sx={{ width: 2 / 3 }}>
        <ChatHeader profilePic="" companyName="Hi Metals PTE LTD" available />
        <ChatSubHeader
          itemPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_EC6uxEAq3Q5aEvC5gcyZ1RdcAU74WY-GA&usqp=CAU"
          itemName="Hi Metals PTE LTD"
          available
          itemPrice={200.8}
          makeOffer={makeOffer}
          setMakeOffer={setMakeOffer}
        />
        <ChatBox roomData={messages} loginId="d44b8403-aa90-4d92-a4c6-d0a1e2fad0af" />
        <ChatTextBox
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          inputText={inputText}
          setInputText={setInputText}
          onSend={onSend}
          setOnSend={setOnSend}
        />
      </Box>
    </Box>
  );
};

export default ChatRoom;
