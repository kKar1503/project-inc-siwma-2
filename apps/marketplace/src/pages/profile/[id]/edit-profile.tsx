import { useState, useEffect, ChangeEvent } from 'react';
import Head from 'next/head';
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
import ProfileDetailCard, {
  ProfileDetailCardProps,
} from '@/components/marketplace/profile/ProfileDetailCard';

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
  {
    ownerId: 3,
    username: 'ore_king',
    name: 'David Hill',
    email: 'david.hill@orekingdom.com',
    company: 'Ore Kingdom Inc.',
    profilePic: 'D',
    mobileNumber: '9031 2150',
    telegramUsername: '@ore_kingdom',
    bio: 'Ore Kingdom Inc. is a leading provider of iron ore and other minerals to markets around the world. We have extensive experience in mining and processing high-quality ores and are committed to sustainable and responsible practices. Our team is dedicated to delivering the best possible products and services to our customers.',
    rating: 4.8,
    reviews: 215,
  },
  {
    ownerId: 4,
    username: 'gold_digger',
    name: 'Sarah Jones',
    email: 'sjones@golddigger.com',
    company: 'Gold Digger Mining Corp.',
    profilePic: 'S',
    mobileNumber: '5678 1234',
    telegramUsername: '@gold_digger',
    bio: 'Gold Digger Mining Corp. is a trusted provider of gold and other precious metals. Our team of experts has decades of experience in mining and processing high-quality ores, and we are committed to responsible practices that prioritize safety, sustainability, and environmental protection. We strive to exceed the expectations of our customers and provide them with the best possible products and services.',
    rating: 4.3,
    reviews: 184,
  },
  {
    ownerId: 5,
    username: 'mining_pro',
    name: 'Jackie Lee',
    email: 'jackie.lee@miningpro.com',
    company: 'Mining Pro Solutions',
    profilePic: 'J',
    mobileNumber: '7777 9999',
    telegramUsername: '@mining_pro',
    bio: 'Mining Pro Solutions provides cutting-edge solutions for the mining industry. Our team of experienced professionals specializes in the design, engineering, and implementation of advanced mining equipment and technologies that improve efficiency, safety, and productivity. We are committed to delivering the best possible solutions to our clients and helping them achieve their goals.',
    rating: 4.9,
    reviews: 102,
  },
  {
    ownerId: 6,
    username: 'ore_genius',
    name: 'Karen Chen',
    email: 'karen.chen@oregenius.com',
    company: 'Ore Genius Inc.',
    profilePic: 'K',
    mobileNumber: '1234 5678',
    telegramUsername: '@ore_genius',
    bio: 'Ore Genius Inc. is a cutting-edge provider of mineral exploration and analysis services. Our team of experts uses the latest technology to identify and assess mineral deposits, helping our clients make informed decisions about their mining operations. We are committed to delivering high-quality services that exceed our clients expectations and contribute to sustainable and responsible mining practices.',
    rating: 4.5,
    reviews: 76,
  },
];

export const getServerSideProps = async ({ query }: { query: any }) => {
  const { id } = query;
  if (!Number.isInteger(parseFloat(id))) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  if (id > profileDetailData.length) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  const data = profileDetailData[id - 1];

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
  const [profilePic, setProfilepic] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [bio, setBio] = useState('');
  const [telegramUsername, setTelegramusername] = useState('');
  const [mobileNumber, setMobilenumber] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
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

  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        {/* navbar */}

        <Container>
          <form onSubmit={handleSubmit}>
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
                    sx={({ spacing }) => ({
                      justifyContent: 'flex-end',
                      ml: 'auto',
                      mr: spacing(2),
                    })}
                  >
                    <Button
                      variant="contained"
                      color="error"
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
                          <input accept="image/*" type="file" hidden onChange={handleFileSelect} />
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
                        placeholder="@account_username"
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
                        value={telegramUsername}
                        onChange={(e) => setTelegramusername(e.target.value)}
                      />
                    </FormControl>

                    <FormControl fullWidth variant="outlined">
                      <TextField
                        label="Whatsapp Number"
                        placeholder="+65 8123 4567"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <WhatsAppIcon />
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
                      sx={{
                        width: '100%',
                        mt: 'auto',
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </CardActions>
              </Card>

              <ProfileDetailCard
                ownerId={data.ownerId}
                username={data.username}
                name={data.name}
                company={data.company}
                email={data.email}
                profilePic={data.profilePic}
                telegramUsername={data.telegramUsername}
                bio={data.bio}
                mobileNumber={data.mobileNumber}
                rating={data.rating}
                reviews={data.reviews}
              />
            </Box>
          </form>
        </Container>
      </main>
    </>
  );
};
export default EditProfile;
