import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import Pusher from 'pusher-js';

// ** Types Imports **
import type { ChatListProps } from '@/components/rtc/ChatList';
import type { ChatData } from '@/components/rtc/ChatBox';
import type { Messages } from '@inc/types';
import { useResponsiveness } from '@inc/ui';

const ChatRoom = () => {
  const [chats, setChats] = useState<ChatData[]>([]);
  const [messageToSend, setMessageToSend] = useState('');
  const userIdRef = useRef('');
  const roomIdRef = useRef('');
  const userId = userIdRef.current;

  // ** MUI **
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  function formatMessage(message: Messages): ChatData {
    const { createdAt, message: messageContent, ...rest } = message;
    const formatted: ChatData = {
      ...rest,
      messageContent,
      createdAt: new Date(createdAt),
    };

    return formatted;
  }

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

  // Initialize Pusher
  useEffect(() => {
    const { key, cluster } = process.env;
    if (key === undefined || cluster === undefined) {
      return;
    }
    const pusher = new Pusher(key, {
      cluster,
    });

    const channel = pusher.subscribe('chat-messages'); // TODO: Update channel name

    // Handle incoming messages and update the chat accordingly
    channel.bind('new-message', (data: Messages) => {
      setChats((chats) => [...chats, formatMessage(data)]);
    });

    return () => {
      // Unsubscribe and disconnect from Pusher when component unmounts
      pusher.unsubscribe('chat-messages');
      pusher.disconnect();
    };
  }, []);

  // Function to send a new message through Pusher
  const sendMessage = () => {
    if (messageToSend.trim() === '') return;

    const newMessage = {
      message: messageToSend,
      sender: userId,
    };

    // Assuming you have an endpoint to create messages on the backend
    // Replace 'YOUR_BACKEND_ENDPOINT' with the correct URL for creating messages
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
        setMessageToSend('');
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
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
}

export default ChatRoom;
