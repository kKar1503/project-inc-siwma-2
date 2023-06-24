import { FormEvent, useState, useMemo, useEffect } from 'react';
import { Typography, Button, Divider, TextField, Box, Container, Grid } from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useMutation } from 'react-query';
import createUser from '@/middlewares/createUser';
import { useRouter } from 'next/router';
import { validatePassword, validatePhone } from '@/utils/api/validate';
import { InvalidPasswordError, InvalidPhoneNumberError } from '@inc/errors/src';
import { Console } from 'console';

const Register = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const { spacing, shape, shadows, palette } = useTheme();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { query } = router;
      const token = Array.isArray(query.token) ? query.token[0] : query.token || '';

      if (token) {
        // Token retrieved from the URL
        setToken(token);
      }
    }
  }, [router]);

  const mutation = useMutation(() => {
    if (token) {
      // Only call createUser if the token is not null
      return createUser(token, phone, password);
    }
    throw new Error('Token not found');
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      try {
        validatePhone(phone);
        setPhoneError(false);
      } catch (error) {
        if (error) {
          setPhoneError(true);
        } else {
          throw error;
        }
      }

      try {
        validatePassword(password);
        setPasswordError(false);
        setPasswordErrorMessage('');
      } catch (error) {
        if (error) {
          setPasswordError(true);
          setPasswordErrorMessage('Password must be 8 characters or longer');
        } else {
          throw error;
        }
      }

      if (confirmPassword !== password) {
        setConfirmPasswordError(true);
      } else {
        setConfirmPasswordError(false);
      }

      if (
        !phoneError &&
        !passwordError &&
        !confirmPasswordError &&
        phone.trim() !== '' &&
        password.trim() !== '' &&
        confirmPassword === password
      ) {
        setPhone('');
        setPassword('');
        setConfirmPassword('');

        mutation.mutate();
      }
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error);
    }
  };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   let isPhoneValid = true;
  //   let isPasswordValid = true;

  //   try {
  //     validatePhone(phone);
  //     setPhoneError(false);
  //   } catch (error) {
  //     if (error instanceof InvalidPhoneNumberError) {
  //       setPhoneError(true);
  //       isPhoneValid = false;
  //     } else {
  //       throw error;
  //     }
  //   }

  //   try {
  //     validatePassword(password);
  //     setPasswordError(false);
  //     setPasswordErrorMessage('');
  //   } catch (error) {
  //     if (error instanceof InvalidPasswordError) {
  //       setPasswordError(true);
  //       setPasswordErrorMessage('Password must be 8 characters or longer');
  //       isPasswordValid = false;
  //     } else {
  //       throw error;
  //     }
  //   }

  //   if (confirmPassword !== password) {
  //     setConfirmPasswordError(true);
  //   } else {
  //     setConfirmPasswordError(false);
  //   }

  //   if (isPhoneValid && isPasswordValid && confirmPassword === password) {
  //     setPhone('');
  //     setPassword('');
  //     setConfirmPassword('');

  //     mutation.mutate();
  //   }
  // };

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push('/success-register');
    }
  }, [mutation.isSuccess, router]);

  const stylesBox = useMemo(() => {
    if (isSm) {
      return {
        boxShadow: shadows[5],
        px: '2rem',
        pb: '7rem',
        pt: spacing(3),
        position: 'relative',
        bgcolor: palette.common.white,
        ...shape,
      };
    }
    if (isMd) {
      return {
        boxShadow: shadows[5],
        px: '10rem',
        pb: '8rem',
        pt: spacing(3),
        position: 'relative',
        bgcolor: palette.common.white,
        ...shape,
      };
    }
    if (isLg) {
      return {
        boxShadow: shadows[5],
        px: '10rem',
        pb: '8rem',
        pt: spacing(3),
        position: 'relative',
        bgcolor: palette.common.white,
        ...shape,
      };
    }
    return {
      boxShadow: shadows[5],
      px: '10rem',
      pb: '10rem',
      pt: spacing(3),
      position: 'relative',
      bgcolor: palette.common.white,
      ...shape,
    };
  }, [isSm, isMd, isLg]);

  return (
    <Box>
      <Box
        sx={{
          width: '100vw',
          backgroundSize: 'cover',
        }}
      >
        <Box sx={{ width: '100%', height: '100%' }}>
          <Image
            src="/images/siwma-background.png"
            alt="logo"
            style={{ objectFit: 'cover' }}
            fill
          />
        </Box>
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
          <Box sx={stylesBox}>
            <Box
              sx={{
                position: 'relative',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: '20%',
                objectFit: 'fill',
              }}
            >
              <Image
                src="/images/siwma-logo.jpeg"
                alt="logo"
                fill
                style={{ objectFit: 'contain' }}
              />
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
                Register Here
              </Typography>
              <Typography
                sx={({ typography }) => ({
                  fontSize: typography.body1,
                })}
              >
                Register your user details to create an account
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Mobile Number"
                placeholder="Your Mobile Number"
                value={phone}
                variant="standard"
                margin="normal"
                onChange={(e) => setPhone(e.target.value)}
                error={phoneError}
                helperText={phoneError ? 'Please enter a valid Singapore phone number' : ''}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    placeholder="Your Password"
                    value={password}
                    type="password"
                    variant="standard"
                    margin="normal"
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                    helperText={passwordError ? passwordErrorMessage : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    type="password"
                    variant="standard"
                    margin="normal"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={confirmPasswordError}
                    helperText={confirmPasswordError ? 'Passwords do not match' : ''}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={({ spacing }) => ({
                  mt: spacing(3),
                })}
              >
                REGISTER
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

Register.includeNavbar = false;
export default Register;
