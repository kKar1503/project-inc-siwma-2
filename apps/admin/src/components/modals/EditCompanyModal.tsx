import React, { useMemo, useState, useEffect } from 'react';
import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import { useResponsiveness } from '@inc/ui';
import { Company } from '@/utils/api/client/zod/companies';
import { useMutation, useQuery } from 'react-query';
import Spinner from '@/components/fallbacks/Spinner';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import fetchCompany from '@/middlewares/company-management/fetchCompany';
import fetchCompaniesByName from '@/middlewares/company-management/fetchCompaniesByName';
import updateCompany from '@/middlewares/company-management/updateCompany';

export type EditCompanyModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  company: string;
  updateData: (lastIdPointer?: number, limit?: number) => void;
};

export type PutCompanyRequestBody = {
  name: string;
  website: string;
  bio: string;
  image?: string;
};

const useGetCompaniesByNameQuery = (name?: string) => {
  const { data, error, isError, isLoading } = useQuery(
    ['companies', name],
    async () => fetchCompaniesByName(name),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return { data, error, isError, isLoading };
};

const useGetCompanyQuery = (companyId: string) => {
  const { data, error, isError, isLoading } = useQuery(
    ['company', companyId],
    async () => fetchCompany(companyId),
    {
      enabled: companyId !== undefined,
    }
  );
  return { data, error, isError, isLoading };
};

const useUpdateCompanyMutation = (companyId: string, companyImage?: File) =>
  useMutation((updatedCompanyData: PutCompanyRequestBody) =>
    updateCompany(updatedCompanyData, companyId, companyImage)
  );

const EditCompanyModal = ({ open, setOpen, company, updateData }: EditCompanyModalProps) => {
  const companyData = useGetCompanyQuery(company);
  const companies = useGetCompaniesByNameQuery(companyData.data?.name);

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [name, setName] = useState<string>(companyData.data?.name || '');
  const [website, setWebsite] = useState<string>(companyData.data?.website || '');
  const [bio, setBio] = useState<string>(companyData.data?.bio || '');
  const [selectedCompanyFile, setSelectedCompanyFile] = useState<File | null>(null);

  const [nameError, setNameError] = useState<string>('');
  const [websiteError, setWebsiteError] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');

  const checkCompanyDuplicate = (companyData: Company) => {
    if (companies.data && companyData) {
      return companies.data.some(
        (company: Company) => company.name === companyData.name && company.id !== companyData.id
      );
    }
    return false;
  };

  const resetErrors = () => {
    setNameError('');
    setWebsiteError('');
    setFileError('');
  };

  const formValidation = () => {
    resetErrors();

    let formIsValid = true;
    const websiteRegex =
      /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g;

    if (!name || name.trim().length === 0) {
      setNameError('Name is required');
      formIsValid = false;
    }

    if (companyData?.data && checkCompanyDuplicate(companyData?.data)) {
      setNameError('Company already exists');
      formIsValid = false;
    }

    if (!website && !websiteRegex.test(website)) {
      setWebsiteError('Website is invalid. Use the format: www.example.com');
      formIsValid = false;
    }

    if (
      (selectedCompanyFile &&
        !AcceptedFileTypes.JPG.includes(selectedCompanyFile.type) &&
        !AcceptedFileTypes.PNG.includes(selectedCompanyFile.type)) ||
      selectedCompanyFile?.type === ''
    ) {
      setFileError('File type is invalid. Please upload a JPG or PNG file');
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

  const handleBioChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setBio(event.target.value);
  };

  const mutation = useUpdateCompanyMutation(company, selectedCompanyFile ?? undefined);

  const handleSubmit = async () => {
    const companyData: PutCompanyRequestBody = {
      name,
      website,
      bio,
    };

    if (!formValidation()) {
      return;
    }

    await mutation.mutateAsync(companyData);
    setOpen(false);
    updateData();
  };

  useEffect(() => {
    if (companyData.data) {
      setName(companyData.data.name || '');
      setWebsite(companyData.data.website || '');
      setBio(companyData.data.bio || '');
    }
  }, [companyData.data]);

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
          width: '70%',
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

  const isQueryLoading = companyData?.isLoading || companies?.isLoading;
  const isQueryError = companyData?.isError || companies?.isError;

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
            {isQueryLoading || isQueryError ? (
              <Spinner /> || (
                <Typography
                  sx={({ palette }) => ({
                    color: palette.error.main,
                  })}
                >
                  An error occurred, please refresh the page try again
                  <br />
                  If the problem persists, please contact the administrator for assistance
                </Typography>
              )
            ) : (
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
                    value={name}
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
                    value={website}
                    sx={{ mb: 2 }}
                    onChange={handleWebsiteChange}
                    error={Boolean(websiteError)}
                    helperText={websiteError}
                    fullWidth
                  />
                  <TextField
                    rows={15}
                    size="medium"
                    variant="outlined"
                    label="Company Bio"
                    value={bio}
                    onChange={handleBioChange}
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
                    maxHeight="160px"
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
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default EditCompanyModal;
