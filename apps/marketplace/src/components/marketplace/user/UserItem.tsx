import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
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
  updateBookmarkData: () => void;
};

const useBookmarkUser = (userUuid: string, updateBookmarkData: () => void) => {
  const [isBookmarked, setIsBookmarked] = useState(true);

  const handleBookmarkUser = async () => {
    if (isBookmarked && updateBookmarkData) {
      await bookmarkUser(userUuid);
      setIsBookmarked(false);
      updateBookmarkData();
    }
  };

  return {
    isBookmarked,
    handleBookmarkUser,
  };
};

const UserItem = ({ data, updateBookmarkData }: UserItemData) => {
  const [isSm] = useResponsiveness(['sm']);
  const { isBookmarked, handleBookmarkUser } = useBookmarkUser(data.id, updateBookmarkData);

  return (
    <Card sx={{ height: '100%' }}>
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
            onClick={handleBookmarkUser}
            sx={({ spacing }) => ({
              p: spacing(0),
            })}
          >
            {isBookmarked ? (
              <BookmarkIcon
                fontSize="large"
                sx={({ palette }) => ({
                  color: palette.warning[100],
                })}
              />
            ) : (
              <BookmarkBorderIcon fontSize="large" />
            )}
          </IconButton>
        }
      />
      <Link style={{ textDecoration: 'none' }} href={`/profile/${data.id}`}>
        <CardContent sx={{ pt: '0px' }}>
          <Typography
            align="center"
            sx={({ typography }) => ({
              fontSize: typography.body1,
              fontWeight: typography.fontWeightMedium,
            })}
          >
            {data.email}
          </Typography>
          <Typography
            align="center"
            sx={({ typography }) => ({
              fontSize: typography.body1,
              fontWeight: typography.fontWeightMedium,
            })}
          >
            {data.mobileNumber}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default UserItem;
