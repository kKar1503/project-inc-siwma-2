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
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [selectedCompaniesFile, setSelectedCompaniesFile] = useState<File | null>(null);

  const handleExcelChange: FileUploadProps['changeHandler'] = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedCompaniesFile(event.target.files[0]);
    }
  };

  const postCompanies = async () => {
    console.log('postCompanies');
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
                <Upload
                  id="companyImage"
                  title=""
                  description=""
                  selectedFile={null}
                  changeHandler={handleExcelChange}
                  accept={[AcceptedFileTypes.XLSX]}
                  maxWidth="200px"
                  maxHeight="200px"
                />
                <Button variant="contained" type="submit" size="large" fullWidth>
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

export default AddCompaniesModal;
