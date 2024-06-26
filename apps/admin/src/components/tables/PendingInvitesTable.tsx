import { ChangeEvent, useEffect, useState } from 'react';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Invite } from '@/utils/api/client/zod/invites';
import { Company } from '@/utils/api/client/zod';
import useDebounce from '@/hooks/useDebounce';

type PendingInvitesTableProps = {
  data: Invite[];
  companies: Company[];
  onDelete: (rows: readonly BaseTableData[]) => BaseTableData[];
};

type RowData = {
  id: string;
  email: string;
  company: string;
  mobileNumber: string;
};

const headers: Header[] = [
  {
    key: 'company',
    label: 'Company',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'mobileNumber',
    label: 'Mobile Number',
  },
];

const parseInvitesData = (invites: Invite[]) => {
  const rows: RowData[] = [];
  invites.forEach((invite) => {
    rows.push({
      id: invite.id,
      email: invite.email,
      company: invite.company.name,
      mobileNumber: invite.mobileNumber || 'NULL',
    });
  });
  return rows;
};

const PendingInvitesTable = ({ data, companies, onDelete }: PendingInvitesTableProps) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [filteredData, setFilteredData] = useState<Invite[]>([]);
  const [tableData, setTableData] = useState<Invite[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [query, setQuery] = useState<string>('');
  const debouncedValue = useDebounce<string>(query, 500);

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

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const filterTable = (event: React.MouseEvent<HTMLElement>) => {
    const selected = (event.target as HTMLInputElement).value;
    setSelectedCompany(selected);
    const filter = data.filter((invite) => invite.company.id === selected.toString());
    setFilteredData(filter);
  };
  const clearFilter = () => {
    setFilteredData(data);
    setSelectedCompany('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const filter = data.filter((invite) =>
      invite.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filter);
  }, [debouncedValue]);

  return (
    <Box sx={{ marginBottom: 3 }}>
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
            <Typography variant="h5">Pending Invites</Typography>
            <Typography variant="body1">
              Showing {filteredData.length === 0 ? 0 : rowsPerPage * page + 1}-
              {filteredData.length < rowsPerPage * (page + 1)
                ? filteredData.length
                : rowsPerPage * (page + 1)}{' '}
              of {filteredData.length} pending invites
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
        rows={parseInvitesData(tableData)}
        headers={headers}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onDelete={onDelete}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        totalCount={data.length}
      />
    </Box>
  );
};

export default PendingInvitesTable;
