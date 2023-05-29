import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
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
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';

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
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, shape, shadows, palette, typography } = useTheme();
  const [makeOffer, setMakeOffer] = useState<boolean>(false);
  const [selectChat, setSelectChat] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [onSend, setOnSend] = useState<boolean>(false);

  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;

  if (selectChat !== '') {
    console.log(selectChat);
  }



  // converts to UI design if screen goes to mobile
  const chatStyles = useMemo(() => {
    if (isSm) {
      return {
        pagePadding: {
          mx: spacing(0),
          mt: spacing(0),
        },
      };
    }
    if (isMd) {
      return {
        pagePadding: {
          mx: spacing(5),
          mt: spacing(3),
        },
      };
    }
    if (isLg) {
      return {
        pagePadding: {
          mx: spacing(5),
          mt: spacing(3),
        },
      };
    }
    return {
      pagePadding: {
        mx: spacing(5),
        mt: spacing(3),
      },
    };
  }, [isSm, isMd, isLg]);

  const userChatList = useChatListQuery(loggedUserUuid);
  // console.log(userChatList);

  // TODO: set listing data from retrieved listingID
  const listingData = useGetListingQuery('3');
  // console.log(listingData);

  // TODO: set listing images data from retrieved listingID
  // const listingImagesData = useGetListingImagesQuery('3');
  // console.log(listingImagesData);

  // TODO: set buyer data from retrieved buyerID
  const buyer = useGetUserQuery(loggedUserUuid);
  // console.log(buyer);

  // TODO: set messages data from retrieved roomID
  const roomMessages = useGetMessagesQuery(selectChat);
  // console.log(roomMessages);

  const messages: ChatBoxProps['roomData'] = [
    {
      id: '2451',
      content_type: 'text',
      read: false,
      content: 'hello',
      author: '8fc4060d-5046-458f-b521-9e845b405cf1',
      createdAt: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '2163',
      content_type: 'text',
      read: false,
      content: 'Not much, just working on some projects. How about you?',
      author: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
      createdAt: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '2461',
      content_type: 'text',
      read: false,
      content: 'Not much, just working on some projects. How about you?',
      author: '8fc4060d-5046-458f-b521-9e845b405cf1',
      createdAt: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '2351',
      content_type: 'image',
      read: false,
      content:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_EC6uxEAq3Q5aEvC5gcyZ1RdcAU74WY-GA&usqp=CAU',
      author: '8fc4060d-5046-458f-b521-9e845b405cf1',
      createdAt: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '2175',
      content_type: 'image',
      read: false,
      content:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_EC6uxEAq3Q5aEvC5gcyZ1RdcAU74WY-GA&usqp=CAU',
      author: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
      createdAt: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '2123',
      content_type: 'text',
      read: false,
      content: 'Not much, just working on some projects. How about you?',
      author: '8fc4060d-5046-458f-b521-9e845b405cf1',
      createdAt: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '2124',
      content_type: 'text',
      read: false,
      content: 'Not much, just working on some projects. How about you?',
      author: '8fc4060d-5046-458f-b521-9e845b405cf1',
      createdAt: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '2435',
      content_type: 'offer',
      read: false,
      offer: 188.8,
      author: '8fc4060d-5046-458f-b521-9e845b405cf1',
      createdAt: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '25',
      content_type: 'offer',
      read: false,
      offer: 188.8,
      author: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
      createdAt: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '25434',
      content_type: 'text',
      read: false,
      content: 'https://test.zip',
      author: '8fc4060d-5046-458f-b521-9e845b405cf1',
      createdAt: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '23',
      content_type: 'file',
      read: false,
      content: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      author: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
      createdAt: '2023-01-12T06:11:49.43002+00:00',
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
      id: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
      company: 'ABC Corp',
      category: 'Buying',
      itemName: 'Mild Steel Channel',
      latestMessage:
        'Hey, are you still interested in buying?Hey, are you still interested in buying?Hey, are you still interested in buying?Hey, are you still interested in buying?Hey, are you still interested in buying?Hey, are you still interested in buying?Hey, are you still interested in buying?',
      price: 100,
      inProgress: true,
      badgeContent: messagesOfChatRoomId1.filter((message) => !message.read).length,
      imageUrl: 'https://siwma.org.sg/wp-content/uploads/SIW-logo.png',
      date: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '7bc2b79e-8eb9-4a44-9656-58327d75a0cb',
      company: 'XYZ Corp',
      category: 'Buying',
      latestMessage: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumvLorem Ipsum ',
      price: 50,
      inProgress: true,
      itemName: 'Product Name 2',
      badgeContent: messagesOfChatRoomId2.filter((message) => !message.read).length,
      imageUrl: 'https://siwma.org.sg/wp-content/uploads/SIW-logo.png',
      date: '2023-01-12T06:11:49.43002+00:00',
    },
    {
      id: '42268d5f-a094-493c-a75f-7ed4e3db9c69',
      company: '42268d5f-a094-493c-a75f-7ed4e3db9c69',
      category: 'Selling',
      latestMessage: 'I can offer 80, what do you think?',
      price: 80,
      inProgress: true,
      itemName: 'Product Name 3',
      badgeContent: messagesOfChatRoomId3.filter((message) => !message.read).length,
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
    {
      id: '4',
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
    {
      id: '5',
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
    {
      id: '6',
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
    {
      id: '7',
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
    {
      id: '8',
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
    {
      id: '9',
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
      sx={{
        height: '100vh',
        // overflowY: 'hidden',
        ...chatStyles?.pagePadding,
      }}
    >
      {/* render if isMd and isLg, if isSm check if there's a selected chat */}
      {/* if there is selectedChat, display chat only, else display chat list only */}
      {(isMd || isLg || (isSm && selectChat === '')) && (
        <Box
          sx={({ shadows }) => ({
            boxShadow: shadows[3],
            width: isSm ? 1 / 1 : 1 / 3,
            height: isSm ? '100%' : '90%',
            overflow: 'hidden',
          })}
        >
          <ChatList
            chats={allChats}
            selectChat={selectChat}
            setSelectChat={setSelectChat}
            onChange={(e) => {
              const element = e.currentTarget as HTMLInputElement;
              const { value } = element;
            }}
          />
        </Box>
      )}
      {selectChat !== '' && (
        <Box
          sx={{ width: isSm ? 1 / 1 : 2 / 3, height: isSm ? '100$' : '90%', overflow: 'hidden' }}
        >
          <ChatHeader
            profilePic=""
            companyName="Hi Metals PTE LTD"
            available
            setSelectChat={setSelectChat}
          />
          <ChatSubHeader
            itemPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_EC6uxEAq3Q5aEvC5gcyZ1RdcAU74WY-GA&usqp=CAU"
            itemName="Hi Metals PTE LTD"
            available
            itemPrice={200.8}
            makeOffer={makeOffer}
            setMakeOffer={setMakeOffer}
          />
          <Box sx={{ margin: 0 }}>
            <ChatBox
              roomData={messages}
              loginId="c9f22ccc-0e8e-42bd-9388-7f18a5520c26"
              ChatText={
                <ChatTextBox
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  inputText={inputText}
                  setInputText={setInputText}
                  onSend={onSend}
                  setOnSend={setOnSend}
                />
              }
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatRoom;
