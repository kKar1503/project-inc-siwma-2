import AdSpaceSection from '@/components/advertisementsDashboard/adSpaceSection';
import Grid from '@mui/material/Grid';
import ActiveGraph from '@/components/advertisementsDashboard/activeGraph';
import ClicksPie from '@/components/advertisementsDashboard/clicksPie';
import { useQueries, UseQueryResult } from 'react-query';
import fetchAdClicksData, { FetchAdClicksDataResponse } from '@/middlewares/fetchAdClicksData';
import { useMemo } from 'react';
import Box from '@mui/material/Box';
import fetchAdvertisements from '@/middlewares/advertisements/fetchAdvertisements';
import { Advertisment } from '@/utils/api/client/zod/advertisements';
import fetchCompanies from '@/middlewares/companies/fetchCompanies';
import { Company } from '@/utils/api/client/zod';

const mapData = (
  adClicksData: UseQueryResult<FetchAdClicksDataResponse>,
  advertisementsQuery: UseQueryResult<Advertisment[]>,
  companiesQuery: UseQueryResult<Company[]>,
  ) => {
  const totalClicks = adClicksData.data?.data.reduce((acc, item) => acc + item.clicks, 0) ?? 0;
  const companyClicks = adClicksData.data?.data.map((item) => ({
    company: item.company,
    clicks: item.clicks,
  })) ?? [];
  const advertisements = advertisementsQuery.data?.map(i =>{
    const company = companiesQuery.data?.find((c) => c.id === i.companyId);
    return {
      ...i,
      company: company?.name ?? '',
    };
  }) || [];
  const activeData = [5, 1, 2, 4, 4, 2, 4, 2, 3, 4, 0, 0];
  return { totalClicks, advertisements, companyClicks, activeData };
};

const AdvertisementDashboard = () => {
  const [adClicksData, advertisementsQuery,companiesQuery] = useQueries([
    { queryKey: 'adClicks', queryFn: () => fetchAdClicksData() },
    { queryKey: 'advertisements', queryFn: () => fetchAdvertisements() },
    { queryKey: 'companies', queryFn: () => fetchCompanies() },
  ]);


  const {
    totalClicks,
    advertisements,
    companyClicks,
    activeData,
  } = useMemo(() => mapData(adClicksData, advertisementsQuery,companiesQuery), [advertisementsQuery, adClicksData,companiesQuery]);

  return (
      <Box style={{
        marginTop: '1rem',
        marginRight: '1rem',
        marginLeft: '1rem',
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <AdSpaceSection totalClicks={totalClicks}/>
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

