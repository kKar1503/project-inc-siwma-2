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
import Button from '@mui/material/Button';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

// ** Types Imports **
import type { ChatListProps } from '@/components/rtc/ChatList';
import type { ChatData } from '@/components/rtc/ChatBox';
import type { Messages } from '@inc/types';

// ** Hooks Imports **
import { useResponsiveness } from '@inc/ui';
import fetchChatList from '@/services/fetchChatList';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

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
  itemImage: string | null;
};

const ChatRoom = () => {
  // useEffect(() => {
  //     const pusher = new Pusher('APP_KEY', {
  //       cluster: 'APP_CLUSTER',
  //       encrypted: true
  //     });
  //     const channel = pusher.subscribe('chat');
  //     channel.bind('message', data => {
  //       this.setState({ chats: [...this.state.chats, data], test: '' });
  //     });
  //     this.handleTextChange = this.handleTextChange.bind(this);
  //   }

  //   handleTextChange(e) {
  //     if (e.keyCode === 13) {
  //       const payload = {
  //         username: this.state.username,
  //         message: this.state.text
  //       };
  //       axios.post('http://localhost:5000/message', payload);
  //     } else {
  //       this.setState({ text: e.target.value });
  //     }
  //   }, []);

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
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [messages, setMessages] = useState<ChatData[]>([]);

  // ** States **
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState('');

  // ** Update Chat List **
  // const updateChatList = (message: Messages) => {
  //   setRooms((prev) =>
  //     prev.map((room) => {
  //       console.log('iterating rooms', room);
  //       if (room.id !== message.room) {
  //         return room;
  //       }
  //       const newRoom = { ...room };

  //       newRoom.time = new Date(message.createdAt);
  //       newRoom.latestMessage = ''; // TODO
  //       newRoom.contentType = message.message.contentType;

  //       return newRoom;
  //     })
  //   );
  // };

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

    if (inputText !== '') {
      const newMessage = {
        message: inputText,
      };

      fetch(`/chat/messages/${roomId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      })
        .then((response) => response.json())
        .then((data) => {
          // Message sent successfully, no need to handle anything here as
          // the new message will be received through Pusher and updated in the chat.
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
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
    </Box>
  );
};

export default ChatRoom;
