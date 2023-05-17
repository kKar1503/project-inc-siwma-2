import AdvertisementModal from '@/components/marketplace/listing/AdvertisementModal';
import { Button } from '@mui/material';
import React, { useState } from 'react';

const Test = () => {
   
    const [isOpen, setIsOpen] = useState(false);

  const handleClose = (val: boolean) => {
    setIsOpen(val);
  };

  const handleButtonClickWrapper: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    handleClose(true);
  };

    return (
        <div>
        <Button   onClick={() => setIsOpen(true)}> Modal</Button>
        <AdvertisementModal id={1} companyName='Company1' description='Display random data' onClose={(handleClose)} open={isOpen} url= "gonextpage"/>
        </div>
      );
   
};

export default Test;