/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button } from '@mui/material';
import { FieldValues, Form, FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { validateCompanyName } from '@/utils/api/validate';
import FormNumberInput from '@/components/forms/FormNumberInput';
import FormSearchDropdown from '@/components/forms/FormSearchDropdown';
import {
  FormInputGroup,
  FormTextInput,
  FormRadioSelect,
  RadioSelectOption,
  FormDropdownSelector,
} from '../components/forms';

const dropdownOptions = [
  { label: 'The Shawshank Redemption', value: 1 },
  { label: 'The Godfather', value: 2 },
  { label: 'The Godfather: Part II', value: 3 },
  { label: 'The Dark Knight', value: 4 },
  { label: '12 Angry Men', value: 5 },
  { label: "Schindler's List", value: 6 },
  { label: 'Pulp Fiction', value: 7 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 8,
  },
  { label: 'The Good, the Bad and the Ugly', value: 9 },
  { label: 'Fight Club', value: 10 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    value: 11,
  },
];

const pillSelectOptions: RadioSelectOption[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
];

/**
 * Maps default values into react-hook-form default values
 * @param {{name: string, image: string, website: string, bio: string, comments: string}} data The data to parse into default values
 * @returns A default value object for react-hook-form
 */
const obtainDefaultValues = () => ({
  companyName: 'Default Company Name',
  numberInput: '123',
  dropdownInput: dropdownOptions[0],
  pillSelectInput: pillSelectOptions[1].value,
});

const FormTest = () => {
  // -- States --//
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  // Initialise react hook forms
  const formHook = useForm({
    defaultValues: obtainDefaultValues(),
  });

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
        setError(inputName as Parameters<typeof setError>['0'], {
          message: errors[inputName].message,
        });
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
          <FormInputGroup
            sx={{ flex: 1 }}
            label="Dropdown Input"
            name="dropdownInput"
            isLoading={false}
            success={submitSuccess}
            required
          >
            {/** @ts-ignore */}
            <FormSearchDropdown options={dropdownOptions} />
          </FormInputGroup>
          <FormInputGroup
            sx={{ flex: 1 }}
            label="Pill Select Input"
            name="pillSelectInput"
            isLoading={false}
            success={submitSuccess}
            required
          >
            {/** @ts-ignore */}
            <FormRadioSelect options={pillSelectOptions} />
          </FormInputGroup>
          <FormInputGroup
            sx={{ flex: 1 }}
            label="Dropdown Select Input"
            name="dropdownSelectInput"
            isLoading={false}
            success={submitSuccess}
            required
          >
            {/** @ts-ignore */}
            <FormDropdownSelector options={pillSelectOptions} placeholder="Sample Placeholder" />
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
