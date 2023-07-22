import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import { Box, Typography } from '@mui/material';

import { useEffect, useMemo, useState } from 'react';

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
  const [tableData, setTableData] = useState<BaseTableData[]>([]);

  console.log(details);

const companyRows = useMemo(() => details.map((x) => createData(x.company, x.website)), [details]);

  console.log(companyRows);

  useEffect(() => {
    setTableData(
      companyRows.filter((d, i) => i >= rowsPerPage * page && i < rowsPerPage * (page + 1))
    );
  }, [companyRows, page, rowsPerPage]);

  console.log(tableData);

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
        rows={tableData}
        headers={headCells}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onDelete={() => console.log('delete') as any as BaseTableData[]}
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
