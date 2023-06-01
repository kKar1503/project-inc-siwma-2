import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { FormEvent, useMemo, useState } from 'react';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const { spacing, shape, shadows, palette } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              <Image src="/images/siwma-logo.jpeg" alt="logo" fill />
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
                Forgot Password
              </Typography>
              <Typography
                sx={({ typography }) => ({
                  fontSize: typography.body1,
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
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
              />

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

export default ForgetPassword;
