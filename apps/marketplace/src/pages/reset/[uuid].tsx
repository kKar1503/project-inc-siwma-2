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
    
  
    if (password !== confirmPassword) {
        setErrorMessage(true);

      }
    else {
      setErrorMessage(false);
      console.log(token,uuid)
      setPasswordApi(password)  
    }
  };
  


  const stylesReset = useMemo(() => {
    if (isSm) {
      return {
       
        boxShadow: shadows[5],
        border: 1,
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
        border: 1,
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
          <Box sx={stylesReset}>
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
