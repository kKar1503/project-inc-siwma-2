import { FormEvent, useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const { spacing, shape, shadows, palette } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      setEmailError(''); // Reset the email error when the email is valid
      console.log('submitted');
    }
  };

  const stylesBox = useMemo(() => {
    if (isSm) {
      return {
        boxShadow: shadows[5],
        px: '5rem',
        pb: '10rem',
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
        pb: '12rem',
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
        pb: '15rem',
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

  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <Box>
      <Box
        sx={{
          width: '100vw',
          backgroundSize: 'cover',
        }}
      >
        <Image src="/images/siwma-bg.png" alt="logo" fill />
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
             sx={({ spacing, }) => ({
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

export default ResetPassword;
