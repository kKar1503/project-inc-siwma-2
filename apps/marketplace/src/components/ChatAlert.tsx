import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MUIAlert, { AlertProps } from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { GetServerSideProps } from 'next';
import axios, { AxiosError } from 'axios';
import { apiBaseUrl } from 'next-auth/client/_utils';

const api = axios.create({
  baseURL: 'http://marketplace.karlok.dev/api/v1/',
  headers: { 'Content-Type': 'application/json' },
});

// const baseURL = 'http://marketplace.karlok.dev/api/v1';

export type ChatData = {
  id: string;
  type: string;
  read: boolean;
  content: string;
  author: string;
  sentAt: string;
};

export type UserData = {
  id: string;
  name: string;
  email: string;
  company: string;
  createdAt: string;
  enabled: boolean;
  profilePic: string;
  comments: string;
  mobileNumber: string;
  contactMethod: string;
  bio: string;
};

export type Response = {
  chatData: ChatData;
  reply: boolean;
  setReply: (val: boolean) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const userData: UserData = {
  id: '1',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  company: '1',
  createdAt: '2022-08-17T00:29:56.437Z',
  enabled: true,
  profilePic: '',
  comments: 'company intern',
  mobileNumber: '91234567',
  contactMethod: 'telegram',
  bio: 'Hello, I am John Doe!',
};

// endpoint query 
const fetchUser = async (uuid: string) => {
  const res = await api.get<UserData>(`/users/${uuid}`);
  return {
    data: res.data,
  };
};

const ChatAlert = ({ chatData, reply, setReply, open, setOpen }: Response) => {
    // will change the unkown
  const [userDetail, setUserDetail] = useState<unknown>();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchUser(chatData.author)
      .then((data) => setUserDetail(data))
      .catch((e: Error | AxiosError) => console.log(e));
    // console.log(fetchUser)
  }, []);

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' } as SnackbarOrigin}
    >
      <MUIAlert
        onClick={() => setReply(true)}
        onClose={handleClose}
        severity="info"
        variant="outlined"
        action={action}
        iconMapping={{
          info: (
            <Avatar
              alt="Profile Picture"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
            />
          ),
        }}
        sx={({ palette }) => ({
          width: '400px',
          bgcolor: palette.common.white,
        })}
      >
        <Typography>
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h6,
            })}
          >
            {chatData.author}
          </Typography>
        </Typography>
        <Typography
          noWrap
          sx={({ typography }) => ({
            fontSize: typography.body1,
          })}
        >
          {chatData.content}
        </Typography>
      </MUIAlert>
    </Snackbar>
  );
};

export default ChatAlert;
