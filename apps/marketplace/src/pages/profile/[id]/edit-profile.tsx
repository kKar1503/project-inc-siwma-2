import { useState, useEffect, ChangeEvent, FormEvent, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ProfileDetailCard, {
  ProfileDetailCardProps,
} from '@/components/marketplace/profile/ProfileDetailCard';
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
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import { GetServerSidePropsContext, NextApiRequest } from 'next';
import NavBar from '@/components/marketplace/navbar/NavBar';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';

const profileDetailData = [
  {
    ownerId: 1,
    username: 'diggers',
    name: 'John Tan',
    email: 'digs@gmail.com',
    company: 'Prof. Digging Ltd.',
    profilePic: 'J',
    mobileNumber: '2314 5324',
    telegramUsername: '@digpeople',
    bio: 'Introducing Professional Digging Limited, a leading mining company with a proven track record of excellence in the industry. With decades of experience in the mining business, we have established ourselves as a trusted and reliable provider of high-quality minerals and metals.',
    rating: 3.3,
    reviews: 336,
  },
  {
    ownerId: 2,
    username: 'rock_hound',
    name: 'Emily Stone',
    email: 'emily.stone@gmail.com',
    company: 'Stone Exploration Co.',
    profilePic: 'E',
    mobileNumber: '4590 2379',
    telegramUsername: '@stone_explorer',
    bio: 'At Stone Exploration Co., we specialize in the exploration and development of new mineral resources. Our team of experts uses cutting-edge technology to identify promising mineral deposits and assess their potential for commercial mining. We are dedicated to responsible mining practices that prioritize the safety of our workers and the protection of the environment.',
    rating: 4.6,
    reviews: 97,
  },
];

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext<{ id?: string | string[] }>) => {
  // api call to get user details go here
  // if user does not exist, return error code and redirect to wherever appropriate

  const id = Array.isArray(query.id) ? query.id[0] : query.id;
  const intCheck = !id || !Number.isInteger(parseFloat(id));

  if (intCheck) {
    // Redirect to the index page
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  const numericId = parseInt(id, 10);

  const data = profileDetailData[numericId - 1];

  return {
    props: {
      data,
    },
  };
};

export type ProfilePageProps = {
  data: ProfileDetailCardProps;
};

const EditProfile = ({ data }: { data: ProfileDetailCardProps }) => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [profilePic, setProfilepic] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [bio, setBio] = useState('');
  const [telegramUsername, setTelegramusername] = useState('');
  const [mobileNumber, setMobilenumber] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { ownerId } = data;
  useEffect(() => {
    if (profilePic) {
      setImageUrl(URL.createObjectURL(profilePic));
    }
  }, [profilePic]);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilepic(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({
      profilePic,
      name,
      username,
      email,
      company,
      bio,
      telegramUsername,
      mobileNumber,
    });
  };

  const gridCols: 2 | 3 | 4 | 5 = useMemo(() => {
    if (isLg) {
      return 2;
    }
    if (isMd) {
      return 3;
    }
    if (isSm) {
      return 4;
    }
    return 5;
  }, [isSm, isMd, isLg]);


  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <NavBar />
        <Container>
          <Grid container gridColumn={gridCols}>
            <form onSubmit={handleSubmit}>
              <Box
                sx={({ spacing }) => ({
                  m: spacing(2),
                  display: 'flex',
                })}
              >
                <Grid
                  sm={6}
                  md={10}
                  lg={12}
                  sx={({ spacing }) => ({
                    mr: spacing(1),
                  })}
                >
                  <Card>
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
                          ml: 'auto',
                          mr: spacing(2),
                        })}
                      >
                        <Button
                          variant="contained"
                          color="error"
                          component={Link}
                          href={`/profile/${ownerId}`}
                          sx={({ palette }) => ({ bgcolor: palette.error[400] })}
                        >
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
                        Choose an image for other users to recognise you on the marketplace
                      </Typography>
                      <Box
                        sx={({ spacing }) => ({
                          mb: spacing(1),
                          mt: spacing(1),
                          display: 'flex',
                          alignItems: 'center',
                        })}
                      >
                        {imageUrl && profilePic && (
                          <Box>
                            <Avatar src={imageUrl} />
                          </Box>
                        )}
                        <Box sx={({ spacing }) => ({ ml: spacing(2) })}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Typography>Maximum upload size: &nbsp;</Typography>
                            <Typography sx={{ fontWeight: 'bold' }}> 64MB </Typography>
                          </Box>
                          <Box sx={({ spacing }) => ({ mt: spacing(1) })}>
                            <Button variant="contained" component="label">
                              Upload A Profile Photo
                              <input
                                accept="image/*"
                                type="file"
                                hidden
                                onChange={handleFileSelect}
                              />
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
                        <FormControl
                          fullWidth
                          variant="outlined"
                          sx={({ spacing }) => ({
                            mr: spacing(2),
                          })}
                        >
                          <TextField
                            label="Full Name"
                            placeholder="Your Full Name"
                            InputLabelProps={{ shrink: true }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormControl>

                        <FormControl
                          fullWidth
                          variant="outlined"
                          sx={({ spacing }) => ({
                            mr: spacing(2),
                          })}
                        >
                          <TextField
                            label="Username"
                            placeholder="account_username"
                            InputLabelProps={{ shrink: true }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </FormControl>
                      </Box>

                      <FormControl fullWidth variant="outlined">
                        <TextField
                          label="Email"
                          placeholder="user@gmail.com"
                          InputLabelProps={{ shrink: true }}
                          sx={({ spacing }) => ({
                            mt: spacing(2),
                          })}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormControl>

                      <FormControl fullWidth variant="outlined">
                        <TextField
                          label="Company"
                          placeholder="Company Name"
                          InputLabelProps={{ shrink: true }}
                          sx={({ spacing }) => ({
                            mt: spacing(2),
                          })}
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </FormControl>

                      <FormControl fullWidth variant="outlined">
                        <TextField
                          multiline
                          rows={5}
                          label="Bio"
                          placeholder="Bio Description"
                          InputLabelProps={{ shrink: true }}
                          sx={({ spacing }) => ({
                            mt: spacing(2),
                            mb: spacing(1),
                          })}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                      </FormControl>
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
                        <FormControl fullWidth variant="outlined">
                          <TextField
                            label="Telegram Username"
                            placeholder="account_username"
                            sx={({ spacing }) => ({
                              mr: spacing(2),
                            })}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <TelegramIcon />@
                                </InputAdornment>
                              ),
                            }}
                            value={telegramUsername}
                            onChange={(e) => setTelegramusername(e.target.value)}
                          />
                        </FormControl>

                        <FormControl fullWidth variant="outlined">
                          <TextField
                            label="Whatsapp Number"
                            placeholder="8123 4567"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <WhatsAppIcon />
                                  +65
                                </InputAdornment>
                              ),
                            }}
                            value={mobileNumber}
                            onChange={(e) => setMobilenumber(e.target.value)}
                          />
                        </FormControl>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ display: 'flex', flexDirection: 'column', mt: 'auto' }}>
                      <Box
                        sx={({ spacing }) => ({
                          width: '98%',
                          mt: spacing(3),
                        })}
                      >
                        <Button
                          onClick={handleSubmit}
                          variant="contained"
                          type="submit"
                          sx={({ spacing }) => ({
                            width: '100%',
                            mt: 'auto',
                            mb: spacing(1),
                          })}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
                {isLg && <ProfileDetailCard data={data} />}
              </Box>
            </form>
          </Grid>
        </Container>
      </main>
    </>
  );
};
export default EditProfile;
