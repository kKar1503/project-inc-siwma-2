import { useEffect, useState } from 'react';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Box, Button, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Invite } from '@/utils/api/client/zod/invites';

type PendingInvitesTableProps = {
  data: Invite[];
  onDelete: (rows: readonly BaseTableData[]) => void;
};

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

const PendingInvitesTable = ({ data, onDelete }: PendingInvitesTableProps) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState<Invite[]>([]);

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
        heading="Pending Invites"
        rows={tableData}
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
