import {
  Typography,
  Button,
  Divider,
  TextField,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
} from '@mui/material';
// rmb to edit the imports
import Link from 'next/link';
import Image from 'next/image';

const LoginForm = () => (
  // const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };
  <Box>
    <Box sx={{ zIndex: -1, opacity: 0.7 }}>
      <Image src="/../public/images/favicons/siwma-bg.jpg" alt="logo" fill />
    </Box>
          <Container sx={{ zIndex: 1500 }} component="main" maxWidth="sm">  
      <Box
        // onSubmit={handleSubmit}
        sx={({ shape, shadows, spacing, palette }) => ({
          // backgroundImage= `url('/../public/images/favicons/siwma-bg.jpg')`,
          boxShadow: shadows[5],
          mt: spacing(3),
          px: spacing(4),
          py: spacing(4),
          bgcolor: palette.common.white,
          ...shape,
        })}
      >
        <Image src="/../public/images/favicons/Siwma-logo.png" alt="logo" width={450} height={80} />
        <Divider flexItem />
        <Typography variant="h5" sx={{ fontWeight: 'Bold', mt: 2 }}>
          Sign In
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 16 }}>
          Please sign in to your account
        </Typography>
        <Box component="form">
          <TextField
            fullWidth
            name="email"
            id="email"
            label="E-mail"
            placeholder="Your company e-mail"
            // autoComplete="email"
            type="email"
            variant="standard"
            autoFocus
            margin="normal"
          />
          <TextField
            fullWidth
            name="password"
            id="password"
            label="Password"
            placeholder="Your password"
            // autoComplete="current-password"
            type="password"
            variant="standard"
          />
          <Grid container sx={{ my: 4 }}>
            <Grid item xs>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
            <Grid item>
              <Link href="/forgot-your-password">
                <Typography sx={{ mt: 1 }}>Forgot your password?</Typography>
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
);

export default LoginForm;
