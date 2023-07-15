import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import { Box } from '@mui/material';
import { useState } from 'react';

export type InviteFileProps = {
  details: Array<Array<string>>;
};

function createData(company: string, email: string, mobile: string): BaseTableData {
  return {
    id: company,
    company,
    email,
    mobile,
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
    key: 'mobile',
    label: 'Mobile Number',
  },
];


const UserInvitesTable = ({ details }: InviteFileProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const userRows = details.map((x) => createData(x[0], x[2], x[3]));

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ my: 2, mx: 1}}>
      <BaseTable
        rows={userRows}
        headers={headCells}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onDelete={() => console.log('delete')}
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
