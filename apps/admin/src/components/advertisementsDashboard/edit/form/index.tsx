import React, { ChangeEvent, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Modal, useResponsiveness } from '@inc/ui';
import { Advertisment } from '@/utils/api/client/zod/advertisements';
import { PostAdvertisementRequestBody } from '@/utils/api/server/zod';
import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import { Switch, Typography } from '@mui/material';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import { useRouter } from 'next/router';

const Index = ({ advertisement, onSubmit }: {
  advertisement: Advertisment;
  onSubmit: (body: Partial<PostAdvertisementRequestBody>, image: File | undefined) => Promise<boolean>;
}) => {
  const router = useRouter();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [open, setOpen] = useState(false);
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const [formValues, setFormValues] = useState<Partial<PostAdvertisementRequestBody>>({
    companyId: advertisement.companyId,
    link: advertisement.link,
    description: advertisement.description,
    startDate: new Date(advertisement.startDate || '').toISOString().split('T')[0],
    endDate: new Date(advertisement.endDate || '').toISOString().split('T')[0],
    active: advertisement.active,
  });

  const [formErrors, setFormErrors] = useState({
    endpointError: '',
    companyId: '',
    link: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const handleFileChange: FileUploadProps['changeHandler'] = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const validateForm = () => {
    if (formValues.companyId === undefined) {
      // error
      // auto fix error
      formValues.companyId = advertisement.companyId;
    }

    return {
      endpointError: '',
      companyId: '',
      link: '',
      description: '',
      startDate: '',
      endDate: '',
    };
  };

  const handleClickOpen = () => {
    // Validate form before opening the modal
    const errors = validateForm();
    if (Object.values(errors).every((error) => error === '')) {
      onSubmit(formValues, selectedFile || undefined).then((success) => {
        setOpen(success);
        setFormErrors({
          ...formErrors,
          endpointError: 'An error occurred while updating the advertisement.',
        });
      });
    } else {
      setFormErrors(errors);
    }
  };

  const handleRightButtonClick = () => {
    setOpen(false);
    router.push('/advertisement-dashboard');
  };

  const sx = useMemo(() => {
    const style = {
      height: '100%;',
      width: '100%',
      justifyContent: 'center',
    };
    if (isSm) return {
      ...style,
      py: '0.5rem',
      px: '1rem',
    };
    if (isMd) return {
      ...style,
      py: '1rem',
      px: '1.5rem',
    };
    if (isLg) return {
      ...style,
      py: '1rem',
      px: '2rem',
    };
    return {
      ...style,
      py: '1rem',
      px: '2rem',
    };
  }, [isSm, isMd, isLg]);

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      active: checked,
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <Box
      sx={({ spacing, palette }) => ({
        backgroundColor: palette.background.paper,
        borderRadius: spacing(2),
        m: spacing(3),
      })}
    >
      <Box>
        <Upload
          id='advertisement image upload'
          title='Advertisement Image Upload'
          description='Select a JPG or PNG file to upload as an advertisement image.'
          selectedFile={selectedFile}
          changeHandler={handleFileChange}
          accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
          maxWidth='100%'
          maxHeight='500px'
        />
      </Box>

      <ModuleBase width='100%' sx={sx}>
        <Box
          component='form'
          sx={() => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          })}
        >
          <TextField
            label='Link'
            variant='outlined'
            sx={{
              width: '100%',
            }}
            name='link'
            value={formValues.link}
            onChange={handleChange}
            error={formErrors.link !== ''}
            helperText={formErrors.link}
          />

          <TextField
            label='Advertisement description'
            variant='outlined'
            multiline
            rows={4}
            fullWidth
            sx={({ spacing }) => ({
              mt: spacing(2),
              width: '100%',
            })}
            name='description'
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
              Active:
            </Typography>
            <Switch name='activate' checked={formValues.active} onChange={handleSwitchChange} />
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
              type='date'
              value={formValues.startDate}
              name='startDate'
              label='startDate'
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
              type='date'
              value={formValues.endDate}
              name='endDate'
              label='endDate'
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
              onClick={handleClickOpen}
              variant='contained'
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
              buttonColor='#0000FF'
              icon='info'
              title='Confirmation'
              content='Advertisement has been successfully edited!'
              rightButtonText='Back to Dashboard'
              rightButtonState={false}
              leftButtonState={leftButtonState}
              setLeftButtonState={setLeftButtonState}
              setRightButtonState={handleRightButtonClick}
            />
          </Box>
        </Box>
      </ModuleBase>
    </Box>
  );
};

export default Index;
