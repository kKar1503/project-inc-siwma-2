import { TextField } from '@mui/material';
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type FormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  // We do not know what the shape of the object will be
  // eslint-disable-next-line react/forbid-prop-types
  customValidation?: RegisterOptions<FieldValues, string> | undefined;
  required?: boolean;
  success?: boolean;
  isLoading?: boolean;
  multiline?: boolean;
  sx?: React.ComponentProps<typeof TextField>['sx'];
};

/**
 * Wrapper component for a react hook form input
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns A input that works with react form hook
 */
const FormInput = ({
  name,
  label,
  placeholder,
  customValidation,
  required = false,
  success,
  multiline,
  isLoading,
  sx,
}: FormInputProps) => {
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
      maxLength: { value: 255, message: `${inputLabel} can only be 255 characters long` },
      ...options,
    });

  return (
    // Render a skeleton if the component is in a loading state
    isLoading ? (
      <Skeleton className="h-12" />
    ) : (
      <TextField
        type="text"
        label={label}
        InputLabelProps={{
          required,
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
        multiline={multiline}
        maxRows={multiline ? Infinity : undefined}
      />
    )
  );
};

export default FormInput;
