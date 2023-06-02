import MUIAlert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import apiClient from '@/utils/api/client/apiClient';
import { useQuery } from 'react-query';
import users from '@/utils/api/client/zod/users';

export type ChatData = {
  id: string;
  type: string;
  read: boolean;
  content: string;
  author: string;
  sentAt: string;
};

export type Response = {
  chatData: ChatData;
  reply: boolean;
  setReply: (val: boolean) => void;
};

// endpoint query
const fetchUser = async (uuid: string) => {
  if (uuid) {
    const response = await apiClient.get(`/v1/users/${uuid}`);
    // parse data through zod to ensure data is correct
    const parsedUser = users.getById.parse(response.data.data[0]);
    return parsedUser;
  }

  return null;
};

const useGetUserQuery = (userUuid: string) => {
  const { data } = useQuery('userdata', async () => fetchUser(userUuid), {
    enabled: userUuid !== undefined,
  });
  return data;
};

const ChatAlert = ({ chatData, reply, setReply }: Response) => {
  const userDetail = useGetUserQuery(chatData.author);

  return (
    <MUIAlert
      variant="outlined"
      onClick={() => setReply(true)}
      severity="info"
      iconMapping={{
        info: (
          <Avatar sx={{ m: 'auto' }} alt="Profile Picture" src={userDetail?.profilePic || ''} />
        ),
      }}
      sx={({ palette }) => ({
        border: 0,
        // borderColor: 'primary.main',
        // padding: 0,
        margin: 0,
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

export default ChatAlert;
