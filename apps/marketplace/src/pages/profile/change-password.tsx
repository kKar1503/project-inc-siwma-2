import { useState, FormEvent, useEffect } from 'react';
import Head from 'next/head';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import { useSession } from 'next-auth/react';
import { PutUserRequestBody } from '@/utils/api/server/zod';
import { useMutation } from 'react-query';
import updateUser from '@/services/users/updateUser';
import { useResponsiveness } from '@inc/ui';
import { useTheme } from '@mui/material/styles';
import OnLeaveModal from '@/components/modal/OnLeaveModal';
import { useTranslation } from 'react-i18next';
import NoInternetConnection from '@/components/NoInternet';

const useUpdateUserMutation = (userUuid: string) =>
  useMutation((updatedUserData: PutUserRequestBody) => updateUser(updatedUserData, userUuid));

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordErrorText, setNewPasswordErrorText] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [currentPasswordErrorText, setCurrentPasswordErrorText] = useState('');
  const [openLeave, setOpenLeave] = useState(false);

  const loggedUserUuid = useSession().data?.user.id as string;

  const mutation = useUpdateUserMutation(loggedUserUuid);

  const [isSm] = useResponsiveness(['sm']);
  const { palette } = useTheme();

  const { t } = useTranslation();

  useEffect(() => {
    if (newPassword !== confirmNewPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorText('New password and confirm new password must be the same');
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorText('');
    }

    if (newPassword.length < 8 && newPassword.length >= 1) {
      setNewPasswordError(true);
      setNewPasswordErrorText('New password must be at least 8 characters long');
    } else {
      setNewPasswordError(false);
      setNewPasswordErrorText('');
    }

    // if mutation fails, show error message
    if (mutation.isError) {
      setCurrentPasswordError(true);
      setCurrentPasswordErrorText('Current password is incorrect');
    } else {
      setCurrentPasswordError(false);
      setCurrentPasswordErrorText('');
    }
  }, [newPassword, confirmNewPassword, mutation.isError]);
  
    useEffect(() => {
    if (mutation.isSuccess) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  }, [mutation.isSuccess]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Check if all fields are filled
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError(true);
      setErrorMessage('Please fill in all fields');
      return;
    }

    setError(false);

    const updatedUserData: PutUserRequestBody = {
      password: newPassword,
      oldPassword: currentPassword,
    };
    mutation.mutate(updatedUserData);
  };

  return (
    <>
      <Head>
        <title>{t('Change Password')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Container>
          <form onSubmit={handleSubmit}>
            <Box
              sx={({ spacing }) => ({
                m: spacing(2),
                display: 'flex',
                justifyContent: 'center',
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
                      fontSize: isSm ? 16 : 24,
                    }}
                    title={t('Change Password')}
                  />
                  <Box
                    sx={({ spacing }) => ({
                      justifyContent: 'flex-end',
                      ml: 'auto',
                      mr: spacing(2),
                    })}
                  >
                    <Button
                      onClick={() => setOpenLeave(true)}
                      variant="contained"
                      color="error"
                      sx={({ palette }) => ({
                        bgcolor: palette.error[400],
                        fontSize: isSm ? 10 : 'auto',
                      })}
                    >
                      {t('Cancel Edit')}
                    </Button>
                    <OnLeaveModal open={openLeave} setOpen={setOpenLeave} />
                  </Box>
                </Box>
                <Divider
                  variant="middle"
                  sx={({ palette }) => ({ color: palette.divider, height: '1px' })}
                />
                <CardContent>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {t('Change your password here')}
                  </Typography>

                  <FormControl fullWidth variant="outlined">
                    <TextField
                      type="password"
                      label={t('Current Password')}
                      InputLabelProps={{ shrink: true }}
                      sx={({ spacing }) => ({
                        mt: spacing(2),
                      })}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      error={!!currentPasswordError}
                      helperText={currentPasswordErrorText}
                    />
                  </FormControl>

                  <FormControl fullWidth variant="outlined">
                    <TextField
                      type="password"
                      label={t('New Password')}
                      InputLabelProps={{ shrink: true }}
                      sx={({ spacing }) => ({
                        mt: spacing(2),
                      })}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      error={!!newPasswordError}
                      helperText={newPasswordErrorText}
                    />
                  </FormControl>

                  <FormControl fullWidth variant="outlined">
                    <TextField
                      type="password"
                      label={t('Confirm New Password')}
                      InputLabelProps={{ shrink: true }}
                      sx={({ spacing }) => ({
                        mt: spacing(2),
                      })}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      error={!!confirmPasswordError}
                      helperText={confirmPasswordErrorText}
                    />
                  </FormControl>
                </CardContent>

                {
                  // Show err msg if error is true
                  error && (
                    <Typography
                      sx={{
                        color: palette.error.main,
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      {errorMessage}
                    </Typography>
                  )
                }

                {
                  // Show success msg if mutation is successful
                  mutation.isSuccess && (
                    <Typography
                      sx={{
                        color: 'green',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      {t('Password changed successfully!')}
                    </Typography>
                  )
                }

                <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
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
                      {t('Save Changes')}
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Box>
          </form>
        </Container>
      </main>
      {/* <NoInternetConnection /> */}
    </>
  );
};

ChangePassword.renderSearchBar = false;

export default ChangePassword;
