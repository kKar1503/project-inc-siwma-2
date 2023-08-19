/* eslint-disable no-nested-ternary */
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import { Controller, FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';

export type FormDropdownSelectorOption = {
  label: string;
  value: string;
};

type FormDropdownSelectorProps = {
  name: string;
  label: string;
  options: FormDropdownSelectorOption[];
  placeholder?: string;
  customValidation?: RegisterOptions<FieldValues, string> | undefined;
  required?: boolean;
  success?: boolean;
  isLoading?: boolean;
  sx?: React.ComponentProps<typeof Select>['sx'];
};

/**
 * Wrapper component for a react hook form input
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns A input that works with react form hook
 */
const FormDropdownSelector = ({
  name,
  label,
  options,
  placeholder,
  customValidation,
  required = false,
  success,
  isLoading,
  sx,
}: FormDropdownSelectorProps) => {
  // Import color palette
  const { palette } = useTheme();

  // Use form context
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  // Hooks inputs to using react form hook
  const hookInput = (
    inputName: string,
    inputLabel: string,
    options: Parameters<typeof register>['1']
  ) =>
    register(inputName, {
      required: { value: required, message: `${inputLabel} is required` },
      ...options,
    });

  // Determine the border color
  const borderColor = errors[name] ? 'error.main' : success ? 'success.main' : undefined;

  return (
    // Render a skeleton if the component is in a loading state
    isLoading ? (
      <Skeleton height="3.5rem" />
    ) : (
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field }, formState: { defaultValues } }) => (
          <FormControl
            fullWidth
            sx={{
              '.MuiInputLabel-root': {
                color: borderColor,
              },
            }}
          >
            <InputLabel
              id={`${name}-input-label`}
              color={errors[name] ? 'error' : success ? 'success' : undefined}
            >
              {label} {required ? ' *' : ''}
            </InputLabel>
            <Select
              labelId={`${name}-input-label`}
              sx={{
                width: '100%',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor,
                },
                ...sx,
              }}
              label={label + (required ? ' *' : '')}
              defaultValue={defaultValues ? defaultValues[name] : undefined}
              {...hookInput(name, label, customValidation)}
              onChange={(e) => {
                console.log(e.target.value);
              }}
              error={!!errors[name]}
              placeholder={placeholder}
              variant="outlined"
            >
              {options.map((option) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    )
  );
};

export default FormDropdownSelector;
