/* eslint-disable no-alert */
import { useState } from 'react';
import FileUpload, {
  FileUploadProps,
  AcceptedFileTypes,
} from '@/components/FileUpload/FileUploadBase';
import { Box } from '@mui/material';

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

  return (
    <Box>
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
  );
};

export default BulkInvitesPage;
