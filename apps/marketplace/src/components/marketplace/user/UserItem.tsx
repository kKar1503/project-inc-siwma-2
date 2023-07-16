// ** React Imports
import React, { useEffect, useState } from 'react';

// ** NextJS Imports
import Link from 'next/link';

// ** MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

// ** Hooks Imports
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';

// ** Type Imports
import type { User } from '@/utils/api/client/zod/users';

// ** Middleware Imports
import useBookmarkUser from '@/middlewares/bookmarks/bookmarkUser';

export type UserItemData = {
  user: User;
  updateBookmarkData: () => void;
};

const UserItem = ({ user, updateBookmarkData }: UserItemData) => {
  console.log(user);
  const [isSm] = useResponsiveness(['sm']);
  const { isFetched, data, refetch, isError, error } = useBookmarkUser(user.id);

  useEffect(() => {
    console.dir({ isFetched, data }, { depth: null });
  });

  useEffect(() => {
    if (!isFetched) {
      return;
    }

    if (isError) {
      alert(`Error: ${error}`);
    } else if (data === undefined) {
      alert(`Endpoint returned undefined`);
    } else if (!data) {
      alert(`Unbookmarked`);
      updateBookmarkData();
    } else {
      alert(`Bookmarked`);
      updateBookmarkData();
    }
  }, [isFetched]);

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} src={user.profilePic || '/images/placeholder.png'}>
            {user.name.charAt(0)}
          </Avatar>
        }
        title={user.name}
        titleTypographyProps={{
          sx: ({ typography }) => ({
            fontSize: isSm ? typography.body1 : typography.body2,
            fontWeight: typography.fontWeightBold,
          }),
        }}
        action={
          <IconButton
            aria-label="bookmark"
            onClick={() => refetch()}
            sx={({ spacing }) => ({
              p: spacing(0),
            })}
          >
            <BookmarkIcon
              fontSize="large"
              sx={({ palette }) => ({
                color: palette.warning[100],
              })}
            />
          </IconButton>
        }
      />
      <Link style={{ textDecoration: 'none' }} href={`/profile/${user.id}`}>
        <CardContent
          sx={({ spacing }) => ({
            pt: spacing(0),
          })}
        >
          <Typography
            align="center"
            sx={({ typography }) => ({
              fontSize: typography.body1,
              fontWeight: typography.fontWeightMedium,
            })}
          >
            {user.email}
          </Typography>
          <Typography
            align="center"
            sx={({ typography }) => ({
              fontSize: typography.body1,
              fontWeight: typography.fontWeightMedium,
            })}
          >
            {user.mobileNumber}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default UserItem;
