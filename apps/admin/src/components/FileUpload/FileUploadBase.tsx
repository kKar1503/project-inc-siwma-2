import { FiUpload } from 'react-icons/fi';
import { BsFileEarmarkSpreadsheet } from 'react-icons/bs';
import { Box, Typography, Paper, IconButton } from '@mui/material';

export enum AcceptedFileTypes {
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  TXT = 'text/plain',
  CSV = 'text/csv',
  PDF = 'application/pdf',
  DOC = 'application/msword',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export interface FileUploadProps {
  title: string;
  description: string;
  selectedFile: File | null;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: AcceptedFileTypes[];
}

const FileUpload = ({
  title,
  description,
  selectedFile,
  changeHandler,
  accept,
}: FileUploadProps) => (
  <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
    <hr />
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid primary.main',
          borderStyle: 'dotted',
          height: '100%',
          p: 2,
          gap: 2,
        }}
      >
        <Box sx={{ height: '20px' }}>
          <label htmlFor="fileInput">
            {selectedFile == null ? (
              <IconButton component="span">
                <FiUpload />
              </IconButton>
            ) : (
              <IconButton component="span">
                <BsFileEarmarkSpreadsheet />
              </IconButton>
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={changeHandler}
            style={{ display: 'none' }}
            accept={accept ? accept.join(',') : undefined}
          />
        </Box>

        {selectedFile != null ? (
          <Typography variant="body1" textAlign="center">
            {selectedFile.name}
          </Typography>
        ) : (
          <Typography variant="body1" textAlign="center" sx={{ width: '75%' }}>
            Click to Upload a File
          </Typography>
        )}
      </Box>
    </Box>
  </Paper>
);

export default FileUpload;
