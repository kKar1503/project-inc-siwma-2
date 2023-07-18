import React, { useMemo, useState, useEffect } from 'react';
import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useResponsiveness } from '@inc/ui';
import { useQuery } from 'react-query';
import createCompany from '@/middlewares/company-management/createCompany';

export type EditCompanyModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  updateData: () => void;
};

export type PostCompanyRequestBody = {
  name: string;
  website: string;
  comments: string;
  image?: File | null;
};

const AddCompanyModal = ({ open, setOpen, updateData }: EditCompanyModalProps) => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [name, setName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [selectedCompanyFile, setSelectedCompanyFile] = useState<File | null>(null);

  const modalStyles = useMemo(() => {
    if (isSm) {
      return {
        modalWidth: {
          width: '80%',
        },
        buttonTxt: {
          fontSize: '0.9rem',
        },
      };
    }
    if (isMd) {
      return {
        modalWidth: {
          width: '65%',
        },
        buttonTxt: {
          fontSize: '1rem',
        },
      };
    }
    if (isLg) {
      return {
        modalWidth: {
          width: '55%',
        },
        buttonTxt: {
          fontSize: '1rem',
        },
      };
    }
    return {
      modalWidth: {
        width: '50%',
      },
      buttonTxt: {
        fontSize: '1rem',
      },
    };
  }, [isSm, isMd, isLg]);

  const handleLogoChange: FileUploadProps['changeHandler'] = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedCompanyFile(event.target.files[0]);
    }
  };

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  const handleWebsiteChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setWebsite(event.target.value);
  };

  const handleCommentChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setComments(event.target.value);
  };

  const postCompany = async () => {
    const companyData: PostCompanyRequestBody = {
      name,
      website,
      comments,
      image: selectedCompanyFile,
    };

    await createCompany(companyData);
  };

  const handleSubmit = async () => {
    await postCompany();

    setOpen(false);
  };

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={setOpen}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={({ spacing, palette, shadows }) => ({
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: 1,
              padding: spacing(3),
              position: 'absolute',
              boxShadow: shadows[3],
              backgroundColor: palette.common.white,
              ...modalStyles?.modalWidth,
            })}
          >
            <Grid container spacing={2} direction="row">
              <Grid item xs={12}>
                <Typography
                  id="transition-modal-title"
                  sx={({ typography }) => ({
                    fontSize: typography.h6.fontSize,
                    fontWeight: typography.fontWeightBold,
                  })}
                >
                  Create an individual company
                </Typography>
                <Typography
                  id="transition-modal-description"
                  sx={({ typography }) => ({
                    fontSize: typography.body2.fontSize,
                  })}
                >
                  Register a company profile into the system
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="medium"
                  variant="outlined"
                  label="Company Name"
                  sx={{ mb: 2 }}
                  onChange={handleNameChange}
                  fullWidth
                />
                <TextField
                  size="medium"
                  variant="outlined"
                  label="Company Website"
                  sx={{ mb: 2 }}
                  onChange={handleWebsiteChange}
                  fullWidth
                />
                <TextField
                  rows={10}
                  size="medium"
                  variant="outlined"
                  label="Comments"
                  onChange={handleCommentChange}
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={6}>
                <Upload
                  id="companyImage"
                  title="Company Logo (Optional)"
                  description=""
                  selectedFile={selectedCompanyFile}
                  changeHandler={handleLogoChange}
                  accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
                  maxWidth="200px"
                  maxHeight="100px"
                />
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  onClick={handleSubmit}
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Edit Company
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AddCompanyModal;
