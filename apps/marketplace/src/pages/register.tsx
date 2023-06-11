import { FormEvent, useState, useMemo, useEffect } from 'react';
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
import createUser from '@/middlewares/createUser';
import { PostUserRequestBody } from '@/utils/api/server/zod';
import { useRouter } from 'next/router';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useQuery } from 'react-query';

const useCreateUserQuery = (
  company: string,
  email: string,
  password: string,
  userName: string,
  phone: string,
  token: string | undefined
) => {
  const { data, isError } = useQuery(
    ['createUser'],
    () => createUser(company, email, password, userName, phone, token as string),
    {
      enabled:
        token !== undefined &&
        company !== undefined &&
        email !== undefined &&
        password !== undefined &&
        userName !== undefined &&
        phone !== undefined,
    }
  );
  return { data, isError };
};

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
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const { spacing, shape, shadows, palette } = useTheme();
  const router = useRouter();
  const { token } = router.query;
  const createUser = useCreateUserQuery(company, email, phone, userName, password, token as string);

  useEffect(() => {
    if (createUser?.isError) {
      alert('Respond did not went through');
    } else if (createUser?.data === 204) {
      alert('Respond went through');
      const handleBackToLogin = () => {
        window.location.href = '/login';
      };

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
          sx={({ typography }) => ({
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
      </Box>;
    }
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateField = (
      field: string,
      value: string,
      regex: RegExp,
      errorStateSetter: (error: boolean) => void
    ) => {
      if (value.trim() === '' || !regex.test(value)) {
        errorStateSetter(true);
        return false;
      }
      errorStateSetter(false);
      return true;
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{8}$/;

    const isCompanyValid = validateField('company', company, /.+/, setCompanyError);
    const isUserNameValid = validateField('userName', userName, /.+/, setUserNameError);
    const isEmailValid = validateField('email', email, emailRegex, setEmailError);
    const isPhoneValid = validateField('phone', phone, phoneRegex, setPhoneError);
    const isPasswordValid = validateField('password', password, /.+/, setPasswordError);
    const isConfirmPasswordValid = confirmPassword === password;

    if (
      isCompanyValid &&
      isUserNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      const handleBackToLogin = () => {
        window.location.href = '/login';
      };
      const successRespond = (
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
            sx={({ typography }) => ({
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
        </Box>
      );
      const userData = {
        company,
        userName,
        email,
        phone,
        password,
      };
      console.log(userData);
      return successRespond;
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
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
export default Register;
