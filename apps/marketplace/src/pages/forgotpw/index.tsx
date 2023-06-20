import { FormEvent, useMemo, useState } from 'react';
import {
  Typography,
  Button,
  Divider,
  TextField,
  FormControl,
  FormHelperText,
  Box,
  Container,
} from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import forgetPW from '@/middlewares/forget-password';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const router = useRouter();
  const { spacing, shape, shadows, palette } = useTheme();

  const mutation = useMutation((email: string) => forgetPW(email), {
    onSuccess: () => {
      router.push('/success-forgot-password');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidEmail = (value: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };

    if (!email) {
      setEmailError('Email is required');
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
      mutation.mutate(email);
    }
  };

  const stylesBox = useMemo(() => {
    if (isSm) {
      return {
        boxShadow: shadows[5],
        px: '2rem',
        pb: '6rem',
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
        pb: '5rem',
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
        pb: '10rem',
        pt: spacing(3),
        position: 'relative',
        bgcolor: palette.common.white,
        ...shape,
      };
    }
    return {
      boxShadow: shadows[5],
      px: '10rem',
      pb: '15rem',
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
          <Image src="/images/siwma-bg.png" alt="logo" style={{ objectFit: 'cover' }} fill />
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
                height: '10%',
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
                mb: spacing(1),
                mt: spacing(3),
              })}
            >
              <Typography
                sx={({ typography }) => ({
                  fontSize: typography.h5,
                  fontWeight: 'bold',
                })}
              >
                Forgot Password
              </Typography>
              <Typography
                sx={({ typography, spacing }) => ({
                  fontSize: typography.body1,
                  mt: spacing(1),
                })}
              >
                Please enter your email.
              </Typography>
              <Typography
                sx={({ typography }) => ({
                  fontSize: typography.body1,
                })}
              >
                Instructions will be sent to your email to recover your lost account.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal" error={Boolean(emailError)}>
                <TextField
                  fullWidth
                  name="email"
                  id="email"
                  label="Email"
                  placeholder="Your company's email"
                  value={email}
                  type="email"
                  variant="standard"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <FormHelperText>{emailError}</FormHelperText>}
              </FormControl>

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

ForgetPassword.includeNavbar = false;
export default ForgetPassword;