import { useState } from 'react';
import Head from 'next/head';
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
import ProfileDetailCard, {
  ProfileDetailCardProps,
} from '@/components/marketplace/profile/ProfileDetailCard';

const EditProfile = ({ data }: { data: ProfileDetailCardProps }) => (
  <>
    <Head>
      <title>Edit Profile</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <main>
      {/* navbar */}

      <Container>
        <Box
          sx={({ spacing }) => ({
            m: spacing(2),
            display: 'flex',
          })}
        >
          <Card
            sx={({ spacing }) => ({
              width: '100%',
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
                sx={({ spacing }) => ({ justifyContent: 'flex-end', ml: 'auto', mr: spacing(1) })}
              >
                <Button variant="contained" color="error">
                  Cancel Edit
                </Button>
              </Box>
            </Box>
            <Divider
              variant="middle"
              sx={({ palette }) => ({ color: palette.divider, height: '1px' })}
            />
            <CardContent>
              <Typography sx={{ fontWeight: 'bold' }}>Profile Photo</Typography>
              <Typography>
                Choose an image for other users to recognise you in the marketplace
              </Typography>
              <Box
                sx={({ spacing }) => ({
                  mb: spacing(1),
                  display: 'flex',
                  alignItems: 'center',
                })}
              >
                <Avatar>P</Avatar>
                <Box sx={({ spacing }) => ({ ml: spacing(2) })}>
                  <Box
                    sx={({ spacing }) => ({
                      mt: spacing(1),
                      display: 'flex',
                      alignItems: 'center',
                    })}
                  >
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

            <Divider
              variant="middle"
              sx={({ palette }) => ({ color: palette.divider, height: '1px' })}
            />
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
                multiline
                rows={5}
                label="Bio"
                placeholder="Bio Description"
                InputLabelProps={{ shrink: true }}
                sx={({ spacing }) => ({
                  mt: spacing(2),
                  mb: spacing(1),
                })}
              />
            </CardContent>
            <Divider
              variant="middle"
              sx={({ palette }) => ({ color: palette.divider, height: '1px' })}
            />
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
              <Box
                sx={({ spacing }) => ({
                  width: '98%',
                  mt: spacing(6),
                })}
              >
                <Button
                  component={Link}
                  href="/edit-profile"
                  variant="contained"
                  type="submit"
                  sx={({ spacing }) => ({
                    width: '100%',
                    mt: 'auto',
                  })}
                >
                  Save Changes
                </Button>
              </Box>
            </CardActions>
          </Card>

          <ProfileDetailCard
            username="gold_digger"
            name="Sarah Jones"
            email="sjones@golddigger.com"
            company="Gold Digger Mining Corp"
            profilePic="G"
            mobileNumber={56781234}
            telegramUsername="gold_digger"
            bio="Gold Digger Mining Corp. is a trusted provider of gold and other precious metals. Our team of experts has decades of experience in mining and processing high-quality ores, and we are committed to responsible practices that prioritize safety, sustainability, and environmental protection. We strive to exceed the expectations of our customers and provide them with the best possible products and services."
            rating={3.3}
            reviews={180}
          />
        </Box>
      </Container>
    </main>
  </>
);
export default EditProfile;
