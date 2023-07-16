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
  const isSmallOrMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      marginLeft={isSmallOrMediumScreen ? 0 : '300px'}
      sx={{ mt: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)' }}
    >
      <Form />
    </Box>
  );
};

export default AdvertisementUpload;
