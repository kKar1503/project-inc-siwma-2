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
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Image from 'next/image';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useTogglePasswordVisibility } from '@inc/ui';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const { showPassword, handleTogglePassword } = useTogglePasswordVisibility();
  const router = useRouter();

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
      return router.push('/');
    }

    return authResult;
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
          <Box
            sx={({ shape, shadows, spacing, palette }) => ({
              boxShadow: shadows[5],
              px: '10rem',
              pb: '15rem',
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
                Sign In
              </Typography>
              <Typography
                sx={({ typography }) => ({
                  fontSize: typography.body1,
                })}
              >
                Please sign in to your account
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="email"
                id="email"
                label="E-mail"
                placeholder="Your company e-mail"
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
                label="Password"
                placeholder="Your password"
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
                    label="Remember me"
                  />
                </Grid>
                <Grid item>
                  <Link href="/forgotpw">
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
              </Grid>
              <Button type="submit" fullWidth variant="contained">
                SIGN IN
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

LoginForm.includeNavbar = false;
export default LoginForm;
