// ** React / Next Imports **
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

// ** Components Imports **
import ChatHeader from '@/components/rtc/ChatHeader';
import ChatSubHeader from '@/components/rtc/ChatSubHeader';
import ChatBox from '@/components/rtc/ChatBox';
import ChatTextBox from '@/components/rtc/ChatTextBox';
import ChatList from '@/components/rtc/ChatList';

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
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [messages, setMessages] = useState<ChatData[]>([]);

  // ** States **
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState('');
  const [domLoaded, setDomLoaded] = useState(false);
  const [roomSynced, setRoomSynced] = useState(false);
  const [messageSynced, setMessageSynced] = useState('');
  const [queryChecked, setQueryChecked] = useState(false);

  // ** Update Chat List **
  const updateChatList = (message: Messages) => {
    setRooms((prev) =>
      prev.map((room) => {
        console.log('iterating rooms', room);
        if (room.id !== message.room) {
          return room;
        }
        const newRoom = { ...room };

        newRoom.time = new Date(message.createdAt);
        newRoom.latestMessage = message.message.content;
        newRoom.contentType = message.message.contentType;

        return newRoom;
      })
    );
  };

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
        sender: userId,
      };

      fetch('/chat/messages', {
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
