import { FormEvent, useMemo, useState } from 'react';
import { Typography, Button, Box, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useResponsiveness } from '@inc/ui';
import NoInternetConnection from '@/components/NoInternet';

const ResetPassword = () => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const { spacing, shape, shadows, palette } = useTheme();
  const router = useRouter();

  const stylesBox = useMemo(() => {
    if (isSm) {
      return {
        boxShadow: shadows[5],
        px: '2rem',
        pb: '5rem',
        pt: spacing(3),
        position: 'relative',
        bgcolor: palette.common.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...shape,
      };
    }
    if (isMd) {
      return {
        boxShadow: shadows[5],
        px: '10rem',
        pb: '4rem',
        pt: spacing(3),
        position: 'relative',
        bgcolor: palette.common.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...shape,
      };
    }
    if (isLg) {
      return {
        boxShadow: shadows[5],
        px: '10rem',
        pb: '4rem',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: palette.common.white,
      ...shape,
    };
  }, [isSm, isMd, isLg]);

  const handleBackToLogin = () => {
    router.push('/login');
  };

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
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Box sx={stylesBox}>
            <Box
              sx={({ spacing }) => ({
                justifyContent: 'center',
                mt: spacing(5),
              })}
            >
              <CheckCircleIcon
                sx={({ palette }) => ({
                  position: 'relative',
                  display: 'flex',
                  margin: 'auto',
                  justifyContent: 'center',
                  color: palette.primary.main,
                  fontSize: '6rem',
                })}
              />
              <Typography
                align="center"
                sx={({ typography }) => ({
                  position: 'relative',
                  display: 'flex',
                  margin: 'auto',
                  justifyContent: 'center',
                  fontSize: typography.h5,
                  fontWeight: 'bold',
                })}
              >
                Password has been successfully changed!
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleBackToLogin}
                sx={({ spacing }) => ({
                  mt: spacing(5),
                })}
              >
                BACK TO LOGIN
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

ResetPassword.includeNavbar = false;
export default ResetPassword;
