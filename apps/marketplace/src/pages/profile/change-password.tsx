import { useState, FormEvent } from 'react';
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
import updateUser from '@/middlewares/updateUser';

const useUpdateUserMutation = (userUuid: string) =>
  useMutation((updatedUserData: PutUserRequestBody) => updateUser(updatedUserData, userUuid));

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loggedUserUuid = useSession().data?.user.id as string;

  const mutation = useUpdateUserMutation(loggedUserUuid);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Check if all fields are filled
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError(true);
      setErrorMessage('Please fill in all fields');
      return;
    }
    // Check if new password is at least 8 char long
    if (newPassword.length < 8) {
      setError(true);
      setErrorMessage('New password must be at least 8 characters long');
      return;
    }
    // Check if new password and confirm new password is the same
    if (newPassword !== confirmNewPassword) {
      setError(true);
      setErrorMessage('New password and confirm new password must be the same');
      return;
    }
    // Check if current password is correct
    // if (currentPassword !== data.password) {
    //     setError(true);
    //     setErrorMessage('The given current password does not match the current password');
    //     return;
    // }
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
        <title>Change Password</title>
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
                      fontSize: 24,
                    }}
                    subheaderTypographyProps={{
                      fontSize: 16,
                    }}
                    title="Change Password"
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
                  <Typography sx={{ fontWeight: 'bold' }}>Change your password here</Typography>

                  <FormControl fullWidth variant="outlined">
                    <TextField
                      type="password"
                      label="Current Password"
                      InputLabelProps={{ shrink: true }}
                      sx={({ spacing }) => ({
                        mt: spacing(2),
                      })}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </FormControl>

                  <FormControl fullWidth variant="outlined">
                    <TextField
                      type="password"
                      label="New Password"
                      InputLabelProps={{ shrink: true }}
                      sx={({ spacing }) => ({
                        mt: spacing(2),
                      })}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </FormControl>

                  <FormControl fullWidth variant="outlined">
                    <TextField
                      type="password"
                      label="Confirm New Password"
                      InputLabelProps={{ shrink: true }}
                      sx={({ spacing }) => ({
                        mt: spacing(2),
                      })}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </FormControl>
                </CardContent>

                {
                  // Show err msg if error is true
                  error && (
                    <Typography
                      sx={{
                        color: 'red',
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
                  // Show error msg if mutation is error
                  mutation.isError && (
                    <Typography
                      sx={{
                        color: 'red',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      The given current password does not match the current password
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
                      Password changed successfully!
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
                      Save Changes
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Box>
          </form>
        </Container>
      </main>
    </>
  );
};
export default ChangePassword;
