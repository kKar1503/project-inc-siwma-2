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
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import ProfileDetailCard from '@/components/marketplace/profile/ProfileDetailCard';

export type EditProfileProps = {
  username: string;
  name: string;
  email: string;
  company: string;
  profilePic: string;
  mobileNumber: number;
  telegramUsername: string;
  bio: string;
};

const EditProfile = ({
  username,
  name,
  email,
  company,
  profilePic,
  mobileNumber,
  telegramUsername,
  bio,
}: EditProfileProps) => (
  <Container
    sx={({ spacing }) => ({
      m: spacing(2),
      display: 'flex',
    })}
  >
    <Card
      sx={({ spacing }) => ({
        width: '90%',
        height: '100%',
        flexDirection: 'column',
        mr: spacing(1),
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CardHeader
          titleTypographyProps={{
            fontSize: 16,
          }}
          subheaderTypographyProps={{
            fontSize: 16,
          }}
          title="Edit Profile"
          subheader="Edit your profile details here"
        />
        <Box
          sx={({ spacing }) => ({
            justifyContent: 'flex-end',
            ml: '55%',
          })}
        >
          <Button variant="contained" color="error">
            Cancel Edit
          </Button>
        </Box>
      </Box>
      <Divider variant="middle" sx={({ palette }) => ({ color: palette.divider, height: '1px' })} />
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }}>Profile Photo</Typography>
        <Typography>Choose an image for other users to recognise you in the marketplace</Typography>
        <Box sx={({ spacing }) => ({ mb: spacing(1), display: 'flex', alignItems: 'center' })}>
          <Avatar>{profilePic}</Avatar>
          <Box sx={({ spacing }) => ({ ml: spacing(2) })}>
            <Box sx={({ spacing }) => ({ mt: spacing(1), display: 'flex', alignItems: 'center' })}>
              <Typography>Maximum upload size: &nbsp;</Typography>
              <Typography sx={{ fontWeight: 'bold' }}> 64MB </Typography>
            </Box>
            <Box sx={({ spacing }) => ({ mt: spacing(1) })}>
              <Button variant="contained" component="label">
                Upload a profile photo
                <input type="file" hidden />
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>

      <Divider variant="middle" sx={({ palette }) => ({ color: palette.divider, height: '1px' })} />
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }}>Personal Details</Typography>
        <Typography>Change your personal details here</Typography>
        <Box
          sx={({ spacing }) => ({
            mt: spacing(2),
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <TextField
            fullWidth
            label="Full Name"
            placeholder="Your Full Name"
            InputLabelProps={{ shrink: true }}
            sx={({ spacing }) => ({
              mr: spacing(2),
            })}
          />
          <TextField
            fullWidth
            label="Username"
            placeholder="@account_username"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <TextField
          fullWidth
          label="E-mail"
          placeholder="user@gmail.com"
          InputLabelProps={{ shrink: true }}
          sx={({ spacing }) => ({
            mt: spacing(2),
          })}
        />
        <TextField
          fullWidth
          label="Company"
          placeholder="Company Name"
          InputLabelProps={{ shrink: true }}
          sx={({ spacing }) => ({
            mt: spacing(2),
          })}
        />
        <TextField
          fullWidth
          label="Bio"
          placeholder="Bio Description"
          InputLabelProps={{ shrink: true }}
          sx={({ spacing }) => ({
            mt: spacing(2),
            mb: spacing(1),
          })}
        />
      </CardContent>
      <Divider variant="middle" sx={({ palette }) => ({ color: palette.divider, height: '1px' })} />
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }}>Connections</Typography>
        <Typography>Link your messaging accounts here</Typography>
        <Box
          sx={({ spacing }) => ({
            mt: spacing(2),
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <TextField
            fullWidth
            label="Telegram Username"
            placeholder="@account_username"
            sx={({ spacing }) => ({
              mr: spacing(2),
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TelegramIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Whatsapp Number"
            placeholder="+65 8123 4567"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WhatsAppIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', flexDirection: 'column', mt: 'auto' }}>
        <Box sx={{ width: '98%' }}>
          <Button
            component={Link}
            href="/editprofile"
            variant="contained"
            type="submit"
            sx={({ spacing }) => ({
              width: '100%',
              mt: spacing(2),
              mb: spacing(2),
            })}
          >
            Save Changes
          </Button>
        </Box>
      </CardActions>
    </Card>

    <ProfileDetailCard
      username="ore"
      name="orekking"
      email="king@gmail.com"
      company="oreeee"
      profilePic="P"
      mobileNumber={81234567}
      telegramUsername="help"
      bio="help"
      rating={3.3}
      reviews={1800}
    />
  </Container>
);
export default EditProfile;
