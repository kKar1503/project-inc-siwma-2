import React from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'




interface AdvertisementModalProps {
  companyName: string;
  description: string;
  onCloseClick: () => void;
}


const AdvertisementModal = ( { companyName, description, onCloseClick }: AdvertisementModalProps ) => {
  const handleShareClick = () => {
    axios
      .post('/api/listings', { companyName, description })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      

  };

  return (
    <Dialog open onClose={onCloseClick}>
      <DialogTitle>{companyName}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" >
          Show Me!
        </Button>
        <Button variant="contained"  onClick={onCloseClick} sx={{ color: 'black',  backgroundColor: 'white'  }} >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdvertisementModal;