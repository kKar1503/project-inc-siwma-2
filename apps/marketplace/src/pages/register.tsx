import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { FormEvent, useMemo, useState } from 'react';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';

const Register = () => {
  const [company, setCompany] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const { spacing, shape, shadows, palette } = useTheme();
  // const router = useRouter();

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

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Company"
                placeholder="Company Name"
                value={company}
                variant="standard"
                autoFocus
                margin="normal"
                onChange={(e) => setCompany(e.target.value)}
              />

              <TextField
                fullWidth
                label="Full Name"
                placeholder="Full Name"
                value={userName}
                type="text"
                variant="standard"
                autoFocus
                margin="normal"
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                placeholder="Your Company's Email"
                value={email}
                variant="standard"
                autoFocus
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: '45%' }}
              />
              <TextField
                fullWidth
                label="Mobile Number"
                placeholder="Your Mobile Number"
                value={phone}
                variant="standard"
                autoFocus
                margin="normal"
                onChange={(e) => setPhone(e.target.value)}
                sx={{
                  float: 'right',
                  width: '45%',
                }}
              />
              <TextField
                fullWidth
                label="Password"
                placeholder="Your Password"
                value={password}
                variant="standard"
                autoFocus
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ width: '45%' }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                variant="standard"
                autoFocus
                margin="normal"
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{
                  float: 'right',
                  width: '45%',
                }}
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

export default Register;

// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Image from 'next/image';
// import { FormEvent, useState } from 'react';

// const RegisterForm = () => {
//   const [companyName, setCompanyName] = useState('');
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!companyName || !userName || !email || !phoneNumber || !password || !confirmPassword) {
//       alert('Please fill in all the fields!');
//     } else if (password !== confirmPassword) {
//       alert('Password does not match! Please try again');
//       setPassword('');
//       setConfirmPassword('');
//     }
//   };

//   return (
//     <Box>
//       <Box
//         sx={{
//           width: '100vw',
//           backgroundSize: 'cover',
//         }}
//       >
//         <Image src="/images/siwma-bg.png" alt="background_pic" fill />
//         <Container
//           component="main"
//           maxWidth="md"
//           sx={{
//             justifyContent: 'center',
//             display: 'flex',
//             flexDirection: 'column',
//             height: '100vh',
//           }}
//         >
//           <Box
//             sx={({ shape, shadows, spacing, palette }) => ({
//               boxShadow: shadows[5],
//               px: '8rem',
//               pb: '10rem',
//               pt: spacing(2),
//               position: 'relative',
//               bgcolor: palette.common.white,
//               ...shape,
//             })}
//           >
//             <Box
//               sx={({ spacing }) => ({
//                 position: 'relative',
//                 margin: 'auto',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 width: '80%',
//                 height: '20%',
//                 mb: spacing(1),
//               })}
//             >
//               <Image src="/images/siwma-logo.jpeg" alt="logo" fill />
//             </Box>
//             <Divider flexItem />
//             <Box
//               sx={({ spacing }) => ({
//                 mb: spacing(1),
//               })}
//             >
//               <Typography
//                 sx={({ spacing, typography }) => ({
//                   fontSize: typography.h5,
//                   mt: spacing(3),
//                   fontWeight: 'bold',
//                 })}
//               >
//                 Register Here
//               </Typography>
//               <Typography
//                 sx={({ typography }) => ({
//                   fontSize: typography.body2,
//                 })}
//               >
//                 Register your user details to create an account
//               </Typography>
//             </Box>
//             <Box component="form" onSubmit={handleSubmit}>
//               <TextField
//                 fullWidth
//                 label="Company Name"
//                 placeholder="Registerzzd Company Name"
//                 value={companyName}
//                 variant="standard"
//                 margin="normal"
//                 onChange={(e) => setCompanyName(e.target.value)}
//               />

//               <TextField
//                 fullWidth
//                 label="Full Name"
//                 placeholder="Your Full Name"
//                 value={userName}
//                 variant="standard"
//                 margin="normal"
//                 onChange={(e) => setUserName(e.target.value)}
//               />

//               <TextField
//                 label="Email"
//                 placeholder="Your Email"
//                 value={email}
//                 variant="standard"
//                 margin="normal"
//                 onChange={(e) => setEmail(e.target.value)}
//                 sx={{ width: '45.3%' }}
//               />

//               <TextField
//                 label="Mobile Number"
//                 placeholder="Your Mobile Number"
//                 value={phoneNumber}
//                 variant="standard"
//                 margin="normal"
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 sx={({ spacing }) => ({
//                   ml: spacing(4),
//                   width: '45.3%',
//                 })}
//               />

//               <TextField
//                 fullWidth
//                 label="Password"
//                 placeholder="Your password"
//                 value={password}
//                 type="password"
//                 variant="standard"
//                 onChange={(e) => setPassword(e.target.value)}
//                 sx={({ spacing }) => ({
//                   mt: spacing(1),
//                   width: '45.3%',
//                 })}
//               />

//               <TextField
//                 fullWidth
//                 label="Confirm Password"
//                 placeholder="Confirm Your password"
//                 value={confirmPassword}
//                 type="password"
//                 variant="standard"
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 sx={({ spacing }) => ({
//                   mt: spacing(1),
//                   ml: spacing(4),
//                   width: '45.3%',
//                 })}
//               />

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={({ spacing }) => ({
//                   mt: spacing(4),
//                 })}
//               >
//                 REGISTER
//               </Button>
//             </Box>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default RegisterForm;
