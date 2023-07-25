import { useState, useMemo } from 'react';
import { Button, Box, TextField, Grid, Switch, Typography, Card, CardContent } from '@mui/material';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import Modal from '@inc/ui/lib/components/Modal';

const Form = ({ imgURL }: { imgURL: string }) => {
  const theme = useTheme();
  const { spacing } = theme;
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [open, setOpen] = useState(false);
  const [leftButtonState, setLeftButtonState] = useState(false);

  const [formValues, setFormValues] = useState({
    companyToTag: '',
    companyLink: '',
    advertisementTitle: '',
    advertisementDescription: '',
    startDate: '',
    endDate: '',
    activate: false, // Default value for the switch
    imgURL: '',
  });

  const [formErrors, setFormErrors] = useState({
    companyToTag: '',
    companyLink: '',
    advertisementTitle: '',
    advertisementDescription: '',
    startDate: '',
    endDate: '',
  });

  const validateForm = () => {
    const errors = {
      companyToTag: '',
      companyLink: '',
      advertisementTitle: '',
      advertisementDescription: '',
      startDate: '',
      endDate: '',
    };

    if (formValues.companyToTag.trim() === '') {
      errors.companyToTag = 'Company to tag is required';
    }

    if (formValues.companyLink.trim() === '') {
      errors.companyLink = 'Company link is required';
    }

    if (formValues.advertisementTitle.trim() === '') {
      errors.advertisementTitle = 'Advertisement title is required';
    }

    if (formValues.advertisementDescription.trim() === '') {
      errors.advertisementDescription = 'Advertisement description is required';
    }

    if (formValues.startDate.trim() === '') {
      errors.startDate = 'Start Date is required';
    }

    if (formValues.endDate.trim() === '') {
      errors.endDate = 'End Date is required';
    }

    return errors;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      activate: checked,
    }));
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.values(errors).every((error) => error === '')) {
      console.log('Form Data:', formValues);
      setOpen(true);
    } else {
      setFormErrors(errors);
    }
  };

  const handleRightButtonClick = () => {
    setOpen(false);
  };

  const gridCols = useMemo(() => {
    if (isSm) {
      return {
        py: spacing(3),
        px: spacing(5),
        height: '100%;',
        width: '100%',
        justifyContent: 'center',
      };
    }
    if (isMd) {
      return {
        py: spacing(3),
        px: spacing(5),
        height: '100%;',
        width: '100%',
        justifyContent: 'center',
      };
    }
    if (isLg) {
      return {
        py: spacing(3),
        px: spacing(5),
        height: '100%;',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      };
    }
    return {
      py: spacing(3),
      px: spacing(3),
      height: '100%;',
      width: '100%',
    };
  }, [isSm, isMd, isLg]);

  return (
    <Grid sx={gridCols}>
      <Box
        component="form"
        sx={() => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        })}
      >
        <Box
          sx={() => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          })}
        >
          <TextField
            label="Company to tag"
            variant="outlined"
            sx={({ spacing }) => ({
              mr: spacing(2),
              width: '100%',
            })}
            name="companyToTag"
            value={formValues.companyToTag}
            onChange={handleChange}
            error={formErrors.companyToTag !== ''}
            helperText={formErrors.companyToTag}
          />

          <TextField
            label="Company link"
            variant="outlined"
            sx={{
              width: '100%',
            }}
            name="companyLink"
            value={formValues.companyLink}
            onChange={handleChange}
            error={formErrors.companyLink !== ''}
            helperText={formErrors.companyLink}
          />
        </Box>

        <TextField
          label="Advertisement title"
          variant="outlined"
          fullWidth
          sx={({ spacing }) => ({
            mt: spacing(2),
            width: '100%',
          })}
          name="advertisementTitle"
          value={formValues.advertisementTitle}
          onChange={handleChange}
          error={formErrors.advertisementTitle !== ''}
          helperText={formErrors.advertisementTitle}
        />

        <TextField
          label="Advertisement description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          sx={({ spacing }) => ({
            mt: spacing(2),
            width: '100%',
          })}
          name="advertisementDescription"
          value={formValues.advertisementDescription}
          onChange={handleChange}
          error={formErrors.advertisementDescription !== ''}
          helperText={formErrors.advertisementDescription}
        />

        <Box
          sx={({ spacing }) => ({
            width: '100%',
            mt: spacing(2),
            display: 'flex',
            justifyContent: 'flex-start',
          })}
        >
          <Typography
            sx={({ typography, spacing }) => ({
              fontSize: typography.body1,
              mt: spacing(1),
            })}
          >
            Activate:
          </Typography>
          <Switch name="activate" checked={formValues.activate} onChange={handleSwitchChange} />
        </Box>

        {/* Date Picker */}
        <Box
          sx={({ spacing }) => ({
            width: '100%',
            mt: spacing(2),
            display: 'flex',
            justifyContent: 'flex-start',
          })}
        >
          <TextField
            label="Start Date"
            type="date"
            value={formValues.startDate}
            name="startDate"
            onChange={handleChange}
            error={formErrors.startDate !== ''}
            helperText={formErrors.startDate}
            sx={{ width: 200 }}
          />

          <TextField
            label="End Date"
            type="date"
            value={formValues.endDate}
            name="endDate"
            onChange={handleChange}
            error={formErrors.endDate !== ''}
            helperText={formErrors.endDate}
            sx={({ spacing }) => ({ width: 200, ml: spacing(2) })}
          />
        </Box>

        <Box
          sx={({ spacing }) => ({
            width: '100%',
            mt: spacing(2),
            display: 'flex',
            justifyContent: 'flex-end',
          })}
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={({ spacing }) => ({
              width: '10%',
              mt: spacing(1),
              mb: spacing(1),
            })}
          >
            Submit
          </Button>
          <Modal
            open={open}
            setOpen={setOpen}
            buttonColor="#0000FF"
            icon="info"
            title="Confirmation"
            content="Advertisement has been successfully added!"
            rightButtonText="Back to Dashboard"
            rightButtonState={false}
            leftButtonState={leftButtonState}
            setLeftButtonState={setLeftButtonState}
            setRightButtonState={handleRightButtonClick}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default Form;
