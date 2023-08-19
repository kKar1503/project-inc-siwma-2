import React, { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Modal, useResponsiveness } from '@inc/ui';
import { Advertisment } from '@/utils/api/client/zod/advertisements';
import { PostAdvertisementRequestBody } from '@/utils/api/server/zod';
import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import Typography from '@mui/material/Typography';
import ModuleBase from '@/components/advertisementsDashboard/moduleBase';
import { useRouter } from 'next/router';
import SpinnerPage from '@/components/fallbacks/SpinnerPage';
import { Form, FormProvider, useForm } from 'react-hook-form';
import FormSearchDropdown from '@/components/forms/FormSearchDropdown';
import FormTextInput from '@/components/forms/FormTextInput';
import FormToggleButton from '@/components/forms/FormToggleButton';
import FormDatePicker from '@/components/forms/FormDatePicker';
import FormInputGroup from '@/components/forms/FormInputGroup';
import { DateTime } from 'luxon';

interface AdvertisementFormData {
  companyId: {
    label: string;
    value: string;
  };
  link: string;
  description: string;
  startDate: DateTime;
  endDate: DateTime;
  active: 'active' | 'inactive';
}

interface AdvertisementFormDataEmpty {
  companyId: {
    label: 'Select A Company';
    value: undefined;
  };
  link: '';
  description: '';
  startDate: DateTime;
  endDate: DateTime;
  active: 'active';
}

interface AdvertisementFormProps {
  advertisement: Advertisment | undefined;
  onSubmit: (body: PostAdvertisementRequestBody, image: File | undefined) => Promise<void>;
  companyDict: { [key: string]: string };
}

const parseToPostAdvertisementRequestBody = (values: AdvertisementFormData): PostAdvertisementRequestBody => ({
  companyId: values.companyId.value,
  link: values.link,
  description: values.description,
  startDate: values.startDate.toISODate() as string,
  endDate: values.endDate.toISODate() as string,
  active: values.active === 'active',
});

const getDefaultValue = (advertisement: Advertisment | undefined, companyDict: {
  [key: string]: string
}): AdvertisementFormData | AdvertisementFormDataEmpty => advertisement ? {
  companyId: {
    label: companyDict[advertisement.companyId],
    value: advertisement.companyId,
  },
  link: advertisement.link,
  description: advertisement.description,
  startDate: DateTime.fromISO(advertisement.startDate as string),
  endDate: DateTime.fromISO(advertisement.endDate as string),
  active: advertisement.active ? 'active' : 'inactive',
} : {
  companyId: {
    label: 'Select A Company',
    value: undefined,
  },
  link: '',
  description: '',
  startDate: DateTime.now(),
  endDate: DateTime.now(),
  active: 'active',
};

const AdvertisementForm = ({ advertisement, onSubmit, companyDict }: AdvertisementFormProps) => {
  const router = useRouter();
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const formHook = useForm({
    defaultValues: getDefaultValue(advertisement, companyDict),
  });

  const { control, handleSubmit, formState } = formHook;
  const { isSubmitting, isSubmitSuccessful } = formState;

  const handleFileChange: FileUploadProps['changeHandler'] = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onHandleSubmit = async (values: AdvertisementFormData) => {
    const advertisementData = parseToPostAdvertisementRequestBody(values);
    return onSubmit(advertisementData, selectedFile || undefined);
  };

  const onHandleError = async () => {
    // This function just needs to exist, no logic needed
  };

  const handleRightButtonClick = () => {
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


  if (isSubmitting) return <SpinnerPage />;

  return (
    <Box
      sx={({ spacing, palette }) => ({
        backgroundColor: palette.background.paper,
        borderRadius: spacing(2),
        m: spacing(3),
      })}
    >
      <Box sx={{
        display: 'flex',
      }}>
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
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
            <Modal setOpen={(): void => {
            }}
                   open={isSubmitSuccessful}
              buttonColor='#0000FF'
              icon='info'
              title='Confirmation'
              content='Advertisement has been successfully edited!'
              rightButtonText='Back to Dashboard'
              rightButtonState={false}
              setRightButtonState={handleRightButtonClick}
            />
          </Box>

          <Form
            onSubmit={() => {
              // this is never called
            }}
            control={control}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isSm ? '0.5rem' : '1rem',
              width: '100%',
            }}
          >
            <FormProvider {...formHook}>
              <FormInputGroup
                label='Company'
                name='companyId'
                required
              >
              <FormSearchDropdown
                options={Object.keys(companyDict).map((key) => ({
                  label: companyDict[key],
                  value: key,
                }))}
                label='Company'
                name='companyId'
                required
                customValidation={(obj)=>
                {
                  console.log(obj);
                }}
              />

              </FormInputGroup>
              <FormInputGroup
                label='Link'
                name='link'
                required
              >
                <FormTextInput
                label='Link'
                name='link'
                required
              />
              </FormInputGroup>
              <FormInputGroup
                label='Advertisement Description'
                name='description'
              >
              <FormTextInput
                label='Advertisement Description'
                name='description'
                multiline
              />
              </FormInputGroup>
              <FormInputGroup
                label='Active status'
                name='active'
              >
              <FormToggleButton name='active' label='Active' options={[{
                label: 'Active',
                value: 'active',
              }, {
                label: 'Inactive',
                value: 'inactive',
              }]} />
              </FormInputGroup>
              <Box
                sx={({ spacing }) => ({
                  width: '100%',
                  mt: spacing(2),
                  display: 'flex',
                  justifyContent: 'flex-start',
                })}
              >
                <FormInputGroup
                  name='startDate'
                  label='Start Date'
                  required
                >
                <FormDatePicker
                  name='startDate'
                  label='Start Date'
                  required
                />
                </FormInputGroup>

                <Typography
                  sx={({ spacing, typography }) => ({
                    fontSize: typography.body1,
                    fontWeight: 'bold',
                    m: spacing(2),
                  })}
                >
                  一
                </Typography>
                <FormInputGroup
                  name='endDate'
                  label='End Date'
                  required
                >
                <FormDatePicker
                  name='endDate'
                  label='End Date'
                  required
                />
                </FormInputGroup>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  columnGap: 3,
                  width: '100%',
                }}
              >
                <Button type='submit' onClick={handleSubmit(onHandleSubmit, onHandleError)} variant='contained'
                        sx={{ p: 2, flex: 1 }}>
                  {advertisement ? 'Edit Advertisement' : 'Create Advertisement'}
                </Button>
              </Box>
            </FormProvider>
          </Form>
        </Box>
      </ModuleBase>
    </Box>
  );
};

export default AdvertisementForm;
