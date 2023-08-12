import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import { Controller, FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';

export type FormCheckboxInputOptions = {
  label: string;
  value: string;
};

type FormCheckboxInputProps = {
  name: string;
  label: string;
  options: FormCheckboxInputOptions[];
  placeholder?: string;
  // We do not know what the shape of the object will be
  // eslint-disable-next-line react/forbid-prop-types
  customValidation?: RegisterOptions<FieldValues, string> | undefined;
  required?: boolean;
  success?: boolean;
  isLoading?: boolean;
  sx?: React.ComponentProps<typeof ButtonGroup>['sx'];
};

/**
 * Wrapper component for a react hook form input
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns A input that works with react form hook
 */
const FormCheckboxInput = ({
  name,
  label,
  options,
  placeholder,
  customValidation,
  required = false,
  success,
  isLoading,
  sx,
}: FormCheckboxInputProps) => {
  // Import colour palette
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
    options: React.ComponentProps<typeof Controller>['rules']
  ) =>
    register(inputName, {
      required: { value: required, message: `${inputLabel} is required` },
      ...options,
    });

  // Determine the border color
  // eslint-disable-next-line no-nested-ternary
  const borderColor = errors[name]
    ? palette.error[100]
    : success
    ? palette.success[100]
    : palette.primary[300];

  return (
    // Render a skeleton if the component is in a loading state
    isLoading ? (
      <Skeleton sx={{ height: '3rem' }} />
    ) : (
      <Controller
        control={control}
        {...hookInput(name, label, customValidation)}
        render={({ field: { ...field }, formState: { defaultValues } }) => (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                control={
                  <Checkbox defaultChecked={defaultValues ? defaultValues[name] : undefined} />
                }
                {...hookInput(name, label, customValidation)}
                value={option.value}
                label={option.label}
              />
            ))}
          </FormGroup>
        )}
      />
    )
  );
};

export default FormCheckboxInput;
