import { useEffect, useState } from 'react';
import MUIAlert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { AxiosError } from 'axios';
import  apiClient from '@/utils/api/client/apiClient';

export type ChatData = {
  id: string;
  type: string;
  read: boolean;
  content: string;
  author: string;
  sentAt: string;
};

export type UserData = {
  data: any;
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

// endpoint query
const fetchUser = async (uuid: string) => {
  const res = await apiClient.get<UserData>(`v1/users/${uuid}`);
  return {
    data: res.data,
  };
};
const ChatAlert = ({ chatData, reply, setReply, open, setOpen }: Response) => {
  const [userDetail, setUserDetail] = useState<UserData | undefined>();

  // call endpoint query
  useEffect(() => {
    fetchUser(chatData.author)
      .then((data) => setUserDetail(data.data.data[0]))
      .catch((e: Error | AxiosError) => console.log(e));
  }, []);


  return (
    <MUIAlert
      onClick={() => setReply(true)}
      severity="info"
      iconMapping={{
        info: <Avatar alt="Profile Picture" src={userDetail?.profilePic} />,
      }}
      sx={({ palette }) => ({
        width: '400px',
        bgcolor: palette.common.white,
      })}
    >
            <Typography
              sx={({ typography }) => ({
                fontSize: typography.h6,
              })}
            >
              {userDetail?.name}
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
  );
};

// Message Notification design

export default ChatAlert;
