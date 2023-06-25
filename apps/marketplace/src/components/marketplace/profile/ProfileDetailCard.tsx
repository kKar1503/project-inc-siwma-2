import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import S3Image from '@/components/S3Image';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
// import { StarsRating } from '@inc/ui';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';

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
};

const ProfileDetailCard = ({ data, isEditMode = false }: { data: any; isEditMode?: boolean }) => {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

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

  return (
    <Card sx={styleProfileCard}>
      <CardHeader
        titleTypographyProps={{
          fontSize: 16,
        }}
        subheaderTypographyProps={{
          fontSize: 16,
        }}
        title={t('Your Profile')}
        subheader={t('View your profile details here')}
      />
      <Divider variant="middle" sx={{ height: '1px' }} />

      <CardContent>
        <S3Image
          style={{ borderRadius: '100%' }}
          src={`${data?.profilePic}`}
          alt="Profile Picture"
          width={70}
          height={70}
        />
        <Typography sx={{ fontWeight: 'bold' }}>{data?.name}</Typography>
        <Typography>{data?.companyName}</Typography>
        <Typography
          sx={{
            wordWrap: 'break-word',
          }}
        >
          {data?.email}
        </Typography>

        <Box
          sx={({ spacing }) => ({
            mt: spacing(1),
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <Typography
            sx={({ spacing }) => ({
              mr: spacing(1),
            })}
          >
            {/* {rating.toFixed(1)} */}
          </Typography>
          {/* <StarsRating rating={rating} /> */}
          <Typography
            sx={({ spacing }) => ({
              ml: spacing(1),
            })}
          >
            {/* ({reviews} {reviews === 1 ? t('Review') : t('Reviews')}) */}
          </Typography>
        </Box>
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
                backgroundColor: palette.primary[500],
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
              +65 {data?.mobileNumber}
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
          {isEditMode && (
            <Button
              component={Link}
              href={`/profile/${data?.id}/edit-profile`}
              variant="contained"
              type="submit"
              sx={({ spacing }) => ({
                width: '100%',
                mb: spacing(2),
                mt: spacing(2),
                fontWeight: 'bold',
              })}
            >
              {t('Edit profile')}
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProfileDetailCard;
