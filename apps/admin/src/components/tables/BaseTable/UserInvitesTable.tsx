import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import { Box } from '@mui/material';
import { useState } from 'react';

function createData(company: string, email: string, mobileNum: string): BaseTableData {
  return {
    id: company,
    company,
    email,
    mobileNum,
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
    key: 'mobileNum',
    label: 'Mobile Number',
  },
];

const rows = [
  createData('GUANGZHAO METALWORKS, PTE. LTD', 'sallyknox_slfi@gmail.com', '+65 9832 0293'),
  createData('GUANGZHAO METALWORKS, PTE. LTD', 'sallyknox_slfi@gmail.com', '+65 9832 0293'),
  createData('GUANGZHAO METALWORKS, PTE. LTD', 'sallyknox_slfi@gmail.com', '+65 9832 0293'),
  createData('GUANGZHAO METALWORKS, PTE. LTD', 'sallyknox_slfi@gmail.com', '+65 9832 0293'),
  createData('GUANGZHAO METALWORKS, PTE. LTD', 'sallyknox_slfi@gmail.com', '+65 9832 0293'),
  createData('GUANGZHAO METALWORKS, PTE. LTD', 'sallyknox_slfi@gmail.com', '+65 9832 0293'),
];

const UserInvitesTable = () => {
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
    <Box sx={{ my: 2, mx: 1 }}>
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
        heading="User Invites Preview"
      />
    </Box>
  );
};

export default UserInvitesTable;
