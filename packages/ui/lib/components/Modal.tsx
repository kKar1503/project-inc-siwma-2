import { ReactNode } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import MUIModal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';

export type ComponentProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  buttonColor: `#${string}`;
  icon: 'success' | 'info' | 'warning';
  title: string;
  content: string;
  leftButtonText?: string | null;
  rightButtonText: string;
  leftButtonState?: boolean;
  rightButtonState: boolean;
  setLeftButtonState: (val: boolean) => void;
  setRightButtonState: (val: boolean) => void;
};

const Modal = ({
  open,
  setOpen,
  buttonColor,
  icon,
  title,
  content,
  leftButtonText,
  rightButtonText,
  leftButtonState,
  rightButtonState,
  setLeftButtonState,
  setRightButtonState,
}: ComponentProps) => {
  const handleClose = () => setOpen(false);
  const isMinWidth = useMediaQuery('(min-width:600px)');

  let iconType: ReactNode;
  switch (icon) {
    case 'success':
      iconType = (
        <CheckCircleOutlineOutlined
          color="success"
          sx={({ spacing }) => ({ fontSize: { xs: 32, md: 48 }, mr: spacing(2) })}
        />
      );
      break;
    case 'warning':
      iconType = (
        <WarningAmberOutlined
          color="warning"
          sx={({ spacing }) => ({ fontSize: { xs: 32, md: 48 }, mr: spacing(2) })}
        />
      );
      break;
    case 'info':
    default:
      iconType = (
        <InfoOutlined
          color="info"
          sx={({ spacing }) => ({ fontSize: { xs: 32, md: 48 }, mr: spacing(2) })}
        />
      );
  }
  return (
    <div>
      <MUIModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={({ spacing, palette, shadows }) => ({
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '25%',
              borderRadius: 3,
              padding: spacing(2),
              position: 'absolute',
              boxShadow: shadows[3],
              backgroundColor: palette.common.white,
            })}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {iconType}
              <Box sx={{ justifyContent: 'left' }}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={({ palette }) => ({
                    color: palette.info[800],
                    fontSize: { xs: 'subtitle2', sm: 'h5' },
                  })}
                >
                  {title}
                </Typography>
                <Box textAlign="center">
                  <Typography
                    id="transition-modal-description"
                    sx={{
                      mt: 2,
                      fontSize: { xs: 'subtitle1', sm: 'h6' },
                      textAlign: 'left',
                    }}
                  >
                    {content}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box textAlign="center" display="flex" justifyContent="center">
              {/* if Left Button Text is != null, it will print */}
              {leftButtonText != null && (
                <Button
                  variant={leftButtonText != null ? 'outlined' : 'contained'}
                  sx={({ spacing }) => ({
                    bgcolor: leftButtonText != null ? '' : buttonColor,
                    marginRight: '16px',
                    width: 1 / 2,
                    marginTop: spacing(2),
                    padding: isMinWidth ? '7px 20px' : '2px 4px',
                  })}
                  onClick={() => setLeftButtonState(true)}
                >
                  <Typography sx={{ fontSize: { xs: 'overline', sm: 'subtitle1' } }}>
                    {leftButtonText}
                  </Typography>
                </Button>
              )}

              {/* Right Button Text */}
              <Button
                variant="contained"
                sx={({ spacing }) => ({
                  bgcolor: buttonColor,
                  width: 1 / 2,
                  marginTop: spacing(2),
                  padding: isMinWidth ? '7px 20px' : '2px 4px',
                })}
                onClick={() => setRightButtonState(true)}
              >
                <Typography
                  sx={({ palette }) => ({
                    fontSize: { xs: 'overline', sm: 'subtitle1' },
                    color: palette.common.white,
                  })}
                >
                  {rightButtonText}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Fade>
      </MUIModal>
    </div>
  );
};

export default Modal;
