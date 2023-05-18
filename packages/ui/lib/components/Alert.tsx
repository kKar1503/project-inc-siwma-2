import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MUIAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export type AlertProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  severity: 'error' | 'warning' | 'info' | 'success';
  alertTitle: string;
  alertContent: string;
};

const Alert = ({ open, setOpen, severity, alertContent, alertTitle }: AlertProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' } as SnackbarOrigin}
    >
      <MUIAlert
        variant="outlined"
        severity={severity}
        onClose={handleClose}
        sx={({ palette, typography }) => ({
          bgcolor: palette.common.white,
          fontSize: typography.subtitle1,
        })}
      >
        <AlertTitle>{alertTitle}</AlertTitle>
        {alertContent}
      </MUIAlert>
    </Snackbar>
  );
};

export default Alert;
