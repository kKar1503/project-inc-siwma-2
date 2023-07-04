/* eslint-disable no-alert */
import { useState } from 'react';
import FileUpload, {
  FileUploadProps,
  AcceptedFileTypes,
} from '@/components/FileUpload/FileUploadBase';
import BaseTable, { BaseTableData } from '@/components/tables/BaseTable/BaseTable';
import { Header } from '@/components/tables/BaseTable/BaseTableHead';
import CompanyInvitesTable from '@/components/tables/BaseTable/CompanyInvitesTable';
import Head from 'next/head';
import { Box } from '@mui/material';
import UserInvitesTable from '@/components/tables/BaseTable/UserInvitesTable';

const BulkInvitesPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange: FileUploadProps['changeHandler'] = (event) => {
    if (!event.target.files) return;

    if (event.target.files.length === 1) {
      setFile(event.target.files[0]);
    } else if (event.target.files.length > 1) {
      setFile(null);
      alert('Please Select Only One File');

      return;
    } else {
      setFile(null);
      alert('Please Select a File');

      return;
    }

    if (event.target.files[0].size > 64000000) {
      setFile(null);
      alert('Please Select a File Smaller Than 64 MB');
    }
  };

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    enabled?: boolean
  ): BaseTableData {
    return {
      id: name,
      name,
      calories,
      fat,
      carbs,
      protein,
      enabled: enabled ?? false,
    };
  }

  const headCells: Header[] = [
    {
      key: 'name',
      label: 'Dessert (100g serving)',
    },
    {
      key: 'calories',
      label: 'Calories',
    },
    {
      key: 'fat',
      label: 'Fat (g)',
    },
    {
      key: 'carbs',
      label: 'Carbs (g)',
    },
    {
      key: 'protein',
      label: 'Protein (g)',
    },
    {
      key: 'enabled',
      label: 'Enabled',
      replace: {
        a: 'Yes',
        false: 'No',
      },
    },
  ];

  const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3, true),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
  ];

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
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '30%', m: '32px' }}>
        <FileUpload
          id="bulk-invites"
          title="Bulk Add Companies & Invite Users"
          description="Import an .xlsx file below to bulk add company profiles and bulk invite users"
          selectedFile={file}
          changeHandler={(event) => {
            handleFileChange(event);
          }}
          accept={[AcceptedFileTypes.XLSX]}
          maxWidth="200px"
          maxHeight="200px"
        />
      </Box>

      <Box sx={{ width: '50%', m: '32px' }}>
        <CompanyInvitesTable />
        <UserInvitesTable />
      </Box>
    </Box>
  );
};

export default BulkInvitesPage;
