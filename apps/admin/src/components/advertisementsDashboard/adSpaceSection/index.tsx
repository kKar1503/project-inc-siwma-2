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
import { useState } from 'react';
import UpdateAdvertisement from '@/middlewares/advertisements/updateAdvertisement';

export interface AdvertisementDashboardProps {
  totalClicks: number;
}

const mapAdvertisements = (advertisementQuery: UseQueryResult<Advertisment[]>) => {
  const advertisements = advertisementQuery.data || [];
  const mappedAdvertisements: { [key: string]: Advertisment } = {};
  advertisements.forEach((item) => {
    mappedAdvertisements[item.id] = item;
  });
  return mappedAdvertisements;
};

const mapCompanies = (companiesQuery: UseQueryResult<Company[]>) => companiesQuery.data || [];

const AdvertisementDashboard = ({ totalClicks }: AdvertisementDashboardProps) => {
  const [advertisements, setAdvertisements] = useState<{
    [key: string]: Advertisment;
  }>({});
  const [companies, setCompanies] = useState<Company[]>([]);
  const [advertisementsQuery, companiesQuery] = useQueries([
    {
      queryKey: 'advertisements', queryFn: () => fetchAdvertisements(), onSuccess: () => {
        console.log('advertisementsQuery', advertisementsQuery);
        setAdvertisements(mapAdvertisements(advertisementsQuery));
      },
    },
    {
      queryKey: 'companies', queryFn: () => fetchCompanies(), onSuccess: () => {
        console.log('companiesQuery', companiesQuery);
        setCompanies(mapCompanies(companiesQuery));
      },
    },
  ]);

  const ids = Object.keys(advertisements);
  const active = ids.filter((id) => advertisements[id].active);


  const updateAdvertisementsTable = (updatedAdvertisements: Array<Advertisment | undefined>) => {
    const newAdvertisements = { ...advertisements };
    updatedAdvertisements.forEach((advertisement) => {
      if (!advertisement) return;
      newAdvertisements[advertisement.id] = advertisement;
    });
    setAdvertisements(newAdvertisements);
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
        {ids.length > 0 &&
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

