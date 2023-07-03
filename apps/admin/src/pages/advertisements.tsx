import AdSpaceSection from '@/components/advertisementsDashboard/adSpaceSection';
import Grid from '@mui/material/Grid';
import ActiveGraph from '@/components/advertisementsDashboard/activeGraph';
import ClicksPie from '@/components/advertisementsDashboard/clicksPie';
import { useQuery } from 'react-query';
import fetchAdSpaceData from '@/middlewares/fetchAdSpaceData';
import Debug from '@/components/Debug';

const useGetAdSpaceDataQuery = () => {
  const { data } = useQuery('adSpace', async () => fetchAdSpaceData());
  return data;
};


const AdvertisementDashboard = () => {
  const apiData = useGetAdSpaceDataQuery();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={2} lg={2}>
        <Debug>NAVBAR</Debug>
      </Grid>
      <Grid item xs={12} md={7} lg={7}>
        <Debug>
          <AdSpaceSection />
        </Debug>
      </Grid>
      <Grid item container xs={12} md={3} lg={3}>
        <Grid item xs={6} md={12} lg={12}>
          <Debug>
            <ClicksPie />
          </Debug>
        </Grid>
        <Grid item xs={6} md={12} lg={12}>
          <Debug>
            <ActiveGraph />
          </Debug>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdvertisementDashboard;

