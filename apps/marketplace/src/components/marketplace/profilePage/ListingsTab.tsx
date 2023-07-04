import React from 'react';
import Box from '@mui/material/Box';
import { useResponsiveness } from '@inc/ui';

const ListingsTab = () => {
  const [isSm] = useResponsiveness(['sm']);

  return (
      <Box sx={{ display: 'flex', justifyContent: isSm ? 'center' : 'flex-start' }}>
        {/* nth here */}
      </Box>
  );
};

export default ListingsTab;
