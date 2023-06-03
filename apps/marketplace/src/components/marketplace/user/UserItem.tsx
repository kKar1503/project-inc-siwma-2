import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { User } from '@/utils/api/client/zod/users';
import { red } from '@mui/material/colors';
import bookmarkUser from '@/middlewares/bookmarks/bookmarkUser';
import { useQuery } from 'react-query';

export type UserItemData = {
  data: User;
};

const UserItem = ({ data }: UserItemData) => {
  const [isSm] = useResponsiveness(['sm']);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
          action={
            <IconButton
              aria-label="bookmark"
              disabled={isBookmarked}
              color={isBookmarked ? 'primary' : 'default'}
            >
              <BookmarkIcon />
            </IconButton>
          }
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
