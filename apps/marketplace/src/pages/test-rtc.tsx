import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChatHeader from '@/components/rtc/ChatHeader';
import ChatSubHeader from '@/components/rtc/ChatSubHeader';

// import data into test and break down to subheader and header

const ChatRoom = () => {
  const [makeOffer, setMakeOffer] = React.useState<boolean>(false);

  return (
    <Box display="flex">
      <Box
        sx={({ spacing, shape, shadows, palette }) => ({
          mt: spacing(1),
          boxShadow: shadows[3],
          bgcolor: palette.grey[400],
          ...shape,
          width: 1 / 3,
          height: 1000,
          justifyContent: 'flex-end',
        })}
      >
        <Typography>hi</Typography>
      </Box>
      <Box
        sx={({ spacing, shape, shadows, palette }) => ({
          mt: spacing(1),
          boxShadow: shadows[3],
          bgcolor: palette.common.white,
          ...shape,
          width: 2 / 3,
          height: 1000,
          justifyContent: 'flex-end',
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
        })}
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
          itemPrice={200.80}
          makeOffer={makeOffer}
          setMakeOffer={setMakeOffer}
        />
      </Box>
    </Box>
  );
};

export default ChatRoom;
