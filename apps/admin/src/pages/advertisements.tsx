import React from 'react';
import AdSpaceTable from '@/components/advertisementsDashboard/adSpaceTable';
import Table from '@/components/advertisementsDashboard/adSpaceTable/table';


const rows = [
  { id: 1, user: '', email: 'Snow', companyName: 'Jon', number: 35 },
  { id: 2, user: '', email: 'Lannister', companyName: 'Cersei', number: 42 },
  { id: 3, user: '', email: 'Lannister', companyName: 'Jaime', number: 45 },
  { id: 4, user: '', email: 'Stark', companyName: 'Arya', number: 16 },
  { id: 5, user: '', email: 'Targaryen', companyName: 'Daenerys', number: 12 },
  { id: 6, user: '', email: 'Melisandre', companyName: 'ads', number: 150 },
  { id: 7, user: '', email: 'Clifford', companyName: 'Ferrara', number: 44 },
  { id: 8, user: '', email: 'Frances', companyName: 'Rossini', number: 36 },
  { id: 9, user: '', email: 'Roxie', companyName: 'Harvey', number: 65 },
];


const AdvertisementDashboard = () => {
  return (
    <div>
      <h1>Advertisement Dashboard</h1>
      <Table active/>
      <Table active={false}/>
      <AdSpaceTable title='Active Ad Spaces' users={rows} />
      <AdSpaceTable title="Inactive Ad Spaces" users={rows} />
    </div>
  );
};

export default AdvertisementDashboard;

