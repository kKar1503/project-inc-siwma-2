import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useFormContext } from 'react-hook-form';

type FormErrorProps = {
  inputName: string;
  error?: string;
  sx?: React.ComponentProps<typeof Box>['sx'];
};

/**
 * Displays an error message
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 * @returns Displays an error message (if any)
 */
const FormError = ({ inputName, error, sx }: FormErrorProps) => {
  // Load theme
  const { palette } = useTheme();

  // -- Obtain the error message to be displayed -- //
  // Initialise the error message
  let errorMessage = '';

  // Retrieve form context if the component is not in a loading state
  const {
    formState: { errors },
  } = useFormContext();

  const tempMessage = errors[inputName];

  // Check if a name of a input was provided and the input is errored
  if (inputName && tempMessage) {
    // Input name provided, retrieve the error message from the input
    errorMessage = tempMessage.message?.toString() || '';
  }

  // Check if an error message was explicitly provided
  if (error) {
    // A custom error message was provided
    errorMessage = error;
  }

  return (
    <Box sx={{ width: '100%', textAlign: 'right', height: '1rem', marginY: 1, ...sx }}>
      <Typography variant="subtitle2" color={palette.error[100]}>
        {errorMessage}
      </Typography>
    </Box>
  );
};

export default FormError;
