import MUIAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import { useResponsiveness } from '@inc/ui';

export type AlertProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  severity: 'error' | 'warning' | 'info' | 'success';
  alertTitle: string;
  alertContent: string;
};

const Alert = ({ open, setOpen, severity, alertContent, alertTitle }: AlertProps) => {
  const [isSm] = useResponsiveness(['sm']);

  return (
    <MUIAlert
      variant="outlined"
      severity={severity}
      sx={({ palette, typography }) => ({
        bgcolor: palette.common.white,
        fontSize: typography.subtitle1,
        width: isSm ? '90vw' : 'auto',
      })}
    >
      <AlertTitle>{alertTitle}</AlertTitle>
      <Typography noWrap sx={{ width: isSm ? '100%' : '280px' }}>
        {alertContent}
      </Typography>
    </MUIAlert>
  );
};

export default Alert;
