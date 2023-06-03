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

// Middleware
import bookmarkUser from '@/middlewares/bookmarks/bookmarkUser';

export type UserItemData = {
  data: User;
};

const useBookmarkUser = (userUuid: string) => {
  const [isBookmarked, setIsBookmarked] = useState(true);

  const handleBookmarkUser = async () => {
    if (isBookmarked) {
      await bookmarkUser(userUuid);
      setIsBookmarked(false);
    }
  };

  return {
    isBookmarked,
    handleBookmarkUser,
  };
};

const UserItem = ({ data }: UserItemData) => {
  const [isSm] = useResponsiveness(['sm']);
  const { isBookmarked, handleBookmarkUser } = useBookmarkUser(data.id);

  return (
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
            color={isBookmarked ? 'primary' : 'default'}
            onClick={handleBookmarkUser}
          >
            <BookmarkIcon />
          </IconButton>
        }
      />
      <Link style={{ textDecoration: 'none' }} href={`/profile/${data.id}`}>
        <CardContent>
          <Typography variant="body1" align="center" sx={{ fontWeight: 500 }}>
            Email: {data.email}
          </Typography>
          <Typography variant="body1" align="center" sx={{ fontWeight: 500 }}>
            Phone Number: {data.mobileNumber}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default UserItem;
