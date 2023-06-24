import {
  Typography,
  Button,
  Divider,
  TextField,
  Box,
  Container,
  FormHelperText,
} from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { FormEvent, useMemo, useState } from 'react';
import { useResponsiveness } from '@inc/ui';
import { useRouter } from 'next/router';
import apiClient from '@/utils/api/client/apiClient';
import { validatePassword } from '@/utils/api/validate';

const ResetForm = () => {
  const router = useRouter();
  const { uuid, token } = router.query;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const { spacing, shape, shadows, palette } = useTheme();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      validatePassword(password);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      }
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Password is not the same');
    } else {
      setErrorMsg('');
      const response = await apiClient
        .post(`v1/users/${uuid}/reset-password`, {
          newPassword: password,
          token,
        })
        .catch((error) => {
          if (error && error.status === 403) {
            setErrorMsg('Token Expired');
          }
          if (error && error.status === 422) {
            setErrorMsg('User not found!');
          }
        });
      if (response && response.status === 204) {
        router.push('/reset-password/success');
      }
    }
  };

  const stylesBox = useMemo(() => {
    if (isSm) {
      return {
        boxShadow: shadows[5],
        px: '2rem',
        pb: '5rem',
        pt: '2rem',
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
        pt: '4rem',
        position: 'relative',
        bgcolor: palette.common.white,
        ...shape,
      };
    }
    if (isLg) {
      return {
        boxShadow: shadows[5],
        px: '10rem',
        pb: '5rem',
        pt: '4rem',
        position: 'relative',
        bgcolor: palette.common.white,
        ...shape,
      };
    }
    return {
      border: 'none',
      boxShadow: shadows[5],
      px: '10rem',
      pb: '15rem',
      pt: spacing(2),
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
        <Image src="/images/siwma-background.png" alt="logo" style={{ objectFit: 'cover' }} fill />
        <Container
          component="main"
          maxWidth="md"
          sx={{
            justifyContent: 'center',
            display: 'flex',
            objectFit: 'contain',
            flexDirection: 'column',
            height: '100vh',
          }}
        >
          <Box sx={stylesBox}>
            <Box
              sx={({ spacing }) => ({
                position: 'relative',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: '20%',
                mb: spacing(2),
              })}
            >
              <Image
                src="/images/siwma-logo.jpeg"
                alt="logo"
                style={{ objectFit: 'contain' }}
                fill
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
                Reset Password
              </Typography>
              <Typography
                sx={({ typography }) => ({
                  fontSize: typography.body1,
                })}
              >
                Please enter your new password
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="password"
                id=" password"
                label="New password"
                placeholder="New password"
                value={password}
                type="password"
                variant="standard"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                fullWidth
                name="confirmPassword"
                id="confirmPassword"
                label="Confirm new Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                type="password"
                required
                variant="standard"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {errorMsg && (
                <FormHelperText
                  sx={({ typography, palette }) => ({
                    fontSize: typography.body1,
                    color: palette.error.main,
                  })}
                >
                  {errorMsg}
                </FormHelperText>
              )}
              <Button
                sx={({ spacing }) => ({
                  my: spacing(4),
                })}
                type="submit"
                fullWidth
                variant="contained"
              >
                CHANGE PASSWORD
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

ResetForm.includeNavbar = false;
export default ResetForm;
