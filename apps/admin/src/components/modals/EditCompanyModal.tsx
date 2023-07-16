import React, { useMemo, useState, useEffect } from 'react';
import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { useResponsiveness } from '@inc/ui';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import fetchCompany from '@/middlewares/company-management/fetchCompany';
import updateCompany from '@/middlewares/company-management/updateCompany';

export type EditCompanyModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  company: string;
};

export type PutCompanyRequestBody = {
  name: string;
  website: string;
  bio: string;
  image?: string;
};

const useGetCompanyQuery = (companyId: string) => {
  const { data } = useQuery(['company', companyId], async () => fetchCompany(companyId), {
    enabled: companyId !== undefined,
  });
  return data;
};

const useUpdateCompanyMutation = (companyId: string) =>
  useMutation((updatedCompanyData: PutCompanyRequestBody) =>
    updateCompany(updatedCompanyData, companyId)
  );

const EditCompanyModal = ({ open, setOpen, company }: EditCompanyModalProps) => {
  const queryClient = useQueryClient();
  const companyData = useGetCompanyQuery(company);

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [companyName, setCompanyName] = useState<string>(companyData?.name || '');
  const [companyWebsite, setCompanyWebsite] = useState<string>(companyData?.website || '');
  const [companyBio, setCompanyBio] = useState<string>(companyData?.bio || '');
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
    setCompanyName(event.target.value);
  };

  const handleWebsiteChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCompanyWebsite(event.target.value);
  };

  const handleBioChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCompanyBio(event.target.value);
  };

  const mutation = useUpdateCompanyMutation(company);

  const handleSubmit = () => {
    const companyData: PutCompanyRequestBody = {
      name: companyName,
      website: companyWebsite,
      bio: companyBio,
    };

    mutation.mutate(companyData);
    setOpen(false);
  };

  useEffect(() => {
    if (companyData) {
      setCompanyName(companyData?.name || '');
      setCompanyWebsite(companyData?.website || '');
      setCompanyBio(companyData?.bio || '');
    }
  }, [companyData]);

  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.invalidateQueries(['company', company]);
    }
  }, [mutation.isSuccess, queryClient, company]);

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
                  Edit an individual company
                </Typography>
                <Typography
                  id="transition-modal-description"
                  sx={({ typography }) => ({
                    fontSize: typography.body2.fontSize,
                  })}
                >
                  Modify a company profile from the system
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="medium"
                  variant="outlined"
                  label="Company Name"
                  value={companyName}
                  sx={{ mb: 2 }}
                  onChange={handleNameChange}
                  fullWidth
                />
                <TextField
                  size="medium"
                  variant="outlined"
                  label="Company Website"
                  value={companyWebsite}
                  sx={{ mb: 2 }}
                  onChange={handleWebsiteChange}
                  fullWidth
                />
                <TextField
                  rows={10}
                  size="medium"
                  variant="outlined"
                  label="Company Bio"
                  value={companyBio}
                  onChange={handleBioChange}
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

export default EditCompanyModal;
