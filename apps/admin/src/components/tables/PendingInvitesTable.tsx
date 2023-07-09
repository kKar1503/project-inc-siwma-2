import { useState } from 'react';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import BaseTable from '@/components/tables/BaseTable/BaseTable';
import { Box, Button, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import FilterListIcon from '@mui/icons-material/FilterList';

type Invites = {
  id: string;
  name: string;
  email: string;
  companyId: string;
};

const InvitesData: Invites[] = [
  {
    id: '14f9a310-958c-4273-b4b3-4377804642a5',
    name: 'Andrew Tan',
    email: 'andrewtan@gmail.com',
    companyId: '7',
  },
  {
    id: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    name: 'Fok Yanrui Javier',
    email: 'javier@ichat.sp.edu.sg',
    companyId: '4',
  },
  {
    id: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
    name: 'James Tan',
    email: 'jamestanmetals@gmail.com',
    companyId: '9',
  },
  {
    id: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    name: 'Ng Ping How',
    email: 'pinghowng@gmail.com',
    companyId: '3',
  },
  {
    id: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    name: 'Jonathan Tan',
    email: 'jonathan@gmail.com',
    companyId: '5',
  },
];

const headers: Header[] = [
  {
    key: 'id',
    label: 'Id',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'companyId',
    label: 'Company',
  },
];

const PendingInvitesTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handlePageChange = (event: unknown, newPage: number) => {
    console.log('Page Change');
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Rows Change');
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onEdit = () => {
    console.log('edit');
  };

  const onToggle = () => {
    console.log('toggle');
  };

  const onDelete = () => {
    console.log('delete');
  };

  return (
    <Box
      sx={{
        width: '100%',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        padding: 2,
        marginY: 2,
      }}
    >
      <Typography variant="h5">Pending Invites</Typography>
      <Typography variant="body1">Showing of pending invites</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 2,
          marginBottom: 1,
        }}
      >
        <Button variant="text" startIcon={<FilterListIcon />}>
          Filter
        </Button>
        <SearchBar />
      </Box>
      <BaseTable
        rows={InvitesData}
        headers={headers}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggle={onToggle}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        totalCount={InvitesData.length}
      />
    </Box>
  );
};

export default PendingInvitesTable;
