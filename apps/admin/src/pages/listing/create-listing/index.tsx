import React, { useState } from 'react';
import {
  Box,
  useMediaQuery,
  useTheme,
  Button,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import Modal from '@inc/ui/lib/components/Modal';
import Form from './form';

const AdvertisementUpload = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 3,
        mb: 3,
        ml: 3,
        mr: 3,
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Form />
    </Box>
  );
};

export default AdvertisementUpload;
