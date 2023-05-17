import React from 'react'
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { useRouter } from 'next/router';




interface AdvertisementModalProps {
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
      <DialogTitle>{companyName}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRedirect}  variant="contained"  sx={({ palette }) => ({
            color:  palette.common.white,
            backgroundColor: palette.primary.main
          })}
          >
        Show Me!
        </Button>
        <Button onClick={() => onClose(false)}
          sx={({ palette }) => ({
            color: palette.common.black,
            backgroundColor: palette.common.white
          })}
          >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdvertisementModal;