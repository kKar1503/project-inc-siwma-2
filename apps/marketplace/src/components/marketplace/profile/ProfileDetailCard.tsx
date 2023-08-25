// ** React Imports
import React, { useEffect, useMemo, useState } from 'react';

// ** Next Imports
import { useRouter } from 'next/router';

// ** MUI Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import S3Avatar from '@/components/S3Avatar';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Link from '@mui/material/Link';

// ** Types Imports
import type { User } from '@/utils/api/client/zod/users';

// ** Hooks Imports
import { useResponsiveness } from '@inc/ui';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import useUser from '@/services/users/useUser';
import useBookmarkUser from '@/services/bookmarks/useBookmarkUser';

export type ProfileDetailCardData = {
  data: User;
  visibleEditButton?: boolean;
};

/**
 * Left side of profile page showing the profile detail card containing the user profile
 * details.
 */
const ProfileDetailCard = ({ data, visibleEditButton }: ProfileDetailCardData) => {
  // ** States
  const [init, setInit] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // ** Hooks
  const user = useSession();
  const { spacing } = useTheme();
  const [isLg] = useResponsiveness(['lg']);
  const { t } = useTranslation();
  const router = useRouter();

  // ** Vars
  const loggedUserUuid = user.data?.user.id as string;
  const profileUserUuid = data?.id as string;
  const isOwnProfile = loggedUserUuid === profileUserUuid;
  const userId = router.query.id as string;

  // ** Queries
  const { data: currentUser } = useUser(loggedUserUuid);
  const {
    refetch: toggleBookmark,
    isFetching: bookmarkFetching,
    isFetched: bookmarkFetched,
    isError: bookmarkIsError,
    data: bookmarked,
  } = useBookmarkUser(profileUserUuid);

  // ** Effects
  useEffect(() => {
    if (!init && currentUser !== undefined) {
      setInit(true);

      const bookmarkedUsers = currentUser?.bookmarks?.users;
      setIsBookmarked(
        bookmarkedUsers !== undefined && bookmarkedUsers.indexOf(profileUserUuid) !== -1
      );
    }
  }, [currentUser]);

  useEffect(() => {
    if (!bookmarkFetched || bookmarkFetching) {
      return;
    }

    if (bookmarkIsError) {
      router.replace('/500');
      return;
    }

    if (bookmarked !== undefined) {
      setIsBookmarked(bookmarked);
      return;
    }

    // It should never reach here.
    // If it reaches here it means the data is undefined, which should not happen
    // for this component
    router.replace('/500');
  }, [bookmarkFetching, bookmarkFetched]);

  // ** Styles
  const styleProfileCard = useMemo(() => {
    if (isLg) {
      return {
        width: '25%',
        height: '100%',
        mb: spacing(0),
      };
    }
    return {
      width: '100%',
      height: '100%',
      mb: spacing(3),
    };
  }, [isLg]);

  return (
    <Card sx={styleProfileCard}>
      <CardHeader
        titleTypographyProps={{
          fontSize: 16,
        }}
        subheaderTypographyProps={{
          fontSize: 16,
        }}
        action={
          loggedUserUuid !== userId && (
            <IconButton
              aria-label="bookmark"
              onClick={() => {
                if (!bookmarkFetching) {
                  toggleBookmark();
                }
              }}
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
                <BookmarkBorderIcon
                  sx={({ palette }) => ({
                    color: palette.common.black,
                  })}
                  fontSize="large"
                />
              )}
            </IconButton>
          )
        }
        title={t('Profile Card')}
        subheader={t('View profile details here')}
      />
      <Divider variant="middle" sx={{ height: '1px' }} />

      <CardContent>
        <S3Avatar
          sx={({ spacing }) => ({
            mb: spacing(1),
            bgcolor: red[500],
            textAlign: 'center',
            alignItems: 'center',
          })}
          src={`${data?.profilePic}`}
        >
          {data?.name.charAt(0).toUpperCase()}
        </S3Avatar>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {data?.name}
        </Typography>
        <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
          {data?.company.name}
        </Typography>
        <Link
          sx={{
            wordWrap: 'break-word',
            textDecoration: 'none',
            color: 'black',
            '&:hover': {
              color: 'blue',
              cursor: 'pointer',
            },
          }}
          href={`mailto:${data?.email}`}
        >
          {data?.email}
        </Link>
      </CardContent>
      <Divider variant="middle" sx={({ palette }) => ({ color: palette.divider, height: '1px' })} />
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }}>{t('Bio')}:</Typography>
        <Typography>{data?.bio}</Typography>
      </CardContent>

      <Divider variant="middle" sx={({ palette }) => ({ color: palette.divider, height: '1px' })} />

      <CardActions
        sx={({ spacing }) => ({
          display: 'flex',
          flexDirection: 'column',
          mt: 'auto',
          mb: spacing(1),
        })}
      >
        <Box sx={{ width: '98%' }}>
          {visibleEditButton && isOwnProfile && (
            <Button
              component={Link}
              href={`/profile/${data?.id}/edit-profile`}
              variant="contained"
              type="submit"
              sx={({ spacing }) => ({
                width: '100%',
                mb: spacing(1),
                fontWeight: 'bold',
              })}
            >
              Edit profile
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProfileDetailCard;
