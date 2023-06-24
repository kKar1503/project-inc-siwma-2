import { ReactNode, useMemo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import MUIModal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';
import useResponsiveness from '../hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';

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
  setLeftButtonState?: (val: boolean) => void;
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

  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, palette, typography, shadows } = useTheme();

  const modalStyles = useMemo(() => {
    if (isSm) {
      return {
        modalWidth: {
          width: '80%',
        },
        buttonTxt: {
          fontSize: '0.85rem',
          // fontWeight: '400',
        },
      };
    }
    if (isMd) {
      return {
        modalWidth: {
          width: '45%',
        },
        buttonTxt: {
          fontSize: '1rem',
        },
      };
    }
    if (isLg) {
      return {
        modalWidth: {
          width: '35%',
        },
        buttonTxt: {
          fontSize: '1rem',
        },
      };
    }
    return {
      modalWidth: {
        width: '50%',
      },
      buttonTxt: {
        fontSize: '1rem',
      },
    };
  }, [isSm, isMd, isLg]);

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
            sx={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: 3,
              padding: spacing(2),
              position: 'absolute',
              boxShadow: shadows[3],
              backgroundColor: palette.common.white,
              ...modalStyles?.modalWidth,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {iconType}
              <Box sx={{ justifyContent: 'left' }}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{
                    color: palette.info[800],
                  }}
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
                  sx={{
                    bgcolor: leftButtonText != null ? '' : buttonColor,
                    marginRight: '16px',
                    width: 1 / 3,
                    marginTop: spacing(2),
                  }}
                  onClick={() => {
                    if (typeof setLeftButtonState === 'function') setLeftButtonState(true);
                  }}
                >
                  <Typography sx={modalStyles?.buttonTxt}>{leftButtonText}</Typography>
                </Button>
              )}

              {/* Right Button Text */}
              <Button
                variant="contained"
                sx={{
                  bgcolor: buttonColor,
                  width: 1 / 3,
                  marginTop: spacing(2),
                }}
                onClick={() => setRightButtonState(true)}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: palette.common.white,
                    ...modalStyles?.buttonTxt,
                  }}
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
