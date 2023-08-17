import React, { ChangeEvent, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Modal, useResponsiveness } from '@inc/ui';
import { Advertisment } from '@/utils/api/client/zod/advertisements';
import { PostAdvertisementRequestBody } from '@/utils/api/server/zod';
import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import { useRouter } from 'next/router';
import SpinnerPage from '@/components/fallbacks/SpinnerPage';
import { Form, FormProvider, useForm } from 'react-hook-form';
import FormSearchDropdown from '@/components/forms/FormSearchDropdown';
import FormTextInput from '@/components/forms/FormTextInput';
import FormToggleButton from '@/components/forms/FormToggleButton';
import FormDatePicker from '@/components/forms/FormDatePicker';

const getDefaultValue = (advertisement?: Advertisment): Partial<PostAdvertisementRequestBody> => ({
  companyId: advertisement?.companyId,
  link: advertisement?.link || '',
  description: advertisement?.description || '',
  startDate: (advertisement ? new Date(advertisement?.startDate || '') : new Date()).toISOString().split('T')[0],
  endDate: (advertisement ? new Date(advertisement?.endDate || '') : new Date()).toISOString().split('T')[0],
  active: advertisement ? !!advertisement.active : true,
});

const AdvertisementForm = ({ advertisement, onSubmit, validate, companyDict }: {
  advertisement?: Advertisment;
  validate: (values: PostAdvertisementRequestBody) => { [key: string]: string };
  onSubmit: (body: PostAdvertisementRequestBody, image: File | undefined) => Promise<boolean>;
  companyDict: { [key: string]: string };
}) => {
  const router = useRouter();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [open, setOpen] = useState(false);
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processingSubmit, setProcessingSubmit] = useState(false);

  const formHook = useForm({
    defaultValues: getDefaultValue(advertisement),
  });
  const { control } = formHook;


  // const [formValues, setFormValues] = useState<Partial<PostAdvertisementRequestBody>>(getDefaultValue(advertisement));

  // const [formErrors, setFormErrors] = useState({
  //   companyId: '',
  //   endpointError: '',
  //   link: '',
  //   description: '',
  //   startDate: '',
  //   endDate: '',
  // });



  const handleFileChange: FileUploadProps['changeHandler'] = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // const setErrors = (errors: { [key: string]: string }) => {
  //   setFormErrors({
  //     companyId: '',
  //     endpointError: '',
  //     link: '',
  //     description: '',
  //     startDate: '',
  //     endDate: '',
  //     ...errors,
  //   });
  // };
  const handleSubmit = (values?: unknown) => {
    console.log('attempted to submit');
    console.log(values);
    // Validate form before opening the modal
    // const errors = validate(formValues);
    // if (Object.keys(errors).length !== 0) {
    //   setErrors(errors);
    //   return;
    // }
    // setProcessingSubmit(true);
    // onSubmit(formValues, selectedFile || undefined).then((success) => {
    //   setProcessingSubmit(false);
    //   setOpen(success);
    //   if (!success)
    //     setErrors({ endpointError: 'An error occurred while updating the advertisement.' });
    // }).catch((error) => {
    //   setProcessingSubmit(false);
    //   setErrors({ endpointError: error.message });
    // });
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

  // const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { checked } = event.target;
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     active: checked,
  //   }));
  // };
  //
  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }));
  // };

  if (processingSubmit) return <SpinnerPage />;

  return (
    <Box
      sx={({ spacing, palette }) => ({
        backgroundColor: palette.background.paper,
        borderRadius: spacing(2),
        m: spacing(3),
      })}
    >
      {/* {formErrors.endpointError && <Alert severity='error'>{formErrors.endpointError}</Alert>} */}
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
          <Box
            sx={({ spacing }) => ({
              width: '100%',
              mt: spacing(2),
              display: 'flex',
              justifyContent: 'flex-end',
            })}
          >
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

          <Form
            onSubmit={handleSubmit}
            control={control}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isSm ? '0.5rem' : '1rem',
              width: '100%',
            }}
          >


            <FormProvider {...formHook}>
              <FormSearchDropdown
                options={Object.keys(companyDict).map((key) => ({
                  label: companyDict[key],
                  value: key,
                }))}
                label='Company'
                name='companyId'
                required
              />

              <FormTextInput
                label='Link'
                name='link'
                required
              />
              <FormTextInput
                label='Advertisement Description'
                name='description'
                multiline
              />
              <FormToggleButton name='active' label='Active' options={[{
                label: 'Active',
                value: 'true',
              }, {
                label: 'Inactive',
                value: 'false',
              }]} />
              <Box
                sx={({ spacing }) => ({
                  width: '100%',
                  mt: spacing(2),
                  display: 'flex',
                  justifyContent: 'flex-start',
                })}
              >
                <FormDatePicker
                  name='startDate'
                  label='Start Date'
                  required
                />

                <Typography
                  sx={({ spacing, typography }) => ({
                    fontSize: typography.body1,
                    fontWeight: 'bold',
                    m: spacing(2),
                  })}
                >
                  一
                </Typography>

                <FormDatePicker
                  name='endDate'
                  label='End Date'
                  required
                />
              </Box>
            </FormProvider>
            <Box
              sx={{
                display: 'flex',
                columnGap: 3,
                width: '100%',
              }}
            >
              <Button type='button' variant='contained' color='error' sx={{ p: 2, flex: 1 }}>
                Cancel
              </Button>
              <Button type='submit' variant='contained' sx={{ p: 2, flex: 1 }}>
                Create Listing
              </Button>
            </Box>
          </Form>
        </Box>
      </ModuleBase>
    </Box>
  );
};

export default AdvertisementForm;
