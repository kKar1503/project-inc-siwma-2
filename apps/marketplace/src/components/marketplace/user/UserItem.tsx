import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { User } from '@/utils/api/client/zod/users';
import { red } from '@mui/material/colors';

export type UserItemData = {
  data: User;
};

const UserItem = ({ data }: UserItemData) => {
  const [isSm] = useResponsiveness(['sm']);

  return (
    <Link style={{ textDecoration: 'none' }} href={`/profile/${data.id}`}>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} src={data.profilePic || '/images/Placeholder.png'}>
              {data.name.charAt(0)}
            </Avatar>
          }
          title={data.name}
          titleTypographyProps={{
            fontSize: isSm ? 14 : 16,
            fontWeight: 'bold',
          }}
          subheader={data.bio}
          subheaderTypographyProps={{
            fontSize: isSm ? 12 : 14,
          }}
        />
        <CardContent>
          <Typography variant="body1" align="center" sx={{ fontWeight: 500 }}>
            Email: {data.email}
          </Typography>
          <Typography variant="body1" align="center" sx={{ fontWeight: 500 }}>
            Phone Number: {data.mobileNumber}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default UserItem;
