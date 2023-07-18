import AdSpaceSection from '@/components/advertisementsDashboard/adSpaceSection';
import Grid from '@mui/material/Grid';
import ActiveGraph from '@/components/advertisementsDashboard/activeGraph';
import ClicksPie from '@/components/advertisementsDashboard/clicksPie';
import { useQueries, UseQueryResult } from 'react-query';
import fetchAdSpaceData, { FetchAdSpaceDataResponse } from '@/middlewares/fetchAdSpaceData';
import fetchAdClicksData, { FetchAdClicksDataResponse } from '@/middlewares/fetchAdClicksData';
import { useMemo } from 'react';
import Box from '@mui/material/Box';

const mapData = (adSpaceData: UseQueryResult<FetchAdSpaceDataResponse>, adClicksData: UseQueryResult<FetchAdClicksDataResponse>) => {
  const totalClicks = adClicksData.data?.data.reduce((acc, item) => acc + item.clicks, 0) ?? 0;
  const adspace = adSpaceData.data?.data ?? [];
  const companyClicks = adClicksData.data?.data.map((item) => ({
    company: item.company,
    clicks: item.clicks,
  })) ?? [];

  const activeData = [5, 1, 2, 4, 4, 2, 4, 2, 3, 4, 0, 0];
  return { totalClicks, adspace, companyClicks, activeData };
};

const AdvertisementDashboard = () => {
  const [adSpaceData, adClicksData] = useQueries([
    { queryKey: 'adSpace', queryFn: () => fetchAdSpaceData() },
    { queryKey: 'adClicks', queryFn: () => fetchAdClicksData() },
  ]);

  const {
    totalClicks,
    adspace,
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
            NAVBAR
          </Grid>
          <Grid item xs={12} md={7}>
            <AdSpaceSection totalClicks={totalClicks} adspace={adspace} />
          </Grid>
          <Grid item container xs={12} md={3} spacing={2}>
            <Grid item xs={6} md={12}>
              <ClicksPie data={companyClicks} totalClicks={totalClicks} />
            </Grid>
            <Grid item xs={6} md={12}>
              <ActiveGraph data={activeData} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
  );
};

export default AdvertisementDashboard;

