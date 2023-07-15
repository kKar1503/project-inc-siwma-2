/* eslint-disable no-alert */
import { useMemo, useState } from 'react';
import FileUpload, {
  FileUploadProps,
  AcceptedFileTypes,
} from '@/components/FileUpload/FileUploadBase';
import CompanyInvitesTable from '@/components/tables/BaseTable/CompanyInvitesTable';
import { Box, Button } from '@mui/material';
import UserInvitesTable from '@/components/tables/BaseTable/UserInvitesTable';
import { Modal, useResponsiveness } from '@inc/ui';
import * as XLSX from 'xlsx';

export type InviteFileProps = Array<string>;

const BulkInvitesPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [fileDetails, setFileDetails] = useState<InviteFileProps[]>([]);

  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);

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

    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as InviteFileProps[];
      parsedData.shift();
      console.log(parsedData);
      setFileDetails(parsedData);
    };

    console.log('hello');
    // console.log(fileDetails);
  };

  console.log(fileDetails);

  const handleFileUpload = () => {
    console.log('File uploading...');
    setOpenConfirm(true);
  };

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
          alignItems: isLg ? 'flex-start' : 'center',
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
          maxHeight="100vh"
        />
        <Box
          sx={{
            ...(isLg && { maxWidth: '900px' }),
            extAlign: isLg ? 'right' : 'center',
          }}
        >
          <CompanyInvitesTable details={fileDetails} />
          <UserInvitesTable details={fileDetails} />
        </Box>
      </Box>

      <Box sx={{ justifyContent: isLg ? 'flex-end' : 'center', m: 2, display: 'flex' }}>
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

      <Modal
        open={openConfirm}
        setOpen={setOpenConfirm}
        buttonColor="#2962FF"
        icon="info"
        title="Confirmation"
        content="Companies and Users have been successfully invited!"
        leftButtonText={null} // <= only one button set as null
        rightButtonText="back to invites"
        leftButtonState={false} // <= only one button, set as false
        rightButtonState={rightButtonState}
        setLeftButtonState={setRightButtonState} // <= only one button, set as the rightButtonState
        setRightButtonState={setRightButtonState}
      />
    </Box>
  );
};

export default BulkInvitesPage;
