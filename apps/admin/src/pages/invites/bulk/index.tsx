/* eslint-disable no-alert */
import { useMemo, useState } from 'react';
import FileUpload, {
  FileUploadProps,
  AcceptedFileTypes,
} from '@/components/FileUpload/FileUploadBase';
import CompanyInvitesTable from '@/components/tables/BaseTable/CompanyInvitesTable';
import PendingInvitesTables from '@/components/tables/BaseTable/CompanyInvitesTables';
import { Box, Button } from '@mui/material';
import UserInvitesTable from '@/components/tables/BaseTable/UserInvitesTable';
import { Modal, useResponsiveness } from '@inc/ui';
import * as XLSX from 'xlsx';
import { useQuery } from 'react-query';
import bulkInvites from '@/middlewares/bulkInvites';

export type InviteFileProps = [{
  company: string;
  website: string;
  email: string;
  mobileNumber: string;
}];

const useBulkInvitesQuery = (file: InviteFileProps) => {
  const { data } = useQuery('cat', async () => bulkInvites(file));
  return data;
};

const BulkInvitesPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLg] = useResponsiveness(['lg']);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [fileDetails, setFileDetails] = useState<InviteFileProps[]>([]);
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
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as Array<string>;
      parsedData.shift();
      console.log(parsedData);

      const mappedData = parsedData.map((x) => {
        const data = {
          company: x[0],
          website: x[1],
          email: x[2],
          mobileNumber: x[3],
        };
        return data;
      });

      setFileDetails(mappedData);
    };
  };

  // const res = useBulkInvitesQuery(fileDetails);

  const handleFileUpload = () => {
    console.log('File uploading...');
    setOpenConfirm(true);
  };

  return (
    <Box>
      <Box
        sx={{
          display: isLg ? 'flex' : 'block',
          flexDirection: isLg ? 'row' : 'column',
          gap: isLg ? '32px' : '100px',
          justifyContent: 'flex-end',
          m: 1,
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
          maxWidth={isLg ? '45%' : '100%'}
          maxHeight={isLg ? '100vh' : '70vh'}
        />
        <Box
          sx={({ spacing }) => ({
            maxWidth: isLg ? '45%' : '100%',
            mr: spacing(2),
          })}
        >
          {/* <PendingInvitesTable/> */}
          <CompanyInvitesTable details={fileDetails} />
          <UserInvitesTable details={fileDetails} />

        </Box>
      </Box>

      <Box sx={{ justifyContent: isLg ? 'flex-end' : 'center', m: 2, display: 'flex' }}>
        <Button
          variant="contained"
          sx={({ palette, spacing }) => ({
            backgroundColor: palette.primary.main,
            width: isLg ? '10%' : '95%',
            mr: spacing(2),
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
