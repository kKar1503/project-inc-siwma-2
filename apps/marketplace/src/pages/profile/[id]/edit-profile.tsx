import { useState, useEffect, ChangeEvent, FormEvent, useMemo, useRef} from 'react';
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
import OnLeaveModal from '@/components/modal/OnLeaveModal';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import updateUser from '@/middlewares/updateUser';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import fetchUser from '@/middlewares/fetchCompany';
// import fetchUser from '@/middlewares/fetchUser';

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
  console.log(userDetails);

  const mutation = useUpdateUserMutation(loggedUserUuid);
  // console.log(mutation);
  const theme = useTheme();
  const { spacing } = theme;
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>(userDetails?.name || '');
  // const [name, setName] = useState<string>(userDetails?.data?.user?.name || '');

  const [nameError, setNameError] = useState('');
  const [mobileNumber, setMobileNumber] = useState<string>(userDetails?.mobileNumber || '');
  // const [mobileNumber, setMobileNumber] = useState<string>(userDetails?.data?.user?.mobileNumber || '');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [email, setEmail] = useState<string>(userDetails?.email || '');
  const [emailError, setEmailError] = useState('');
  const [bio, setBio] = useState<string>(userDetails?.bio || '');
  const [bioError, setBioError] = useState('');
  const [telegramUsername, setTelegramUsername] = useState<string>(
    userDetails?.telegramUsername || ''
  );
  const [telegramError, setTelegramError] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState<string>(userDetails?.whatsappNumber || '');
  const [whatsappError, setWhatsappError] = useState('');
  const [contact, setContact] = useState<string>(userDetails?.contactMethod || '');
  const [modalMessage] = useState(
    'Once you leave the page, your user details will be removed and your profile will not be updated'
  );
  const [openLeave, setOpenLeave] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (newName.trim() === '') {
      setNameError('Please enter your full name');
    } else if (/\d/.test(newName)) {
      setNameError('Name cannot contain numbers');
    } else {
      setNameError('');
    }
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(?:\+65)?[689][0-9]{7}$/;
    return phoneRegex.test(phone);
  };
  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedInput = input.replace(/\D/g, '');
    setMobileNumber(formattedInput);

    if (formattedInput === '') {
      setMobileNumberError('Please enter a mobile number');
    } else {
      const isValidPhone = validatePhone(formattedInput);
      setMobileNumberError(isValidPhone ? '' : 'Please enter a valid Singapore phone number');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail.trim() === '') {
      setEmailError('Please enter an email address');
    } else {
      const isValidEmail = validateEmail(newEmail);
      setEmailError(isValidEmail ? '' : 'Please enter a valid email address');
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBio = e.target.value;
    setBio(newBio);

    if (newBio.trim() === '') {
      setBioError('Please enter a bio');
    } else {
      setBioError('');
    }
  };

  const handleContactChange = (e: SelectChangeEvent) => {
    const selectedContact = e.target.value;
    setContact(selectedContact);

    if (selectedContact === 'whatsapp') {
      setTelegramUsername('');
    } else if (selectedContact === 'telegram') {
      setWhatsappNumber('');
    }
  };

  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTelegram = e.target.value;
    setTelegramUsername(newTelegram);

    if (newTelegram.trim() === '') {
      setTelegramError('Please enter your telegram username');
    } else {
      setTelegramError('');
    }
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedInput = input.replace(/\D/g, '');
    setWhatsappNumber(formattedInput);

    if (formattedInput === '') {
      setWhatsappError('Please enter a mobile number');
    } else {
      const isValidPhone = validatePhone(formattedInput);
      setWhatsappError(isValidPhone ? '' : 'Please enter a valid Singapore phone number');
    }
  };

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

  useEffect(() => {
    if (userDetails) {
      setName(userDetails?.name);
      setMobileNumber(userDetails?.mobileNumber);
      setEmail(userDetails?.email);
      // setBio(userDetails?.bio);
      setContact(userDetails?.contactMethod);
    }
  }, [userDetails]);
 

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
        {userDetails && <ProfileDetailCard data={userDetails} />}
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
                    alignItems: 'flex-start',
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
                      onChange={handleNameChange}
                      error={!!nameError}
                      helperText={nameError}
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
                      onChange={handleMobileNumberChange}
                      error={!!mobileNumberError}
                      helperText={mobileNumberError}
                      inputProps={{
                        maxLength: 8,
                        pattern: '[0-9]*',
                      }}
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
                    onChange={handleEmailChange}
                    error={!!emailError}
                    helperText={emailError}
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
                    onChange={handleBioChange}
                    error={!!bioError}
                    helperText={bioError}
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
                    <Select label="contact" value={contact} onChange={handleContactChange}>
                      <MenuItem value="telegram">Telegram</MenuItem>
                      <MenuItem value="Whatsapp">Whatsapp</MenuItem>
                    </Select>
                  </FormControl>

                  {contact === 'Whatsapp' && (
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
                      onChange={handleWhatsappChange}
                      error={!!whatsappError}
                      helperText={whatsappError}
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
                      onChange={handleTelegramChange}
                      error={!!telegramError}
                      helperText={telegramError}
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
                    disabled={
                      name.trim() === '' ||
                      mobileNumber.trim() === '' ||
                      email.trim() === '' ||
                      bio.trim() === '' ||
                      (contact === 'whatsapp' && whatsappNumber.trim() === '') ||
                      (contact === 'telegram' && telegramUsername.trim() === '')
                    }
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
