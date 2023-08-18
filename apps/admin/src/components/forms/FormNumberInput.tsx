import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';

type FormNumberInputProps = {
  name: string;
  label: string;
  prefix?: string;
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
const FormNumberInput = ({
  name,
  label,
  prefix,
  placeholder,
  customValidation,
  required = false,
  success,
  isLoading,
  max,
  min,
  sx,
}: FormNumberInputProps) => {
  // Use form context
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Hooks inputs to using react form hook
  const hookInput = (
    inputName: string,
    inputLabel: string,
    options: Parameters<typeof register>['1']
  ) =>
    register(inputName, {
      required: { value: required, message: `${inputLabel} is required` },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pattern: {
        value: /^-?\d+(\.\d+)?$/,
        message: 'Must be a valid number',
      },
      max: max
        ? { value: max, message: `${inputLabel} must be less than or equal to ${max}` }
        : undefined,
      min: min
        ? { value: min, message: `${inputLabel} must be greater than or equal to ${min}` }
        : undefined,
      ...options,
    });

  return (
    // Render a skeleton if the component is in a loading state
    isLoading ? (
      <Skeleton height="3.5rem" />
    ) : (
      <TextField
        type="number"
        label={label}
        InputLabelProps={{
          required,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">{prefix}</InputAdornment>,
        }}
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            '& > fieldset': { borderColor: success ? 'success.main' : undefined },
          },
          ...sx,
        }}
        error={!!errors[name]}
        color={success ? 'success' : undefined}
        placeholder={placeholder}
        {...hookInput(name, label, customValidation)}
      />
    )
  );
};

export default FormNumberInput;
