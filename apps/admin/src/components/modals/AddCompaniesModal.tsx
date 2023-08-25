import React, { useMemo, useState } from 'react';
import FileUpload, {
  AcceptedFileTypes,
  FileUploadProps,
} from '@/components/FileUpload/FileUploadBase';
import { useResponsiveness } from '@inc/ui';
import { PostCompanyRequestBody } from '@/utils/api/server/zod';
import { Company } from '@/utils/api/client/zod/companies';
import * as XLSX from 'xlsx';
import Spinner from '@/components/fallbacks/Spinner';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import createCompany from '@/middlewares/company-management/createCompany';
import fetchCompaniesByName from '@/middlewares/company-management/fetchCompaniesByName';

export type AddCompanyModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  updateData: () => void;
};

const AddCompaniesModal = ({ open, setOpen, updateData }: AddCompanyModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileDetails, setFileDetails] = useState<PostCompanyRequestBody[]>([]);
  const [errors, setErrors] = useState<{ [error: string]: number }>({});
  const [fileError, setFileError] = useState('');
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [loading, setLoading] = useState(false);

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

  const checkCompanyDuplicateInFile = (
    companyData: PostCompanyRequestBody,
    fileData: PostCompanyRequestBody[],
    index: number
  ) => {
    if (fileData && fileData.length > 0) {
      return fileData.some(
        (company: PostCompanyRequestBody, i: number) =>
          i !== index && company.name === companyData.name
      );
    }
    return false;
  };

  const validateData = async (data: PostCompanyRequestBody[]) => {
    setErrors({});
    setLoading(true);

    const errorData: { [error: string]: number } = {}; // Object to store error messages and their counts
    const websiteRegex =
      /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g;
    const validatedData: PostCompanyRequestBody[] = [];

    await Promise.all(
      data.map(async (companyData, index) => {
        let error = '';

        if (!companyData.name || companyData.name.toString().trim().length === 0) {
          error = 'Name is required';
        }

        if (await checkCompanyDuplicate(companyData.name)) {
          error = `Company already exists`;
        }

        if (checkCompanyDuplicateInFile(companyData, validatedData, index)) {
          error = `Company already exists in the file`;
        }

        if (companyData.website) {
          if (!companyData.website && !websiteRegex.test(companyData.website)) {
            error = 'Website is invalid. Use the format: www.example.com';
          }
        }

        if (error) {
          // Update errorData to store error messages and their counts
          errorData[error] = (errorData[error] || 0) + 1;
        } else {
          validatedData.push(companyData);
        }
      })
    );

    if (Object.keys(errorData).length !== 0) {
      setErrors(errorData);
    }

    setLoading(false);
    return validatedData;
  };

  const postCompanies = async () => {
    await Promise.all(fileDetails.map((company) => createCompany(company)));

    updateData();
  };

  const handleExcelChange: FileUploadProps['changeHandler'] = async (event) => {
    setFileError('');

    if (!event.target.files) return;

    if (event.target.files.length === 1) {
      setFile(event.target.files[0]);
    } else if (event.target.files.length > 1) {
      setFile(null);
      setFileError('Please Select Only One File');
      return;
    } else {
      setFile(null);
      setFileError('Please Select a File');
      return;
    }

    if (event.target.files[0].size > 64000000) {
      setFile(null);
      setFileError('Please Select a File Smaller Than 64 MB');
      return;
    }

    if (event.target.files[0].type !== AcceptedFileTypes.XLSX) {
      setFile(null);
      setFileError('Please upload a .xlsx File');
      return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as Array<string>;
      parsedData.shift();

      const mappedData = parsedData.map((x) => {
        const data = {
          name: x[0],
          website: x[1] || '',
          comments: x[2],
          image: x[3],
        };

        return data;
      });

      const companiesData = await validateData(mappedData);

      setFileDetails(companiesData);
    };
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
        onClose={() => setOpen(false)}
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
            <Grid container direction="row">
              <Grid item xs={12}>
                <Typography
                  id="transition-modal-title"
                  sx={({ typography }) => ({
                    fontSize: typography.h6.fontSize,
                    fontWeight: typography.fontWeightBold,
                  })}
                >
                  Create multiple companies
                </Typography>
                <Typography
                  id="transition-modal-description"
                  sx={({ typography, spacing }) => ({
                    fontSize: typography.body2.fontSize,
                    mb: loading ? spacing(4) : 0,
                  })}
                >
                  Register multiple company profiles into the system
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {fileError && (
                  <Typography
                    sx={({ palette }) => ({
                      color: palette.error.main,
                    })}
                  >
                    {fileError}
                  </Typography>
                )}
                {errors &&
                  Object.entries(errors).map(([error, count]) => (
                    <Grid container key={error} sx={{ alignItems: 'center' }}>
                      <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                        <Badge
                          key={error}
                          badgeContent={count}
                          color="error"
                          sx={({ spacing }) => ({
                            mx: spacing(2),
                          })}
                        />
                        <Typography
                          sx={({ palette }) => ({
                            color: palette.error.main,
                          })}
                        >
                          {error}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                {loading ? (
                  <Spinner />
                ) : (
                  <FileUpload
                    id="bulk-registers"
                    title=""
                    description="Import an .xlsx file below to bulk add company profiles"
                    selectedFile={file}
                    changeHandler={handleExcelChange}
                    accept={[AcceptedFileTypes.XLSX]}
                    maxHeight="300px"
                  />
                )}
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  onClick={postCompanies}
                  sx={({ spacing }) => ({
                    mt: loading ? spacing(4) : 0,
                  })}
                  fullWidth
                >
                  Add Companies
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AddCompaniesModal;
