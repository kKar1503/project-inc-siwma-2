/* eslint-disable no-alert */
import { useMemo, useState } from 'react';
import FileUpload, {
  FileUploadProps,
  AcceptedFileTypes,
} from '@/components/FileUpload/FileUploadBase';
import CompanyInvitesTable from '@/components/tables/BaseTable/CompanyInvitesTable';
import { Box, Button } from '@mui/material';
import UserInvitesTable from '@/components/tables/BaseTable/UserInvitesTable';
import { useResponsiveness } from '@inc/ui';

const BulkInvitesPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

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

  const handleFileUpload = () => {
    console.log('File uploading...');
  };

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
      <Box
        sx={{
          display: isLg ? 'flex' : 'block',
          flexDirection: isLg ? 'row' : 'column',
          gap: isLg ? '32px' : '100px',
          justifyContent: 'flex-end',
          m: 2,
        }}
      >
        <Box
          sx={{
            ...(isLg && { maxWidth: '900px', width: '100%' }),
          }}
        >
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
            maxHeight={isLg ? '750px' : '500px'}
          />
        </Box>

        <Box
          sx={{
            ...(isLg && { maxWidth: '900px', width: '100%' }),
          }}
        >
          <CompanyInvitesTable />
          <UserInvitesTable />
        </Box>
      </Box>
      <Box
        sx={{
          m: 2,
          display: 'flex',
          justifyContent: isLg ? 'flex-end' : 'center',
        }}
      >
        <Button
          variant="contained"
          sx={({ palette }) => ({
            backgroundColor: palette.primary.main,
            width: isLg ? '10%' : '95%',
          })}
          onClick={handleFileUpload}
        >
          CONFIRM
        </Button>
      </Box>
    </Box>
  );
};

export default BulkInvitesPage;
