import AdSpaceTable from '@/components/advertisementsDashboard/adSpaceTable';
import Grid from '@mui/material/Grid';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import InfoCard from '@/components/advertisementsDashboard/InfoCard';
import { useQueries, UseQueryResult } from 'react-query';
import fetchAdvertisements from '@/middlewares/advertisements/fetchAdvertisements';
import fetchCompanies from '@/middlewares/companies/fetchCompanies';
import { Advertisment } from '@/utils/api/client/zod/advertisements';
import { Company } from '@/utils/api/client/zod';
import UpdateAdvertisement from '@/middlewares/advertisements/updateAdvertisement';
import { useState } from 'react';

export interface AdvertisementDashboardProps {
  totalClicks: number;
}
const mapCompanies = (companiesQuery: UseQueryResult<Company[]>) => companiesQuery.data || [];

const AdvertisementDashboard = ({ totalClicks }: AdvertisementDashboardProps) => {
  const [mutatedAdvertisements, setMutatedAdvertisements] = useState<{
    [key: string]: Advertisment | false;
  }>({});
  const [advertisementsQuery, companiesQuery] = useQueries([
    { queryKey: 'advertisements', queryFn: () => fetchAdvertisements() },
    { queryKey: 'companies', queryFn: () => fetchCompanies() },
  ]);

  if (advertisementsQuery.isLoading || companiesQuery.isLoading) {
    return <div>Loading...</div>;
  }


  const advertisements: { [key: string]: Advertisment } = {};

  advertisementsQuery.data?.forEach((item) => {
    const mutatedAdvertisement = mutatedAdvertisements[item.id];
    switch (mutatedAdvertisement) {
      case undefined:
        advertisements[item.id] = item;
        break;
      case false:
        break;
      default:
        advertisements[item.id] = mutatedAdvertisement;
    }
  });

  const companies = mapCompanies(companiesQuery);

  const ids = Object.keys(advertisements);
  const active = ids.filter((id) => advertisements[id].active);


  const updateAdvertisementsTable = (updatedAdvertisements: Array<Advertisment | undefined>) => {
    const newAdvertisements = { ...mutatedAdvertisements };
    updatedAdvertisements.forEach((advertisement) => {
      if (!advertisement) return;
      newAdvertisements[advertisement.id] = advertisement;
    });
    setMutatedAdvertisements(newAdvertisements);
  };

  const onDelete = (ids: readonly string[]) => {

  };

  const onEdit = (id: string) => {

  };

  const onSetActive = (ids: readonly string[]) => {
    Promise.all(ids.map((id) => UpdateAdvertisement(id, { active: true }, undefined))).then(updateAdvertisementsTable);
  };

  const onSetInactive = (ids: readonly string[]) => {
    Promise.all(ids.map((id) => UpdateAdvertisement(id, { active: false }, undefined))).then(updateAdvertisementsTable);
  };


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
          <AdSpaceTable
            ids={ids}
            advertisements={advertisements}
            companies={companies}
            onDelete={onDelete}
            onEdit={onEdit}
            onSetActive={onSetActive}
            onSetInactive={onSetInactive}
          />
      </Grid>
    </Grid>
  );


};

export default AdvertisementDashboard;

