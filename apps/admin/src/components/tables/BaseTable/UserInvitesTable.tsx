import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import { PostBulkInviteRequestBody } from '@/utils/api/server/zod';
import { Box } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

export type InviteFileProps = {
  details: PostBulkInviteRequestBody;
};

function createData(
  company: string,
  email: string,
  mobileNumber: string | undefined
): BaseTableData {
  const validMobileNumber: string = mobileNumber ?? 'N/A';
  return {
    id: company,
    company,
    email,
    mobileNumber: validMobileNumber,
  };
}

const headCells: Header[] = [
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

const UserInvitesTable = ({ details }: InviteFileProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState<BaseTableData[]>([]);

  const userRows = useMemo(
    () => details.map((x) => createData(x.company, x.email, x.mobileNumber)),
    [details]
  );

  useEffect(() => {
    setTableData(
      userRows.filter((d, i) => i >= rowsPerPage * page && i < rowsPerPage * (page + 1))
    );
  }, [userRows, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ my: 2 }}>
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
        totalCount={userRows.length}
        heading="User Invites Preview"
      />
    </Box>
  );
};

export default UserInvitesTable;
