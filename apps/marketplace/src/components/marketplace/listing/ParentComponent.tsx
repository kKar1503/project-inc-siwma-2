import React, { useState } from 'react';
import { Button } from '@mui/material';
import AdvertisementModal from './AdvertisementModal';

const ParentComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');

  const handleOpenModalClick = () => {
    setIsModalOpen(false);
  };

  const handleCloseModalClick = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpenModalClick}>
        Open Advertisement Modal
      </Button>
      <AdvertisementModal companyName={companyName} description={description} onCloseClick={handleCloseModalClick} />
    </>
  );
};

export default ParentComponent;