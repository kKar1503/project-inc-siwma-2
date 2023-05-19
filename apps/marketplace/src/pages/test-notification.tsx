import { useState } from 'react';
import Button from '@mui/material/Button';
import { Alert } from '@inc/ui';
import ChatAlert, { ChatData } from '@/components/ChatAlert';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

const response: ChatData = {
  id: '365',
  type: 'message',
  read: false,
  content:
    'Hello! What price point would you be comfortable with paying? If a good price is offered, we can deal.',
  author: '8fc4060d-5046-458f-b521-9e845b405cf1',
  sentAt: '2023-01-12T06:11:49.43002+00:00',
};

export const getServerSideProps: GetServerSideProps<{ data: ChatData }> = async () => {
  const data: ChatData = response;
  return {
    props: {
      data,
    },
  };
};

const TestNotifi = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);
  const user = useSession()
  console.log(user)

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };


  return (
    <>
      <Button variant="contained" size="medium" sx={{ mx: 3, mb: 2 }} onClick={handleClick}>
        Create Listing
      </Button>
      <Alert
        open={open}
        setOpen={setOpen}
        alertTitle="Inform"
        alertContent="helloooooooo"
        severity="info"
      />
      <Button variant="contained" size="medium" sx={{ mx: 3, mb: 2 }} onClick={handleClick}>
        Chat Alert
      </Button>
      <ChatAlert
        open={open}
        setOpen={setOpen}
        reply={reply}
        setReply={setReply}
        chatData={response}
      />
    </>
  );
};

export default TestNotifi;

