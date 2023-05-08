import { useState } from 'react';
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
import Rating from '@mui/material/Rating';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import StarIcon from '@mui/icons-material/Star';

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
};

const ProfileDetailCard = ({
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
}: ProfileDetailCardProps) => (
  <Card sx={{ width: '25%', display: 'inline-grid' }}>
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
    <Divider variant="middle" />
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
          {rating}
        </Typography>
        <Rating
          readOnly
          defaultValue={rating}
          size="medium"
          sx={{ color: '#00C853' }}
          emptyIcon={<StarIcon fontSize="inherit" />}
          precision={0.5}
        />
        <Typography
          sx={({ spacing }) => ({
            ml: spacing(1),
          })}
        >
          ({reviews} Reviews)
        </Typography>
      </Box>
    </CardContent>
    <Divider variant="middle" sx={({ palette }) => ({ color: palette.divider })} />
    <CardContent>
      <Typography sx={{ fontWeight: 'bold' }}>Bio:</Typography>
      <Typography>{bio}</Typography>
    </CardContent>
    <Divider variant="middle" sx={({ palette }) => ({ color: palette.divider })} />
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
            padding: '1%',
            color: palette.common.white,
            backgroundColor: '#0088cc',
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
            padding: '1%',
            color: palette.common.white,
            backgroundColor: '#25D366',
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
    <CardActions sx={{ flexDirection: 'column' }}>
      <Box sx={{ width: '98%' }}>
        <Button
          component={Link}
          href="/editprofile"
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
export default ProfileDetailCard;
