import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const authResult = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (!authResult!.ok) {
      setErrorMessage(true);
    } else {
      return {
        redirect: {
          destination: '/index',
        },
      };
    }
    console.log(authResult);

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
        <Image src="/../public/images/siwma-bg.png" alt="logo" fill />
        <Container
          component="main"
          maxWidth="sm"
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
              px: spacing(4),
              py: spacing(4),
              position: 'relative',
              bgcolor: palette.common.white,
              ...shape,
            })}
          >
            <Image
              src="/../public/images/favicons/Siwma-logo.jpeg"
              alt="logo"
              width={460}
              height={80}
            />
            <Divider flexItem />
            <Typography
              sx={({ spacing, typography }) => ({
                fontSize: typography.h5,
                mt: spacing(2),
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
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="email"
                id="email"
                label="E-mail"
                placeholder="Your company e-mail"
                value={email}
                // autoComplete="email"
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
                // autoComplete="current-password"
                type="password"
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <Typography
                  sx={({ palette }) => ({
                    color: palette.error.main,
                  })}
                >
                  Invalid email or password
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
                  <Link href="/forgot-your-password">
                    <Typography
                      sx={({ spacing }) => ({
                        mt: spacing(1),
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

export default LoginForm;
