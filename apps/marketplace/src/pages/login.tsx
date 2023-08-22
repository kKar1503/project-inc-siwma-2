import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/router';
import { FormEvent, useMemo, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useResponsiveness, useTogglePasswordVisibility } from '@inc/ui';
import NoInternetConnection from '@/components/NoInternet';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const { spacing, shape, shadows, palette } = useTheme();
  const { showPassword, handleTogglePassword } = useTogglePasswordVisibility();
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authResult = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (!authResult?.ok) {
      setErrorMessage(true);
    } else {
      // Check if there is a redirect parameter in the router's query object
      const redirect = router.query.redirect as string;

      // If it exists, redirect the user to that URL
      if (redirect) {
        return router.push(redirect);
      }

      // Otherwise, redirect the user to the root page
      return router.push('/');
    }

    return authResult;
  };

  const stylesLogin = useMemo(() => {
    if (isSm) {
      return {
        boxShadow: shadows[5],
        px: '2rem',
        pb: '9rem',
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
          <Box sx={stylesLogin}>
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
                {t('Sign In')}
              </Typography>
              <Typography
                sx={({ typography }) => ({
                  fontSize: typography.body1,
                })}
              >
                {t('Please sign in to your account')}
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="email"
                id="email"
                label={t('E-mail')}
                placeholder= {t('Your company e-mail').toString()}
                value={email}
                type="email"
                variant="standard"
                autoFocus
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                fullWidth
                name="password"
                id="password"
                label={t('Password')}
                placeholder= {t('Your password').toString()}
                value={password}
                type={showPassword ? 'text' : 'password'}
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={({ palette }) => ({
                          color: palette.grey[600],
                        })}
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errorMessage && (
                <Typography
                  sx={({ palette, spacing }) => ({
                    color: palette.error.main,
                    my: spacing(2),
                  })}
                >
                  Invalid email or password!
                </Typography>
              )}
              <Grid
                container
                sx={({ spacing }) => ({
                  my: spacing(4),
                })}
              >
                <Grid item xs>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label= {t('Remember me')}
                  />
                </Grid>
                <Grid item>
                  <Link href="/forgot-password">
                    <Typography
                      sx={({ spacing, palette }) => ({
                        mt: spacing(1),
                        color: palette.primary.main,
                      })}
                    >
                      {t('Forgot your password?')}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained">
                {t('SIGN IN')}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

LoginForm.includeNavbar = false;
LoginForm.allowAuthenticated = false;
LoginForm.allowNonAuthenticated = true;

export default LoginForm;
