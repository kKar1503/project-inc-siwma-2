import React, { useMemo, useState } from 'react';
import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import { useResponsiveness } from '@inc/ui';
import { PostCompanyRequestBody } from '@/utils/api/server/zod';
import { useQuery } from 'react-query';
import { Company } from '@/utils/api/client/zod/companies';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import createCompany from '@/middlewares/company-management/createCompany';
import fetchCompanies from '@/middlewares/company-management/fetchCompanies';
import fetchCompaniesByName from '@/middlewares/company-management/fetchCompaniesByName';

export type AddCompanyModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  updateData: () => void;
};

const useGetCompaniesQuery = () => {
  const { data } = useQuery('companies', async () => fetchCompanies(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return data;
};

const AddCompanyModal = ({ open, setOpen, updateData }: AddCompanyModalProps) => {
  const companies = useGetCompaniesQuery();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [name, setName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [selectedCompanyFile, setSelectedCompanyFile] = useState<File | null>(null);

  // validation
  const [nameError, setNameError] = useState<string>('');
  const [websiteError, setWebsiteError] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');

  const getCompaniesByName = async (name: string) => {
    const data = await fetchCompaniesByName(name);

    return data;
  };

  const checkCompanyDuplicate = async (name: string) => {
    const companies = await getCompaniesByName(name);

    if (companies) {
      return companies.some((company: Company) => company.name === name);
    }
    return false;
  };

  const resetErrors = () => {
    setNameError('');
    setWebsiteError('');
    setFileError('');
  };

  const formValidation = async () => {
    resetErrors();

    let formIsValid = true;
    const websiteRegex =
      /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g;

    if (await checkCompanyDuplicate(name)) {
      setNameError('Company already exists');
      formIsValid = false;
    }

    if (!name || name.trim().length === 0) {
      setNameError('Name is required');
      formIsValid = false;
    }

    if (website && !websiteRegex.test(website)) {
      setWebsiteError('Website is invalid. Use the format: https://www.example.com');
      formIsValid = false;
    }

    if (
      (selectedCompanyFile &&
        !AcceptedFileTypes.JPG.includes(selectedCompanyFile.type) &&
        !AcceptedFileTypes.PNG.includes(selectedCompanyFile.type)) ||
      selectedCompanyFile?.type === ''
    ) {
      setFileError('File type is invalid');
      formIsValid = false;
    }

    return formIsValid;
  };

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
    };

    if (!formValidation()) {
      return;
    }

    await createCompany(companyData, selectedCompanyFile ?? undefined);
    updateData();
    setOpen(false);
  };

  const handleSubmit = async () => {
    await postCompany();
  };

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
                  error={Boolean(nameError)}
                  helperText={nameError}
                  fullWidth
                />
                <TextField
                  size="medium"
                  variant="outlined"
                  label="Company Website"
                  sx={{ mb: 2 }}
                  onChange={handleWebsiteChange}
                  error={Boolean(websiteError)}
                  helperText={websiteError}
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
                {fileError && (
                  <Typography
                    sx={({ palette }) => ({
                      color: palette.error.main,
                    })}
                  >
                    {fileError}
                  </Typography>
                )}
                <Upload
                  id="companyImage"
                  title="Company Logo (Optional)"
                  description=""
                  selectedFile={selectedCompanyFile}
                  changeHandler={handleLogoChange}
                  accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
                  maxWidth="200px"
                  maxHeight="90px"
                />
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  onClick={handleSubmit}
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
