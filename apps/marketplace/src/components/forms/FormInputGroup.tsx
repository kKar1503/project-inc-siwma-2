import React from 'react';
import Box from '@mui/material/Box';
import FormError from './FormError';

type FormInputGroupProps = {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactElement;
  hideError?: boolean;
  success?: boolean;
  isLoading?: boolean;
  sx?: React.ComponentProps<typeof Box>['sx'];
};

/**
 * Input group that contains a label, input and error message
 * @param {string} label The label to be used for the input
 * @param {string} name The name of the input
 * @param {boolean} required Whether or not the input is a required field
 * @param {React.ReactNode} children Input component
 * @param {boolean} hideError Whether or not to hide the error text (Useful for if you want to display the error outside of the input group component)
 * @param {boolean} success Whether or not the form submission was successful (Used to determine whether to show a success response)
 * @param {boolean} isLoading Whether or not the component is currently in a loading state
 * @param {object} sx Custom styling for the component
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns An input group that contains a label, input and error message
 */
const FormInputGroup = ({
  label,
  name,
  required,
  children,
  hideError,
  success,
  isLoading,
  sx,
}: FormInputGroupProps) => (
  <Box sx={sx}>
    {
      // Clones the element to pass props down to it
      React.cloneElement(children, { label, name, required, success, isLoading })
    }
    {
      // Show the error if hideError is not set
      !hideError && <FormError inputName={name} />
    }
  </Box>
);

export default FormInputGroup;
