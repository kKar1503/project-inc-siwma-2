import * as React from 'react';
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
  name: string;
  email: string;
  company: string;
  profilePic: string;
  mobileNumber: string;
  contactMethod: string;
  rating: number;
  href: string;
};

const ProfileDetailCard = ({
  name,
  email,
  company,
  profilePic,
  mobileNumber,
  contactMethod,
  rating,
  href,
}: ProfileDetailCardProps) => {
  return (
    <Card sx={{ maxWidth: 'md', display: 'inline-grid' }}>
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
      <Divider variant="middle" />
      <CardContent>
        <Avatar sx={{ mb: 1.5 }}>{profilePic}</Avatar>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
          {name}
        </Typography>
        {/* admin only */}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {company}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          @account_username
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {email}
        </Typography>

        <Box
          sx={{
            mt: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1" sx={{ mr: 1 }}>{rating}</Typography>
          <Rating
            readOnly
            defaultValue={rating}
            size="medium"
            sx={{ color: '#00C853' }}
            emptyIcon={<StarIcon fontSize="inherit" />}
          />
        </Box>
      </CardContent>
      <Divider variant="middle" />
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }}>Linked accounts:</Typography>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TelegramIcon sx={{ color: '#0088cc' }} />
          <Typography sx={{ ml: 1 }}>{contactMethod}</Typography>
        </Box>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <WhatsAppIcon sx={{ color: '#25D366' }} />
          <Typography sx={{ ml: 1 }}> +65 {mobileNumber} </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ flexDirection: 'column' }}>
        <Button
          component={Link}
          href={`/editprofile`}
          variant="contained"
          type="submit"
          color="primary"
          sx={{ width: '98%', mb: 2 }}
        >
          Edit profile
        </Button>
        <Button
          component={Link}
          href={`/logout`}
          variant="contained"
          type="submit"
          color="error"
          sx={{ width: '98%', mb: 2 }}
        >
          Logout
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileDetailCard;