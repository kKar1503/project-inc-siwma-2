import { FormEvent, useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';

const Register = () => {
  const [company, setCompany] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyError, setCompanyError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const { spacing, shape, shadows, palette } = useTheme();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check input validations
    if (company.trim() === '') {
      // Set error state for company field
      setCompanyError(true);
    } else {
      // Reset error state for company field
      setCompanyError(false);
    }

    if (userName.trim() === '') {
      // Set error state for username field
      setUserNameError(true);
    } else {
      // Reset error state for username field
      setUserNameError(false);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '' || !emailRegex.test(email)) {
      // Set error state for email field
      setEmailError(true);
    } else {
      // Reset error state for email field
      setEmailError(false);
    }

    // Validate phone number format (to have 8 numbers)
    const phoneRegex = /^\d{8}$/;
    if (phone.trim() === '' || !phoneRegex.test(phone)) {
      // Set error state for phone field
      setPhoneError(true);
    } else {
      // Reset error state for phone field
      setPhoneError(false);
    }

    if (password.trim() === '') {
      // Set error state for password field
      setPasswordError(true);
    } else {
      // Reset error state for password field
      setPasswordError(false);
    }

    if (confirmPassword !== password) {
      // Set error state for confirm password field
      setConfirmPasswordError(true);
    } else {
      // Reset error state for confirm password field
      setConfirmPasswordError(false);
    }

    // Perform form submission logic if all inputs are valid
    if (
      company.trim() !== '' &&
      userName.trim() !== '' &&
      emailRegex.test(email) &&
      phoneRegex.test(phone) &&
      password.trim() !== '' &&
      confirmPassword === password
    ) {
      // Perform form submission logic here
      console.log('Form submitted');
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
      <Box>
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
                Register Here
              </Typography>
              <Typography
                sx={({ typography }) => ({
                  fontSize: typography.body1,
                })}
              >
                Register your user details to create an account
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Company"
                placeholder="Company Name"
                value={company}
                variant="standard"
                autoFocus
                margin="normal"
                onChange={(e) => setCompany(e.target.value)}
                error={companyError}
                helperText={companyError ? 'Company field is required' : ''}
              />

              <TextField
                fullWidth
                label="Full Name"
                placeholder="Full Name"
                value={userName}
                type="text"
                variant="standard"
                margin="normal"
                onChange={(e) => setUserName(e.target.value)}
                error={userNameError}
                helperText={userNameError ? 'Username field is required' : ''}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    placeholder="Your Company's Email"
                    value={email}
                    variant="standard"
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                    helperText={emailError ? 'Invalid email format' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    placeholder="Your Mobile Number"
                    value={phone}
                    variant="standard"
                    margin="normal"
                    onChange={(e) => setPhone(e.target.value)}
                    error={phoneError}
                    helperText={phoneError ? 'Invalid phone number' : ''}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    placeholder="Your Password"
                    value={password}
                    type="password"
                    variant="standard"
                    margin="normal"
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                    helperText={passwordError ? 'Password is required' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    type="password"
                    variant="standard"
                    margin="normal"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={confirmPasswordError}
                    helperText={confirmPasswordError ? 'Passwords do not match' : ''}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={({ spacing }) => ({
                  mt: spacing(4),
                })}
              >
                REGISTER
              </Button>
            </form>

            {/* <Box>
              <CheckCircleIcon
                sx={({ spacing, palette }) => ({
                  position: 'relative',
                  display: 'flex',
                  margin: 'auto',
                  justifyContent: 'center',
                  color: palette.primary.main,
                  fontSize: '6rem',
                  mt: spacing(4),
                  mb: spacing(1),
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
                  fontWeight: 'bold',
                })}
              >
                You have successfully registered.
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
            </Box> */}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
export default Register;
