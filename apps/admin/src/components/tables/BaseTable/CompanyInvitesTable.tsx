import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';

function createData(company: string, website: string): BaseTableData {
  return {
    id: company,
    company,
    website,
  };
}

const headCells: Header[] = [
  {
    key: 'company',
    label: 'Company',
  },
  {
    key: 'website',
    label: 'Website',
  },
];

const rows = [
  createData('GUANGZHAO METALWORKS, PTE. LTD', 'www.guangzhao.com'),
  createData('GUANGZHAO METALWORKS, PTE. LTD', 'www.guangzhao.com'),
  createData('GUANGZHAO METALWORKS, PTE. LTD', 'www.guangzhao.com'),
  createData('GUANGZHAO METALWORKS, PTE. LTD', 'www.guangzhao.com'),
  createData('GUANGZHAO METALWORKS, PTE. LTD', 'www.guangzhao.com'),
  createData('GUANGZHAO METALWORKS, PTE. LTD', 'www.guangzhao.com'),
];

const CompanyInvitesTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <BaseTable
        rows={rows}
        headers={headCells}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onDelete={() => console.log('delete')}
        onEdit={() => console.log('edit')}
        onToggle={() => console.log('toggle')}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        totalCount={rows.length}
        heading='Company Profiles Preview'
      />
    </Box>
  );
};

export default CompanyInvitesTable;
