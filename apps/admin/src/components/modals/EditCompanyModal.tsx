import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { useResponsiveness } from '@inc/ui';
import fetchCompany from '@/middlewares/company-management/fetchCompany';
import updateCompany from '@/middlewares/company-management/updateCompany';

export type EditCompanyModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  company: string;
};

// const usePutCompanyQuery = (company) => {

// }

const EditCompanyModal = ({ open, setOpen, company }: EditCompanyModalProps) => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);

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

  console.log(company);

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
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  size="medium"
                  variant="outlined"
                  label="Company Website"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  rows={6}
                  size="medium"
                  variant="outlined"
                  label="Company Bio"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={6}>
                <input type="file" accept="image/*" id="upload-btn" style={{ display: 'none' }} />
                <label htmlFor="upload-btn">
                  <Box
                    sx={{
                      height: '255px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      border: '1px solid #BDBDBD',
                      mb: 2,
                    }}
                  >
                    <DownloadIcon
                      sx={({ typography }) => ({
                        fontSize: typography.h2.fontSize,
                      })}
                    />
                    <Typography variant="body2">Company Logo (Optional)</Typography>
                  </Box>
                </label>
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

export default EditCompanyModal;
