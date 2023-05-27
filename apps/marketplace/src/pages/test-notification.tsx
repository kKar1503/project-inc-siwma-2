import { useState } from 'react';
import Button from '@mui/material/Button';
import { Alert } from '@inc/ui';
import ChatAlert, { ChatData } from '@/components/marketplace/notification/ChatAlert';
import { useSnackbar } from 'notistack';

const response: ChatData = {
  id: '365',
  type: 'message',
  read: false,
  content:
    'Hello! What price point would you be comfortable with paying? If a good price is offered, we can deal.',
  author: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
  sentAt: '2023-01-12T06:11:49.43002+00:00',
};

const TestNotifi = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  // onClick handle for chat notification
  const handleSnackbarClick = () => {
    const message = (
      <ChatAlert
        reply={reply}
        setReply={setReply}
        chatData={response}
      />
    );
    enqueueSnackbar(message, { variant: 'default' });
  };

  return (
    <>
      <Button variant="contained" size="medium" sx={{ mx: 3, mb: 2 }} onClick={handleClick}>
        basic alert
      </Button>
      <Alert
        open={open}
        setOpen={setOpen}
        alertTitle="Warning Meaasge"
        alertContent="New listing has been successfully created."
        severity="warning"
      />
      <Button variant="contained" size="medium" sx={{ mx: 3, mb: 2 }} onClick={handleSnackbarClick}>
        Chat Alert
      </Button>
    </>
  );
};

export default TestNotifi;
