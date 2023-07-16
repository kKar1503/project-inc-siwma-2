import { useTranslation } from 'react-i18next';
import Link from 'next/link';
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
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useResponsiveness } from '@inc/ui';
import { useTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import fetchUser from '@/middlewares/fetchUser';
import useBookmarkUser from '@/middlewares/bookmarks/bookmarkUser';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export type ProfileDetailCardProps =
  | {
      email: string;
      id: string;
      name: string;
      enabled: boolean;
      createdAt: string;
      profilePic: string | null;
      companyName: string;
      mobileNumber: string;
      whatsappNumber: string | null;
      telegramUsername: string | null;
      contactMethod: 'email' | 'whatsapp' | 'telegram' | 'facebook' | 'phone';
      bio: string | null;
      comments?: string | null | undefined;
    }
  | null
  | undefined;

export type ProfileDetailCardData = {
  data: ProfileDetailCardProps;
  visibleEditButton?: boolean;
};

const useGetUserQuery = (userUuid: string) => {
  const { data } = useQuery('user', async () => fetchUser(userUuid), {
    enabled: userUuid !== undefined,
  });

  return data;
};

const useBookmarkUserQuery = (userUuid: string, bookmarkedUsers: string[] | undefined) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const { refetch } = useBookmarkUser(userUuid);

  const handleBookmarkUser = async () => {
    refetch();
    setIsBookmarked((prevState) => !prevState);
  };

  useEffect(() => {
    if (bookmarkedUsers) {
      const bookmarked = bookmarkedUsers.includes(userUuid);
      setIsBookmarked(bookmarked);
    }
  }, [bookmarkedUsers, userUuid]);

  return {
    isBookmarked,
    handleBookmarkUser,
  };
};

const ProfileDetailCard = ({ data, visibleEditButton }: ProfileDetailCardData) => {
  const user = useSession();
  const { spacing } = useTheme();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { t } = useTranslation();

  const styleProfileCard = useMemo(() => {
    if (isSm || isMd) {
      return {
        width: '100%',
        height: '100%',
        mb: spacing(3),
      };
    }
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
  }, [isSm, isMd, isLg]);

  const loggedUserUuid = user.data?.user.id as string;
  const currentUser = useGetUserQuery(loggedUserUuid);
  const profileUserUuid = data?.id as string;
  const bookmarkedUsers = currentUser?.bookmarks?.users;
  const isOwnProfile = loggedUserUuid === profileUserUuid;

  const router = useRouter();
  const userId = router.query.id as string;

  const { isBookmarked, handleBookmarkUser } = useBookmarkUserQuery(
    profileUserUuid,
    bookmarkedUsers
  );

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
          sx={({ spacing }) => ({ mb: spacing(1), bgcolor: red[500] })}
          src={`${data?.profilePic}`}
        >
          {data?.name.charAt(0)}
        </S3Avatar>
        <Typography sx={{ fontWeight: 'bold' }}>{data?.name}</Typography>
        <Typography variant="body2" sx={{ wordWrap: 'break-word' }}>
          {data?.companyName}
        </Typography>
        <Typography sx={{ wordWrap: 'break-word' }}>{data?.email}</Typography>
      </CardContent>
      <Divider variant="middle" sx={({ palette }) => ({ color: palette.divider, height: '1px' })} />
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }}>{t('Bio')}:</Typography>
        <Typography>{data?.bio}</Typography>
      </CardContent>

      <Divider variant="middle" sx={({ palette }) => ({ color: palette.divider, height: '1px' })} />
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }}>{t('Linked accounts')}:</Typography>
        {data?.contactMethod === 'telegram' && (
          <Box
            sx={({ spacing }) => ({
              mt: spacing(1),
              display: 'flex',
              alignItems: 'center',
            })}
          >
            <TelegramIcon
              sx={({ spacing, palette }) => ({
                borderRadius: spacing(2),
                pr: '2px',
                color: palette.common.white,
                backgroundColor: '#229ED9',
              })}
            />
            <Typography
              sx={({ spacing }) => ({
                ml: spacing(1),
              })}
            >
              {data?.telegramUsername}
            </Typography>
          </Box>
        )}
        {data?.contactMethod === 'whatsapp' && (
          <Box
            sx={({ spacing }) => ({
              mt: spacing(1),
              display: 'flex',
              alignItems: 'center',
            })}
          >
            <WhatsAppIcon
              sx={({ spacing, palette }) => ({
                borderRadius: spacing(2),
                p: '1px',
                color: palette.common.white,
                backgroundColor: palette.secondary.main,
              })}
            />
            <Typography
              sx={({ spacing }) => ({
                ml: spacing(1),
              })}
            >
              +65 {data?.whatsappNumber}
            </Typography>
          </Box>
        )}
      </CardContent>

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
