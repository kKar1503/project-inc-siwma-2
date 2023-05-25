import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChatHeader from '@/components/rtc/ChatHeader';
import ChatSubHeader from '@/components/rtc/ChatSubHeader';
import ChatBox, { ChatBoxProps } from '@/components/rtc/ChatBox';
import ChatTextBox from '@/components/rtc/ChatTextBox';
import ChatList, { ChatListProps } from '@/components/rtc/ChatList';
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
  console.log(buyer);

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
  const messagesOfChatRoomId1 = [
    {
      id: '365',
      content_type: 'message',
      read: false,
      content: 'hello',
      author: '8fc4060d-5046-458f-b521-9e845b405cf1',
      created_at: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '366',
      content_type: 'image',
      read: false,
      content: 'https://s3.amazonaws.com/mybucket/myimage-20230322T120000Z.jpg',
      author: '8fc4060d-5046-458f-b521-9e845b405cf1',
      created_at: '2023-01-12T06:11:52.43002+00:00',
    },
    {
      id: '367',
      content_type: 'offer',
      read: true,
      offer: 4500,
      author: '6ac846d-5468-3f84-b648-6a544f23e4f5',
      created_at: '2023-01-12T06:11:49.43002+00:00',
    },
  ];

  const messagesOfChatRoomId2 = [
    {
      id: '365',
      content_type: 'message',
      read: false,
      content: 'hello',
      author: '8fc4060d-5046-458f-b521-9e845b405cf1',
      created_at: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '366',
      content_type: 'image',
      read: true,
      content: 'https://s3.amazonaws.com/mybucket/myimage-20230322T120000Z.jpg',
      author: '8fc4060d-5046-458f-b521-9e845b405cf1',
      created_at: '2023-01-12T06:11:52.43002+00:00',
    },
    {
      id: '367',
      content_type: 'offer',
      read: true,
      offer: 4500,
      author: '6ac846d-5468-3f84-b648-6a544f23e4f5',
      created_at: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '369',
      content_type: 'offer',
      read: true,
      offer: 4500,
      author: '6ac846d-5468-3f84-b648-6a544f23e4f5',
      created_at: '2023-01-12T06:11:49.43002+00:00',
    },
  ];

  const messagesOfChatRoomId3 = [
    {
      id: '365',
      content_type: 'message',
      read: true,
      content: 'hello',
      author: '8fc4060d-5046-458f-b521-9e845b405cf1',
      created_at: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '366',
      content_type: 'image',
      read: true,
      content: 'https://s3.amazonaws.com/mybucket/myimage-20230322T120000Z.jpg',
      author: '8fc4060d-5046-458f-b521-9e845b405cf1',
      created_at: '2023-01-12T06:11:52.43002+00:00',
    },
    {
      id: '367',
      content_type: 'offer',
      read: true,
      offer: 4500,
      author: '6ac846d-5468-3f84-b648-6a544f23e4f5',
      created_at: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '369',
      content_type: 'offer',
      read: true,
      offer: 4500,
      author: '6ac846d-5468-3f84-b648-6a544f23e4f5',
      created_at: '2023-01-12T06:11:49.43002+00:00',
    },
  ];

  const allChats: ChatListProps[] = [
    {
      id: '1',
      company: 'ABC Corp',
      category: 'Buying',
      itemName: 'Mild Steel Channel',
      latestMessage: 'Hey, are you still interested in buying?',
      price: 100,
      inProgress: true,
      badgeContent: messagesOfChatRoomId1.filter((message) => !message.read).length,
      imageUrl: 'https://siwma.org.sg/wp-content/uploads/SIW-logo.png',
      date: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '2',
      company: 'XYZ Corp',
      category: 'Buying',
      latestMessage: 'Sure, what is the price?',
      price: 50,
      inProgress: true,
      itemName: 'Product Name 2',
      badgeContent: messagesOfChatRoomId2.filter((message) => !message.read).length,
      imageUrl: 'https://siwma.org.sg/wp-content/uploads/SIW-logo.png',
      date: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '3',
      company: 'LMN Corp',
      category: 'Selling',
      latestMessage: 'I can offer 80, what do you think?',
      price: 80,
      inProgress: true,
      itemName: 'Product Name 3',
      badgeContent: messagesOfChatRoomId3.filter((message) => !message.read).length,
      imageUrl: 'https://siwma.org.sg/wp-content/uploads/SIW-logo.png',
      date: '2023-01-12T06:11:49.43002+00:00',
    },
  ];

  return (
    <Box
      display="flex"
      sx={({ shadows, spacing }) => ({
        mx: spacing(5),
        mt: spacing(3),
        height: '100vh',
        overflowY: 'hidden',
      })}
    >
      <Box
        sx={({ shadows }) => ({
          boxShadow: shadows[3],
          width: 1 / 3,
        })}
      >
        <ChatList
          chats={allChats}
          onChange={(e) => {
            const element = e.currentTarget as HTMLInputElement;
            const { value } = element;
          }}
        />
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
        <Box sx={{ margin: 0 }}>
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
    </Box>
  );
};

export default ChatRoom;
