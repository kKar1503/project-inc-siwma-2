import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

const RegisterForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!companyName || !userName || !email || !phoneNumber || !password || !confirmPassword) {
      alert('Please fill in all the fields!');
    } else if (password !== confirmPassword) {
      alert('Password does not match! Please try again');
      setPassword('');
      setConfirmPassword('');
    } else {
      console.log(
        'Company Name: ',
        companyName,
        'User Name: ',
        userName,
        'Email: ',
        email,
        'Phone Number: ',
        phoneNumber,
        'Password: ',
        password,
        'Confirm Password: ',
        confirmPassword
      );
      setCompanyName('');
      setUserName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <Box>
      <Box
        sx={{
          width: '100vw',
          backgroundSize: 'cover',
        }}
      >
        <Image src="/../public/images/siwma-bg.png" alt="background_pic" fill />
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
              px: '8rem',
              pb: '10rem',
              pt: spacing(2),
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
                width: '80%',
                height: '20%',
                mb: spacing(1),
              })}
            >
              <Image src="/../public/images/siwma-logo.jpg" alt="logo" fill />
            </Box>
            <Divider flexItem />
            <Box
              sx={({ spacing }) => ({
                mb: spacing(1),
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
                  fontSize: typography.body2,
                })}
              >
                Register your user details to create an account
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Company Name"
                placeholder="Registerd Company Name"
                value={companyName}
                variant="standard"
                margin="normal"
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <TextField
                fullWidth
                label="Full Name"
                placeholder="Your Full Name"
                value={userName}
                variant="standard"
                margin="normal"
                onChange={(e) => setUserName(e.target.value)}
              />

              <TextField
                label="Email"
                placeholder="Your Email"
                value={email}
                variant="standard"
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: '45.3%' }}
              />

              <TextField
                label="Mobile Number"
                placeholder="Your Mobile Number"
                value={phoneNumber}
                variant="standard"
                margin="normal"
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={({ spacing }) => ({
                  ml: spacing(4),
                  width: '45.3%',
                })}
              />

              <TextField
                fullWidth
                label="Password"
                placeholder="Your password"
                value={password}
                type="password"
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
                sx={({ spacing }) => ({
                  mt: spacing(1),
                  width: '45.3%',
                })}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                placeholder="Confirm Your password"
                value={confirmPassword}
                type="password"
                variant="standard"
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={({ spacing }) => ({
                  mt: spacing(1),
                  ml: spacing(4),
                  width: '45.3%',
                })}
              />

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
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default RegisterForm;
