import { useEffect, useState } from 'react';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Box, Button, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import FilterListIcon from '@mui/icons-material/FilterList';
import { User } from '@/utils/api/client/zod/users';
import { useRouter } from 'next/router';

type RowData = {
  id: string;
  user: string;
  email: string;
  company: string;
  mobileNumber: string;
  enabled: boolean;
};

type RegisteredUsersTableProps = {
  data: User[];
  onToggle: (toggled: boolean, rows: readonly BaseTableData[]) => void;
  onDelete: (rows: readonly BaseTableData[]) => void;
};

const parseUsersData = (users: User[]) => {
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

const RegisteredUsersTable = ({ data, onToggle, onDelete }: RegisteredUsersTableProps) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState<User[]>([]);
  const router = useRouter();

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onEdit = (row: BaseTableData) => {
    router.push(`/edit-user/${row.id}`);
  };

  useEffect(() => {
    setTableData(data.filter((d, i) => i >= rowsPerPage * page && i < rowsPerPage * (page + 1)));
  }, [data, page, rowsPerPage]);

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
        heading="Registered Users"
        rows={parseUsersData(tableData)}
        headers={headers}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggle={onToggle}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        totalCount={data.length}
      />
    </Box>
  );
};

export default RegisteredUsersTable;
