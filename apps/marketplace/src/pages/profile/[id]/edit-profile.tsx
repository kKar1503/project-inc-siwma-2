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
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import fetchUser from '@/middlewares/fetchUser';
import updateUser from '@/middlewares/updateUser';
import apiClient from '@/utils/api/client/apiClient';
import { useSession } from 'next-auth/react';
import { useQuery, useMutation } from 'react-query';
import users from '@/pages/api/v1/users';
import { useRouter } from 'next/router';

const useGetUserQuery = (userUuid: string) => {
  const { data } = useQuery('user', async () => fetchUser(userUuid), {
    enabled: userUuid !== undefined,
  });
  return data;
};

const useUpdateUserQuery = (userUuid: string) => {
  const { data } = useQuery('user', async () => updateUser(userUuid, 'Elon Musk'), {
    enabled: userUuid !== undefined,
  });
  return data;
};

const EditProfile = () => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [telegramUsername, setTelegramusername] = useState<string>('');
  const [mobileNumber, setMobilenumber] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState('');

  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;
  const id = useRouter().query.id as string;
  const userDetails = useGetUserQuery(id);
  const updateUser = useUpdateUserQuery(loggedUserUuid);
  console.log(userDetails);
  console.log(updateUser);

  useEffect(() => {
    if (profilePicture) {
      setImageUrl(URL.createObjectURL(profilePicture));
    }
  }, [profilePicture]);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({
      profilePicture,
      name,
      username,
      email,
      company,
      bio,
      telegramUsername,
      mobileNumber,
    });
  };

  const formatResponse = (res: unknown) => JSON.stringify(res, null, 2);

  // const { isLoading: isUpdatingTutorial, mutate: updateTutorial } = useMutation(
  //   async () => apiClient.put(`/profile/${id}/edit-profile`, {
  //       name,
  //       email,
  //       company,
  //       profilePicture,
  //       mobileNumber,
  //       bio,
  //       telegramUsername,
  //     }),
  //   {
  //     onSuccess: (res) => {
  //       const result = {
  //         status: `${res.status  }-${  res.statusText}`,
  //         headers: res.headers,
  //         data: res.data,
  //       };

  //       setResult(formatResponse(result));
  //     },
  //     onError: (err) => {
  //       setResult(formatResponse(err.response?.data || err));
  //     },
  //   }
  // );

  // useEffect(() => {
  //   if (isUpdatingTutorial) setResult('updating...');
  // }, [isUpdatingTutorial]);

  // function putData() {
  //   if (putId) {
  //     try {
  //       updateTutorial();
  //     } catch (err) {
  //       setResult(formatResponse(err));
  //     }
  //   }
  // }

  // const clearPutOutput = () => {
  //   setResult(null);
  // };

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
        <Container>
          <Grid container gridColumn={gridCols}>
            <form onSubmit={handleSubmit}>
              <Box
                sx={({ spacing }) => ({
                  m: spacing(2),
                  display: 'flex',
                })}
              >
                <Grid item
                  sm={12}
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
                          href={`/profile/${id}`}
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
                        {imageUrl && profilePicture && (
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
                              Upload Profile Photo
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
               {userDetails && isLg && (<ProfileDetailCard data={userDetails} />)}
              </Box>
            </form>
          </Grid>
        </Container>
      </main>
    </>
  );
};
export default EditProfile;
