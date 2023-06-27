// ** React / Next Imports **
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

// ** Components Imports **
import ChatHeader from '@/components/rtc/ChatHeader';
import ChatSubHeader from '@/components/rtc/ChatSubHeader';
import ChatBox from '@/components/rtc/ChatBox';
import ChatTextBox from '@/components/rtc/ChatTextBox';
import ChatList from '@/components/rtc/ChatList';

// ** Chat Related Imports **
import { io } from 'socket.io-client';
import { getMessage, getRooms, joinRoom, partRoom, sendMessage } from '@/chat/emitters';

// ** MUI Imports **
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

// ** Types Imports **
import type { ChatListProps } from '@/components/rtc/ChatList';
import type { ChatData } from '@/components/rtc/ChatBox';
import type { Messages } from '@inc/types';

// ** Hooks Imports **
import { useResponsiveness } from '@inc/ui';
import useChat from '@/hooks/useChat';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

function formatMessage(message: Messages): ChatData {
  const { createdAt, message: messageContent, ...rest } = message;
  return {
    ...rest,
    messageContent,
    createdAt: new Date(createdAt),
  };
}

const ChatRoom = () => {
  // ** Socket Initialization
  const socket = useRef(
    io(process.env.NEXT_PUBLIC_CHAT_SERVER_URL, { transports: ['websocket'], autoConnect: false })
  );

  // ** Hooks **
  const { data } = useSession();
  const router = useRouter();

  // ** Refs **
  const userIdRef = useRef<string>('');
  const roomIdRef = useRef('');
  const userId = userIdRef.current;

  // ** MUI **
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  // ** Socket Related **z
  const [connect, setConnect] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState<ChatListProps[]>([]);
  const [messages, setMessages] = useState<ChatData[]>([]);

  // ** States **
  const [makeOffer, setMakeOffer] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState('');
  const [domLoaded, setDomLoaded] = useState(false);
  const [roomSynced, setRoomSynced] = useState(false);
  const [messageSynced, setMessageSynced] = useState('');
  const [acceptOffer, setAcceptOffer] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  const [deleteOffer, setDeleteOffer] = useState<boolean>(false);

  // ** Update Chat List **
  const updateChatList = (message: Messages) => {
    setRooms((prev) =>
      prev.map((room) => {
        console.log('iterating rooms', room);
        if (room.id !== message.room) {
          return room;
        }
        const newRoom = { ...room };

        let latestMessageDataString = '';
        const latestMessageDataObj = {
          amount: 0,
          accepted: false,
          content: '',
        };

        if (message.message.contentType === 'offer') {
          latestMessageDataObj.amount = message.message.amount;
          latestMessageDataObj.accepted = message.message.offerAccepted;
          latestMessageDataObj.content = message.message.content;
        } else {
          latestMessageDataString = message.message.content;
        }

        newRoom.time = new Date(message.createdAt);
        newRoom.latestMessage =
          message.message.contentType === 'offer' ? latestMessageDataObj : latestMessageDataString;
        newRoom.contentType = message.message.contentType;

        return newRoom;
      })
    );
  };

  // ** useChat **
  const { isConnected, loading, setLoading } = useChat(socket.current, connect, {
    userId,
    currentRoom: roomIdRef,
    roomSyncCallback: (roomSync) => {
      switch (roomSync.status) {
        case 'success': {
          console.log('Sync success');
          break;
        }
        case 'error': {
          console.log(`Sync error: ${roomSync.err}`);
          break;
        }
        case 'in_progress': {
          console.log('Sync in progress');
          console.log(roomSync.progress);
          console.log(roomSync.data);
          const { time, latestMessage, category, ...rest } = roomSync.data;

          let latestMessageDataString = '';
          const latestMessageDataObj = {
            amount: 0,
            accepted: false,
            content: '',
          };

          if (latestMessage !== undefined) {
            if (latestMessage.contentType === 'offer') {
              latestMessageDataObj.amount = latestMessage.amount;
              latestMessageDataObj.accepted = latestMessage.offerAccepted;
              latestMessageDataObj.content = latestMessage.content;
            } else {
              latestMessageDataString = latestMessage.content;
            }
          }

          const contentType = latestMessage?.contentType ?? 'text';

          const roomsData = {
            ...rest,
            contentType,
            time: time ? new Date(time) : undefined,
            category: category === 'BUY' ? 'Buying' : 'Selling',
            latestMessage: contentType === 'offer' ? latestMessageDataObj : latestMessageDataString,
          } as ChatListProps;
          setRooms((curr) => [...curr, roomsData]);
          break;
        }
        default: {
          break;
        }
      }
    },
    messageCallback: (message) => {
      setMessages((curr) => [...curr, formatMessage(message)]);
      updateChatList(message);
    },
    messageUnreadCallback: (messageUnread) => {
      updateChatList(messageUnread);
    },
    messageSyncCallback: (messageSync) => {
      switch (messageSync.status) {
        case 'success': {
          console.log('Sync success');
          break;
        }
        case 'error': {
          console.log(`Sync error: ${messageSync.err}`);
          break;
        }
        case 'in_progress': {
          console.log('Sync in progress');
          setMessages((curr) => [...curr, formatMessage(messageSync.data)]);
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
      setConnect(true);
      return;
    }

    userIdRef.current = 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26';
    setConnect(true);
    setDomLoaded(true);
    // TODO, to change back to following
    // console.log('userId cannot be found, redirecting to signin page');
    // router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isConnected && loading === 'idle' && domLoaded && !roomSynced) {
      setRoomSynced(true);
      getRooms(socket.current, userId, (ack) => {
        if (ack.success) {
          console.log('getRooms', ack.data);
        } else {
          console.log('getRooms', ack.err);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, loading, domLoaded, roomSynced]);

  useEffect(() => {
    if (isConnected && loading === 'idle' && domLoaded && roomId !== '') {
      if (messageSynced !== roomId) {
        if (messageSynced === '') {
          joinRoom(socket.current, roomId, (ack) => {
            if (ack.success) {
              setMessageSynced(roomId);
              setMessages([]);
              getMessage(socket.current, roomId, (ack) => {
                if (ack.success) {
                  console.log('getMessage', ack.data);
                } else {
                  console.log('getMessage', ack.err);
                }
              });
            } else {
              console.log('joinRoom', ack.err);
            }
          });
        } else {
          setLoading('part');
          partRoom(socket.current, messageSynced, (ack) => {
            if (ack.success) {
              joinRoom(socket.current, roomId, (ack) => {
                setLoading('idle');
                if (ack.success) {
                  setMessageSynced(roomId);
                  setMessages([]);
                  getMessage(socket.current, roomId, (ack) => {
                    if (ack.success) {
                      console.log('getMessage', ack.data);
                    } else {
                      console.log('getMessage', ack.err);
                    }
                  });
                } else {
                  console.log('joinRoom', ack.err);
                }
              });
            } else {
              console.log('partRoom', ack.err);
            }
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, loading, domLoaded, roomId]);

  const chatPageSx: SxProps<Theme> = useMemo(() => {
    if (isLg) {
      return {
        height: 'calc(100vh - 64px)',
        minWidth: '900px',
        px: 'calc(50vw - 656px)',
      };
    }
    if (isMd) {
      return {
        height: 'calc(100vh - 64px)',
        minWidth: '900px',
        px: 'calc(50vw - 656px)',
      };
    }
    if (isSm) {
      return {
        height: 'calc(100vh - 56px)',
        minWidth: '0px',
        px: '0px',
      };
    }
    return {
      height: 'calc(100vh - 64px)',
      minWidth: '0px',
      px: '64px',
    };
  }, [isLg, isMd, isSm]);

  const onClickSend: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (inputText !== '') {
      console.log('onClickSend', inputText);
      sendMessage(
        socket.current,
        { message: inputText, roomId, time: new Date().toISOString() },
        (ack) => {
          if (ack.success) {
            console.log('sendMessage', ack.data);
            setMessages((curr) => [...curr, formatMessage(ack.data as Messages)]);
            updateChatList(ack.data as Messages);
            setInputText('');
          } else {
            console.log('sendMessage', ack.err);
          }
        }
      );
    }
  };

  return (
    <Box id="chat-page" display="flex" sx={chatPageSx}>
      {/* render if isMd and isLg */}
      {/* if isSm, display chat list if roomId is '' (room not selected) */}
      {(isMd || isLg || (isSm && roomId === '')) && (
        <Box
          sx={{
            width: isSm ? 1 / 1 : 1 / 3,
            overflow: 'hidden',
          }}
        >
          <ChatList
            chats={rooms}
            selectChat={roomId}
            setSelectChat={(roomId) => {
              setRoomId(roomId);
              roomIdRef.current = roomId;
            }}
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
              handleBack={() => setRoomId('')}
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
              loginId={userId}
              setAcceptOffer={setAcceptOffer}
              setDeleteOffer={setDeleteOffer}
              ChatText={
                <ChatTextBox
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  inputText={inputText}
                  setInputText={setInputText}
                  onClickSend={onClickSend}
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
