import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import { Box } from '@mui/material';
import { PostBulkInviteRequestBody } from '@/utils/api/server/zod/invites';

import { useEffect, useMemo, useState } from 'react';

type BulkInvitesTableProps = {
  details: PostBulkInviteRequestBody;
  onDelete: (rows: readonly BaseTableData[]) => BaseTableData[];
};

export type InviteFileProps = {
  details: PostBulkInviteRequestBody;
};

function createData(company: string, name: string): BaseTableData {
  return {
    id: company,
    company,
    name,
  };
}

const headCells: Header[] = [
  {
    key: 'company',
    label: 'Company',
  },
  {
    key: 'name',
    label: 'Name',
  },
];

const CompanyInvitesTable = ({details, onDelete} : BulkInvitesTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState<BaseTableData[]>([]);

  const companyRows = useMemo(() => details.map((x) => createData(x.company, x.name)), [details]);
  
  useEffect(() => {
    setTableData(
      companyRows.filter((d, i) => i >= rowsPerPage * page && i < rowsPerPage * (page + 1))
    );
  }, [companyRows, page, rowsPerPage]);

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
        onDelete={onDelete}
        onEdit={() => console.log('edit')}
        onToggle={() => console.log('toggle')}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        totalCount={companyRows.length}
        heading="Company Profiles Preview"
        sx={{ width: '80vh', height: '68vh' }}
      />
    </Box>
  );
};

export default CompanyInvitesTable;
