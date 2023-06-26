// ** React / Next Imports **
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

// ** Components Imports **
import ChatHeader from '@/components/rtc/ChatHeader';
import ChatSubHeader from '@/components/rtc/ChatSubHeader';
import ChatBox from '@/components/rtc/ChatBox';
import ChatTextBox from '@/components/rtc/ChatTextBox';
import ChatList from '@/components/rtc/ChatList';

// ** Chat Related Imports **
import { io } from 'socket.io-client';
import { syncMessage } from '@/chat/emitters';
import { syncLocalStorage, syncLastMessage, syncLastMessages } from '@/utils/syncLocalStorage';

// ** MUI Imports **
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

// ** Types Imports **
import type { Messages } from '@inc/types';
import type { ChatListProps } from '@/components/rtc/ChatList';

// ** Hooks Imports **
import { useResponsiveness } from '@inc/ui';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import useLocalStorage from '@/hooks/useLocalStorage';
import useChat from '@/hooks/useChat';
import { useRouter } from 'next/router';

const ChatRoom = () => {
  // ** Socket Initialization
  const socket = useRef(
    io(process.env.NEXT_PUBLIC_CHAT_SERVER_URL, { transports: ['websocket'], autoConnect: false })
  );

  // ** Hooks **
  const { data } = useSession();
  const router = useRouter();

  // ** Refs **
  const lastMessagesCache = useRef<Map<string, string>>(new Map());
  const userIdRef = useRef<string>('');
  const userId = userIdRef.current;

  // ** LocalStorage Keys **
  const lastMessageIdKey = `${userId}-lastMessageId`;
  const roomKey = `${userId}-rooms`;

  // ** MUI **
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, palette } = useTheme();

  // ** States **
  const [makeOffer, setMakeOffer] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState('');
  const [onSend, setOnSend] = useState(false);
  const [progress, setProgress] = useState(0);
  const [domLoaded, setDomLoaded] = useState(false);
  const [connect, setConnect] = useState(false);
  const [lastMessages, setLastMessages] = useState<ChatListProps[]>([]);

  // ** LocalStorage Values **
  const lastMessageId = useReadLocalStorage<number>(lastMessageIdKey);
  const [rooms, setRooms] = useLocalStorage<string[]>(roomKey, []);
  const [messages, setMessages] = useLocalStorage<Messages[]>(roomId, []);

  // ** useChat **
  const { isConnected, loading } = useChat(socket.current, connect, {
    userId,
    currentRoom: roomId,
    chatMessagesProgressCallback: (progress) => setProgress(progress),
    messageCallback: (message) => {
      syncLastMessage(userId, message);
    },
    messageSyncCallback: (messageSync) => {
      switch (messageSync.status) {
        case 'success': {
          console.log('Sync success');
          syncLastMessages(userId, lastMessagesCache.current);
          lastMessagesCache.current.clear();
          break;
        }
        case 'error': {
          console.log(`Sync error: ${messageSync.err}`);
          break;
        }
        case 'in_progress': {
          console.log('Sync in progress');
          console.log(messageSync.progress);
          console.log(messageSync.message);
          syncLocalStorage(userId, messageSync.message, lastMessagesCache.current);
          break;
        }
        default: {
          break;
        }
      }
    },
  });

  // ** useEffect **
  useEffect(() => {
    if (data !== undefined && data !== null) {
      console.log('userId acquired from user session');
      userIdRef.current = data.user.id;
      setDomLoaded(true);
      return;
    }
    const lastLoggedInUserId = localStorage.getItem('lastLoggedIn');
    if (lastLoggedInUserId !== null) {
      console.log('userId acquired from localStorage');
      userIdRef.current = lastLoggedInUserId;
      setDomLoaded(true);
      return;
    }

    userIdRef.current = 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af';
    // TODO, to change back to following
    // console.log('userId cannot be found, redirecting to signin page');
    // router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const chatList: ChatListProps[] = [];

    rooms.forEach((room) => {
      const lastMessage = localStorage.getItem(`${room}-last`);

      if (lastMessage !== null) {
        const parsedMessage = JSON.parse(lastMessage) as Messages;

        let latestMessage: string;

        switch (parsedMessage.contentType) {
          case 'text': {
            latestMessage = parsedMessage.content;
            break;
          }
          case 'image': {
            latestMessage = parsedMessage.author === userId ? 'You sent an image' : 'Sent an image';
            break;
          }
          case 'file': {
            latestMessage = parsedMessage.author === userId ? 'You sent a file' : 'Sent a file';
            break;
          }
          case 'offer': {
            latestMessage =
              parsedMessage.author === userId
                ? `You offered $${parsedMessage.offer}`
                : `Sent an offer $${parsedMessage.offer}`;
            break;
          }
          default: {
            latestMessage = '';
          }
        }

        const chatListProps: ChatListProps = {
          id: room,
          company: 'Company',
          category: 'Selling',
          latestMessage,
          price: 0,
          itemName: 'Item',
          inProgress: true,
          date: parsedMessage.createdAt.toString(),
          imageUrl: 'https://siwma.org.sg/wp-content/uploads/SIW-logo.png',
          badgeContent: 0,
        };

        chatList.push(chatListProps);

        return;
      }

      const roomMessages = localStorage.getItem(room);

      if (roomMessages !== null) {
        const parsedMessages = JSON.parse(roomMessages) as Messages[];
        const parsedMessage = parsedMessages[parsedMessages.length - 1];

        let latestMessage: string;

        switch (parsedMessage.contentType) {
          case 'text': {
            latestMessage = parsedMessage.content;
            break;
          }
          case 'image': {
            latestMessage = parsedMessage.author === userId ? 'You sent an image' : 'Sent an image';
            break;
          }
          case 'file': {
            latestMessage = parsedMessage.author === userId ? 'You sent a file' : 'Sent a file';
            break;
          }
          case 'offer': {
            latestMessage =
              parsedMessage.author === userId
                ? `You offered $${parsedMessage.offer}`
                : `Sent an offer $${parsedMessage.offer}`;
            break;
          }
          default: {
            latestMessage = '';
          }
        }

        const chatListProps: ChatListProps = {
          id: room,
          company: 'Company',
          category: 'Selling',
          latestMessage,
          price: 0,
          itemName: 'Item',
          inProgress: true,
          date: parsedMessage.createdAt.toString(),
          imageUrl: 'https://siwma.org.sg/wp-content/uploads/SIW-logo.png',
          badgeContent: 0,
        };

        chatList.push(chatListProps);
      }
    });

    setLastMessages(chatList);
  }, [rooms]);

  useEffect(() => {
    if (isConnected) {
      syncMessage(socket.current, lastMessageId === null ? 0 : lastMessageId, (ack) => {
        if (ack.success) {
          console.log(ack.data);
        } else {
          console.log(ack.err);
        }
      });
    }
  }, [isConnected]);

  const chatPageSx: SxProps<Theme> = useMemo(() => {
    if (isLg) {
      return {
        height: 'calc(100vh - 64px)',
        minWidth: '992px',
        px: 'calc(50vw - 656px)',
      };
    }
    if (isSm) {
      return {
        minWidth: '0px',
        px: '0px',
      };
    }
    return {
      height: 'calc(100vh - 64px)',
      minWidth: '0px',
      px: '64px',
    };
  }, [isLg, isSm]);

  return (
    <Box id="chat-page" display="flex" sx={chatPageSx}>
      {/* render if isMd and isLg */}
      {/* if isSm, display chat list if roomId is '' (room not selected) */}
      {(isMd || isLg || (isSm && roomId === '')) && (
        <Box
          sx={{
            width: isSm ? 1 / 1 : 1 / 3,
            height: isSm? 'calc(100vh - 32px)' : '100%',
            overflow: 'hidden',
          }}
        >
          <ChatList
            chats={lastMessages}
            selectChat={roomId}
            setSelectChat={setRoomId}
            onChange={(e) => {
              const element = e.currentTarget as HTMLInputElement;
              const { value } = element;
            }}
          />
        </Box>
      )}
      {/* if isSm, display  */}
      {roomId !== '' && (
        <Box
          id="chat-right-side-wrapper"
          sx={{
            width: isSm ? 1 / 1 : 2 / 3,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Box
            id="chat-right-side"
            sx={{
              height: '100%',
            }}
          >
            <ChatHeader
              profilePic=""
              companyName="Hi Metals PTE LTD"
              available
              setSelectChat={setRoomId}
            />
            <ChatSubHeader
              itemPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_EC6uxEAq3Q5aEvC5gcyZ1RdcAU74WY-GA&usqp=CAU"
              itemName="Hi Metals PTE LTD"
              available
              itemPrice={200.8}
              makeOffer={makeOffer}
              setMakeOffer={setMakeOffer}
            />
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
      <Button
        sx={{
          position: 'fixed',
          bottom: '120px',
          right: '120px',
          height: '80px',
          width: '80px',
          borderRadius: '50%',
          backgroundColor: 'red',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1em',
        }}
        onClick={() => {
          setConnect(true);
        }}
      >
        Sync
      </Button>
    </Box>
  );
};

export default ChatRoom;
