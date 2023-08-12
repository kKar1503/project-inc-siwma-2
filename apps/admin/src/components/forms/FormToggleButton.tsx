import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material';
import { Controller, FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';

export type FormToggleButtonOption = {
  label: string;
  value: string;
};

type FormToggleButtonProps = {
  name: string;
  label: string;
  labelComponent?: React.ReactNode;
  options: FormToggleButtonOption[];
  placeholder?: string;
  // We do not know what the shape of the object will be
  // eslint-disable-next-line react/forbid-prop-types
  customValidation?: RegisterOptions<FieldValues, string> | undefined;
  required?: boolean;
  success?: boolean;
  isLoading?: boolean;
  max?: number;
  min?: number;
  sx?: React.ComponentProps<typeof ButtonGroup>['sx'];
};

/**
 * Wrapper component for a react hook form input
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns A input that works with react form hook
 */
const FormToggleButton = ({
  name,
  label,
  labelComponent,
  options,
  placeholder,
  customValidation,
  required = false,
  success,
  isLoading,
  sx,
}: FormToggleButtonProps) => {
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
      <>
        {labelComponent}
        <Controller
          control={control}
          {...hookInput(name, label, customValidation)}
          render={({ field: { ...field }, formState: { defaultValues } }) => (
            <ButtonGroup
              variant="outlined"
              aria-label="outlined button group"
              placeholder={placeholder}
              defaultValue={defaultValues ? defaultValues[name] : undefined}
              sx={{
                display: 'flex',
                columnGap: 3,
                width: '100%',
                '.Mui-disabled': {
                  borderColor,
                  backgroundColor: borderColor,
                },
                ...sx,
              }}
            >
              {options.map((option, index) => (
                <Button
                  key={option.value}
                  value={option.value}
                  onClick={() => field.onChange(option.value)}
                  disabled={option.value === field.value}
                  // eslint-disable-next-line no-nested-ternary
                  color={errors[name] ? 'error' : success ? 'success' : undefined}
                  // eslint-disable-next-line no-nested-ternary
                  sx={{
                    flex: 1,
                    padding: 2,
                    '&:disabled': {
                      color: option.value === field.value ? 'white' : undefined,
                    },
                  }}
                  type="button"
                >
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
          )}
        />
      </>
    )
  );
};

export default FormToggleButton;
