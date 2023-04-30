import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, colors } from '@mui/material';
import axios from 'axios';


interface AdvertisementModalProps {
  companyName: string;
  description: string;
  onCloseClick: () => void;
}


const AdvertisementModal: React.FC<AdvertisementModalProps> = ({ companyName, description, onCloseClick }) => {
  
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
        <Button variant="contained" color="primary" onClick={handleShareClick}>
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