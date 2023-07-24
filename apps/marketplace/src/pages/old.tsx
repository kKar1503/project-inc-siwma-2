// ** React / Next Imports **
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

// ** Components Imports **
import ChatHeader from '@/components/rtc/ChatHeader';
import ChatSubHeader from '@/components/rtc/ChatSubHeader';
import ChatBox from '@/components/rtc/ChatBox';
import ChatTextBox from '@/components/rtc/ChatTextBox';
import ChatList from '@/components/rtc/ChatList';

// ** MUI Imports **
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

// ** Types Imports **
import type { ChatListProps } from '@/components/rtc/ChatList';
import type { ChatData } from '@/components/rtc/ChatBox';
import type { Messages } from '@inc/types';

// ** Hooks Imports **
import { useResponsiveness } from '@inc/ui';
import { useRouter } from 'next/router';

// ** Pusher Imports **
import Pusher from 'pusher-js';

function formatMessage(message: Messages): ChatData {
  const { createdAt, message: messageContent, ...rest } = message;
  const formatted: ChatData = {
    ...rest,
    messageContent,
    createdAt: new Date(createdAt),
  };

  return formatted;
}

type RoomData = ChatListProps & {
  itemId: number;
  itemPrice: number;
  itemPriceIsUnit: boolean;
  itemImage: string;
};

const ChatRoom = () => {
  const [chats, setChats] = useState([]);
  const [messageToSend, setMessageToSend] = useState('');

  // ** Hooks **
  const { data } = useSession();
  const router = useRouter();

  // ** Refs **
  const userIdRef = useRef<string>('');
  const roomIdRef = useRef('');
  const userId = userIdRef.current;

  // ** MUI **
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  // // ** Socket Related **z
  // const [connect, setConnect] = useState(false);
  // const [roomId, setRoomId] = useState('');
  // const [rooms, setRooms] = useState<RoomData[]>([]);
  // const [messages, setMessages] = useState<ChatData[]>([]);

  // ** States **
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState('');
  const [domLoaded, setDomLoaded] = useState(false);
  const [roomSynced, setRoomSynced] = useState(false);
  const [messageSynced, setMessageSynced] = useState('');
  const [queryChecked, setQueryChecked] = useState(false);

  useEffect(() => {
    const { key, cluster } = process.env;
    if (key === undefined || cluster === undefined) {
      return;
    }
    const pusher = new Pusher(key, {
      cluster,
    });

    const channel = pusher.subscribe('chat'); // TODO: change to correct channel name

    channel.bind('chat-event', (data: { sender: string; message: string }) => {
      setChats((prevState) => [...prevState, { sender: data.sender, message: data.message }]);
    });

    return () => {
      pusher.unsubscribe('chat'); // TODO: change to correct channel name
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // react-query
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: messageToSend, sender: data.user.id }),
    });
  };

  // ** Update Chat List **
  // const updateChatList = (message: Messages) => {
  //   setRooms((prev) =>
  //     prev.map((room) => {
  //       console.log('iterating rooms', room);
  //       if (room.id !== message.room) {
  //         return room;
  //       }
  //       const newRoom = { ...room };

  //       let latestMessageDataString = '';
  //       const latestMessageDataObj = {
  //         amount: 0,
  //         accepted: false,
  //         content: '',
  //       };

  //       if (message.message.contentType === 'offer') {
  //         latestMessageDataObj.amount = message.message.amount;
  //         latestMessageDataObj.accepted = message.message.offerAccepted;
  //         latestMessageDataObj.content = message.message.content;
  //       } else {
  //         latestMessageDataString = message.message.content;
  //       }

  //       newRoom.time = new Date(message.createdAt);
  //       newRoom.latestMessage =
  //         message.message.contentType === 'offer' ? latestMessageDataObj : latestMessageDataString;
  //       newRoom.contentType = message.message.contentType;

  //       return newRoom;
  //     })
  //   );
  // };

  // ** useChat **
  // const { isConnected, loading, setLoading } = useChat(socket.current, connect, {
  //   userId,
  //   currentRoom: roomIdRef,
  //   roomSyncCallback: (roomSync) => {
  //     switch (roomSync.status) {
  //       case 'success': {
  //         console.log('Sync success');
  //         break;
  //       }
  //       case 'error': {
  //         console.log(`Sync error: ${roomSync.err}`);
  //         break;
  //       }
  //       case 'in_progress': {
  //         console.log('Sync in progress');
  //         console.log(roomSync.progress);
  //         console.log(roomSync.data);
  //         const { time, latestMessage, category, ...rest } = roomSync.data;

  //         let latestMessageDataString = '';
  //         const latestMessageDataObj = {
  //           amount: 0,
  //           accepted: false,
  //           content: '',
  //         };

  //         if (latestMessage !== undefined) {
  //           if (latestMessage.contentType === 'offer') {
  //             latestMessageDataObj.amount = latestMessage.amount;
  //             latestMessageDataObj.accepted = latestMessage.offerAccepted;
  //             latestMessageDataObj.content = latestMessage.content;
  //           } else {
  //             latestMessageDataString = latestMessage.content;
  //           }
  //         }

  //         const contentType = latestMessage?.contentType ?? 'text';

  //         const roomsData = {
  //           ...rest,
  //           contentType,
  //           time: time ? new Date(time) : undefined,
  //           category: category === 'BUY' ? 'Buying' : 'Selling',
  //           latestMessage: contentType === 'offer' ? latestMessageDataObj : latestMessageDataString,
  //         } as RoomData;
  //         setRooms((curr) => [...curr, roomsData]);
  //         break;
  //       }
  //       default: {
  //         break;
  //       }
  //     }
  //   },
  //   messageCallback: (message) => {
  //     setMessages((curr) => [...curr, formatMessage(message)]);
  //     updateChatList(message);
  //   },
  //   messageUnreadCallback: (messageUnread) => {
  //     updateChatList(messageUnread);
  //   },
  //   messageSyncCallback: (messageSync) => {
  //     switch (messageSync.status) {
  //       case 'success': {
  //         console.log('Sync success');
  //         break;
  //       }
  //       case 'error': {
  //         console.log(`Sync error: ${messageSync.err}`);
  //         break;
  //       }
  //       case 'in_progress': {
  //         console.log('Sync in progress');
  //         setMessages((curr) => [...curr, formatMessage(messageSync.data)]);
  //         break;
  //       }
  //       default: {
  //         break;
  //       }
  //     }
  //   },
  //   offerCallback: (messageId, offerState) => {
  //     switch (offerState) {
  //       case 'accept': {
  //         updateOffer(messageId, '(Accepted)', true);
  //         break;
  //       }
  //       case 'reject': {
  //         updateOffer(messageId, '(Rejected)', false);
  //         break;
  //       }
  //       default: {
  //         break;
  //       }
  //     }
  //   },
  // });

  // ** Memos **
  // const currentRoom = useMemo<RoomData | null>(() => {
  //   if (roomId === '') {
  //     return null;
  //   }

  //   for (let i = 0; i < rooms.length; i++) {
  //     if (rooms[i].id === roomId) {
  //       return rooms[i];
  //     }
  //   }

  //   return null;
  // }, [roomId, rooms]);

  const chatPageSx: SxProps<Theme> = useMemo(() => {
    if (isLg) {
      return {
        height: 'calc(100vh - 113px)',
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
        height: 'calc(100vh - 64px)',
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
      {roomId !== '' && currentRoom !== null && (
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
              profilePic={currentRoom.userImage}
              username={currentRoom.username}
              handleBack={() => setRoomId('')}
            />
            <ChatSubHeader
              itemPic={currentRoom.itemImage}
              itemName={currentRoom.itemName}
              available={currentRoom.inProgress}
              itemPrice={currentRoom.itemPrice}
              itemPriceIsUnit={currentRoom.itemPriceIsUnit}
            />
            <ChatBox
              roomData={messages}
              loginId={userId}
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

