/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button } from '@mui/material';
import { FieldValues, Form, FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { validateCompanyName } from '@/utils/api/validate';
import FormNumberInput from '@/components/forms/FormNumberInput';
import { FormInputGroup, FormTextInput } from '../components/forms';

// /**
//  * Maps default values into react-hook-form default values
//  * @param {{name: string, image: string, website: string, bio: string, comments: string}} data The data to parse into default values
//  * @returns A default value object for react-hook-form
//  */
// const obtainDefaultValues = (data) => ({
//   id: data.id,
//   companyName: data.name,
//   companyLogo: data.image,
//   companyWebsite: data.website,
//   companyBio: data.bio,
//   companyComments: data.comments,
// });

const FormTest = () => {
  // -- States --//
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  // Initialise react hook forms
  const formHook = useForm();

  // Deconstruct the individual hooks from the object
  const {
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { isDirty, dirtyFields },
  } = formHook;

  const onSubmit = (data: FieldValues) => {
    console.log('submit');

    // Deconstruct values from data
    const { companyName } = data.data;

    // -- Validation -- //
    // Initialise an array of errors
    const errors: { [key: string]: Error } = {};

    console.log({ data, companyName });

    // Validate all data
    Object.keys(data.data).forEach((key) => {
      console.log({ key });
      try {
        if (key === 'companyName') {
          validateCompanyName(companyName);
        }
      } catch (err) {
        errors[key] = err as Error;
      }
    });

    console.log({ errors });

    // Check if there were any errors
    if (Object.keys(errors).length > 0) {
      // There was an error
      setIsErrored(true);

      // Error all the input fields
      Object.keys(data.data).forEach((inputName) => {
        setError(inputName, { message: errors[inputName].message });
      });

      return;
    }

    // Success, reset the default value of the inputs and show success message
    reset(data, { keepValues: true });
    setSubmitSuccess(true);
    // onSuccessChange();
  };

  // Reset the default values of the input when the queryData provided changes
  // useEffect(() => {
  //   if (!isLoading && !submitSuccess && !isDirty) {
  //     reset(obtainDefaultValues(company, { keepValues: true }));
  //   }
  // }, [company]);

  // Clear success state of the form as soon as a input value changes
  useEffect(() => {
    // Checks that the form submission state is currently successful, and that there is at least 1 dirty input
    if (submitSuccess && isDirty) {
      // There is at least 1 dirty input, clear the success status of the form
      setSubmitSuccess(false);
    }
  }, [isDirty]);

  return (
    <Box sx={{ padding: 2 }}>
      <Form onSubmit={onSubmit} control={control}>
        <FormProvider {...formHook}>
          <FormInputGroup
            sx={{ flex: 1 }}
            label="Company Name"
            name="companyName"
            isLoading={false}
            success={submitSuccess}
            required
          >
            {/** @ts-ignore */}
            <FormTextInput />
          </FormInputGroup>
          <FormInputGroup
            sx={{ flex: 1 }}
            label="Number Input"
            name="numberInput"
            isLoading={false}
            success={submitSuccess}
            required
          >
            {/** @ts-ignore */}
            <FormNumberInput />
          </FormInputGroup>
        </FormProvider>
        <Button type="submit" variant="outlined">
          Save Changes
        </Button>
      </Form>
    </Box>
  );
};

export default FormTest;
