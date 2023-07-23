import React, { useMemo, useState } from 'react';
import FileUpload, {
  AcceptedFileTypes,
  FileUploadProps,
} from '@/components/FileUpload/FileUploadBase';
import { useResponsiveness } from '@inc/ui';
import { PostCompanyRequestBody } from '@/utils/api/server/zod';
import { useQuery } from 'react-query';
import { Company } from '@/utils/api/client/zod/companies';
import XLSX from 'xlsx';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import createCompany from '@/middlewares/company-management/createCompany';
import fetchCompanies from '@/middlewares/company-management/fetchCompanies';

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

const AddCompaniesModal = ({ open, setOpen, updateData }: AddCompanyModalProps) => {
  const companies = useGetCompaniesQuery();
  const [file, setFile] = useState<File | null>(null);
  const [fileDetails, setFileDetails] = useState<PostCompanyRequestBody[]>([]); // [name, website, comments, image
  const [errors, setErrors] = useState<string[]>([]);
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

  const checkCompanyDuplicate = (name: string) => {
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
    if (fileData) {
      return fileData.some(
        (company: PostCompanyRequestBody, i: number) =>
          i !== index && company.name === companyData.name
      );
    }
    return false;
  };

  const validateData = (data: PostCompanyRequestBody[]) => {
    setErrors([]);

    const errorData: string[] = [];
    const websiteRegex =
      /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g;
    const validatedData: PostCompanyRequestBody[] = [];

    data.forEach((companyData, index) => {
      let error = '';

      if (!companyData.name || companyData.name.toString().trim().length === 0) {
        error = 'Name is required';
      }

      if (checkCompanyDuplicate(companyData.name)) {
        error = `Company already exists: ${companyData.name}`;
      }

      if (checkCompanyDuplicateInFile(companyData, data, index)) {
        error = `Company already exists in the file: ${companyData.name}`;
      }

      if (companyData.website && !websiteRegex.test(companyData.website)) {
        error = 'Website is invalid';
      }

      if (error) {
        errorData.push(error);
      } else {
        validatedData.push(companyData);
      }
    });

    if (errorData.length !== 0) {
      setErrors(errorData);
    }

    return validatedData;
  };

  const postCompanies = async () => {
    await Promise.all(fileDetails.map((company) => createCompany(company)));

    updateData();
  };

  const handleExcelChange: FileUploadProps['changeHandler'] = (event) => {
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
          name: x[0],
          website: x[1] || '',
          comments: x[2],
          image: x[3],
        };

        return data;
      });

      const companiesData = validateData(mappedData);
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
                  sx={({ typography }) => ({
                    fontSize: typography.body2.fontSize,
                  })}
                >
                  Register multiple company profiles into the system
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {errors &&
                  errors.map((error) => (
                    <Typography
                      sx={({ palette }) => ({
                        color: palette.error.main,
                      })}
                    >
                      {error}
                    </Typography>
                  ))}
                <FileUpload
                  id="bulk-registers"
                  title=""
                  description="Import an .xlsx file below to bulk add company profiles"
                  selectedFile={file}
                  changeHandler={handleExcelChange}
                  accept={[AcceptedFileTypes.XLSX]}
                  maxWidth="200px"
                  maxHeight="200px"
                />
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  onClick={postCompanies}
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
