import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import { Box, Typography } from '@mui/material';

import { useState } from 'react';

export type InviteFileProps = {
  details: Array<{
    company: string;
    website: string;
    email: string;
    mobileNumber: string;
  }>;
};

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

const CompanyInvitesTable = ({ details }: InviteFileProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log(details);

  const companyRows = details.map((x) => createData(x.company, x.website));

  console.log(companyRows);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ my: 2, mx: 1 }}>
      <BaseTable
        rows={companyRows}
        headers={headCells}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onDelete={() => console.log('delete')}
        onEdit={() => console.log('edit')}
        onToggle={() => console.log('toggle')}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        totalCount={companyRows.length}
        heading="Company Profiles Preview"
      />
    </Box>
  );
};

export default CompanyInvitesTable;
