import { useMemo } from 'react';
import { Typography, Button, Box, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useResponsiveness } from '@inc/ui';

const SuccessForgotPassword = () => {
  const router = useRouter();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const { spacing, shape, shadows, palette } = useTheme();

  const stylesBox = useMemo(() => {
    if (isSm) {
      return {
        boxShadow: shadows[5],
        px: '2rem',
        pb: '5rem',
        pt: spacing(1),
        position: 'relative',
        bgcolor: palette.common.white,
        ...shape,
      };
    }
    if (isMd) {
      return {
        boxShadow: shadows[5],
        px: '10rem',
        pb: '7rem',
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
        <Image src="/images/siwma-background.png" alt="logo" fill />
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
              sx={({ spacing }) => ({
                margin: 'auto',
                justifyContent: 'center',
                mt: spacing(5),
              })}
            >
              <CheckCircleIcon
                sx={({ spacing, palette }) => ({
                  position: 'relative',
                  display: 'flex',
                  margin: 'auto',
                  justifyContent: 'center',
                  color: palette.primary.main,
                  fontSize: '6rem',
                  mt: spacing(4),
                })}
              />
              <Typography
                align="center"
                sx={({ spacing, typography }) => ({
                  position: 'relative',
                  display: 'flex',
                  margin: 'auto',
                  justifyContent: 'center',
                  fontSize: typography.h5,
                  mt: spacing(5),
                  fontWeight: 'bold',
                })}
              >
                A link has been sent to your email account to reset your password.
              </Typography>

              <Typography
                align="center"
                sx={({ spacing, typography }) => ({
                  position: 'relative',
                  display: 'flex',
                  margin: 'auto',
                  justifyContent: 'center',
                  fontSize: typography.body2,
                  mt: spacing(3),
                })}
              >
                Please click on the link that has just been sent to your email account to carry on
                with resetting your password.
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleBackToLogin}
                sx={({ spacing }) => ({
                  mt: spacing(3),
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

SuccessForgotPassword.includeNavbar = false;
export default SuccessForgotPassword;
