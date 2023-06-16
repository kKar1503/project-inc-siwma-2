import { useState } from 'react';
import FileUpload, { AcceptedFileTypes } from '@/components/FileUpload/FileUploadBase';
import { Box } from '@mui/material';

const BulkInvitesPage = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Box>
      <p>Hello World</p>
      <FileUpload
        title="Bulk Add Companies & Invite Users"
        description="Import an .xlsx file below to bulk add company profiles and bulk invite users"
        selectedFile={file}
        changeHandler={(event) => {
          if (event.target.files) {
            setFile(event.target.files[0]);
          }
        }}
        accept={[AcceptedFileTypes.XLSX]}
        maxWidth="200px"
        maxHeight="200px"
      />
    </Box>
  );
};

export default BulkInvitesPage;
