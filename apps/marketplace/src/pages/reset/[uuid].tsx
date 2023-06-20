import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useRouter } from 'next/router';
import resetpassword from '@/middlewares/resetpassword';
import { useQuery } from 'react-query';
import { string } from 'zod';


const useResetPassword = (password:string , token:string|undefined, uuid:string|undefined ) => {
  const {data,isError} = useQuery(['resetpassword'], () => resetpassword (password ,token as string ,uuid as string  ) ,
  {enabled: token !== undefined && uuid !== undefined && password.trim() !== ''});
  return {data,isError}
} 


const ResetForm = () => {
  const router = useRouter();
  const {uuid,token} = router.query 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [regMessage, setRegMessage] = useState(false);
  const [passwordapi, setPasswordApi ] = useState('');
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const { spacing, shape, shadows, palette } = useTheme();
  
  const resetpassword = useResetPassword(passwordapi,token as string ,uuid as string );

  useEffect(() => {
    if (resetpassword?.isError){
      alert('Response did not went through')
    }
    if (resetpassword?.data === 204){
      alert('Response  went through')
      router.push('/reset/resetcfm')
    }
    
  
  },[resetpassword, router])  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isValidPassword = (value: string): boolean => {
      const passRegex = /^[a-zA-Z0-9]{8}$/;
      return passRegex.test(value);
    };
  
    if (password !== confirmPassword ) {
        setErrorMessage(true);
      }

    else if (isValidPassword(password) ) {
      setErrorMessage(false);
      setRegMessage(true)
    }

    else {
      setErrorMessage(false);
      setPasswordApi(password)  
    }
  };
  


  const stylesBox = useMemo(() => {
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
        pb: '5rem',
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
        pb: '8rem',
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
  }, [isSm,isMd,isLg]);

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
                Reset Password
              </Typography>
              <Typography
                sx={({ typography }) => ({
                  fontSize: typography.body1,
                })}
              >
                Please enter your new password
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>

              <TextField
                fullWidth
                name="password"
                id=" password"
                label="New password"
                placeholder="New password"
                value={password}
                type="password"
                variant="standard"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
                <TextField
                    fullWidth
                    name="confirmPassword"
                    id="confirmPassword"
                    label="Confirm new Password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    type="password"
                    required
                    variant="standard"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
              
              {errorMessage && (
                <Typography
                  sx={({ palette, spacing }) => ({
                    color: palette.error.main,
                    my: spacing(2),
                  })}
                >
                  The passwords does not match
                </Typography>
              )}
               {regMessage && (
                <Typography
                  sx={({ palette, spacing }) => ({
                    color: palette.error.main,
                    my: spacing(2),
                  })}
                >
                  Min of 8 characters
                </Typography>
              )}
              <Button
               sx={({ spacing }) => ({
                my: spacing(4),
              })}
               type="submit" fullWidth variant="contained">
                CHANGE PASSWORD
              </Button>
            </Box>
            
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ResetForm;
