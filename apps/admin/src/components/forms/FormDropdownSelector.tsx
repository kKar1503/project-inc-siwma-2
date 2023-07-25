import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export type FormDropdownSelectorOption = {
  label: string;
  value: string;
};

type FormDropdownSelectorProps = {
  name: string;
  label: string;
  options: FormDropdownSelectorOption[];
  placeholder?: string;
  // We do not know what the shape of the object will be
  // eslint-disable-next-line react/forbid-prop-types
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
        render={({ field: { ref, ...field }, formState: { defaultValues } }) => (
          <FormControl fullWidth>
            <InputLabel id={`${name}-input-label`}>{label}</InputLabel>
            <Select
              labelId={`${name}-input-label`}
              sx={{
                width: '100%',
                ...sx,
              }}
              label={label}
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
                <MenuItem value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    )
  );
};

export default FormDropdownSelector;
