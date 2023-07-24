import { useEffect, useState } from 'react';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Invite } from '@/utils/api/client/zod/invites';
import { Company } from '@/utils/api/client/zod';

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

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    setTableData(
      filteredData.filter((d, i) => i >= rowsPerPage * page && i < rowsPerPage * (page + 1))
    );
  }, [filteredData, page, rowsPerPage]);

  const handlePageChange = (event: unknown, newPage: number) => {
    console.log('Page Change');
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Rows Change');
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
    const filter = data.filter((user) => user.company.id === selected.toString());
    setFilteredData(filter);
  };

  const clearFilter = () => {
    setFilteredData(data);
    setSelectedCompany('');
  };

  const handleSearch = (query: string) => {
    const filter = data.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredData(filter);
  };

  const onEdit = () => {
    // nothing to do
  };

  const onToggle = () => {
    // nothing to do
  };

  return (
    <Box
      sx={{
        width: '100%',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        padding: 2,
        marginY: 2,
        backgroundColor: 'white',
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
          marginBottom: 1,
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
        <SearchBar onSearch={handleSearch} />
      </Box>
      <BaseTable
        heading="Pending Invites"
        rows={parseInvitesData(tableData)}
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

export default PendingInvitesTable;
