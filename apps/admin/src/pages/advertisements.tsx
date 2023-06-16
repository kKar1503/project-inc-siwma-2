import React from 'react';
import AdSpaceSection from '@/components/advertisementsDashboard/adSpaceSection';
import Box from '@mui/material/Box';

const AdvertisementDashboard = () => {

  return (
    <div>
      <h1>Advertisement Dashboard</h1>
      <Box sx={{
        width: '50%',
        marginLeft: '15%',
      }}>
        <AdSpaceSection />
      </Box>
    </div>
  );
};

export default AdvertisementDashboard;

