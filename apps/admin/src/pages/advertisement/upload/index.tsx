// import { useState, useMemo } from 'react';
// import { Button, Box, TextField, Grid, Switch, Typography } from '@mui/material';
// import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
// import { useTheme } from '@mui/material/styles';
// import Modal from '@inc/ui/lib/components/Modal';
// import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
// import createdAdvertisementData from '@/services/createAdvertisement';
// import { useMutation, useQuery, useQueryClient } from 'react-query';
// import { useRouter } from 'next/router';

// export type CreateAdvertisementProps = {
//   active: string;
//   startDate: string;
//   endDate: string;
//   description: string;
//   link: string;
//   companyId?: string;
//   image?: File;
// };

import { useState, useMemo } from 'react';
import { Button, Box, TextField, Grid, Switch, Typography } from '@mui/material';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';
import Modal from '@inc/ui/lib/components/Modal';
import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import createdAdvertisementData from '@/services/createAdvertisement';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

export type CreateAdvertisementProps = {
  active: string;
  startDate: string;
  endDate: string;
  description: string;
  link: string;
  companyId?: string;
  image?: File;
};

const AdvertisementUpload = () => {
  const theme = useTheme();
  const { spacing } = theme;
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [open, setOpen] = useState(false);
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>('');
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({
    companyId: '',
    link: '',
    description: '',
    startDate: '',
    endDate: '',
    active: false,
    image: '',
  });

  const [formErrors, setFormErrors] = useState({
    companyId: '',
    link: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const usePostAdvertisementMutation = useMutation(
    (formValues: CreateAdvertisementProps) =>
      createdAdvertisementData(
        formValues.active,
        formValues.startDate,
        formValues.endDate,
        formValues.description,
        formValues.link,
        formValues.companyId,
        formValues.image // Pass the image File object here
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('category');
        router.push('/category');
      },
    }
  );

  const validateForm = () => {
    const errors = {
      companyId: '',
      link: '',
      description: '',
      startDate: '',
      endDate: '',
    };

    if (formValues.link.trim() === '') {
      errors.link = 'Company link is required';
    }

    if (formValues.description.trim() === '') {
      errors.description = 'Advertisement description is required';
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
    if (name === 'image') {
      // Corrected the property name here
      setImage(value);
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      active: checked,
    }));
  };

  const handleFileChange: FileUploadProps['changeHandler'] = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setImage(event.target.files[0].name);
    }
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.values(errors).every((error) => error === '')) {
      console.log('Form Data:', formValues);
      setOpen(true); // Open the modal after successful form submission
      setLeftButtonState(true); // Set leftButtonState to true if needed
      await usePostAdvertisementMutation.mutateAsync(formValues);
    } else {
      setFormErrors(errors);
    }
  };

  const handleRightButtonClick = () => {
    setOpen(false); // Close the modal
    setLeftButtonState(false); // Reset the leftButtonState if needed
    router.push('/advertisement/dashboard');
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
    <Box
      sx={({ spacing, palette }) => ({
        backgroundColor: palette.background.paper,
        borderRadius: spacing(2),
        mt: spacing(3),
        mb: spacing(3),
        mr: spacing(3),
        ml: spacing(3),
      })}
    >
      <Box>
        <Upload
          id="advetismetn image upload"
          title="Advertisement Image Upload"
          description="Select a JPG or PNG file to upload as an advertisement image."
          selectedFile={selectedFile}
          changeHandler={handleFileChange}
          accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
          maxWidth="500px"
          maxHeight="500px"
        />
      </Box>

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
          <TextField
            label="Link"
            variant="outlined"
            sx={{
              width: '100%',
            }}
            name="link"
            value={formValues.link}
            onChange={handleChange}
            error={formErrors.link !== ''}
            helperText={formErrors.link}
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
            name="description"
            value={formValues.description}
            onChange={handleChange}
            error={formErrors.description !== ''}
            helperText={formErrors.description}
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
            <Switch name="activate" checked={formValues.active} onChange={handleSwitchChange} />
          </Box>

          <Typography
            sx={({ spacing, typography }) => ({
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              fontSize: typography.body1,
              mt: spacing(2),
            })}
          >
            Start Date - End Date:
          </Typography>

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
              type="date"
              value={formValues.startDate}
              name="startDate"
              onChange={handleChange}
              error={formErrors.startDate !== ''}
              helperText={formErrors.startDate}
              sx={{ width: 200 }}
            />

            <Typography
              sx={({ spacing, typography }) => ({
                fontSize: typography.body1,
                fontWeight: 'bold',
                mt: spacing(2),
                ml: spacing(2),
              })}
            >
              一
            </Typography>

            <TextField
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
    </Box>
  );
};

export default AdvertisementUpload;
