import { FiUpload } from 'react-icons/fi';
import { BsFileEarmarkSpreadsheet } from 'react-icons/bs';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import Image from 'next/image';

export enum AcceptedFileTypes {
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  TXT = 'text/plain',
  CSV = 'text/csv',
  PDF = 'application/pdf',
  DOC = 'application/msword',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  JPG = 'image/jpeg', // JPG and JPEG are the same thing with different names (thanks, Microsoft)
  PNG = 'image/png',
}

export interface FileUploadProps {
  title: string;
  description: string;
  selectedFile: File | null;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: AcceptedFileTypes[];
  maxWidth?: string;
  maxHeight?: string;
}

const FileUpload = ({
  title,
  description,
  selectedFile,
  changeHandler,
  accept,
  maxWidth,
  maxHeight,
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
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <label htmlFor="fileInput" style={{ cursor: 'pointer', width: '100%', height: '100%' }}>
            <Box
              sx={{
                width: maxWidth ?? '100px',
                height: maxHeight ?? '100px',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {selectedFile === null || !selectedFile.type.startsWith('image/') ? (
                <IconButton component="span">
                  {selectedFile === null ? <FiUpload /> : <BsFileEarmarkSpreadsheet />}
                </IconButton>
              ) : (
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="preview"
                  style={{
                    objectFit: 'contain',
                    display: 'block',
                    height: '100%',
                    width: '100%',
                    margin: 'auto',
                  }}
                  width={10} // Arbitrary width and height to make NextJS happy
                  height={10}
                />
              )}
            </Box>
            <Typography variant="body1" textAlign="center">
              {selectedFile != null ? selectedFile.name : 'Click to Upload a File'}
            </Typography>
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={changeHandler}
            style={{ display: 'none' }}
            accept={accept ? accept.join(',') : undefined} // Accept all file types if no accept prop is provided
          />
        </Box>
      </Box>
    </Box>
  </Paper>
);

export default FileUpload;
