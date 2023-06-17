import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import ProfileDetailCard, {
  ProfileDetailCardProps,
} from '@/components/marketplace/profile/ProfileDetailCard';
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
import LinearProgress from '@mui/material/LinearProgress';

export type ProfilePageProps = {
  data: ProfileDetailCardProps;
};

const ChangePassword = ({ data }: { data: ProfileDetailCardProps }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({
      newPassword,
    });
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
            </Box>
          </form>
        </Container>
      </main>
    </>
  );
};
export default ChangePassword;
