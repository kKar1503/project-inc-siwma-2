import AdSpaceSection from '@/components/advertisementsDashboard/adSpaceSection';
import Box from '@mui/material/Box';

const AdvertisementDashboard = () => (
    <div>
      <h1>Advertisement Dashboard</h1>
      <AdSpaceSection />
      <Box>
        <Box style={{ border: 'red' }} />
        <Box style={{ border: 'red' }} />
      </Box>
    </div>
  );

export default AdvertisementDashboard;

