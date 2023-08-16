/* eslint-disable no-nested-ternary */
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type FormInputProps = {
  name: string;
  label: string;
  // We do not know what the shape of the object will be
  // eslint-disable-next-line react/forbid-prop-types
  customValidation?: RegisterOptions<FieldValues, string> | undefined;
  required?: boolean;
  success?: boolean;
  isLoading?: boolean;
  sx?: React.ComponentProps<typeof TextField>['sx'];
};

/**
 * Wrapper component for a react hook form input
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns A input that works with react form hook
 */
const FormDatePicker = ({
  name,
  label,
  customValidation,
  required = false,
  success,
  isLoading,
  sx,
}: FormInputProps) => {
  // Use form context
  const {
    register,
    setError,
    setValue,
    formState: { errors, defaultValues },
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
      <DatePicker
        {...hookInput(name, label, customValidation)}
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            '& > fieldset': { borderColor },
          },
          ...sx,
        }}
        label={label}
        format="dd/MM/yyyy"
        onChange={(value, ctx) => {
          setValue(name, value, {
            shouldValidate: true,
          });
          if (ctx) {
            setError(name, { message: ctx.validationError || undefined });
          }
        }}
        defaultValue={defaultValues ? DateTime.fromISO(defaultValues[name]) : undefined}
      />
    )
  );
};

export default FormDatePicker;
