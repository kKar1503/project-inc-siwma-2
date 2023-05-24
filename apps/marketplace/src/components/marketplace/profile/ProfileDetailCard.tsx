import Link from 'next/link';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { StarsRating } from '@inc/ui';

export type ProfileDetailCardProps = {
  username: string;
  name: string;
  email: string;
  company: string;
  profilePic: string;
  mobileNumber: number;
  telegramUsername: string;
  bio: string;
  rating: number;
  reviews: number;
  ownerId: number;
};

export type ProfileDetailCardData = {
  data: ProfileDetailCardProps;
};

const ProfileDetailCard = ({
  data,
  isEditMode = false,
}: {
  data: ProfileDetailCardProps;
  isEditMode?: boolean;
}) => {
  // destructure data

  const {
    username,
    name,
    email,
    company,
    profilePic,
    mobileNumber,
    telegramUsername,
    bio,
    rating,
    reviews,
    ownerId,
  } = data;

  return (
    <Card sx={{ width: '25%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        titleTypographyProps={{
          fontSize: 16,
        }}
        subheaderTypographyProps={{
          fontSize: 16,
        }}
        title="Your Profile"
        subheader="View your profile details here"
      />
      <Divider variant="middle" sx={{ height: '1px' }} />
      <CardContent>
        <Avatar sx={({ spacing }) => ({ mb: spacing(1) })}>{profilePic}</Avatar>
        <Typography sx={{ fontWeight: 'bold' }}>{name}</Typography>
        <Typography variant="body2">{company}</Typography>
        <Typography>@{username}</Typography>
        <Typography>{email}</Typography>

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
            {rating.toFixed(1)}
          </Typography>
          <StarsRating rating={rating} />
          <Typography
            sx={({ spacing }) => ({
              ml: spacing(1),
            })}
          >
            ({reviews} {reviews === 1 ? ' Review' : ' Reviews'})
          </Typography>
        </Box>
      </CardContent>
      <Divider variant="middle" sx={({ palette }) => ({ color: palette.divider, height: '1px' })} />
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }}>Bio:</Typography>
        <Typography>{bio}</Typography>
      </CardContent>
      <Divider variant="middle" sx={({ palette }) => ({ color: palette.divider, height: '1px' })} />
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }}>Linked accounts:</Typography>
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
            {telegramUsername}
          </Typography>
        </Box>
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
            +65 {mobileNumber}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', flexDirection: 'column', mt: 'auto' }}>
        <Box sx={{ width: '98%' }}>
          {isEditMode && (
            <Button
              component={Link}
              href={`/profile/${ownerId}/edit-profile`}
              variant="contained"
              type="submit"
              sx={({ spacing }) => ({
                width: '100%',
                mb: spacing(2),
                mt: spacing(2),
                fontWeight: 'bold',
              })}
            >
              Edit profile
            </Button>
          )}

          <Button
            component={Link}
            href="/logout"
            variant="contained"
            type="submit"
            color="error"
            sx={({ spacing }) => ({
              width: '100%',
              mb: spacing(1),
              fontWeight: 'bold',
            })}
          >
            Logout
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
export default ProfileDetailCard;
