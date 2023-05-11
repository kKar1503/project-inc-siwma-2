import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChatHeader from '@/components/rtc/ChatHeader';
import ChatSubHeader from '@/components/rtc/ChatSubHeader';
import ChatBox from '@/components/rtc/ChatBox';
import InputBase from '@mui/material/InputBase';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

// import data into test and break down to subheader and header

const ChatRoom = () => {
  const [makeOffer, setMakeOffer] = React.useState<boolean>(false);
  const messages = [
    { id: '21', content: 'Hi, how are you?', content_type: 'message', isMine: false },
    {
      id: '22',
      content: 'Hi, I am interested in the item. Could we negotiate on the cost of the items?',
      content_type: 'message',
      isMine: true,
    },
    {
      id: '23',
      content:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_EC6uxEAq3Q5aEvC5gcyZ1RdcAU74WY-GA&usqp=CAU',
      content_type: 'image',
      isMine: false,
    },
    {
      id: '24',
      content: 'Not much, just working on some projects. How about you?',
      content_type: 'message',
      isMine: true,
    },
    {
      id: '25',
      content: 'Same here, just trying to stay busy.',
      content_type: 'message',
      isMine: false,
    },
    {
      id: '24',
      content: 'Not much, just working on some projects. How about you?',
      content_type: 'message',
      isMine: true,
    },
    {
      id: '25',
      content: 'Same here, just trying to stay busy.',
      content_type: 'message',
      isMine: false,
    },
    { id: '21', content: 'Hi, how are you?', content_type: 'message', isMine: false },
    { id: '21', content: 'Hi, how are you?', content_type: 'message', isMine: false },
    { id: '21', content: 'Hi, how are you?', content_type: 'message', isMine: false },
    { id: '21', content: 'Hi, how are you?', content_type: 'message', isMine: false },
  ];

  return (
    <Box display="flex">
      <Box
        sx={({ spacing, shape, shadows, palette }) => ({
          boxShadow: shadows[3],
          bgcolor: palette.grey[400],
          // ...shape,
          width: 1 / 3,
          height: 1000,
          justifyContent: 'flex-end',
        })}
      >
        <Typography>hi</Typography>
      </Box>
      <Box
        sx={{width: 2 / 3}}
      >
        <ChatHeader
          profilePic="/static/images/avatar/2.jpg"
          companyName="Hi Metals PTE LTD"
          progressStatus="In Progress"
        />
        <ChatSubHeader
          profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_EC6uxEAq3Q5aEvC5gcyZ1RdcAU74WY-GA&usqp=CAU"
          itemName="Hi Metals PTE LTD"
          progressStatus="In Progress"
          itemPrice={200.8}
          makeOffer={makeOffer}
          setMakeOffer={setMakeOffer}
        />
        <ChatBox roomData={messages} />
        <Box
          sx={({ spacing, palette }) => ({
            display: 'flex',
            alignItems: 'center',
            height: 80,
            bgcolor: palette.grey[300],
            borderRadius: '0 0 20px 20px',
            px: spacing(2),
          })}
        >
          <AttachFileIcon sx={{ fontSize: 45 }} />
          <InputBase
            placeholder="Type your message here"
            fullWidth
            sx={{ fontSize: 'h6' }}
          />
          <SendIcon sx={{ fontSize: 45 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatRoom;
