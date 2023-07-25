import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Pusher, { Channel } from 'pusher-js';

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
import { useResponsiveness } from '@inc/ui';

export type UserNameProps = {
  userId: string;
};

const ChatRoom = ({ userId }: UserNameProps) => {
  const pusher = useMemo(() => {
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

    if (!key || !cluster) {
      console.log(key);
      console.log(cluster);
      throw new Error('Missing Pusher key or cluster');
    }

    return new Pusher(key, {
      cluster,
    });
  }, []);

  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannelId, setCurrentChannelId] = useState('');
  const [chats, setChats] = useState<ChatData[]>([]);
  const [messageToSend, setMessageToSend] = useState('');

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

  const subscribeToChannel = useCallback((channelId: string) => {
    // setCurrentChannelId(channelId);
    setCurrentChannelId('chat'); // TODO: remove this, uncomment above line

    const channel = pusher.subscribe(channelId);

    channel.bind('new-message', (data: Messages) => {
      setChats((prevChats) => [...prevChats, formatMessage(data)]);
    });
  }, [pusher]);

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

  useEffect(() => {
    console.log('chat page mounted');
    // Runs when the component is mounted

    const fetchChannels = async () => {
      try {
        // Fetch the channels from pusher
        const channelsData = pusher.allChannels();
        setChannels(channelsData);

        if (!currentChannelId && channelsData.length > 0) {
          // If no channel is selected, select the first one in the list
          setCurrentChannelId(channelsData[0].name);
        }

        console.log('subscribing to channel', currentChannelId);
        // Subscribe to the default channel when the component is mounted
        subscribeToChannel(currentChannelId);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    fetchChannels();
  }, [currentChannelId, pusher, subscribeToChannel]); // Only run this effect once when the component mounts

  // Function to send a new message through Pusher
  const sendMessage = () => {
    if (messageToSend.trim() === '') return;

    const newMessage = {
      message: messageToSend,
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
      {(isMd || isLg || (isSm && currentChannelId === '')) && (
        <Box
          sx={{
            width: isSm ? 1 / 1 : 1 / 3,
            overflow: 'hidden',
          }}
        >
          <ChatList
            chats={channels}
            setSelectChat={(channelId) => {
              subscribeToChannel(channelId);
            }}
          />
        </Box>
      )}
      {currentChannelId !== '' && (
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
              profilePic="/images/placeholder.png"
              username="PLACEHOLDER"
              handleBack={() => setCurrentChannelId('')}
            />
            <ChatSubHeader
              itemPic={null}
              itemName="PLACEHOLDER"
              available
              itemPrice={0}
              itemPriceIsUnit
            />
            <ChatBox
              roomData={chats}
              loginId={userId}
              ChatText={
                <br />
                // TODO: fix this
                // <ChatTextBox
                //   selectedFile={selectedFile}
                //   setSelectedFile={setSelectedFile}
                //   inputText={inputText}
                //   setInputText={setInputText}
                //   onClickSend={onClickSend}
                // />
              }
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatRoom;
