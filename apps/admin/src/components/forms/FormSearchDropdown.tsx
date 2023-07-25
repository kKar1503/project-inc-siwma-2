import { Autocomplete, TextField } from '@mui/material';
import { Controller, FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type FormSearchDropdownProps = {
  name: string;
  label: string;
  options: React.ComponentProps<typeof Autocomplete>['options'];
  placeholder?: string;
  // We do not know what the shape of the object will be
  // eslint-disable-next-line react/forbid-prop-types
  customValidation?: RegisterOptions<FieldValues, string> | undefined;
  required?: boolean;
  success?: boolean;
  isLoading?: boolean;
  max?: number;
  min?: number;
  sx?: React.ComponentProps<typeof TextField>['sx'];
};

/**
 * Wrapper component for a react hook form input
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns A input that works with react form hook
 */
const FormSearchDropdown = ({
  name,
  label,
  options,
  placeholder,
  customValidation,
  required = false,
  success,
  isLoading,
  max,
  min,
  sx,
}: FormSearchDropdownProps) => {
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
  // eslint-disable-next-line no-nested-ternary
  const borderColor = errors[name] ? 'error.main' : success ? 'success.main' : undefined;

  return (
    // Render a skeleton if the component is in a loading state
    isLoading ? (
      <Skeleton className="h-12" />
    ) : (
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field }, fieldState: { error, invalid } }) => (
          <Autocomplete
            {...field}
            placeholder={placeholder}
            disablePortal
            options={options}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '& > fieldset': { borderColor },
              },
              ...sx,
            }}
            renderInput={(params) => <TextField {...params} label="Dropdown Option" />}
            {...hookInput(name, label, customValidation)}
            onChange={(e, value) => field.onChange(value)}
            onInputChange={(_, data) => {
              if (data) field.onChange(data);
            }}
          />
        )}
      />
    )
  );
};

export default FormSearchDropdown;
