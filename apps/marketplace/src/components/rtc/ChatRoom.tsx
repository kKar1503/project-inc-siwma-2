import React from 'react';
import Box from '@mui/material/Box';
import ChatHeader, { ChatHeaderProps } from '@/components/rtc/ChatHeader';
import ChatSubHeader, { ChatSubHeaderProps } from '@/components/rtc/ChatSubHeader';
import ChatBox, { ChatBoxProps } from '@/components/rtc/ChatBox';
import ChatTextBox, { ChatTextBoxProps } from './ChatTextBox';

type ChatRoomProps = ChatSubHeaderProps & ChatHeaderProps & ChatBoxProps & ChatTextBoxProps;

const ChatRoom = ({
  roomData,
  profilePic,
  itemName,
  itemPrice,
  progressStatus,
  makeOffer,
  setMakeOffer,
  itemPic,
  companyName,
  selectedFile,
  setSelectedFile,
  inputText,
  setInputText,
  onSend,
  setOnSend,
}: ChatRoomProps) => (
  <Box sx={{ width: 2 / 3 }}>
    <ChatHeader profilePic={profilePic} companyName={companyName} progressStatus={progressStatus} />
    <ChatSubHeader
      itemPic={itemPic}
      itemName={itemName}
      progressStatus={progressStatus}
      itemPrice={itemPrice}
      makeOffer={makeOffer}
      setMakeOffer={setMakeOffer}
    />
    <ChatBox roomData={roomData} />
    <ChatTextBox
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
      inputText={inputText}
      setInputText={setInputText}
      onSend={onSend}
      setOnSend={setOnSend}
    />
  </Box>
);

export default ChatRoom;
