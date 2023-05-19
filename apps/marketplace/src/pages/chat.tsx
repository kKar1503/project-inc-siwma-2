import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChatHeader from '@/components/rtc/ChatHeader';
import ChatSubHeader from '@/components/rtc/ChatSubHeader';
import ChatBox, { ChatBoxProps } from '@/components/rtc/ChatBox';
import ChatTextBox from '@/components/rtc/ChatTextBox';

const ChatRoom = () => {
  const [makeOffer, setMakeOffer] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [onSend, setOnSend] = useState<boolean>(false);
  const messages: ChatBoxProps['roomData'] = [
    {
      id: '21',
      content: 'Hi, how are you?',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '22',
      content: 'Hi, I am interested in the item. Could we negotiate on the cost of the items?',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '23',
      content:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_EC6uxEAq3Q5aEvC5gcyZ1RdcAU74WY-GA&usqp=CAU',
      content_type: 'image',
      author: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    },
    {
      id: '24',
      content: 'Not much, just working on some projects. How about you?',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '25',
      content: 'Same here, just trying to stay busy.',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '24',
      content: 'Not much, just working on some projects. How about you?',
      content_type: 'text',
      author: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    },
    {
      id: '25',
      content: 'Same here, just trying to stay busy.',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '21',
      content: 'Hi, how are you?',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '21',
      content: 'Hi, how are you?',
      content_type: 'text',
      author: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    },
    {
      id: '21',
      content: 'Hi, how are you?',
      content_type: 'text',
      author: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    },
    {
      id: '21',
      content: 'Hi, how are you?',
      content_type: 'text',
      author: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    },
  ];

  return (
    <Box display="flex">
      <Box
        sx={({ shadows, palette }) => ({
          boxShadow: shadows[3],
          bgcolor: palette.grey[400],
          width: 1 / 3,
          height: 1000,
          justifyContent: 'flex-end',
        })}
      >
        <Typography>hi</Typography>
      </Box>
      <Box sx={{ width: 2 / 3 }}>
        <ChatHeader
          profilePic="/static/images/avatar/2.jpg"
          companyName="Hi Metals PTE LTD"
          available
        />
        <ChatSubHeader
          itemPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_EC6uxEAq3Q5aEvC5gcyZ1RdcAU74WY-GA&usqp=CAU"
          itemName="Hi Metals PTE LTD"
          available
          itemPrice={200.8}
          makeOffer={makeOffer}
          setMakeOffer={setMakeOffer}
        />
        <ChatBox roomData={messages} loginId="d44b8403-aa90-4d92-a4c6-d0a1e2fad0af" />
        <ChatTextBox
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          inputText={inputText}
          setInputText={setInputText}
          onSend={onSend}
          setOnSend={setOnSend}
        />
      </Box>
    </Box>
  );
};

export default ChatRoom;
