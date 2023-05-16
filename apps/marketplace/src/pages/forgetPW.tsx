import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

const RegisterForm = () => {
  // const [errorMessage, setErrorMessage] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authResult = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    // if (!authResult?.ok) {
    //   setErrorMessage(true);
    // } else {
    //   return router.push('/');
    // }
  };

  console.log(companyName, userName, email, phoneNumber, password, confirmPassword);

  return (
    <Box>
      <Box
        sx={{
          width: '100vw',
          backgroundSize: 'cover',
        }}
      >
        <Image src="/../public/images/siwma-bg.png" alt="background_pic" fill />
        <Container
          component="main"
          maxWidth="md"
          sx={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
          }}
        >
          <Box
            sx={({ shape, shadows, spacing, palette }) => ({
              boxShadow: shadows[5],
              px: '10rem',
              pb: '10rem',
              pt: spacing(3),
              position: 'relative',
              bgcolor: palette.common.white,
              ...shape,
            })}
          >
            <Box
              sx={({ spacing }) => ({
                position: 'relative',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                width: '80%',
                height: '20%',
                mb: spacing(2),
              })}
            >
              <Image src="/../public/images/siwma-logo.jpg" alt="logo" fill />
            </Box>
            <Divider flexItem />
            <Box
              sx={({ spacing }) => ({
                mb: spacing(2),
              })}
            >
              <Typography
                sx={({ spacing, typography }) => ({
                  fontSize: typography.h5,
                  mt: spacing(3),
                  fontWeight: 'bold',
                })}
              >
                Forgot Password?
              </Typography>
              <Typography
                sx={({ spacing, typography }) => ({
                  mt: spacing(1),
                  fontSize: typography.body2,
                })}
              >
                Pelase enter your email.
              </Typography>
              <Typography
                sx={({ typography }) => ({
                  fontSize: typography.body2,
                })}
              >
                Instructions will be sent to your email to recover your lost account.
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                placeholder="Your Email"
                value={companyName}
                variant="standard"
                margin="normal"
                onChange={(e) => setEmail(e.target.value)} // change later!
              />

              {/* {errorMessage && (
                <Typography
                  sx={({ palette, spacing }) => ({
                    color: palette.error.main,
                    my: spacing(2),
                  })}
                >
                  Invalid email or password!
                </Typography>
              )} */}
              {/* <Grid
                container
                sx={({ spacing }) => ({
                  my: spacing(4),
                })}
              >
                <Grid item xs>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </Grid>
                <Grid item>
                  <Link href="/forgot-your-password">
                    <Typography
                      sx={({ spacing, palette }) => ({
                        mt: spacing(1),
                        color: palette.primary.main,
                      })}
                    >
                      Forgot your password?
                    </Typography>
                  </Link>
                </Grid>
              </Grid> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={({ spacing }) => ({
                  mt: spacing(4),
                })}
              >
                SEND EMAIL
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default RegisterForm;
