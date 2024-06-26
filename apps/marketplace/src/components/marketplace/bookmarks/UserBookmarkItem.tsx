// ** React Imports
import React, { useEffect } from 'react';

// ** NextJS Imports
import Link from 'next/link';
import { useRouter } from 'next/router';

// ** MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

// ** Hooks Imports
import { useResponsiveness } from '@inc/ui';

// ** Type Imports
import type { User } from '@/utils/api/client/zod/users';

// ** Middleware Imports
import useBookmarkUser from '@/services/bookmarks/useBookmarkUser';

export type UserBookmarkItemProps = {
  user: User;
  /** Callback function to alert a change in user bookmarks */
  updateBookmarkData: () => void;
};

/**
 * UserBookmarkItem is a component that is displayed on the users tab of /bookmarks page.
 * This component mainly exists for user to either navigate to the user profile or
 * unbookmark users.
 */
const UserBookmarkItem = ({ user, updateBookmarkData }: UserBookmarkItemProps) => {
  // ** Hooks
  const [isSm] = useResponsiveness(['sm']);
  const { refetch, isError, data, isFetched, isFetching, error } = useBookmarkUser(user.id);
  const router = useRouter();

  // ** Effects
  useEffect(() => {
    if (!isFetched || isFetching) {
      return;
    }

    if (isError) {
      router.replace('/500');
      return;
    }

    if (data === false) {
      updateBookmarkData();
      return;
    }

    // It should never reach here.
    // If it reaches here it means the data is undefined / true, which should not happen
    // for this component
    router.replace('/500');
  }, [isFetched]);

  return (
    <Link style={{ textDecoration: 'none' }} href={`/profile/${user.id}`}>
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
              onClick={(e) => {
                // This helps to prevent clicking on the profile
                e.preventDefault();
                e.stopPropagation();

                refetch();
              }}
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
      </Card>
    </Link>
  );
};

export default UserBookmarkItem;
