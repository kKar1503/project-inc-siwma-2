import MUIAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Typography } from '@mui/material';

export type AlertProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  severity: 'error' | 'warning' | 'info' | 'success';
  alertTitle: string;
  alertContent: string;
};

const Alert = ({ open, setOpen, severity, alertContent, alertTitle }: AlertProps) => (
    <MUIAlert
      variant="outlined"
      severity={severity}
      sx={({ palette, typography }) => ({
        bgcolor: palette.common.white,
        fontSize: typography.subtitle1,
      })}
    >
      <AlertTitle>{alertTitle}</AlertTitle>
      <Typography noWrap sx={{ width: '300px' }}>
        {alertContent}
      </Typography>
    </MUIAlert>
  );

export default Alert;
