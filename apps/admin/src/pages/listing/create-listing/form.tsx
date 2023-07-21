import { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import Modal from '@inc/ui/lib/components/Modal';

const Form = () => {
  const theme = useTheme();
  const { spacing } = theme;
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [open, setOpen] = useState(false);
  const [leftButtonState, setLeftButtonState] = useState(false);

  const [formValues, setFormValues] = useState({
    listingName: '',
    listingNameChinese: '',
    description: '',
    unit: '',
    unitChinese: '',
  });

  const [formErrors, setFormErrors] = useState({
    listingName: '',
    listingNameChinese: '',
    description: '',
    unit: '',
    unitChinese: '',
  });

  const validateForm = () => {
    const errors = {
      listingName: '',
      listingNameChinese: '',
      description: '',
      unit: '',
      unitChinese: '',
    };

    if (formValues.listingName.trim() === '') {
      errors.listingName = 'Listing Name is required';
    }

    if (formValues.listingNameChinese.trim() === '') {
      errors.listingNameChinese = 'Company link is required';
    }

    if (formValues.description.trim() === '') {
      errors.description = 'Advertisement title is required';
    }

    if (formValues.unit.trim() === '') {
      errors.unit = 'Advertisement description is required';
    }
    if (formValues.unitChinese.trim() === '') {
      errors.unitChinese = 'Advertisement description is required';
    }

    return errors;
  };

  const handleClickOpen = () => {
    // Validate form before opening the modal
    const errors = validateForm();
    if (Object.values(errors).every((error) => error === '')) {
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
        pt: spacing(3),
        pr: '20px',
        pl: '20px',
        pb: spacing(3),
        height: '100%;',
        width: '100%',
        justifyContent: 'center',
      };
    }
    if (isMd) {
      return {
        pt: spacing(3),
        pb: spacing(3),
        pr: '40px',
        pl: '40px',
        height: '100%;',
        width: '100%',
        justifyContent: 'center',
      };
    }
    if (isLg) {
      return {
        pt: spacing(3),
        pb: spacing(3),
        pr: '60px',
        pl: '60px',
        height: '100%;',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      };
    }
    return {
      py: spacing(3),
      px: '20px',
      height: '100%;',
      width: '100%',
    };
  }, [isSm, isMd, isLg]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <Box sx={gridCols}>
      <Box
        component="form"
        sx={() => ({
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        })}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '20px',
              pb: '30px',
            }}
          >
            Create Listing Item
          </Typography>
        </Box>

        <TextField
          label="Listing Name"
          variant="outlined"
          sx={({ spacing }) => ({
            mr: spacing(2),
            pb: spacing(3),
            width: '100%',
          })}
          name="listingName"
          value={formValues.listingName}
          onChange={handleChange}
          error={formErrors.listingName !== ''}
          helperText={formErrors.listingName}
        />

        <TextField
          label="Listing Name (Chinese)"
          variant="outlined"
          sx={({ spacing }) => ({
            mr: spacing(2),
            pb: spacing(3),
            width: '100%',
          })}
          name="listingNameChinese"
          value={formValues.listingNameChinese}
          onChange={handleChange}
          error={formErrors.listingNameChinese !== ''}
          helperText={formErrors.listingNameChinese}
        />

        <TextField
          label="Description"
          variant="outlined"
          sx={({ spacing }) => ({
            mr: spacing(2),
            pb: spacing(3),
            width: '100%',
          })}
          name="description"
          value={formValues.description}
          onChange={handleChange}
          error={formErrors.description !== ''}
          helperText={formErrors.description}
        />

        <Select sx={{ width: '100%' }} label="Category"></Select>

        <TextField
          label="Unit"
          variant="outlined"
          sx={({ spacing }) => ({
            mr: spacing(2),
            pb: spacing(3),
            mt: spacing(3),
            width: '100%',
          })}
          name="unit"
          value={formValues.unit}
          onChange={handleChange}
          error={formErrors.unit !== ''}
          helperText={formErrors.unit}
        />

        <TextField
          label="Unit (Chinese)"
          variant="outlined"
          sx={({ spacing }) => ({
            mr: spacing(2),
            pb: spacing(1),
            width: '100%',
          })}
          name="unitChinese"
          value={formValues.unitChinese}
          onChange={handleChange}
          error={formErrors.unitChinese !== ''}
          helperText={formErrors.unitChinese}
        />
        <Box
          sx={({ spacing }) => ({
            width: '100%',
            mt: spacing(2),
            display: 'flex',
            justifyContent: 'flex-end',
          })}
        >
          <Button
            onClick={handleClickOpen}
            variant="contained"
            sx={({ spacing }) => ({
              width: '20%',
              mt: spacing(1),
              mb: spacing(1),
            })}
          >
            CONFIRM
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
    </Box>
  );
};

export default Form;
