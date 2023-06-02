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
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OnLeaveModal from '@/components/modal/OnLeaveModal';
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

export type ProfilePageProps = {
  data: ProfileDetailCardProps;
};

interface UserData {
  name: string;
  mobileNumber: string;
  email: string;
  bio: string;
  telegramUsername: string;
  whatsappNumber: string;
  contact: string;
  // profilePicture: string,
}

const useUpdateUserMutation = (userUuid: string) =>
  useMutation((updatedUserData: UserData) =>
    updateUser(
      userUuid,
      updatedUserData.name,
      updatedUserData.email,
      updatedUserData.mobileNumber,
      updatedUserData.contact,
      updatedUserData.whatsappNumber,
      updatedUserData.telegramUsername,
      // updatedUserData.profilePicture,
      updatedUserData.bio
    )
  );

const EditProfile = () => {
  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;
  const id = useRouter().query.id as string;
  const userDetails = useGetUserQuery(id);

  // console.log(userDetails);

  const mutation = useUpdateUserMutation(loggedUserUuid);
  // console.log(mutation);

  const theme = useTheme();
  const { spacing } = theme;

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>(userDetails?.data?.data[0].name || '');
  const [mobileNumber, setMobileNumber] = useState<string>(
    userDetails?.data?.data[0].mobileNumber || undefined
  );
  const [email, setEmail] = useState<string>(userDetails?.data?.data[0].email || '' );
  const [bio, setBio] = useState<string>(userDetails?.data?.data[0].bio || undefined);

  const [telegramUsername, setTelegramUsername] = useState<string>(
    userDetails?.data?.data[0].telegramUsername || undefined
  );
  const [whatsappNumber, setWhatsappNumber] = useState<string>(
    userDetails?.data?.data[0].whatsappNumber || undefined
  );
  const [facebookUsername, setFacebookUsername] = useState<string>(
    userDetails?.data?.data[0].facebookUsername || undefined
  );
  const [contact, setContact] = useState<string>(userDetails?.data?.data?.contact || undefined);

  // console.log(contact);

  const [modalMessage, setModalMessage] = useState(
    'Once you leave the page, your user details will be removed and your profile will not be updated'
  );
  const [openLeave, setOpenLeave] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedUserData: UserData = {
      name,
      mobileNumber,
      email,
      bio,
      telegramUsername,
      whatsappNumber,
      contact,
      // profilePicture: imageUrl || '',
    };

    mutation.mutate(updatedUserData);
  };

  const handleContactChange = (e: SelectChangeEvent) => {
    const selectedContact = e.target.value;
    setContact(selectedContact);

    if (selectedContact === 'whatsapp') {
      setWhatsappNumber(''); // Update the Whatsapp Number state
      setTelegramUsername(''); // Reset the Telegram Username state
      setFacebookUsername('');
    } else if (selectedContact === 'telegram') {
      setWhatsappNumber('');
      setFacebookUsername('');
    } else if (selectedContact === 'facebook') {
      setWhatsappNumber('');
      setTelegramUsername('');
    }
  };

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

  // const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //     setProfilePicture(file);

  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       if (event.target) {
  //         const arrayBuffer = event.target.result as ArrayBuffer;
  //         const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  //         setImageUrl(`data:${file.type};base64,${base64String}`);
  //       }
  //     };
  //     reader.readAsArrayBuffer(file);
  //   }
  // };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenLeave(true);
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
        {userDetails && <ProfileDetailCard data={userDetails} /> }
        <Box
          sx={{
            display: 'flex',
            width: isLg ? '73%' : '100%',
          }}
        >
          <Grid
            item
            onSubmit={handleSubmit}
            sx={({ spacing }) => ({
              ml: spacing(1),
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
                    sx={({ palette }) => ({ bgcolor: palette.error[400] })}
                    onClick={handleCancel}
                  >
                    Cancel Edit
                  </Button>
                  <OnLeaveModal open={openLeave} setOpen={setOpenLeave} message={modalMessage} />
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
                      value={userDetails?.data?.data[0].name}
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
                      value={userDetails?.data?.data[0].mobileNumber}
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
                    value={userDetails?.data?.data[0].email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={userDetails?.data?.data[0].bio}
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
                <Typography>{contact}</Typography>
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
                      value={userDetails?.data?.data[0].contact}
                      label="Platform"
                      onChange={(e) => handleContactChange(e)}
                    >
                      <MenuItem value="telegram">Telegram</MenuItem>
                      <MenuItem value="whatsapp">Whatsapp</MenuItem>
                      <MenuItem value="facebook">Facebook</MenuItem>
                      {/* {userDetails?.data?.data[0].map(({contact }) => (
                        <MenuItem  value={contact}>
                          {userDetails?.data?.data[0].contact}
                        </MenuItem>
                      ))}  */}
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
                      value={userDetails?.data?.data[0].whatsappNumber}
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
                      value={userDetails?.data?.data[0].telegramUsername}
                      onChange={(e) => setTelegramUsername(e.target.value)}
                    />
                  )}

                  {contact === 'facebook' && (
                    <TextField
                      label="Facebook Username"
                      placeholder="account_username"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FacebookOutlinedIcon />@
                          </InputAdornment>
                        ),
                      }}
                      value={userDetails?.data?.data[0].facebookUsername}
                      onChange={(e) => setFacebookUsername(e.target.value)}
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
        </Box>
      </Grid>
    </>
  );
};
export default EditProfile;
