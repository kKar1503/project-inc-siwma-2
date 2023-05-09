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
  <Card sx={{ width: '25%', height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardHeader
      titleTypographyProps={{
        fontSize: 18,
      }}
      subheaderTypographyProps={{
        fontSize: 13,
      }}
      title="Your Profile"
      subheader="View your profile details here"
    />
    <Divider variant="middle" sx={{ height: '1px' }} />
    <CardContent>
      <Avatar sx={{ mb: 1.5 }}>{profilePic}</Avatar>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {company}
      </Typography>
      <Typography variant="body2">@{username}</Typography>
      <Typography variant="body2">{email}</Typography>

      <Box
        sx={{
          mt: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1" sx={{ mr: 1, paddingTop: 0.5 }}>
          {rating.toFixed(1)}
        </Typography>
        <StarsRating rating={rating} />
        <Typography variant="body1" sx={{ ml: 1, paddingTop: 0.5 }}>
          {reviews} Reviews
        </Typography>
      </Box>
    </CardContent>

    <Divider variant="middle" sx={{ height: '1px' }} />
    <CardContent>
      <Typography sx={{ fontWeight: 'bold' }}>Bio:</Typography>
      <Typography>{bio}</Typography>
    </CardContent>
    <Divider variant="middle" sx={{ height: '1px' }} />
    <CardContent>
      <Typography sx={{ fontWeight: 'bold' }}>Linked accounts:</Typography>
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TelegramIcon
          sx={{ backgroundColor: '#0088cc', color: 'white', borderRadius: 5, pr: '2px' }}
        />
        <Typography sx={{ ml: 1 }}>{telegramUsername}</Typography>
      </Box>
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <WhatsAppIcon
          sx={{ backgroundColor: '#25D366', color: 'white', borderRadius: 5, p: 0.5 }}
        />
        <Typography sx={{ ml: 1, fontWeight: 'bold' }}> +65 {mobileNumber} </Typography>
      </Box>
    </CardContent>
    <CardActions sx={{ display: 'flex', flexDirection: 'column', mt: 'auto' }}>
      <Box sx={{ width: '98%' }}>
        <Button
          component={Link}
          href="/editprofile"
          variant="contained"
          type="submit"
          color="primary"
          sx={{ width: '100%', mb: 2, mt: 10, fontWeight: 'bold' }}
        >
          Edit profile
        </Button>
        <Button
          component={Link}
          href="/logout"
          variant="contained"
          type="submit"
          color="error"
          sx={{ width: '100%', mb: 2, fontWeight: 'bold' }}
        >
          Logout
        </Button>
      </Box>
    </CardActions>
  </Card>
);
export default ProfileDetailCard;
