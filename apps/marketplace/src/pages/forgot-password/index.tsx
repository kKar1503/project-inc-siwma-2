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
import { useResponsiveness } from '@inc/ui';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import forgetPW from '@/services/forget-password';
import { validateEmail } from '@/utils/api/validate';

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const router = useRouter();
  const { spacing, shape, shadows, palette } = useTheme();

  const mutation = useMutation((email: string) => forgetPW(email), {
    onSuccess: () => {
      router.push('/forgot-password/success');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      validateEmail(email);
      setEmailError('');
      mutation.mutate(email);
    } catch (error) {
      setEmailError('Please enter a valid email address');
    }
  };

  const stylesBox = useMemo(() => {
    if (isSm) {
      return {
        boxShadow: shadows[5],
        px: '2rem',
        pb: '5.5rem',
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
        pb: '5.5rem',
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
        pb: '5.5rem',
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
    <Box
      sx={{
        width: '100vw',
        backgroundSize: 'cover',
      }}
    >
      <Box sx={{ width: '100%', height: '100%' }}>
        <Image src="/images/siwma-background.png" alt="logo" style={{ objectFit: 'cover' }} fill />
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
            <Image src="/images/siwma-logo.jpeg" alt="logo" fill style={{ objectFit: 'contain' }} />
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
  );
};

ForgetPassword.noInternet = false;
ForgetPassword.includeNavbar = false;
ForgetPassword.allowNonAuthenticated = true;

export default ForgetPassword;
