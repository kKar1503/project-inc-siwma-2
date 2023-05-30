import { useMemo } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MUIAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';

export type AlertProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  severity: 'error' | 'warning' | 'info' | 'success';
  alertTitle: string;
  alertContent: string;
};

const Alert = ({ open, setOpen, severity, alertContent, alertTitle }: AlertProps) => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const alertStyle: SnackbarOrigin | undefined = useMemo(() => {
    if (isSm) {
      return { vertical: 'top', horizontal: 'center' };
    }
    if (isMd) {
      return { vertical: 'bottom', horizontal: 'right' };
    }
    if (isLg) {
      return { vertical: 'bottom', horizontal: 'right' };
    }
    return undefined;
  }, [isSm, isMd, isLg]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={alertStyle}>
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
