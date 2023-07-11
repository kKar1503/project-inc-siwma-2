import AdSpaceSection from '@/components/advertisementsDashboard/adSpaceSection';
import Grid from '@mui/material/Grid';
import ActiveGraph from '@/components/advertisementsDashboard/activeGraph';
import ClicksPie from '@/components/advertisementsDashboard/clicksPie';
import { useQueries, UseQueryResult } from 'react-query';
import fetchAdSpaceData, { FetchAdSpaceDataResponse } from '@/middlewares/fetchAdSpaceData';
import fetchAdClicksData, { FetchAdClicksDataResponse } from '@/middlewares/fetchAdClicksData';
import Debug from '@/components/Debug';
import { useMemo } from 'react';
import Box from '@mui/material/Box';

const mapData = (adSpaceData: UseQueryResult<FetchAdSpaceDataResponse>, adClicksData: UseQueryResult<FetchAdClicksDataResponse>) => {
  const totalClicks = adClicksData.data?.data.reduce((acc, item) => acc + item.clicks, 0) ?? 0;
  const active = adSpaceData.data?.data.filter((item) => item.active) ?? [];
  const inactive = adSpaceData.data?.data.filter((item) => !item.active) ?? [];
  const companyClicks = adClicksData.data?.data.map((item) => ({
    company: item.company,
    clicks: item.clicks,
  })) ?? [];

  const activeData = [5, 1, 2, 4, 4, 2, 4, 2, 3, 4, 0, 0];
  return { totalClicks, active, inactive, companyClicks, activeData };
};

const AdvertisementDashboard = () => {
  const [adSpaceData, adClicksData] = useQueries([
    { queryKey: 'adSpace', queryFn: () => fetchAdSpaceData() },
    { queryKey: 'adClicks', queryFn: () => fetchAdClicksData() },
  ]);

  const {
    totalClicks,
    active,
    inactive,
    companyClicks,
    activeData,
  } = useMemo(() => mapData(adSpaceData, adClicksData), [adSpaceData, adClicksData]);

  return (
    <Box style={{
      marginTop: '1rem',
      marginRight: '1rem',
      marginLeft: '1rem',
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <Debug>NAVBAR</Debug>
        </Grid>
        <Grid item xs={12} md={7}>
          <Debug>
            <AdSpaceSection totalClicks={totalClicks} active={active} inactive={inactive} />
          </Debug>
        </Grid>
        <Grid item container xs={12} md={3}>
          <Grid item xs={6} md={12}>
            <Debug>
              <ClicksPie data={companyClicks} totalClicks={totalClicks} />
            </Debug>
          </Grid>
          <Grid item xs={6} md={12}>
            <Debug>
              <ActiveGraph data={activeData} />
            </Debug>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvertisementDashboard;

