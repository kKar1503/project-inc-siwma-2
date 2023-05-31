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
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import fetchUser from '@/middlewares/fetchUser';
import updateUser from '@/middlewares/updateUser';
import apiClient from '@/utils/api/client/apiClient';
import { useTheme, styled } from '@mui/material/styles';
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

interface UserData {
  name: string;
  mobileNumber: string;
  email: string;
  // company: string;
  bio: string;
  telegramUsername: string;
  whatsappNumber: string;
  // profilePicture: string | null;
  // contactMethod: 'email' | 'whatsapp' | 'telegram' | 'facebook' | 'phone',
}

const useUpdateUserMutation = (userUuid: string) =>
  useMutation((updatedUserData: UserData) =>
    updateUser(
      userUuid,
      updatedUserData.name,
      updatedUserData.email,
      updatedUserData.mobileNumber,
      updatedUserData.whatsappNumber,
      updatedUserData.telegramUsername,
      updatedUserData.bio,
      // updatedUserData.profilePicture || '',
      // updatedUserData.contactMethod,
    )
  );

const EditProfile = () => {
  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;
  const id = useRouter().query.id as string;
  const userDetails = useGetUserQuery(id);

  const mutation = useUpdateUserMutation(loggedUserUuid);

  const theme = useTheme();
  const { spacing } = theme;

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [telegramUsername, setTelegramusername] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [contact, setContact] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedUserData: UserData = {
      name,
      mobileNumber,
      email,
      bio,
      telegramUsername,
      whatsappNumber,
      // profilePicture: imageUrl || '', 
      // contactMethod
    };

    mutation.mutate(updatedUserData);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setContact(event.target.value);
  };

  useEffect(() => {
    if (profilePicture) {
      setImageUrl(URL.createObjectURL(profilePicture));
    }
  }, [profilePicture]);

  // const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setProfilePicture(e.target.files[0]);
  //   }
  // };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfilePicture(file);
  
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const arrayBuffer = event.target.result as ArrayBuffer;
          const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
          setImageUrl(`data:${file.type};base64,${base64String}`);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };
  
  

  const gridCols = useMemo(() => {
    if (isSm) {
      return {
        py: spacing(3),
        px: '20px',
        height: '100%;',
        width: '100%',
        justifyContent: 'center',
      };
    }
    if (isMd) {
      return {
        py: spacing(3),
        px: '40px',
        height: '100%;',
        width: '100%',
        justifyContent: 'center',
      };
    }
    if (isLg) {
      return {
        py: spacing(3),
        px: '60px',
        height: '100%;',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      };
    }
    return {
      py: spacing(3),
      px: '20px',
      height: '100%;',
      width: '100%',
    };
  }, [isSm, isMd, isLg]);

  return (
    <>
      <Head>
        <title>Edit Profile</title>
      </Head>

      <Grid sx={gridCols}>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Grid
            item
            onSubmit={handleSubmit}
            sx={({ spacing }) => ({
              mr: spacing(1),
              width: '100%',
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
                      label="Phone"
                      placeholder="91234567"
                      InputLabelProps={{ shrink: true }}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
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

                {/* <FormControl fullWidth variant="outlined">
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
                </FormControl> */}

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
                  <FormControl sx={({ spacing }) => ({ minWidth: 120, mr: spacing(3) })}>
                    <InputLabel>Contact</InputLabel>
                    <Select
                      value={contact}
                      label="Platform"
                      onChange={(e) => setContact(e.target.value)}
                    >
                      <MenuItem value="telegram">Telegram</MenuItem>
                      <MenuItem value="whatsapp">Whatsapp</MenuItem>
                    </Select>
                  </FormControl>

                  {contact === 'whatsapp' && (
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
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                    />
                  )}

                  {contact === 'telegram' && (
                    <TextField
                      label="Telegram Username"
                      placeholder="account_username"
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
                  )}
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
          {userDetails && isLg && <ProfileDetailCard data={userDetails} />}
        </Box>
      </Grid>
    </>
  );
};
export default EditProfile;
