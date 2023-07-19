import AdSpaceTable, { DataType } from '@/components/advertisementsDashboard/adSpaceTable';
import Grid from '@mui/material/Grid';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import InfoCard from '@/components/advertisementsDashboard/InfoCard';
import { useQueries, UseQueryResult } from 'react-query';
import fetchAdvertisements from '@/middlewares/advertisements/fetchAdvertisements';
import fetchCompanies from '@/middlewares/companies/fetchCompanies';
import { Advertisment } from '@/utils/api/client/zod/advertisements';
import { Company } from '@/utils/api/client/zod';
import { useMemo } from 'react';

const onDelete = (ids: readonly DataType[]) => {

};

const onEdit = (id: DataType) => {

};

const onSetActive = (ids: readonly DataType[]) => {

};

const onSetInactive = (ids: readonly DataType[]) => {

};

export interface AdvertisementDashboardProps {
  totalClicks: number;
}

const mapAdvertisements = (advertisementQuery: UseQueryResult<Advertisment[]>) => advertisementQuery.data || [];
const mapCompanies = (companiesQuery: UseQueryResult<Company[]>) => companiesQuery.data || [];

const AdvertisementDashboard = ({ totalClicks }: AdvertisementDashboardProps) => {
  const [advertisementsQuery, companiesQuery] = useQueries([
    { queryKey: 'advertisements', queryFn: () => fetchAdvertisements() },
    { queryKey: 'companies', queryFn: () => fetchCompanies() },
  ]);

  const advertisements = useMemo(() => mapAdvertisements(advertisementsQuery), [advertisementsQuery]);
  const companies = useMemo(() => mapCompanies(companiesQuery), [companiesQuery]);

  console.log(advertisements);

  const initialized = advertisements.length > 0;
  const active = advertisements.filter((item) => item.active);
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6} lg={6}>
        <InfoCard title='Active Ad-Spaces' color='blue' icon={CampaignOutlinedIcon}
                  value={active.length.toString()} />
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <InfoCard title='Total Clicks' color='lightGreen' icon={AdsClickIcon} value={totalClicks.toString()} />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        {initialized &&
          <AdSpaceTable
            advertisements={advertisements}
            companies={companies}
            onDelete={onDelete}
            onEdit={onEdit}
            onSetActive={onSetActive}
            onSetInactive={onSetInactive}
          />
        }
      </Grid>
    </Grid>
  );


};

export default AdvertisementDashboard;

