import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChatHeader from '@/components/rtc/ChatHeader';
import ChatSubHeader from '@/components/rtc/ChatSubHeader';
import ChatBox, { ChatBoxProps } from '@/components/rtc/ChatBox';
import ChatTextBox from '@/components/rtc/ChatTextBox';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import fetchChatList from '@/middlewares/fetchChatList';
import fetchListing from '@/middlewares/fetchListing';
import fetchListingImages from '@/middlewares/fetchListingImages';
import fetchUser from '@/middlewares/fetchUser';
import fetchRoomMessages from '@/middlewares/fetchRoomMessages';

const useChatListQuery = (loggedUserUuid: string) => {
  const { data } = useQuery('chatList', async () => fetchChatList(loggedUserUuid), {
    enabled: loggedUserUuid !== undefined,
  });
  return data;
};

const useGetListingQuery = (listingID: string) => {
  const { data } = useQuery('listing', async () => fetchListing(listingID), {
    enabled: listingID !== undefined,
  });
  return data;
};

// not in dev yet
const useGetListingImagesQuery = (listingID: string) => {
  const { data } = useQuery('listingImage', async () => fetchListingImages(listingID), {
    enabled: listingID !== undefined,
  });
  return data;
};

const useGetUserQuery = (userUuid: string) => {
  const { data } = useQuery('user', async () => fetchUser(userUuid), {
    enabled: userUuid !== undefined,
  });
  return data;
};

const useGetMessagesQuery = (roomUuid: string) => {
  const { data } = useQuery('roomMessages', async () => fetchRoomMessages(roomUuid), {
    enabled: roomUuid !== undefined,
  });
  return data;
};

const ChatRoom = () => {
  const [makeOffer, setMakeOffer] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [onSend, setOnSend] = useState<boolean>(false);

  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;

  const userChatList = useChatListQuery(loggedUserUuid);
  // console.log(userChatList);

  // TODO: set listing data from retrieved listingID
  const listingData = useGetListingQuery('3');
  // console.log(listingData);

  // TODO: set listing images data from retrieved listingID
  const listingImagesData = useGetListingImagesQuery('3');
  // console.log(listingImagesData);

  // TODO: set buyer data from retrieved buyerID
  const buyer = useGetUserQuery(loggedUserUuid);
  // console.log(buyer);

  // TODO: set messages data from retrieved roomID
  const roomMessages = useGetMessagesQuery('dfc9bea3-b6f0-4b40-b59b-6cd5db0a0930');
  // console.log(roomMessages);

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
