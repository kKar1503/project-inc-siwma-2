/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button } from '@mui/material';
import { FieldValues, Form, FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormInputGroup, FormTextInput } from '../components/forms';

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
    const { companyName } = data;

    // -- Validation -- //
    // Initialise an array of errors
    const errors = [];
  };

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
        </FormProvider>
        <Button type="submit" variant="outlined">
          Save Changes
        </Button>
      </Form>
    </Box>
  );
};

export default FormTest;
