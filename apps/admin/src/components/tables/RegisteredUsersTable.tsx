import { useState } from 'react';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import BaseTable from '@/components/tables/BaseTable/BaseTable';
import { Box, Button, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import FilterListIcon from '@mui/icons-material/FilterList';

type Users = {
  id: string;
  name: string;
  email: string;
  company: string;
  createdAt: string;
  enabled: boolean;
  profilePic: string | null;
  comments: string | null;
  whatsappNumber: null;
  telegramUsername: null;
  mobileNumber: string;
  contactMethod: string;
  bio: string | null;
};

type RowData = {
  id: string;
  user: string;
  email: string;
  company: string;
  mobileNumber: string;
  enabled: boolean;
};

const UsersData: Users[] = [
  {
    id: '14f9a310-958c-4273-b4b3-4377804642a5',
    name: 'Andrew Tan',
    email: 'andrewtan@gmail.com',
    company: '7',
    createdAt: '2023-06-28T08:15:39.493Z',
    enabled: true,
    profilePic: null,
    comments: null,
    whatsappNumber: null,
    telegramUsername: null,
    mobileNumber: '88908732',
    contactMethod: 'telegram',
    bio: null,
  },
  {
    id: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    name: 'Fok Yanrui Javier',
    email: 'javier@ichat.sp.edu.sg',
    company: '4',
    createdAt: '2023-06-28T08:15:39.493Z',
    enabled: true,
    profilePic: null,
    comments: 'You can find whatever you want or need easily.',
    whatsappNumber: null,
    telegramUsername: null,
    mobileNumber: '91287659',
    contactMethod: 'whatsapp',
    bio: null,
  },
  {
    id: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
    name: 'James Tan',
    email: 'jamestanmetals@gmail.com',
    company: '9',
    createdAt: '2023-06-28T08:15:39.493Z',
    enabled: true,
    profilePic: null,
    comments: null,
    whatsappNumber: null,
    telegramUsername: null,
    mobileNumber: '95648321',
    contactMethod: 'facebook',
    bio: null,
  },
  {
    id: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    name: 'Ng Ping How',
    email: 'pinghowng@gmail.com',
    company: '3',
    createdAt: '2023-06-28T08:15:39.493Z',
    enabled: true,
    profilePic: null,
    comments: null,
    whatsappNumber: null,
    telegramUsername: null,
    mobileNumber: '91234568',
    contactMethod: 'whatsapp',
    bio: null,
  },
  {
    id: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    name: 'Jonathan Tan',
    email: 'jonathan@gmail.com',
    company: '5',
    createdAt: '2023-06-28T08:15:39.493Z',
    enabled: true,
    profilePic: null,
    comments:
      'Never had problems with sellers or buyers on that page all went successfuly until today.',
    whatsappNumber: null,
    telegramUsername: null,
    mobileNumber: '88493883',
    contactMethod: 'telegram',
    bio: null,
  },
];

const parseUsersData = (users: Users[]) => {
  const rows: RowData[] = [];
  users.forEach((u) => {
    rows.push({
      id: u.id,
      user: u.name,
      email: u.email,
      company: u.company,
      mobileNumber: u.mobileNumber,
      enabled: u.enabled ?? false,
    });
  });
  return rows;
};

const headers: Header[] = [
  {
    key: 'user',
    label: 'User',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'company',
    label: 'Company',
  },
  {
    key: 'mobileNumber',
    label: 'Mobile Number',
  },
  {
    key: 'enabled',
    label: 'Enabled',
  },
];

const RegisteredUsersTable = () => {
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

  const rows = parseUsersData(UsersData);

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
      <Typography variant="h5">Registered Users</Typography>
      <Typography variant="body1">Showing of registered users</Typography>
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
        rows={rows}
        headers={headers}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggle={onToggle}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        totalCount={rows.length}
      />
    </Box>
  );
};

export default RegisteredUsersTable;
