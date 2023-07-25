import { ChangeEvent, useEffect, useState } from 'react';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import FilterListIcon from '@mui/icons-material/FilterList';
import { User } from '@/utils/api/client/zod/users';
import { useRouter } from 'next/router';
import { Company } from '@/utils/api/client/zod';
import useDebounce from '@/hooks/useDebounce';

type RowData = {
  id: string;
  user: string;
  email: string;
  company: string;
  mobileNumber: string;
  enabled: string;
};

type RegisteredUsersTableProps = {
  data: User[];
  companies: Company[];
  onToggle: (toggled: boolean, rows: readonly BaseTableData[]) => void;
  onDelete: (rows: readonly BaseTableData[]) => BaseTableData[];
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

const parseUsersData = (users: User[]) => {
  const rows: RowData[] = [];
  users.forEach((u) => {
    rows.push({
      id: u.id,
      user: u.name,
      email: u.email,
      company: u.company.name,
      mobileNumber: u.mobileNumber,
      enabled: u.enabled ? 'active' : 'disabled',
    });
  });
  return rows;
};

const RegisteredUsersTable = ({
  data,
  companies,
  onToggle,
  onDelete,
}: RegisteredUsersTableProps) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [tableData, setTableData] = useState<User[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [query, setQuery] = useState<string>('');
  const debouncedValue = useDebounce<string>(query, 500);

  const router = useRouter();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    setTableData(
      filteredData.filter((d, i) => i >= rowsPerPage * page && i < rowsPerPage * (page + 1))
    );
  }, [filteredData, page, rowsPerPage]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const filterTable = (event: React.MouseEvent<HTMLElement>) => {
    const selected = (event.target as HTMLInputElement).value;
    setSelectedCompany(selected);
    const filter = data.filter((user) => user.company.id === selected.toString());
    setFilteredData(filter);
  };

  const clearFilter = () => {
    setFilteredData(data);
    setSelectedCompany('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const onEdit = (row: BaseTableData) => {
    router.push(`/userManagement/users/edit-user/${row.id}`);
  };

  useEffect(() => {
    const filter = data.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredData(filter);
  }, [debouncedValue]);

  return (
    <Box
      sx={{
        marginBottom: 2,
      }}
    >
      <BaseTable
        sx={{
          height: '100%',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
        }}
        heading=""
        customHeader={
          <Box
            sx={{
              padding: 2,
            }}
          >
            <Typography variant="h5">Registered Users</Typography>
            <Typography variant="body1">
              Showing {filteredData.length === 0 ? 0 : rowsPerPage * page + 1}-
              {filteredData.length < rowsPerPage * (page + 1)
                ? filteredData.length
                : rowsPerPage * (page + 1)}{' '}
              of {filteredData.length} registered users
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 2,
              }}
            >
              <div>
                <Button onClick={handleClick} variant="text" startIcon={<FilterListIcon />}>
                  Filter
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
                  <MenuItem disabled={selectedCompany === ''} value="" onClick={clearFilter}>
                    Clear Filter
                  </MenuItem>
                  {companies.map((company) => (
                    <MenuItem
                      key={company.id}
                      value={company.id}
                      onClick={filterTable}
                      selected={company.id === selectedCompany.toString()}
                    >
                      {company.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>

              <SearchBar onChange={handleChange} />
            </Box>
          </Box>
        }
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
        totalCount={filteredData.length}
      />
    </Box>
  );
};

export default RegisteredUsersTable;
