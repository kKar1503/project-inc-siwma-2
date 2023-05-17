import AdvertisementModal from '@/components/marketplace/listing/AdvertisementModal';
import { Button } from '@mui/material';
import React, { useState } from 'react';

const Test = () => {

    const [isOpen, setIsOpen] = useState(false);

  const handleClose = (val: boolean) => {
    setIsOpen(false);
  };

  const handleButtonClickWrapper: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    handleClose(true);
  };

    return (
        <div>
        <Button   onClick={() => setIsOpen(true)}> Modal</Button>
        <AdvertisementModal id={1} companyName='Shi lin Fang Metal Comapany 1' description='Are you looking for high-quality metalwork products that are durable and made to last? Look no further than SHI LI FANG IRONWORKS PTE. Our team of skilled craftsmen and engineers use only the best ' onClose={handleClose} open={isOpen} url= "gonextpage"/>
        </div>
      );
};

export default Test;