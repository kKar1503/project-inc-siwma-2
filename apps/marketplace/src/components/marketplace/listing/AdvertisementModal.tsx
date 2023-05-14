import React, {useState} from 'react'
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
  onClose: () => void;
  url: string;
}


const AdvertisementModal = ( { id, companyName, description, url,  onClose }: AdvertisementModalProps ) => {
  const [open, setOpen] = useState(true);
  
  const router = useRouter();

  const handleRedirect = () => {
  router.push(url);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{companyName}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRedirect}  variant="contained" color="primary" >
        Show Me!
        </Button>
        <Button variant="text" onClick={onClose} sx={{ color: 'black',  backgroundColor: 'white'  }} >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdvertisementModal;