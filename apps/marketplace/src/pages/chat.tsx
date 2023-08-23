// ** React / Next Imports **
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

import Pusher from 'pusher-js';

// ** Components Imports **
import ChatHeader from '@/components/rtc/ChatHeader';
import ChatSubHeader from '@/components/rtc/ChatSubHeader';
import ChatBox from '@/components/rtc/ChatBox';
import ChatTextBox from '@/components/rtc/ChatTextBox';
import ChatList from '@/components/rtc/ChatList';
import placeholder from 'public/images/listing-placeholder.svg';

// ** MUI Imports **
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

// ** Types Imports **
import type { ChatListProps } from '@/components/rtc/ChatList';
import type { ChatData } from '@/components/rtc/ChatBox';
// import type { Messages } from '@inc/types';

// ** Hooks Imports **
import { useResponsiveness } from '@inc/ui';
import fetchChatList from '@/services/chat/fetchChatList';
import { useRouter } from 'next/router';
import sendMessage from '@/services/chat/sendMessage';
import fetchMesssages from '@/services/chat/fetchMessages';

type RoomData = ChatListProps & {
  itemId: number;
  itemPrice: number;
  itemPriceIsUnit: boolean;
  itemImage: string | null;
};

const ChatRoom = () => {
  // ** Hooks **
  const { data } = useSession();
  const router = useRouter();

  // ** Refs **
  const userIdRef = useRef<string>('');
  const roomIdRef = useRef('');
  const userId = userIdRef.current;

  // ** MUI **
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  // ** Pusher Related **
  let pusher: Pusher | null = null;
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [messages, setMessages] = useState<ChatData[]>([]);

  // ** States **
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    console.log('roomId changed', roomId);
    if (pusher === null) {
      const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY;
      const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

      if (!pusherKey || !pusherCluster) {
        console.log('pusher key or cluster not found');
        return;
      }
      
      pusher = new Pusher(pusherKey, {
        cluster: pusherCluster,
      });
    }

    if (roomId === '') {
      console.log('roomId is empty');
      // Unsubscribe from all channels
      pusher.unbind_all();
    }

    const channel = pusher.subscribe(roomId);

    channel.bind('message_sent', (data: { id: string; message: string; sender: string }) => {
      console.log('message received', data);
      const { id, message, sender } = data;
      const formatted: ChatData = {
        id,
        author: sender,
        read: false,
        createdAt: new Date(),
        content: message,
      };

      setMessages((prev) => [...prev, formatted]);
    });

    channel.bind('pusher:subscription_succeeded', () => {
      fetchMesssages(roomId).then((messages) => {
        setMessages(messages);
      });
    });

    channel.unbind('message');
  }, [roomId]);

  // ** useEffect **
  useEffect(() => {
    if (data === undefined || data === null) {
      console.log('no userId found');
      router.push('/login');
      return;
    }

    userIdRef.current = data.user.id;

    fetchChatList().then((chatList) => {
      const formattedRooms = chatList.map((chat) => {
        let latestMessage: string | null = null;

        if (chat.latestMessage && chat.latestMessage.content) {
          latestMessage = chat.latestMessage.content;
        }

        const formatted: RoomData = {
          id: chat.id,
          username: chat.buyer.name,
          category: 'All', // TODO: implement
          itemName: chat.listing.name,
          itemImage: null, // TODO: implement
          inProgress: true,
          time: new Date(chat.createdAt), // TODO: check if this is correct
          userImage: chat.buyer.profilePicture,
          unreadMessages: 0,
          latestMessage,
          contentType: null, // TODO: implement
          itemId: parseInt(chat.listing.id, 10),
          itemPrice: chat.listing.price,
          itemPriceIsUnit: chat.listing.unit === 'unit', // TODO: check if this is correct
        };

        return formatted;
      });

      setRooms(formattedRooms);
    });
  }, []);

  // ** Memos **
  const currentRoom = useMemo<RoomData | null>(() => {
    if (roomId === '') {
      return null;
    }

    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].id === roomId) {
        return rooms[i];
      }
    }

    return null;
  }, [roomId, rooms]);

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

  const onClickSend: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (inputText.trim().length > 0) {
      console.log('sending message', inputText);
      sendMessage(roomId, inputText);
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
              // TODO: Figure out what this is for
              // const element = e.currentTarget as HTMLInputElement;
              // const { value } = element;
              // console.log('ONCHANGE', value);
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
              profilePic={currentRoom.userImage ? currentRoom.userImage : placeholder.src}
              username={currentRoom.username}
              handleBack={() => setRoomId('')}
            />
            <ChatSubHeader
              itemPic={currentRoom.itemImage ? currentRoom.itemImage : placeholder.src}
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
      {/* <NoInternetConnection /> */}
    </Box>
  );
};

export default ChatRoom;
