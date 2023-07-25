/* eslint-disable no-alert */
import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';
import FileUpload, {
  FileUploadProps,
  AcceptedFileTypes,
} from '@/components/FileUpload/FileUploadBase';
import CompanyInvitesTable from '@/components/tables/BaseTable/CompanyInvitesTable';
import UserInvitesTable from '@/components/tables/BaseTable/UserInvitesTable';
import { Box, Button } from '@mui/material';
import { Modal, useResponsiveness } from '@inc/ui';
import { useRouter } from 'next/router';
import useBulkInvites from '@/middlewares/useBulkInvites';
import { PostBulkInviteRequestBody } from '@/utils/api/server/zod/invites';

const BulkInvitesPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLg] = useResponsiveness(['lg']);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [fileDetails, setFileDetails] = useState<PostBulkInviteRequestBody>([]);
  const [rightButtonState, setRightButtonState] = useState(false);
  const router = useRouter();
  const {
    data: res,
    error: bulkInvitesError,
    isError: isBulkInvitesError,
    isFetched: isBulkInvitesFetched,
  } = useBulkInvites(fileDetails);

  useEffect(() => {
    if (isBulkInvitesError) {
      if ('status' in (bulkInvitesError as any) && (bulkInvitesError as any).status === 404) {
        // router.replace('/404');
        console.log('Error 404');
        return;
      }

      // console.log('Error 500');
      console.log((bulkInvitesError as any).data.errors[0].detail);

      // router.replace('/500');
      // return;
    }

    if (res === undefined) {
      // router.replace('/500');
      console.log('Undefined');
    }
  }, [bulkInvitesError, isBulkInvitesError, isBulkInvitesFetched, res]);

  if (rightButtonState === true) {
    router.push('/invites');
  }

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

      const mappedData = parsedData.map((x) => {
        const data = {
          company: x[0],
          name: x[1],
          email: x[2],
          mobileNumber: x[3],
        };
        return data;
      });

      setFileDetails(mappedData);
    };
  };

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
          <CompanyInvitesTable details={fileDetails} />
          <UserInvitesTable details={fileDetails} />
        </Box>
      </Box>

      <Box sx={{ justifyContent: isLg ? 'flex-end' : 'center', m: 2, display: 'flex' }}>
        <Button
          variant="contained"
          disabled={fileDetails.length === 0 || !isBulkInvitesError}
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

      {res?.status === 204 && isBulkInvitesError ? (
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
      ) : (
        <Box />
      )}
    </Box>
  );
};

export default BulkInvitesPage;
