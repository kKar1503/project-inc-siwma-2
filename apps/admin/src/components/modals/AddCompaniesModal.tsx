import React, { useMemo, useState } from 'react';
import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import { useResponsiveness } from '@inc/ui';
import { useQuery } from 'react-query';
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
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [selectedCompaniesFile, setSelectedCompaniesFile] = useState<File | null>(null);

  const handleExcelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result as string;
        // Process the contents of the Excel file
        console.log(contents);
      };
      reader.readAsText(file);
    }
  };

  const postCompanies = () => {
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
                <input type="file" accept=".xlsx, .xls, .csv" onChange={handleExcelChange} />
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  onClick={postCompanies}
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

export default AddCompaniesModal;
