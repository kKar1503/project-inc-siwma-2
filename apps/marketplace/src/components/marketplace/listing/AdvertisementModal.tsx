import React from 'react'
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';




export type AdvertisementModalProps = {
  id: number;
  companyName: string;
  description: string;
  onClose: ( val:boolean ) => void;
  open: boolean;
  url: string;
}


const AdvertisementModal = ( { id, companyName, description, url,  onClose, open }: AdvertisementModalProps ) => {




  const router = useRouter();

  const handleRedirect = () => {
  router.push(url);
  };

  return (
    <Dialog open={open} onClose={() => onClose(true)}>
      <Box  display="flex" justifyContent="center">
      <DialogTitle
      sx={({palette,typography}) => ({  
        alignItems: 'center',
        fontWeight: 'bold', 
        color:  palette.common.black,
        fontSize: typography.h5
        })}>
        {companyName}</DialogTitle>
      </Box>
      <DialogContent>
        <DialogContentText 
        sx={({ palette , typography}) => ({   
          color:  palette.common.black,
          fontSize: typography.subtitle1
        })}>
        {description}</DialogContentText>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleRedirect}  variant="contained"  sx={({ palette,spacing }) => ({
            marginTop: spacing(3),
            marginBottom: spacing(2),
            border: '4px',
            color:  palette.common.white,
            backgroundColor: palette.primary.main
          })}
          >
        Show Me!
        </Button>
        <Button variant='outlined' onClick={() => onClose(false)}
          sx={({ palette,spacing }) => ({
            marginTop: spacing(3),
            marginBottom: spacing(2),
            marginRight: spacing(3),
            border: '4px ',
            color: palette.common.black,
            backgroundColor: palette.background.default
          })}
          >
          Close
        </Button>
      </DialogActions>
    </Dialog> 
  );
};

export default AdvertisementModal;