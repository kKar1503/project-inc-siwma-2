import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export type RadioSelectOption = {
  label: string;
  value: string;
};

type FormRadioSelectProps = {
  name: string;
  label: string;
  options: RadioSelectOption[];
  placeholder?: string;
  // We do not know what the shape of the object will be
  // eslint-disable-next-line react/forbid-prop-types
  customValidation?: RegisterOptions<FieldValues, string> | undefined;
  required?: boolean;
  success?: boolean;
  isLoading?: boolean;
  max?: number;
  min?: number;
  sx?: React.ComponentProps<typeof RadioGroup>['sx'];
};

/**
 * Wrapper component for a react hook form input
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns A input that works with react form hook
 */
const FormRadioSelect = ({
  name,
  label,
  options,
  placeholder,
  customValidation,
  required = false,
  success,
  isLoading,
  sx,
}: FormRadioSelectProps) => {
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
    options: React.ComponentProps<typeof Controller>['rules']
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
        control={control}
        {...hookInput(name, label, customValidation)}
        render={({ field: { ref, ...field }, fieldState: { error, invalid } }) => (
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            placeholder={placeholder}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '& > fieldset': { borderColor },
              },
              ...sx,
            }}
            onChange={(e, value) => field.onChange(value)}
          >
            {options.map((option) => (
              <FormControlLabel
                value={option.value}
                control={
                  <Radio
                    sx={{
                      color: borderColor,
                    }}
                  />
                }
                label={option.label}
              />
            ))}
          </RadioGroup>
        )}
      />
    )
  );
};

export default FormRadioSelect;
